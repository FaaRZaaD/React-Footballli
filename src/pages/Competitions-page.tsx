import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Stack from "../components/Stack/Stack-component.tsx";
import Box from "../components/Box/Box-component.tsx";
import { formatNumber } from "../helpers/format-helper.ts";
import { useCompetitionsData } from "../hooks/useCompetitionsData.ts";
import Matches from "../components/Matches/Matches-component.tsx";
import Header from "../containers/Header/Header-component.tsx";
import Divider from "../components/Divider/Divider-component.tsx";

function normalizeData(data) {
  let output: any = [];

  if (data) {
    data.forEach((item) => {
      let insertedItemIndex = output.findIndex((element) => {
        return (
          dayjs(element?.date).format("D MMMM YY") ===
          dayjs(item?.fixture.date).format("D MMMM YY")
        );
      });

      if (insertedItemIndex >= 0) {
        output[insertedItemIndex].data.push(item);
      } else {
        output.push({
          date: item.fixture.date,
          data: [item],
        });
      }
    });
  }

  return output.sort((a, b) => {
    let a_date = a.date;
    let b_date = b.date;
    if (a_date === b_date) {
      return 0;
    }
    return dayjs(a_date).isBefore(dayjs(b_date)) ? -1 : 1;
  });
}

function leagues(data, selectedDay) {
  let hello;
  let output: any = [];
  if (data) {
    data.forEach((item) => {
      if (selectedDay === item.date) {
        hello = item.data;
      }
    });
  }

  if (hello) {
    hello.forEach((item) => {
      let insertedItemIndex = output.findIndex((element) => {
        return element.league === item.league.name;
      });

      if (insertedItemIndex >= 0) {
        output[insertedItemIndex].data.push(item);
      } else {
        output.push({
          league: item.league.name,
          logo: item.league.logo,
          data: [item],
        });
      }
    });
  }

  return output;
}

function Competitions() {
  let { retrieveCompetitionsData, data } = useCompetitionsData();
  let [selectedDay, setSelectedDay] = useState<string>(
    "2022-07-28T16:00:00+00:00"
  );
  let datanew = normalizeData(data);
  useEffect(() => {
    retrieveCompetitionsData();
  }, []);

  let leaguesData = leagues(datanew, selectedDay);

  return (
    <>
      <Helmet>
        <title>مسابقات</title>
      </Helmet>
      <Header
        timesheets={
          <Stack
            style={{
              overflow: "hidden",
            }}
          >
            {!!datanew
              ? datanew.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDay(item.date);
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        border: "none",
                        marginLeft: 30,
                        position: "relative",
                        color: selectedDay === item.date ? "#000000" : "#ccc",
                      }}
                    >
                      <p>{formatNumber(dayjs(item.date).format("DD MMMM"))}</p>
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "100%",
                          height: selectedDay === item.date ? 3 : null,
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          backgroundColor: "green",
                        }}
                      />
                    </button>
                  );
                })
              : null}
          </Stack>
        }
      />
      <Divider size={16} />

      <Stack direction="column" style={{ padding: "0 16px" }}>
        {!!leaguesData
          ? leaguesData.map((i) => {
              return (
                <>
                  <Matches
                    leagueTitle={i.league}
                    logo={i.logo}
                    data={i.data}
                    selectedDay={selectedDay}
                  />
                  <Divider size={16} />
                </>
              );
            })
          : null}
      </Stack>
    </>
  );
}

export default Competitions;
