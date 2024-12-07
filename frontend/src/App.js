import React, { useState, useEffect } from "react";
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
  const [events, setEvents] = useState([]); // Состояние для событий

  // Получение данных с бэкенда
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/events");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchEvents();
  }, []);

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
            {/* Остальной код для фильтров и отображения */}
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
    <img src={event.image || "https://via.placeholder.com/200"} alt={event.title} className="event-image" />
    <p className="event-date">{event.date}</p>
    <p className="event-title">{event.title}</p>
  </div>
);

export default App;