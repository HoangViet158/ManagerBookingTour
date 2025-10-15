import { useState } from "react";

const DateInput = ({ value, onChange }) => {
  const today = new Date().toISOString().split("T")[0];
  const [internalDate, setInternalDate] = useState(value || "");

  const handleChange = (e) => {
    setInternalDate(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <input
      type="date"
      value={internalDate}
      min={today}
      onKeyDown={(e) => e.preventDefault()} // Ngăn chặn nhập liệu thủ công
      onClick={(e) => e.target.showPicker?.()} // Ép mở popup lịch khi focus
      onChange={handleChange}
      style={{
        cursor: "pointer",
        caretColor: "transparent", // ẩn con trỏ văn bản
      }}
      className="form-control"
    />
  );
};

export default DateInput;
