function TimeField({ label, hour, min, onHourChange, onMinChange }) {
  return (
    <div className="time-field">
      <span className="time-field__label">{label}</span>
      <div className="time-field__inputs">
        <input
          className="time-input"
          type="number"
          min={0}
          max={23}
          value={hour}
          onChange={(e) => onHourChange(Number(e.target.value))}
        />
        <span className="time-separator">:</span>
        <input
          className="time-input"
          type="number"
          min={0}
          max={59}
          value={min}
          onChange={(e) => onMinChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default TimeField;
