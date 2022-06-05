import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.css";
import { Link } from "react-router-dom";

const HomeSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    {
      id: 1,
      src: 'https://placehold.jp/1920x600.jpg?text=Image%201',
      link: '/',
      alt: 'image 1'
    },
    {
      id: 2,
      src: 'https://placehold.jp/1920x600.jpg?text=Image%202',
      link: '/',
      alt: 'image 2'
    },
    {
      id: 3,
      src: 'https://placehold.jp/1920x600.jpg?text=Image%203',
      link: '/',
      alt: 'image 3'
    }
  ]

  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="item" key={index}>
            <Link to={image.link}>
              <img className="w-full h-full object-center object-cover" src={image.src} alt={image.alt} />
            </Link>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default HomeSlider