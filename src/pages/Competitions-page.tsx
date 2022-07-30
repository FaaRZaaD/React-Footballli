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
import { FixedSizeList } from "react-window";
import { dayTitle } from "../helpers/date.ts";
import Loading from "../components/Loading/Loading-component.tsx";

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
      if (selectedDay === dayjs(item.date).format("YYYY-MM-DD")) {
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

function renderDate(date: string): string {
  let output: string;
  let today = dayjs().format("YYYY-MM-DD");
  let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  let formatedDate = dayjs(date).format("YYYY-MM-DD");
  let diff = dayjs(formatedDate).diff(today, "days");

  if (formatedDate === today) {
    output = "امروز";
  } else if (formatedDate === yesterday) {
    output = "دیروز";
  } else if (formatedDate === tomorrow) {
    output = "فردا";
  } else if (diff > 7) {
    output = formatNumber(dayjs(date).format("D MMMM"));
  } else {
    output = formatNumber(dayTitle(dayjs(date).toDate()));
  }

  return output;
}

function Competitions() {
  let { retrieveCompetitionsData, data, loading, hasError } =
    useCompetitionsData();
  let [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format("YYYY-MM-DD")
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
              overflowX: "scroll",
              width: "100%",
            }}
          >
            {!loading && !!datanew
              ? datanew.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDay(dayjs(item.date).format("YYYY-MM-DD"));
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        border: "none",
                        marginLeft: 30,
                        position: "relative",
                        color:
                          selectedDay === dayjs(item.date).format("YYYY-MM-DD")
                            ? "#000000"
                            : "#ccc",
                        padding: "10px 0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <p>{renderDate(item.date)}</p>
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "100%",
                          height:
                            selectedDay ===
                            dayjs(item.date).format("YYYY-MM-DD")
                              ? 3
                              : null,
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
      {loading ? (
        <Stack distribution="center">
          <Divider size={24} />
          <Loading />
        </Stack>
      ) : null}
      {!loading && hasError ? (
        <Stack distribution="center">
          <Divider size={24} />
          <p>مشکلی در سرور گیش آمده است.</p>
        </Stack>
      ) : null}
      {!loading && !hasError && !!leaguesData ? (
        <Stack direction="column" style={{ padding: "0 16px" }}>
          <FixedSizeList
            height={480}
            width="100%"
            itemSize={1}
            itemCount={leaguesData.length}
          >
            {({ style }) => {
              return (
                <div style={style}>
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
                </div>
              );
            }}
          </FixedSizeList>
        </Stack>
      ) : null}
    </>
  );
}

export default Competitions;
