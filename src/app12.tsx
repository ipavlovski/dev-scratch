import { LayerProps, MapView } from '@deck.gl/core/typed'
import { TileLayer } from '@deck.gl/geo-layers/typed'
import { TileLayerProps, TiledPickingInfo } from '@deck.gl/geo-layers/typed/tile-layer/tile-layer'
import { Tile2DHeader } from '@deck.gl/geo-layers/typed/tileset-2d'
import { BitmapLayer, PathLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { css } from 'styled-system/css'

const INITIAL_VIEW_STATE = {
  latitude: 47.65,
  longitude: 7,
  zoom: 4.5,
  maxZoom: 20,
  maxPitch: 89,
  bearing: 0,
}

/* global window */
const devicePixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1

function getTooltip({ tile }: TiledPickingInfo) {
  if (tile) {
    const { x, y, z } = tile.index
    return `tile: x: ${x}, y: ${y}, z: ${z}`
  }
  return null
}

export default function App({ showBorder = false, onTilesLoad = null }) {
  const styles = {
    copyright: css({
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: 'hsla(0,0%,100%,.5)',
      padding: '0 5px',
      font: '12px/20px Helvetica Neue,Arial,Helvetica,sans-serif',
    }),
    link: css({
      textDecoration: 'none',
      color: 'rgba(0,0,0,.75)',
      cursor: 'grab',
      _hover: {
        textDecoration: 'underline',
      },
    }),
  }

  const tileLayer = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ],

    // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    // and we aren't limited by the browser to a certain number per domain.
    maxRequests: 20,

    pickable: true,
    onViewportLoad: onTilesLoad,
    autoHighlight: showBorder,
    highlightColor: [60, 60, 60, 40],
    // https://wiki.openstreetmap.org/wiki/Zoom_levels
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    zoomOffset: devicePixelRatio === 1 ? -1 : 0,
    renderSubLayers: (props) => {
      const {
        // @ts-ignore
        bbox: { west, south, east, north },
      } = props.tile satisfies Tile2DHeader

      return [
        new BitmapLayer(props, {
          data: undefined,
          image: props.data,
          bounds: [west, south, east, north],
        }),
        showBorder
        && new PathLayer({
          id: `${props.id}-border`,
          data: [
            [
              [west, north],
              [west, south],
              [east, south],
              [east, north],
              [west, north],
            ],
          ],
          getPath: (d) => d,
          getColor: [255, 0, 0],
          widthMinPixels: 4,
        }),
      ]
    },
  })

  return (
    <DeckGL
      layers={[tileLayer]}
      views={new MapView({ repeat: true })}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}>
      <div className={styles.copyright}>
        {'© '}
        <a className={styles.link} href='http://www.openstreetmap.org/copyright' target='blank'>
          OpenStreetMap contributors
        </a>
      </div>
    </DeckGL>
  )
}
