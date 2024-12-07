import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBookmark,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [view, setView] = useState("list");
  const [filtersOpen, setFiltersOpen] = useState(false); // состояние виджета фильтров
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    type: "",
    location: "",
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };


  return (
    <div className="container">
      <header className="header">
        <h1>КРАС.АФИША</h1>
      </header>

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
              {Array(3)
                .fill()
                .map((_, index) => (
                  <EventCard key={index} />
                ))}
            </div>
          ) : (
            <div className="map-container">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A1f350791b30e76b0ecf83ae48d81c870aaf87f12a0cb0110cd16f5dd20c3c7d0&amp;source=constructor"
                title="Карта мероприятий"
                frameBorder="0"
                style={{ width: "100%", height: "400px", border: "none" }}
              ></iframe>
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

const EventCard = () => (
  <div className="event-card">
    <img
      src="https://via.placeholder.com/200" // Здесь вставить реальное изображение
      alt="Мероприятие"
      className="event-image"
    />
    <p className="event-date">7-8 декабря</p>
    <p className="event-title">Хакатон “Цифровой Красноярск”</p>
  </div>
);

export default App;
