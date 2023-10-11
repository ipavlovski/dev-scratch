import { Color, PickingInfo } from '@deck.gl/core/typed'
import { GeoJsonLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { csv } from 'd3-fetch'
import { scaleLinear, scaleThreshold } from 'd3-scale'
import type * as GeoJSON from 'geojson'
import maplibregl from 'maplibre-gl'
import { useEffect, useMemo, useState } from 'react'
import { Map } from 'react-map-gl'
import { css } from 'styled-system/css'

const ACCIDENTS =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/highway/accidents.csv'
const ROADS =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/highway/roads.json'
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

function getKey({ state, type, id }: Accident) {
  return `${state}-${type}-${id}`
}

const COLOR_SCALE = scaleThreshold<number, Color>()
  .domain([0, 4, 8, 12, 20, 32, 52, 84, 136, 220])
  .range([
    [26, 152, 80],
    [102, 189, 99],
    [166, 217, 106],
    [217, 239, 139],
    [255, 255, 191],
    [254, 224, 139],
    [253, 174, 97],
    [244, 109, 67],
    [215, 48, 39],
    [168, 0, 0],
  ])

const WIDTH_SCALE = scaleLinear().clamp(true).domain([0, 200]).range([10, 2000])

const INITIAL_VIEW_STATE = {
  latitude: 38,
  longitude: -100,
  zoom: 4,
  minZoom: 2,
  maxZoom: 8,
}

type AggregatedData = { [k: string]: { [m: string]: number } }
function aggregateAccidents(accidents: Accident[]) {
  const incidents: AggregatedData = {}
  const fatalities: AggregatedData = {}

  if (accidents) {
    accidents.forEach((a) => {
      const r = (incidents[a.year] = incidents[a.year] || {})
      const f = (fatalities[a.year] = fatalities[a.year] || {})
      const key = getKey(a)
      r[key] = a.incidents
      f[key] = a.fatalities
    })
  }
  return { incidents, fatalities }
}

type renderTooltipProps = {
  fatalities: AggregatedData
  incidents: AggregatedData
  year: string
  hoverInfo: PickingInfo | undefined
}
function renderTooltip({ fatalities, incidents, year, hoverInfo }: renderTooltipProps) {
  if (!hoverInfo) return null

  const { object, x, y } = hoverInfo
  if (!object) return null

  const props = object.properties as Accident & { name: string }
  const key = getKey(props)
  const f = fatalities[year][key]
  const r = incidents[year][key]

  const content = r
    ? (
      <div>
        <b>{f}</b> people died in <b>{r}</b> crashes on{' '}
        {props.type === 'SR' ? props.state : props.type}-{props.id} in <b>{year}</b>
      </div>
    )
    : (
      <div>
        no accidents recorded in <b>{year}</b>
      </div>
    )

  return (
    <div className='tooltip' style={{ left: x, top: y }}>
      <big>
        {props.name} ({props.state})
      </big>
      {content}
    </div>
  )
}

type Feature = GeoJSON.Feature<GeoJSON.Point, Accident & { length: number }>

function Main(props: { roads: string; year: string; accidents: Accident[]; mapStyle: string }) {
  const { roads = '', year, accidents, mapStyle } = props
  const [hoverInfo, setHoverInfo] = useState<PickingInfo>()
  const { incidents, fatalities } = useMemo(() => aggregateAccidents(accidents), [accidents])

  const getLineColor = (f: Feature) => {
    if (!fatalities[year]) {
      return [200, 200, 200]
    }
    const key = getKey(f.properties)
    const fatalitiesPer1KMile = ((fatalities[year][key] || 0) / f.properties.length) * 1000
    return COLOR_SCALE(fatalitiesPer1KMile)
  }

  const getLineWidth = (f: Feature) => {
    if (!incidents[year]) {
      return 10
    }
    const key = getKey(f.properties)
    const incidentsPer1KMile = ((incidents[year][key] || 0) / f.properties.length) * 1000
    return WIDTH_SCALE(incidentsPer1KMile)
  }

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: roads,
      stroked: false,
      filled: false,
      lineWidthMinPixels: 0.5,
      parameters: {
        depthTest: false,
      },
      // @ts-ignore
      getLineColor: (f) => getLineColor(f),
      // @ts-ignore
      getLineWidth: (f) => getLineWidth(f),
      pickable: true,
      onHover: setHoverInfo,
      updateTriggers: {
        getLineColor: { year },
        getLineWidth: { year },
      },
      transitions: {
        getLineColor: 1000,
        getLineWidth: 1000,
      },
    }),
  ]

  return (
    <DeckGL
      layers={layers}
      pickingRadius={5}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
      {renderTooltip({ incidents, fatalities, year, hoverInfo })}
    </DeckGL>
  )
}

type Accident = {
  id: string
  state: string
  type: string
  year: string
  incidents: number
  fatalities: number
}

export default function App() {
  const styles = css({
    background: 'slate.500',
    color: 'slate.100',
  })

  const [accidents, setAccidents] = useState<Accident[]>([])

  useEffect(() => {
    csv(ACCIDENTS, (d) => ({
      id: d.id,
      state: d.state,
      type: d.type,
      year: d.year,
      incidents: Number(d.incidents),
      fatalities: Number(d.fatalities),
    })).then((data) => setAccidents(data))
  }, [])

  return <Main accidents={accidents} roads={ROADS} year={'1995'} mapStyle={MAP_STYLE} />
}
