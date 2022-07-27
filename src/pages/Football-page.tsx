import React from "react";
import Divider from "../components/Divider/Divider-component.tsx";
import Stack from "../components/Stack/Stack-component.tsx";

function Football() {
  return (
    <Stack alignment="center" direction="column">
      <Divider size={50} />
      <p>اطلاعاتی در دسترس نیست</p>
    </Stack>
  );
}

export default Football;
