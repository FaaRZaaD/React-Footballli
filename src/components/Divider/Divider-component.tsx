import React from "react";

interface PropsType {
  size: number;
}

function Divider(props: PropsType) {
  return <div style={{ width: 1, height: props.size }} />;
}

export default Divider;
