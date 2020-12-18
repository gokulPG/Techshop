import React from "react";
import styled, { keyframes } from "styled-components";
import propTypes from "prop-types";
import LazyLoad from "react-lazyload";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const loadingAnimation = keyframes`
    0% {
        background-color: transparent;
    }

    25% {
       background-color: #c2c2c2; 
    }

    50% {
        background-color: #E8E8E8;
    }

    75% {
      background-color: #c2c2c2; 
   }

    100% {
        background-color: transparent;
    }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const LazyImage = ({ src, alt, customHeight }) => {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <ImageWrapper style={{height:customHeight }}>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </ImageWrapper>
  );
};

LazyImage.propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    customHeight: propTypes.string.isRequired
  };

export default LazyImage;
