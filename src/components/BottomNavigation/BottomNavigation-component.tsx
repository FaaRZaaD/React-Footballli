import React from "react";
import Stack from "../Stack/Stack-component.tsx";
import Box from "../Box/Box-component.tsx";
import { FiUser } from "react-icons/fi";
import { CgTrophy } from "react-icons/cg";
import { FaFutbol } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { BsTv } from "react-icons/bs";
import Divider from "../Divider/Divider-component.tsx";

let styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 11,
  },
  bar: {
    backgroundColor: "#fff",
    maxWidth: 468,
    margin: "auto",
    width: "100%",
    border: "1px solid #ccc",
    borderBottom: "",
    padding: "10px 20px",
  },
};

const ROUTES = [
  {
    key: "Home",
    icon: <BsTv style={{ color: "green", fontSize: 30 }} />,
    title: "مسابقات",
    active: true,
  },
  {
    key: "Home",
    icon: <FiCompass style={{ color: "#999999", fontSize: 30 }} />,
    title: "اکتشاف",
  },
  {
    key: "Home",
    icon: <FaFutbol style={{ color: "#999999", fontSize: 30 }} />,
    title: "فوتبال",
  },
  {
    key: "Orders",
    icon: <CgTrophy style={{ color: "#999999", fontSize: 30 }} />,
    title: "لیگ ها",
    protected: true,
  },
  {
    key: "Profile",
    icon: <FiUser style={{ color: "#999999", fontSize: 30 }} />,
    title: "پروفایل",
    protected: true,
  },
];

function BottomNavigation() {
  return (
    <Box style={styles.container}>
      <Stack style={styles.bar} distribution="space-between">
        {ROUTES.map((route, idx) => {
          return (
            <button
              key={idx}
              style={{
                cursor: "pointer",
                backgroundColor: "#fff",
                border: "none",
              }}
            >
              {route.icon}
              <Divider size={4} />
              <p
                style={{
                  color: route.active ? "green" : "#999999",
                  margin: 0,
                  fontFamily: "vazir-bold",
                }}
              >
                {route.title}
              </p>
            </button>
          );
        })}
      </Stack>
    </Box>
  );
}

export default BottomNavigation;
