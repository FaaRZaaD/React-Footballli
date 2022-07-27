import React from "react";

interface PropsType {
  distribution?: string;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  bg?: string;
  children: React.ReactNode;
  style?: any;
}

function Stack(props: PropsType) {
  return (
    <div
      style={{
        backgroundColor: props.bg,
        display: "flex",
        flexDirection: props.direction,
        justifyContent: props.distribution,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export default Stack;
