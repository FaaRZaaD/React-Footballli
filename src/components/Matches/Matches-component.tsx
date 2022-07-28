import dayjs from "dayjs";
import React, { useState } from "react";
import { formatNumber } from "../../helpers/format-helper.ts";
import Box from "../Box/Box-component.tsx";
import Icon from "../Icon/Icon-component.tsx";
import Spacer from "../Spacer/Spacer-component.tsx";
import Stack from "../Stack/Stack-component.tsx";
interface PropsType {
  leagueTitle: string;
  data: any;
  logo: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  time: number;
}

function Matches(props: PropsType) {
  let [open, setOpen] = useState(false);
  console.log({ hey: props.data });
  return (
    <Box
      onPress={() => {
        setOpen(!open);
      }}
      bg="red"
      style={{ width: "100%" }}
    >
      <Stack
        distribution="space-between"
        style={{ paddingRight: 12, paddingLeft: 18 }}
      >
        <Stack alignment="center">
          <Box
            bg="yellow"
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <img src={props.logo} width="100%" height="100%" sizes="cover" />
          </Box>
          <Spacer size={5} />
          <p>{props.leagueTitle}</p>
        </Stack>
        <Stack
          alignment="center"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s",
          }}
        >
          <Icon name="FiChevronDown" />
        </Stack>
      </Stack>
      <Box>
        <Stack bg="green" distribution="center">
          <Stack alignment="center">
            <p>{props.homeTeam.name}</p>
            <Spacer size={5} />
            <Box
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              <img
                src={props.homeTeam.logo}
                width="100%"
                height="100%"
                sizes="cover"
              />
            </Box>
          </Stack>
          <Spacer size={10} />
          <p>{formatNumber(dayjs(props.time).format("HH:mm"))}</p>
          <Spacer size={10} />
          <Stack alignment="center">
            <Box
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              <img
                src={props.awayTeam.logo}
                width="100%"
                height="100%"
                sizes="cover"
              />
            </Box>
            <Spacer size={5} />
            <p>{props.awayTeam.name}</p>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Matches;
