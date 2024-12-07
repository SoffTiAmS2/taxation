import React, { useState } from 'react';
import Slider from 'react-slick';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import FilterWidget from '../components/Events/FilterWidget';
import EventCard from '../components/Events/EventCard';
import MapWidget from '../components/Events/MapWidget';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const HomePage = ({ user }) => {
  const [view, setView] = useState('list');
  const [selectedFilters, setSelectedFilters] = useState({ date: '', type: '', location: '' });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const events = [
    {
      id: 1,
      title: 'Хакатон Цифровой Красноярск',
      date: '2024-12-07',
      location: 'Молодёжный ИТ-центр',
      address: 'проспект Красноярский рабочий, 115а',
      type: 'hackathon',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      title: 'Лекция по React',
      date: '2024-12-07',
      location: 'Молодёжный ИТ-центр',
      address: 'проспект Красноярский рабочий, 115а',
      type: 'lecture',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      title: 'Рок-концерт',
      date: '2024-12-08',
      location: 'Музыкальный коворкинг Волна',
      address: 'проспект Красноярский рабочий, 87',
      type: 'concert',
      image: 'https://via.placeholder.com/200',
    },
  ];

  const groupedByAddress = events.reduce((acc, event) => {
    if (!acc[event.address]) acc[event.address] = [];
    acc[event.address].push(event);
    return acc;
  }, {});

  const handleMarkerClick = (address) => {
    setSelectedAddress(address);
    setFilteredEvents(groupedByAddress[address]);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>КРАС.АФИША</h1>
        {user ? <p>Добро пожаловать, {user.Role}!</p> : <a href="/login">Войти</a>}
      </header>
      <main>
        <section className="section">
          <h2>Мероприятия недели</h2>
          <Slider dots={false} infinite speed={500} slidesToShow={3} slidesToScroll={1}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Slider>
        </section>

        <FilterWidget
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />

        <div className="view-toggle">
          <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
            Списком
          </button>
          <button onClick={() => setView('map')} className={view === 'map' ? 'active' : ''}>
            На карте
          </button>
        </div>

        {view === 'list' ? (
          <div className="event-list">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <MapWidget
            groupedByAddress={groupedByAddress}
            selectedAddress={selectedAddress}
            onMarkerClick={handleMarkerClick}
            filteredEvents={filteredEvents}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;