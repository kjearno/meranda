import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Loading } from "./Loading";
import { Slide } from "./Slide";

export const Carousel = ({ isLoading, items }) => {
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true
  };

  if (isLoading) {
    return <Loading />;
  }

  const slides = items.map(post => <Slide key={post.id} post={post} />);

  return <Slider {...settings}>{slides}</Slider>;
};
