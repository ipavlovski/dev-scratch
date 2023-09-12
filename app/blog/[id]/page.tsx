async function getRepo(name: string): Promise<Time> {
  const res = await fetch('http://worldtimeapi.org/api/timezone/America/Chicago', {
    // on every request bypass caching, get new data
    // cache: 'no-store'
    next: {
      revalidate: 5
    }
  })
  return res.json()
}

type Time = {
  datetime: string
}

export async function generateMetadata({params}: { params: { id: string }}) {
    const time = await getRepo('asdf')
    return {
      title: `${time.datetime}`
    }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Blog ID: {params.id}</h1>
    </div>
  )
}
