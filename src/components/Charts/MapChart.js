import React, { useState, useEffect } from 'react';
import ReactMapGl, { Layer, Source } from 'react-map-gl';
import keys from '../../config/keys';
import { mapDataLayer } from './ChartConfig';
import { fetchMapGeoJSON } from '../../api';
import { generateLegend } from './MapUtils';
// import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

export const MapChart = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 37.7591262,
    longitude: -122.451323,
    zoom: 12,
    width: '80vw',
    height: '60vh',
  });

  const [data, setData] = useState({ features: [] });

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchMapGeoJSON();
      setData(data);
    };

    fetchAPI();
  }, []);

  const zoomIn = () => {
    setViewPort({ ...viewPort, zoom: viewPort.zoom + 0.5 });
    console.log(viewPort.zoom);
  };

  const zoomOut = () => {
    setViewPort({ ...viewPort, zoom: viewPort.zoom - 0.5 });
    console.log(viewPort.zoom);
  };

  // const mapSF = data.features.length ? (
  const mapSF = (
    <>
      <ReactMapGl
        {...viewPort}
        mapboxApiAccessToken={keys.MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewPort(nextViewport)}
        mapStyle='mapbox://styles/tmclennan/cke7mgp6i1l7g19nrtbpaubiq'
        style={{ margin: 'auto' }}
      >
        <div className='button-box'>
          <button className='zoom-btn' onClick={zoomIn}>
            +
          </button>
          <button className='zoom-btn' onClick={zoomOut}>
            -
          </button>
        </div>
        <div className='map-overlay' id='legend'>
          <h5 style={{ margin: '0 0 1em 0' }}>Cases per 10,000 residents:</h5>
          {generateLegend()}
        </div>
      </ReactMapGl>
    </>
  );
  // ) : null;

  return <>{mapSF}</>;
};
