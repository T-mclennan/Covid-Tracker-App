import React, { useState, useEffect } from 'react';
import ReactMapGl from 'react-map-gl';
import keys from '../../config/keys';
import { fetchMapGeoJSON } from '../../api';
import { generateLegend } from './MapUtils';
// import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import { isMobile } from 'react-device-detect';

export const MapChart = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 37.7785262,
    longitude: -122.421323,
    zoom: 12,
    width: isMobile ? '42vh' : '60vw',
    height: isMobile ? '38vh' : '62vh',
  });

  const [data, setData] = useState({ features: [] });
  const [settings, setSettings] = useState({
    dragRotate: false,
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false})

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const data = await fetchMapGeoJSON();
  //     setData(data);
  //   };

  //   fetchAPI();
  // }, []);

  console.log(data);

  const zoomIn = () => {
    setViewPort({ ...viewPort, zoom: viewPort.zoom + 0.5 });
    console.log(viewPort.zoom);
  };

  const zoomOut = () => {
    setViewPort({ ...viewPort, zoom: viewPort.zoom - 0.5 });
    console.log(viewPort.zoom);
  };

  const mapSF = (
    <>
      <ReactMapGl
        {...viewPort}
        {...settings}
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
        <div className='map-overlay' id={window.innerWidth >= 600 ? 'legend': 'legend-mobile'}>
          <h5 style={{ margin: '0 0 1em 0' }}>Cases per 10,000 residents:</h5>
          {generateLegend()}
        </div>
      </ReactMapGl>
    </>
  );

  return <>{mapSF}</>;
};
