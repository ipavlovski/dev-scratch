import { CompositeLayer, GetPickingInfoParams, Layer, MapView, PickingInfo,
  UpdateParameters } from '@deck.gl/core/typed'
import { IconLayer } from '@deck.gl/layers/typed'
import DeckGL from '@deck.gl/react/typed'
import maplibregl from 'maplibre-gl'
import { useState } from 'react'
import { Map } from 'react-map-gl'
import Supercluster from 'supercluster'

////////////// ICON-CLUSTER FILE

function getIconName(size: number) {
  if (size === 0) {
    return ''
  }
  if (size < 10) {
    return `marker-${size}`
  }
  if (size < 100) {
    return `marker-${Math.floor(size / 10)}0`
  }
  return 'marker-100'
}

function getIconSize(size: number) {
  return Math.min(100, size) / 100 + 1
}

type IconClusterProps = { iconAtlas: string; iconMapping: string; sizeScale: number }

class IconClusterLayer extends CompositeLayer<IconClusterProps> {
  shouldUpdateState({ changeFlags }: UpdateParameters<Layer<IconClusterProps>>) {
    return changeFlags.somethingChanged
  }

  updateState({ props, oldProps, changeFlags }: UpdateParameters<Layer<IconClusterProps>>) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale

    if (rebuildIndex) {
      const index = new Supercluster({ maxZoom: 16, radius: props.sizeScale * Math.sqrt(2) })
      index.load(
        props.data.map((d) => ({
          geometry: { coordinates: props.getPosition(d) },
          properties: d,
        })),
      )
      this.setState({ index })
    }

    const z = Math.floor(this.context.viewport.zoom)
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z,
      })
    }
  }

  getPickingInfo({ info, mode }: GetPickingInfoParams & { mode: string }): MeteoritePickingInfo {
    const pickedObject = info.object && info.object.properties
    // const info2 = { }
    const info2: MeteoritePickingInfo = { ...info }

    if (pickedObject) {
      if (pickedObject.cluster && mode !== 'hover') {
        info2.objects = this.state.index
          .getLeaves(pickedObject.cluster_id, 25)
          .map((f) => f.properties)
      }
      info2.object = pickedObject
    }
    return info2
  }

  renderLayers() {
    const { data } = this.state
    const { iconAtlas, iconMapping, sizeScale } = this.props

    return new IconLayer(
      this.getSubLayerProps({
        id: 'icon',
        data,
        iconAtlas,
        iconMapping,
        sizeScale,
        getPosition: (d) => d.geometry.coordinates,
        getIcon: (d) => getIconName(d.properties.cluster ? d.properties.point_count : 1),
        getSize: (d) => getIconSize(d.properties.cluster ? d.properties.point_count : 1),
      }),
    )
  }
}

////////////// MAIN FILE

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'
const ICON_MAPPING = 'assets/location-icon-mapping.json'
const ICON_ATLAS = 'assets/location-icon-atlas.png'

const MAP_VIEW = new MapView({ repeat: true })

const INITIAL_VIEW_STATE = {
  longitude: -35,
  latitude: 36.7,
  zoom: 1.8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
}

function renderTooltip(info: MeteoritePickingInfo | object) {
  if (!('object' in info)) return null
  const { object, x, y } = info

  if (info.objects) {
    return (
      <div className='tooltip interactive' style={{ left: x, top: y }}>
        {info.objects.map(({ name, year, mass, class: meteorClass }) => {
          return (
            <div key={name}>
              <h5>{name}</h5>
              <div>Year: {year || 'unknown'}</div>
              <div>Class: {meteorClass}</div>
              <div>Mass: {mass}g</div>
            </div>
          )
        })}
      </div>
    )
  }

  if (!object) {
    return null
  }

  return object.cluster
    ? (
      <div className='tooltip' style={{ left: x, top: y }}>
        {object.point_count} records
      </div>
    )
    : (
      <div className='tooltip' style={{ left: x, top: y }}>
        {object.name} {object.year ? `(${object.year})` : ''}
      </div>
    )
}

// {"coordinates":[28.96,13.66033],"name":"Al Zarnkh","class":"LL5","mass":"700","year":2001},
type Meteorite = {
  coordinates: [number, number]
  name: string
  class: string
  mass: string
  year: string
}

type MeteoritePickingInfo = PickingInfo & { objects?: Meteorite[] }

type AppProps = {
  data: string
  iconMapping: string
  iconAtlas: string
  showCluster: boolean
  mapStyle: string
}
export default function App(props: AppProps) {
  const {
    data = DATA_URL,
    iconMapping = ICON_MAPPING,
    iconAtlas = ICON_ATLAS,
    showCluster = true,
    mapStyle = MAP_STYLE,
  } = props

  const [hoverInfo, setHoverInfo] = useState<PickingInfo | object>({})

  const hideTooltip = () => {
    setHoverInfo({})
  }
  const expandTooltip = (info: PickingInfo) => {
    if (info.picked && showCluster) {
      setHoverInfo(info)
    } else {
      setHoverInfo({})
    }
  }

  const layerProps = {
    data,
    pickable: true,
    getPosition: (d: Meteorite) => d.coordinates,
    iconAtlas,
    iconMapping,
    onHover: !hoverInfo.objects && setHoverInfo,
  }

  const layer = showCluster
    ? new IconClusterLayer({
      ...layerProps,
      id: 'icon-cluster',
      sizeScale: 40,
    } satisfies CompositeLayer<IconClusterProps>)
    : new IconLayer({
      ...layerProps,
      id: 'icon',
      getIcon: (_d) => 'marker',
      sizeUnits: 'meters',
      sizeScale: 2000,
      sizeMinPixels: 6,
    } satisfies IconLayer<IconClusterProps>)

  return (
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
      controller={{ dragRotate: false }}
      onViewStateChange={hideTooltip}
      onClick={expandTooltip}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />

      {renderTooltip(hoverInfo)}
    </DeckGL>
  )
}
