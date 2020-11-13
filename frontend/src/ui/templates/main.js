import React, { useState } from "react";
import { Grid } from "react-flexbox-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { DeviceProvider, Header, Footer } from "@features/shared";
import { Subscribe } from "@features/subscribers";
import { useComponentWillMount } from "@lib/hooks";
import { Section } from "../components";

export const MainTemplate = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useComponentWillMount(() => {
    import("./main.scss").then(() => setLoaded(true));
  });

  if (!loaded) return null;

  return (
    <div id="main">
      <ToastContainer position="bottom-right" limit="1" />
      <Header />

      <DeviceProvider>{children}</DeviceProvider>

      <Section painted>
        <Grid>
          <Subscribe />
        </Grid>
      </Section>

      <Footer />
    </div>
  );
};
