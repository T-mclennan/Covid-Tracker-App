import React, { useState, useEffect } from 'react';
import ReactMapGl, { Layer, Source } from 'react-map-gl';
import keys from '../../config/keys';
import { mapDataLayer } from './ChartConfig';
import { fetchMapGeoJSON } from '../../api';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapChart = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 37.7591262,
    longitude: -122.4270061,
    zoom: 12,
    width: '80vw',
    height: '68vh',
  });

  const [data, setData] = useState({ features: [] });

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchMapGeoJSON();
      console.log('map data:');
      console.log(data);
      setData(data);
    };

    fetchAPI();
  }, []);

  // const mapSF = data.features.length ? (
  const mapSF = (
    <ReactMapGl
      {...viewPort}
      mapboxApiAccessToken={keys.MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
      mapStyle='mapbox://styles/tmclennan/cke7mgp6i1l7g19nrtbpaubiq'
      style={{ margin: 'auto' }}
    >
      {/* <Source type='geojson' data={data}>
        <Layer {...mapDataLayer} />
      </Source> */}
    </ReactMapGl>
  );
  // ) : null;

  return <>{mapSF}</>;
};
