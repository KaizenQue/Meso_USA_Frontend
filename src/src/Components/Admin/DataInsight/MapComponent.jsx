import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mockData from '../../../MockData.json'; 
const ChoroplethMap = () => {
  const [geoData, setGeoData] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then((response) => response.json())
      .then((data) => {
        const mergedData = mergeData(data, mockData.heatMap.anomalies);
        setGeoData(mergedData);
      })
      .catch((error) => console.error('Error loading GeoJSON data:', error));
  }, []);

  const mergeData = (geoData, anomalies) => {
    return {
      ...geoData,
      features: geoData.features.map(feature => {
        const anomaly = anomalies.find(a => a.country === feature.properties.name);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            ...(anomaly ? anomaly.data : {})
          }
        };
      })
    };
  };

  const getColor = (d) => {
    return d > 100 ? '#9370db' :
           d > 80  ? '#e6e6fa' :
           d > 60  ? '#e6e6fa' :
           d > 40  ? '#9370db' :
           d > 20  ? '#9370db' :
                      '#e6e6fa';
  };

  const style = (feature) => ({
    fillColor: getColor(feature.properties.delivery_delay || 0), 
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      const popupContent = `<strong>${feature.properties.name}</strong><br/>
        Delivery Delay: ${feature.properties.delivery_delay || 'N/A'}<br/>
        Unexpected Purchase Value: ${feature.properties.unexpected_purchase_value || 'N/A'}<br/>
        Loss Incurred: ${feature.properties.loss_incurred || 'N/A'}`;
      
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(popupContent).openPopup();
        },
        mouseout: () => {
          layer.closePopup();
        }
      });
    }
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      whenCreated={(map) => {
        mapRef.current = map;
        setTimeout(() => map.invalidateSize(), 0);
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData && <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
};

export default ChoroplethMap;