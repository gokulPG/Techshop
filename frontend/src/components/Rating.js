import React from "react";
import propTypes from "prop-types";

// [1,2,3,4,5] because its a 5 star rating system

const Rating = ({ value, text, color, isCentered }) => {
  return (
    <div className={isCentered ? "rating d-flex justify-content-center" : "rating d-flex"}>
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <i
            key={index}
            style={{ color }}
            className={
              value >= item
                ? "fas fa-star"
                : value >= item - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        ))}
      </div>
      <div className="ml-3">{text && text}</div>
    </div>
  );
};

Rating.defaultProps = {
  color: "#198ada"
};

Rating.propTypes = {
  value: propTypes.number.isRequired,
  text: propTypes.string.isRequired,
  color: propTypes.string,
  isCentered: propTypes.bool
};

export default Rating;
