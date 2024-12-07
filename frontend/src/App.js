import React, { useState } from "react";
import Slider from "react-slick";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBookmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthPage from "./AuthPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Состояние текущей страницы
  const [view, setView] = useState("list");
  const [filtersOpen, setFiltersOpen] = useState(false); // Состояние виджета фильтров
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    type: "",
    location: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const events = [
    {
      id: 1,
      title: "Хакатон Цифровой Красноярск",
      date: "7-8 декабря",
      location: "Молодёжный ИТ-центр",
      address: "проспект имени газеты Красноярский рабочий, дом 115а",
      type: "hackathon",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      title: "Лекция по React",
      date: "7 декабря",
      location: "Молодёжный ИТ-центр",
      address: "проспект имени газеты Красноярский рабочий, дом 115а",
      type: "lecture",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      title: "Рок-концерт",
      date: "8 декабря",
      location: "Музыкальный коворкинг Волна",
      address: "проспект имени газеты Красноярский рабочий, дом 87",
      type: "concert",
      image: "https://via.placeholder.com/200",
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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Основной рендеринг JSX
  const renderPage = () => {
    if (currentPage === "home") {
      return (
        <div className="container">
          <header className="header">
            <h1>КРАС.АФИША</h1>
          </header>
          <button onClick={() => setCurrentPage("auth")}>Войти</button>
          <main>
            <section className="section">
              <h2>Мероприятия недели</h2>
              <Slider {...sliderSettings}>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Slider>
            </section>

            <div className="filter-widget">
              <button
                className="filter-button-widget"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <h>Фильтр</h>
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

              {view === "list" ? (
                <div className="event-list">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="map-container">
                  <YMaps>
                    <Map
                      defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
                      width="100%"
                      height="400px"
                    >
                      {Object.keys(groupedByAddress).map((address, index) => (
                        <Placemark
                          key={index}
                          geometry={[55.751574 + index * 0.01, 37.573856 + index * 0.01]}
                          properties={{
                            hintContent: address,
                            balloonContent: `Мероприятий: ${groupedByAddress[address].length}`,
                          }}
                          options={{ preset: "islands#redIcon" }}
                          onClick={() => handleMarkerClick(address)}
                        />
                      ))}
                    </Map>
                  </YMaps>

                  {selectedAddress && (
                    <div className="event-widget">
                      <h2>Мероприятия по адресу:</h2>
                      <p>{selectedAddress}</p>
                      <div className="widget-event-list">
                        {filteredEvents.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      );
    } else if (currentPage === "auth") {
      return <AuthPage goBack={() => setCurrentPage("home")} />;
    }
  };

  return <div>{renderPage()}</div>;
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return <div className="arrow next" onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return <div className="arrow prev" onClick={onClick}></div>;
};

const EventCard = ({ event }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} className="event-image" />
    <p className="event-date">{event.date}</p>
    <p className="event-title">{event.title}</p>
  </div>
);

const WidgetEventCard = ({ event }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} className="widget-event-image" />
    <p className="widget-event-date">{event.date}</p>
    <p className="widget-event-title">{event.title}</p>
  </div>
);

export default App;
