import React, { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Здесь должен быть правильный адрес API
    fetch("http://localhost:5050/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  return (
    <div>
      <h1>Городские события</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;