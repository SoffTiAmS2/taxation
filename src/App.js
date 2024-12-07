import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [view, setView] = useState("list"); // состояние: "list" или "map"

  return (
    <div className="container">
      <header className="header">
        <h1>КРАС.АФИША</h1>
      </header>

      <main>
        {/* Раздел "Мероприятия недели" */}
        <section className="section">
          <h2>Мероприятия недели</h2>
          <div className="event-list">
            {Array(3)
              .fill()
              .map((_, index) => (
                <EventCard key={index} />
              ))}
          </div>
        </section>

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
