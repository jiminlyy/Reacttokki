const CATEGORIES = ["Study", "Health", "Productivity", "Personal", "Work"];

function CategorySelect({ value, onChange }) {
  return (
    <div className="form-field">
      <label className="form-label">Select category</label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select...
        </option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;
