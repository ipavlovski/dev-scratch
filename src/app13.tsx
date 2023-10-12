import { Tile3DLayer } from '@deck.gl/geo-layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { CesiumIonLoader } from '@loaders.gl/3d-tiles'
import { Tileset3D } from '@loaders.gl/tiles'
import maplibregl from 'maplibre-gl'
import { useState } from 'react'
import { Map } from 'react-map-gl'

const ION_TOKEN = import.meta.env.VITE_ION_TOKEN
const ION_ASSET_ID = import.meta.env.VITE_ION_ASSET_ID
const TILESET_URL = `https://assets.ion.cesium.com/${ION_ASSET_ID}/tileset.json`

const INITIAL_VIEW_STATE = {
  latitude: 40,
  longitude: -75,
  pitch: 45,
  maxPitch: 60,
  bearing: 0,
  minZoom: 2,
  maxZoom: 30,
  zoom: 17,
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

export default function App({
  mapStyle = MAP_STYLE,
  updateAttributions,
}: { mapStyle?: string; updateAttributions?: any }) {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)

  const onTilesetLoad = (tileset: Tileset3D) => {
    // Recenter view to cover the new tileset
    const { cartographicCenter, zoom } = tileset
    setInitialViewState({
      ...INITIAL_VIEW_STATE,
      longitude: cartographicCenter![0],
      latitude: cartographicCenter![1],
      zoom,
    })

    if (updateAttributions) {
      updateAttributions(tileset.credits && tileset.credits.attributions)
    }
  }

  const tile3DLayer = new Tile3DLayer({
    id: 'tile-3d-layer',
    pointSize: 2,
    data: TILESET_URL,
    loader: CesiumIonLoader,
    loadOptions: { 'cesium-ion': { accessToken: ION_TOKEN } },
    onTilesetLoad,
  })

  return (
    <DeckGL layers={[tile3DLayer]} initialViewState={initialViewState} controller={true}>
      {/* @ts-ignore */}
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing />
    </DeckGL>
  )
}
