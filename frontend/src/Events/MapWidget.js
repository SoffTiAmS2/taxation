import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './MapWidget.css';

const MapWidget = ({ groupedByAddress, selectedAddress, onMarkerClick, filteredEvents }) => (
  <div className="map-widget">
    <YMaps>
      <Map defaultState={{ center: [55.998572, 92.919065], zoom: 10 }} width="100%" height="400px">
        {Object.keys(groupedByAddress).map((address, index) => (
          <Placemark
            key={index}
            geometry={[55.998572 + index * 0.01, 92.919065]}
            properties={{
              hintContent: address,
              balloonContent: `Мероприятий: ${groupedByAddress[address].length}`,
            }}
            options={{ preset: 'islands#redIcon' }}
            onClick={() => onMarkerClick(address)}
          />
        ))}
      </Map>
    </YMaps>
    {selectedAddress && (
      <div>
        <h3>События по адресу: {selectedAddress}</h3>
        {filteredEvents.map((event) => (
          <div key={event.id}>{event.title}</div>
        ))}
      </div>
    )}
  </div>
);

export default MapWidget;