import PropTypes from "prop-types";
import React from "react";
import { Grid } from "react-flexbox-grid";

import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Section } from "@components/Section";
import { Subscription } from "@features/subscription";
import { DeviceProvider } from "@shared/context";

export function MainTemplate({ children }) {
  return (
    <>
      <Header />

      <DeviceProvider>{children}</DeviceProvider>

      <Section painted>
        <Grid>
          <Subscription />
        </Grid>
      </Section>

      <Footer />
    </>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
