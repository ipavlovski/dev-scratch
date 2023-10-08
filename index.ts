import { Database } from 'bun:sqlite'

const clientId = Bun.env.SPOTIFY_CLIENT_ID!
const clientSecret = Bun.env.SPOTIFY_CLIENT_SECRET!
const scope = ['user-library-read', 'playlist-read-private', 'user-read-private', 'user-read-email']
const redirectUri = 'http://localhost:3000/callback'

const db = new Database(':memory:')
db.query('CREATE TABLE spotify_auth (v_key TEXT, v_val TEXT);').run()

function generateRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// http://localhost:3000/login
function generateCodeChallenge(codeVerifier: string) {
  const hasher = new Bun.CryptoHasher('sha256')
  hasher.update(codeVerifier)
  const digest = hasher.digest('base64')
  return digest
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

Bun.serve({
  port: 3000,
  fetch(req, res) {
    const url = new URL(req.url)
    if (url.pathname === '/login') {
      const codeVerifier = generateRandomString(128)
      const codeChallenge = generateCodeChallenge(codeVerifier)

      db.query(
        `insert into spotify_auth (v_key, v_val) VALUES ('${codeVerifier}', '${codeChallenge}')`,
      ).run()

      const args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope.join(' '),
        redirect_uri: redirectUri,
        state: 'some_test_string',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      })

      return Response.redirect('https://accounts.spotify.com/authorize?' + args)
    }
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code')
      const vkey = db.query<{v_key: string, v_val: string}, any>(`select * from spotify_auth`).get()
      const codeVerifier = vkey?.v_key!

      const config: FetchRequestInit = {
        method: 'POST',
        body: new URLSearchParams({
          code: code!,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code_verifier: codeVerifier,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
      }
      fetch('https://accounts.spotify.com/api/token', config)
        .then(v => v.json())
        .then(v => console.log(v))
    }
    return new Response('404!')
  },
})
