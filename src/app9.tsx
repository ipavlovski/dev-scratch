import { PickingInfo } from '@deck.gl/core/typed'
import { ScenegraphLayer } from '@deck.gl/mesh-layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { load } from '@loaders.gl/core'
import { JSONLoader } from '@loaders.gl/json'
import maplibregl from 'maplibre-gl'
import { useEffect, useState } from 'react'
import { Map } from 'react-map-gl'

const DATA_URL = 'assets/opensky-data.json'
const MODEL_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scenegraph-layer/airplane.glb'
const REFRESH_TIME = 30000

const ANIMATIONS = {
  '*': { speed: 1 },
}

const INITIAL_VIEW_STATE = {
  latitude: 39.1,
  longitude: -94.57,
  zoom: 3.8,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

const DATA_INDEX = {
  UNIQUE_ID: 0,
  CALL_SIGN: 1,
  ORIGIN_COUNTRY: 2,
  LONGITUDE: 5,
  LATITUDE: 6,
  BARO_ALTITUDE: 7,
  VELOCITY: 9,
  TRUE_TRACK: 10,
  VERTICAL_RATE: 11,
  GEO_ALTITUDE: 13,
  POSITION_SOURCE: 16,
} as const

type DataPoint = [
  string, // 0 - icao24
  string, // 1- callsign
  string, // 2 - origin_country
  number, // 3 - time_position
  number, // 4 - last_contact
  number, // 5 - longitude
  number, // 6 - latitude
  number, // 7 - baro_altitude
  boolean, // 8 - on_ground
  number, // 9 - velocity
  number, // 10 - true_track
  number, // 11 - verical_rate
  number[], // 12 - sensors
  number, // 13 - geo_altitude
  string, // 14 - squawk
  boolean, // 15 - spi
  number, // 16 - position_source
  number, // 17 - category
]

function verticalRateToAngle(object: DataPoint) {
  // Return: -90 looking up, +90 looking down
  const verticalRate = object[DATA_INDEX.VERTICAL_RATE] || 0
  const velocity = object[DATA_INDEX.VELOCITY] || 0
  return (-Math.atan2(verticalRate, velocity) * 180) / Math.PI
}

function getTooltip({ object }: PickingInfo) {
  return (
    object
    && `\
    Call Sign: ${object[DATA_INDEX.CALL_SIGN] || ''}
    Country: ${object[DATA_INDEX.ORIGIN_COUNTRY] || ''}
    Vertical Rate: ${object[DATA_INDEX.VERTICAL_RATE] || 0} m/s
    Velocity: ${object[DATA_INDEX.VELOCITY] || 0} m/s
    Direction: ${object[DATA_INDEX.TRUE_TRACK] || 0}`
  )
}

type Timer = { id?: NodeJS.Timeout | null; nextTimeoutId?: NodeJS.Timeout }
const useOpenSkyApi = (onDataLoad = () => {}) => {
  // Data provided by the OpenSky Network, http://www.opensky-network.org
  // https://openskynetwork.github.io/opensky-api/rest.html
  const DATA_URL = 'https://opensky-network.org/api/states/all'
  const [data, setData] = useState<DataPoint[]>([])
  const [timer, setTimer] = useState<Timer>({})

  useEffect(() => {
    fetch(DATA_URL)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp && resp.states && timer.id !== null) {
          // In order to keep the animation smooth we need to always return the same
          // objects in the exact same order. This function will discard new objects
          // and only update existing ones.
          let sortedData = resp.states as DataPoint[]
          if (data) {
            const dataAsObj: { [k: string]: DataPoint } = {}
            sortedData.forEach((entry) => (dataAsObj[DATA_INDEX.UNIQUE_ID] = entry))
            sortedData = data.map((entry) => dataAsObj[DATA_INDEX.UNIQUE_ID] || entry)
          }

          setData(sortedData)

          if (onDataLoad) {
            // @ts-ignore
            onDataLoad(sortedData.length)
          }
        }
      })
      .finally(() => {
        timer.nextTimeoutId = setTimeout(() => setTimer({ id: timer.nextTimeoutId }), REFRESH_TIME)
      })

    return () => {
      clearTimeout(timer.nextTimeoutId)
      timer.id = null
    }
  }, [timer])

  return data
}

export default function App({ sizeScale = 25, onDataLoad = () => {}, mapStyle = MAP_STYLE }) {
  // const data = useOpenSkyApi()
  const [data, setData] = useState<DataPoint[]>([])
  useEffect(() => {
    load(DATA_URL, JSONLoader).then((v) => {
      console.log(v)
      let sortedData = v.states as DataPoint[]
      if (data) {
        const dataAsObj: { [k: string]: DataPoint } = {}
        sortedData.forEach((entry) => (dataAsObj[DATA_INDEX.UNIQUE_ID] = entry))
        sortedData = data.map((entry) => dataAsObj[DATA_INDEX.UNIQUE_ID] || entry)
      }

      setData(sortedData)
    })
  }, [])

  const layer = data.length > 0
    && new ScenegraphLayer({
      id: 'scenegraph-layer',
      data,
      pickable: true,
      sizeScale,
      scenegraph: MODEL_URL,
      _animations: ANIMATIONS,
      sizeMinPixels: 90,
      // sizeMaxPixels: 1.5,
      sizeMaxPixels: 120,
      getPosition: (d) => [
        d[DATA_INDEX.LONGITUDE] || 0,
        d[DATA_INDEX.LATITUDE] || 0,
        d[DATA_INDEX.GEO_ALTITUDE] || 0,
      ],
      getOrientation: (d) => [verticalRateToAngle(d), -d[DATA_INDEX.TRUE_TRACK] || 0, 90],
      transitions: {
        getPosition: REFRESH_TIME * 0.9,
      },
    })

  return (
    <DeckGL
      layers={[layer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  )
}
