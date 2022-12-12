import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

import { useAttachedPosts } from "../../hooks";
import { Loader } from "./Loader";
import { Slide } from "./Slide";

export function Carousel() {
  const { posts, isLoading } = useAttachedPosts();

  if (isLoading) {
    return <Loader />;
  }

  const slides = posts.map((post) => (
    <Slide
      key={post.id}
      title={post.title}
      slug={post.slug}
      description={post.description}
      photo={post.photo}
      createdAt={post.createdAt}
      userId={post.userId}
    />
  ));

  return (
    <Slider arrows={false} autoplaySpeed={5000} autoplay dots>
      {slides}
    </Slider>
  );
}
