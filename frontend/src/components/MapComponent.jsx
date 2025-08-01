import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';

const MapComponent = ({ coordinates, zoom = 6 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) return;

    const projectedCoords = fromLonLat(coordinates);

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: projectedCoords,
        zoom,
      }),
      controls: defaultControls({ zoom: true, rotate: false, attribution: false }),
    });

    return () => map.setTarget(null); // Cleanup
  }, [coordinates, zoom]);

  return <div ref={mapRef} style={{ width: '100%', height: '350px' }} />;
};

export default MapComponent;
