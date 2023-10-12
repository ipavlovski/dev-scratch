import { Color, MapView } from '@deck.gl/core/typed'
import { ViewStateChangeParameters } from '@deck.gl/core/typed/controllers/controller'
import { CollisionFilterExtension } from '@deck.gl/extensions/typed'
import { TextLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { load } from '@loaders.gl/core'
import { CSVLoader } from '@loaders.gl/csv'
import { scaleLinear } from 'd3-scale'
import maplibregl from 'maplibre-gl'
import { useCallback, useEffect, useState } from 'react'
import { Map } from 'react-map-gl'

// Sample data
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/text-layer/cities-1000.csv'

const INITIAL_VIEW_STATE = {
  latitude: 39.1,
  longitude: -94.57,
  zoom: 3.8,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

const colorScale = scaleLinear<Color>()
  .domain([3, 4, 5, 6, 7])
  .range([
    [29, 145, 192],
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
  ])

// name,population,longitude,latitude
// Quillacollo,172405,-66.27838,-17.39228
type DataRow = {
  name: string
  population: number
  longitude: number
  latitude: number
}

type MainProps = { data: DataRow[]; noOverlap?: boolean; fontSize?: number; mapStyle?: string }
function Main({ data, noOverlap = true, fontSize = 32, mapStyle = MAP_STYLE }: MainProps) {
  const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom)

  const onViewStateChange = useCallback(({ viewState }: ViewStateChangeParameters & {
    viewId: string
  }) => {
    setZoom(viewState.zoom)
  }, [])

  const scale = 2 ** zoom
  const sizeMaxPixels = (scale / 3) * fontSize
  const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize

  const textLayer = new TextLayer<DataRow>({
    id: 'world-cities',
    data,
    characterSet: 'auto',
    fontSettings: {
      buffer: 8,
    },

    // TextLayer options
    getText: (d) => d.name,
    getPosition: (d) => [d.longitude, d.latitude],
    getColor: (d) => colorScale(Math.log10(d.population)),
    getSize: (d) => Math.pow(d.population, 0.25) / 40,
    sizeScale: fontSize,
    sizeMaxPixels,
    sizeMinPixels,
    maxWidth: 64 * 12,

    // CollideExtension options
    // @ts-ignore
    collisionEnabled: noOverlap,
    getCollisionPriority: (d: DataRow) => Math.log10(d.population),
    collisionTestProps: {
      sizeScale: fontSize * 2,
      sizeMaxPixels: sizeMaxPixels * 2,
      sizeMinPixels: sizeMinPixels * 2,
    },
    extensions: [new CollisionFilterExtension()],
  })

  return (
    <DeckGL
      views={new MapView({ repeat: true })}
      layers={[textLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      onViewStateChange={onViewStateChange}
      controller={{ dragRotate: false }}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  )
}

export default function App() {
  const [data, setData] = useState<DataRow[]>([])
  useEffect(() => {
    load(DATA_URL, CSVLoader).then((data) => setData(data))
  }, [])

  return <Main data={data} />
}
