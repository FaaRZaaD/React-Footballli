import dayjs from "dayjs";
import React, { useState } from "react";
import { formatNumber } from "../../helpers/format-helper.ts";
import Box from "../Box/Box-component.tsx";
import Divider from "../Divider/Divider-component.tsx";
import Icon from "../Icon/Icon-component.tsx";
import Spacer from "../Spacer/Spacer-component.tsx";
import Stack from "../Stack/Stack-component.tsx";
interface PropsType {
  leagueTitle: string;
  data: any;
  logo: string;
}

function Matches(props: PropsType) {
  let [open, setOpen] = useState(false);

  return (
    <Box
      onPress={() => {
        setOpen(!open);
      }}
      bg="white"
      style={{ width: "100%", borderRadius: 12 }}
    >
      <Stack
        distribution="space-between"
        style={{
          padding: "12px 12px 12px 18px",
        }}
      >
        <Stack alignment="center">
          <Box
            bg="white"
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
          <p style={{ color: "#0066ff" }}>{props.leagueTitle}</p>
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
      {open ? (
        <>
          <Divider size={3} line color="#e6e6e6" />
          {props.data.map((item, index) => {
            let lastIndex = index + 1 === props.data.length;
            return (
              <Box
                style={{
                  padding: "12px 0",
                  borderBottomWidth: lastIndex ? 0 : 2,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Stack distribution="center">
                  <Stack alignment="center">
                    <p>{item.teams.home.name}</p>
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
                        src={item.teams.home.logo}
                        width="100%"
                        height="100%"
                        sizes="cover"
                      />
                    </Box>
                  </Stack>
                  <Spacer size={10} />
                  <p>
                    {formatNumber(
                      dayjs(item.fixture.timestamp).format("HH:mm")
                    )}
                  </p>
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
                        src={item.teams.away.logo}
                        width="100%"
                        height="100%"
                        sizes="cover"
                      />
                    </Box>
                    <Spacer size={5} />
                    <p>{item.teams.away.name}</p>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </>
      ) : null}
    </Box>
  );
}

export default Matches;
