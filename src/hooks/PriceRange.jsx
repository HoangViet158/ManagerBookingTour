import { useState } from "react";
import FormatCurrency from "./FormatCurrency";

const PriceRange = (props) => {
  const { price, setPrice } = props;
  const [priceValue, setPriceValue] = useState(price || 0);

  const handleOnChange = (value) => {
    const numValue = Number(value);
    setPriceValue(numValue);
    setPrice?.(numValue);
  };

  return (
    <div className="price-range">
      <label htmlFor="priceRange" className="form-label">
        Giá: {FormatCurrency(priceValue)}
      </label>
      <input
        id="priceRange"
        type="range"
        min="0"
        max="1000000"
        step="50"
        value={priceValue}
        onChange={(e) => handleOnChange(e.target.value)}
        className="form-range"
      />
    </div>
  );
};

export default PriceRange;
