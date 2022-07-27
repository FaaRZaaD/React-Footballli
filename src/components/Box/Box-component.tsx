import React from "react";

interface PropsType {
  bg?: string;
  children: React.ReactNode;
  style?: any;
}

function Box(props: PropsType) {
  return (
    <div
      style={{
        backgroundColor: props.bg,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export default Box;
