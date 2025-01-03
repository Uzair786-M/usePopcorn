import Star from "./Star";
import { useState } from "react";

const StarRating = ({
  maxRating = 5,
  color = "red",
  size = 48,
  defaultRating = 0,
  message = [],
}) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    gap: 20,
    color: color,
    fontSize: size / 1.5,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const ratingHandler = (i) => {
    setRating(i + 1);
  };

  return (
    <div style={styles}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <span key={i}>
              <Star
                onSelect={() => ratingHandler(i)}
                full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                onMouseEnter={() => setTempRating(i + 1)}
                onMouseLeave={() => setTempRating(0)}
                color={color}
                size={size}
              />
            </span>
          );
        })}
      </div>
      <div>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </div>
    </div>
  );
};

export default StarRating;
