import React from "react";
import { FiUser } from "react-icons/fi";
import { CgTrophy } from "react-icons/cg";
import { FaFutbol } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { BsTv } from "react-icons/bs";

interface PropsType {
  name: string;
  color: string;
}

function Icon(props: PropsType) {
  if (props.name === "BsTv") {
    return <BsTv style={{ color: props.color, fontSize: 30 }} />;
  }
  if (props.name === "FiUser") {
    return <FiUser style={{ color: props.color, fontSize: 30 }} />;
  }
  if (props.name === "CgTrophy") {
    return <CgTrophy style={{ color: props.color, fontSize: 30 }} />;
  }
  if (props.name === "FaFutbol") {
    return <FaFutbol style={{ color: props.color, fontSize: 30 }} />;
  }
  if (props.name === "FiCompass") {
    return <FiCompass style={{ color: props.color, fontSize: 30 }} />;
  } else {
    return "";
  }
}

export default Icon;
