import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBookmark,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthPage from './AuthPage'; 

// Пример мероприятий с координатами
const events = [
  {
    id: 1,
    title: "Хакатон 'Цифровой Красноярск'",
    date: "7-8 декабря",
    organizer: "Центр 'Цифра'",
    photo: "https://via.placeholder.com/200",
    address: "Улица Ленина, 15",
    coords: [56.0097, 92.7917],
  },
  {
    id: 2,
    title: "Лекция по IT",
    date: "10 декабря",
    organizer: "Университет",
    photo: "https://via.placeholder.com/200",
    address: "Улица Ленина, 15",
    coords: [56.0097, 92.7917],
  },
  {
    id: 3,
    title: "Концерт в центре",
    date: "15 декабря",
    organizer: "Музыкальная студия",
    photo: "https://via.placeholder.com/200",
    address: "Улица Советская, 10",
    coords: [56.0108, 92.7935],
  },
];

// Группировка мероприятий по адресу
const groupEventsByAddress = (events) => {
  const grouped = {};
  events.forEach((event) => {
    const key = event.address;
    if (!grouped[key]) {
      grouped[key] = { coords: event.coords, events: [] };
    }
    grouped[key].events.push(event);
  });
  return grouped;
};

// Иконка для маркеров
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const App = () => {
  const [view, setView] = useState("list");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    type: "",
    location: "",
  });
  const [selectedEvents, setSelectedEvents] = useState([]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const groupedEvents = groupEventsByAddress(events);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>КРАС.АФИША</h1>
        <nav>
          <Link to="/auth">
          <button className="auth-button">Войти</button>
          </Link>
        </nav>
      </header>

      {/* Маршруты */}
      <Routes>
          <Route path="/" element={<h2>Главная страница</h2>} />
          <Route path="/auth" element={<AuthPage />} /> {/* Маршрут для страницы авторизации */}
        </Routes>

      <main>
        {/* Раздел "Мероприятия недели" */}
        <section className="section">
          <h2>Мероприятия недели</h2>
          <Slider {...sliderSettings}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <EventCard key={index} />
              ))}
          </Slider>
        </section>

        {/* Фильтры */}
        <div className="filter-widget">
          <button
            className="filter-button-widget"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Фильтры
          </button>
          {filtersOpen && (
            <div className="filter-dropdown-widget">
              <div className="filter-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <label>Дата</label>
                <input
                  type="date"
                  value={selectedFilters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                />
              </div>
              <div className="filter-item">
                <FontAwesomeIcon icon={faBookmark} className="icon" />
                <label>Тип мероприятия</label>
                <select
                  value={selectedFilters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">Все</option>
                  <option value="concert">Концерт</option>
                  <option value="theatre">Спектакль</option>
                  <option value="lecture">Лекция</option>
                </select>
              </div>
              <div className="filter-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <label>Площадка</label>
                <select
                  value={selectedFilters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                >
                  <option value="">Все</option>
                  <option value="venue1">Зал 1</option>
                  <option value="venue2">Зал 2</option>
                  <option value="venue3">Зал 3</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Раздел "Все мероприятия" */}
        <section className="section">
          <h2>Все мероприятия</h2>
          <div className="filters">
            <button
              className={`filter-button ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              Списком
            </button>
            <button
              className={`filter-button ${view === "map" ? "active" : ""}`}
              onClick={() => setView("map")}
            >
              На карте
            </button>
          </div>

          {/* Содержимое в зависимости от выбранного режима */}
          {view === "list" ? (
            <div className="event-list">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="map-container">
              <MapContainer
                center={[56.0108, 92.7909]}
                zoom={14}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {Object.values(groupedEvents).map((location, index) => (
                  <Marker
                    key={index}
                    position={location.coords}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedEvents(location.events),
                    }}
                  >
                    <Popup>
                      <strong>{location.events.length} мероприятий</strong>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              {selectedEvents.length > 0 && (
                <div className="event-list">
                  <h3>Мероприятия по этому адресу:</h3>
                  {selectedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// Стрелки для карусели
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return <div className="arrow next" onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return <div className="arrow prev" onClick={onClick}></div>;
};

// Карточка мероприятия
const EventCard = ({ event }) => (
  <div className="event-card">
    <img src={event?.photo || "https://via.placeholder.com/200"} alt="Мероприятие" className="event-image" />
    <p className="event-date">{event?.date}</p>
    <p className="event-title">{event?.title}</p>
  </div>
);

export default App;
