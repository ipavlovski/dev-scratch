import { CustomProjection, Graticule } from '@visx/geo'
import { scaleQuantize } from '@visx/scale'
// import { Projection } from '@visx/geo/lib/types'
import { ParentSize } from '@visx/responsive'
import { Zoom } from '@visx/zoom'
import { geoNaturalEarth1 } from 'd3-geo'
import world from '../assets/ne_10m_admin_0_countries.json'

interface FeatureShape {
  type: 'Feature'
  id: string
  geometry: { coordinates: [number, number][][]; type: 'Polygon' }
  properties: { name: string }
}

const features: FeatureShape[] = (world as { features: FeatureShape[] }).features.slice(155, 156)

export const background = '#252b7e'
const purple = '#201c4e'

const color = scaleQuantize({
  domain: [
    Math.min(...features.map((f) => f.geometry.coordinates.length)),
    Math.max(...features.map((f) => f.geometry.coordinates.length)),
  ],
  range: ['#019ece', '#f4448b', '#fccf35', '#82b75d', '#b33c88', '#fc5e2f'],
})

function MapView({ width, height }: { width: number; height: number }) {
  const centerX = width / 2
  const centerY = height / 2
  const initialScale = (width / 630) * 150

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
        scaleXMin={100}
        scaleXMax={20e3}
        scaleYMin={100}
        scaleYMax={20e3}
        initialTransformMatrix={{
          scaleX: initialScale,
          scaleY: initialScale,
          translateX: centerX,
          translateY: centerY,
          skewX: 0,
          skewY: 0,
        }}>
        {(zoom) => (
          <div>
            <svg
              width={width}
              height={height}
              className={zoom.isDragging ? 'dragging' : undefined}
              ref={zoom.containerRef}
              style={{ touchAction: 'none', verticalAlign: 'top' }}>
              {/* this is the background fill */}
              {/* <rect x={0} y={0} width={width} height={height} fill={background} /> */}
              <CustomProjection<FeatureShape>
                projection={geoNaturalEarth1}
                data={features}
                scale={zoom.transformMatrix.scaleX}
                translate={[zoom.transformMatrix.translateX, zoom.transformMatrix.translateY]}>
                {(customProjection) => (
                  <g>
                    <Graticule graticule={(g) => customProjection.path(g) || ''} stroke={purple} />
                    {customProjection.features.map(({ feature, path }, i) => (
                      <path
                        key={`map-feature-${i}`}
                        d={path || ''}
                        fill={color(feature.geometry.coordinates.length)}
                        stroke={background}
                        strokeWidth={0.5} />
                    ))}
                  </g>
                )}
              </CustomProjection>

              {/** intercept all mouse events */}
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                rx={14}
                fill='transparent'
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) {
                    zoom.dragEnd()
                  }
                }} />
            </svg>

            {/* USE INTERFACE */}
            <div style={{ position: 'absolute', top: 100, left: 100, zIndex: 1 }}>
              <button
                className='btn btn-zoom'
                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
                +
              </button>
              <button
                className='btn btn-zoom btn-bottom'
                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                -
              </button>
              <button className='btn btn-lg' onClick={zoom.reset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </Zoom>
    </div>
  )
}

export default () => {
  return (
    <ParentSize>{(parent) => <MapView width={parent.width} height={parent.height} />}</ParentSize>
  )
}
