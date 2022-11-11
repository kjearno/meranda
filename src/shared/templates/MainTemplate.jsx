import PropTypes from "prop-types";
import React from "react";
import { Grid } from "react-flexbox-grid";

import { Subscription } from "@features/subscription";
import { Footer, Header, Section } from "@shared/components";
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
