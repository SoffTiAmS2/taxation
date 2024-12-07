import React, { useState } from "react";
import Slider from "react-slick";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faBookmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthPage from "./AuthPage";
import RegisterPage from "./RegisterPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Состояние текущей страницы
  const [user, setUser] = useState(null); // Состояние авторизованного пользователя
  const [view, setView] = useState("list");
  const [filtersOpen, setFiltersOpen] = useState(false); // Состояние виджета фильтров
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    type: "",
    location: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Список мероприятий
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

  // Группировка мероприятий по адресу
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

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Устанавливаем данные авторизованного пользователя
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("auth");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            switchToRegister={() => setCurrentPage("register")}
          />
        );
      case "register":
        return <RegisterPage switchToLogin={() => setCurrentPage("auth")} />;
      case "home":
      default:
        return (
          <div className="container">
            <header className="header">
              <h1>КРАС.АФИША</h1>
              {user ? (
                <>
                  <p>Добро пожаловать, {user.Role}!</p>
                  <button onClick={handleLogout}>Выйти</button>
                </>
              ) : (
                <button onClick={() => setCurrentPage("auth")}>Войти</button>
              )}
            </header>
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
                  Фильтр
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
                  <YMaps>
                    <Map
                      defaultState={{ center: [55.998572, 92.919065], zoom: 10 }}
                      width="100%"
                      height="400px"
                    >
                      {Object.keys(groupedByAddress).map((address, index) => (
                        <Placemark
                          key={index}
                          geometry={[55.998572 + index * 0.01, 92.919065]}
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
                )}
              </section>
            </main>
          </div>
        );
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
    <img src={event.image || "https://via.placeholder.com/200"} alt={event.title} className="event-image" />
    <p className="event-date">{event.date}</p>
    <p className="event-title">{event.title}</p>
  </div>
);

export default App;