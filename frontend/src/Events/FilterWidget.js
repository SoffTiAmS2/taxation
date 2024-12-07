import React from 'react';
import './FilterWidget.css';

const FilterWidget = ({ selectedFilters, onFilterChange }) => (
  <div className="filter-widget">
    <h3>Фильтры</h3>
    <div>
      <label>Дата</label>
      <input
        type="date"
        value={selectedFilters.date}
        onChange={(e) => onFilterChange({ ...selectedFilters, date: e.target.value })}
      />
    </div>
    <div>
      <label>Тип</label>
      <select
        value={selectedFilters.type}
        onChange={(e) => onFilterChange({ ...selectedFilters, type: e.target.value })}
      >
        <option value="">Все</option>
        <option value="hackathon">Хакатон</option>
        <option value="lecture">Лекция</option>
        <option value="concert">Концерт</option>
      </select>
    </div>
  </div>
);

export default FilterWidget;