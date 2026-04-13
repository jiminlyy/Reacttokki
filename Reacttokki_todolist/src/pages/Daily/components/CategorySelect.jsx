import { useState } from "react";
import { useTask } from "../context/useTask";

function CategorySelect({ value, onChange }) {
  const { categories, addCategory } = useTask();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    addCategory(newName);
    onChange(newName.trim());
    setNewName("");
    setAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
    if (e.key === "Escape") { setAdding(false); setNewName(""); }
  };

  return (
    <div className="form-field">
      <label className="form-label">Select category</label>
      {adding ? (
        <div className="category-add-row">
          <input
            className="form-input"
            autoFocus
            placeholder="새 카테고리 이름"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="category-add-confirm" onClick={handleAdd}>추가</button>
          <button className="category-add-cancel" onClick={() => { setAdding(false); setNewName(""); }}>✕</button>
        </div>
      ) : (
        <div className="category-select-row">
          <select
            className="form-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>Select...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="category-add-btn" onClick={() => setAdding(true)}>+ 추가</button>
        </div>
      )}
    </div>
  );
}

export default CategorySelect;
