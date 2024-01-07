// @ts-nocheck
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css?raw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css?raw'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import {pipe} from 'fp-ts/lib/function'
import {Position} from 'geojson'
import mapboxgl, {Map} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css?raw'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import React, {forwardRef, useEffect, useState} from 'react'
import config from '../config/mapbox-boundary.json'
import {O, RA} from './fp'
import {withDocument} from 'part:@sanity/form-builder'
import * as z from 'zod'

type Geopoint = {
  lng: number
  lat: number
  _type: 'geopoint'
}

mapboxgl.accessToken = config.accessToken
const mapboxStyleUrl = config.styleUrl

const getPointsCenter = (points: [number, number][]) =>
  pipe(points, RA.dropRight(1), (coords) =>
    pipe(
      coords,
      RA.reduce<Position, Position>([0, 0], ([x0, y0], [x1, y1]) => [
        x0 + x1 / coords.length,
        y0 + y1 / coords.length,
      ]),
    ),
  ) as [number, number]

const MapboxPolygonInput = forwardRef((props: any, ref: any) => {
  const {type, value, onChange} = props

  const positionsP = z
    .array(z.tuple([z.number(), z.number()]))
    .transform((xs) => xs.map(([lng, lat]): Geopoint => ({lng, lat, _type: 'geopoint'})))

  const geopointsP = z.array(
    z.object({
      lng: z.number(),
      lat: z.number(),
      _type: z.literal('geopoint'),
    }),
  )

  const geopoints = (() => {
    const positionsResult = positionsP.safeParse(value)
    if (positionsResult.success) {
      onChange(PatchEvent.from(set(positionsResult.data)))
      return positionsResult.data
    }

    const geopointsResult = geopointsP.safeParse(value)
    if (geopointsResult.success) return geopointsResult.data

    return []
  })()

  const positions = geopoints.map(({lng, lat}) => [lng, lat] as [number, number]) ?? []

  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null)
  const [map, setMap] = useState<Map | null>(null)

  useEffect(() => {
    if (!mapElement) return

    if (!map) {
      setMap(
        new mapboxgl.Map({
          container: mapElement, // container ID
          style: mapboxStyleUrl,
          center: value
            ? getPointsCenter(positions)
            : props?.document?.location?.geopoint ?? config.defaultLocation,
          zoom: value || props?.document?.location?.geopoint ? 14 : 6,
          antialias: true,
          interactive: true,
        }),
      )
      return
    }

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      }),
    )

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    })

    map.addControl(draw)

    if (value) {
      draw.add({
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              type: 'Polygon',
              coordinates: [positions],
            },
            properties: {},
            type: 'Feature',
          },
        ],
      })
    }

    const getMapPolygon = () => {
      return pipe(
        draw.getAll().features,
        RA.filterMap((feature) =>
          feature.geometry.type === 'Polygon' && feature.geometry.coordinates.length > 0
            ? O.some(feature.geometry.coordinates)
            : O.none,
        ),
        RA.head,
        O.chain(RA.head),
        O.toNullable,
      )
    }

    const sanitySync = () => {
      const mapPolygon = getMapPolygon()
      onChange(
        PatchEvent.from(
          mapPolygon
            ? set(
                mapPolygon.map(([lng, lat]) => ({
                  _type: 'geopoint',
                  lng,
                  lat,
                })),
              )
            : unset(),
        ),
      )
    }

    map.on('draw.create', sanitySync)
    map.on('draw.update', sanitySync)
    map.on('draw.delete', sanitySync)
  }, [mapElement, map])

  return (
    <Fieldset ref={ref} legend={type.title} description={type.description}>
      <div
        ref={setMapElement}
        style={{
          width: '100%',
          height: '66vh',
        }}
      />
    </Fieldset>
  )
})

export default withDocument(MapboxPolygonInput)
