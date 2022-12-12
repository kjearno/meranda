import React from "react";
import { Helmet } from "react-helmet";

import { HomeTemplate } from "@components/templates";
import { Carousel } from "@features/attachedPosts";
import { News } from "@features/news";

export default function Home() {
  return (
    <HomeTemplate carousel={<Carousel />}>
      <Helmet title="Home" />

      <News />
    </HomeTemplate>
  );
}
