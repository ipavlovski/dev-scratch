import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { scaleQuantile } from 'd3-scale'
import maplibregl from 'maplibre-gl'
import { useEffect, useMemo, useState } from 'react'
import { Map } from 'react-map-gl'

import type * as GeoJSON from 'geojson'
import { Color, PickingInfo } from '@deck.gl/core/typed'

type Properties = {
  name: string
  flows: { [k: string]: number }
  centroid: [number, number, number]
}
type Feature = GeoJSON.Feature<GeoJSON.MultiPolygon, Properties>

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/arc/counties.json'

export const inFlowColors = [
  [255, 255, 204],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [12, 44, 132],
]

export const outFlowColors = [
  [255, 255, 178],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [177, 0, 38],
]

const INITIAL_VIEW_STATE = {
  longitude: -100,
  latitude: 40.7,
  zoom: 3,
  maxZoom: 15,
  pitch: 30,
  bearing: 30,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'


type ArcData = {
  gain: number;
  quantile: number;
  source: [number, number, number];
  target: [number, number, number];
  value: number;
}

function calculateArcs(data: Feature[], selectedCounty: Feature | undefined): ArcData[] | null {
  if (!data || !data.length) {
    return null
  }
  if (!selectedCounty) {
    selectedCounty = data.find((f: Feature) => f.properties.name === 'Los Angeles, CA')
  }
  const { flows, centroid } = selectedCounty!.properties

  const arcs = Object.keys(flows).map((toId) => {
    const f = data[parseInt(toId)]
    return {
      source: centroid,
      target: f.properties.centroid,
      value: flows[toId],
    }
  })

  const scale = scaleQuantile()
    .domain(arcs.map((a) => Math.abs(a.value)))
    .range(inFlowColors.map((c, i) => i))

  return arcs.map((a) => ({
    ...a,
    gain: Math.sign(a.value),
    quantile: scale(Math.abs(a.value)),
  }))
}

function getTooltip({ object }: PickingInfo) {
  return object && object.properties.name
}

function Main(
  { data, strokeWidth = 1, mapStyle = MAP_STYLE }: { data: Feature[];
    strokeWidth?: number; mapStyle?: string },
) {
  const [selectedCounty, selectCounty] = useState<Feature>()

  const arcs = useMemo(() => calculateArcs(data, selectedCounty), [data, selectedCounty])

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data,
      stroked: false,
      filled: true,
      getFillColor: [0, 0, 0, 0],
      onClick: ({ object }) => selectCounty(object),
      pickable: true,
    }),

    new ArcLayer<ArcData>({
      id: 'arc',
      // @ts-ignore
      data: arcs,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: (d) => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile] as Color,
      getTargetColor: (d) => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile] as Color,
      getWidth: strokeWidth,
    }),
  ]

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}>
        {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  )
}

export default function App() {
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    fetch(DATA_URL)
      .then((response) => response.json())
      .then(({ features }) => setFeatures(features))
  }, [])

  return <Main data={features} />
}
