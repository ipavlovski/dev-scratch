import { Color } from '@deck.gl/core/typed'
import { ScatterplotLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import maplibregl from 'maplibre-gl'
import { Map } from 'react-map-gl'

const MALE_COLOR = [0, 128, 255] satisfies Color
const FEMALE_COLOR = [255, 0, 128] satisfies Color

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json' // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.7,
  zoom: 11,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

export default function App({
  data = DATA_URL,
  radius = 30,
  maleColor = MALE_COLOR,
  femaleColor = FEMALE_COLOR,
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
}) {
  const layers = [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: (d) => [d[0], d[1], 0],
      getFillColor: (d) => (d[2] === 1 ? maleColor : femaleColor),
      getRadius: 1,
      updateTriggers: {
        getFillColor: [maleColor, femaleColor],
      },
    }),
  ]

  return (
    <DeckGL layers={layers} initialViewState={INITIAL_VIEW_STATE} controller={true}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  )
}
