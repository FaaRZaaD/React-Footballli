import React from "react";
import { Helmet } from "react-helmet";
import Icon from "../components/Icon/Icon-component.tsx";
import Stack from "../components/Stack/Stack-component.tsx";

function Competitions() {
  return (
    <>
      <Helmet>
        <title>مسابقات</title>
      </Helmet>
      <Stack distribution="space-between" alignment="center">
        <Icon name="FiClock" color="#000000" />
        <p>نتایج زنده</p>
      </Stack>
    </>
  );
}

export default Competitions;
