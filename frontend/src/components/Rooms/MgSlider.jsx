import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { IoArrowForward } from "react-icons/io5";
import { ArrowBack } from "@material-ui/icons";

const MgSlider = ({ slides, children, width, height, borderRadius }) => {
  const timeout = useRef(null);

  const [length, setLength] = useState(0);
  const [current, setCurrent] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (slides) {
      setLength(slides.length);
    }

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length, slides]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <HeroSection
      borderRadius={borderRadius}
      width={width}
      height={height}
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <HeroWrapper>
        {slides.map((slide, index) => {
          return (
            <HeroSlide key={index}>
              {index === current && (
                <HeroSlider>
                  <HeroImage src={slide.url} alt={`${index} slide`} />

                  <HeroContent>{children}</HeroContent>
                </HeroSlider>
              )}
            </HeroSlide>
          );
        })}

        <SliderButtons toggle={toggle}>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </SliderButtons>
      </HeroWrapper>
    </HeroSection>
  );
};

export default MgSlider;

const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "5px")};
  background: lightgray;
  width: ${({ width }) => (width ? width : "250px")};
  height: ${({ height }) => (height ? height : "300px")};
  padding: 10px;
`;

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroSlide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const HeroSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const ArrowButtons = css`
  width: 15px;
  height: 15px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;
  &:hover {
    background: #cd853f;
    transform: scale(1.05);
  }
`;

const SliderButtons = styled.div`
  opacity: ${({ toggle }) => (toggle ? 1 : 0)};
  transition: all 0.5s linear;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
`;
const PrevArrow = styled(ArrowBack)`
  ${ArrowButtons}
  position: absolute;
  left: 2%;
`;
const NextArrow = styled(IoArrowForward)`
  ${ArrowButtons}
  position: absolute;
  right: -3%;
`;
