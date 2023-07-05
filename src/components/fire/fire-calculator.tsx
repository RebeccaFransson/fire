import { BoxHeader, Flexbox, Card } from "../../style";
import { FlexBoxSpaceAroundColumn, FlexBoxSpaceAroundRow } from "./style";
import * as V from "victory";
import React, { useState, useEffect } from "react";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { bgColors } from "../../styles/colors";

/*const ScatterPoint = ({ x, y, datum, min, max }: any) => {
  const colors = ["#FF8C94", "#FFAAA6", "#FFD3B5", "#DCEDC2", "#A8E6CE"];
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);
  return <StyledPoint color={colors[i]} cx={x} cy={y} r={3} />;
};*/

type ChartData = { x: number; y: number };

function FireCalculator() {
  let timeoutFunc = null;
  const [monthlySavings, setMonthlySavings] = useState(100);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [inflationPercent, setInflationPercent] = useState(7);

  const calculateFire = () => {
    const yearlySavings = monthlySavings * 12;
    const inflationPercentile = 0.07;
    const data: ChartData[] = [];
    let sumSavedMoney = yearlySavings;
    for (let index = age; index < retireAge; index++) {
      sumSavedMoney = sumSavedMoney * inflationPercentile + sumSavedMoney;
      data.push({ x: index, y: sumSavedMoney });
    }
    return data;
  };

  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(calculateFire());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(calculateFire());
    }, 500);
    return () => clearTimeout(timer);
  }, [monthlySavings, age, retireAge, inflationPercent]);

  const temperatures = data.map(({ y }) => y);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  /*
  const formattedData = data.map(({x, y}) => {
    if(y < 10000 && y > 1000) return {x: x, y: `${Math.round(y/1000)}k`}
    if(y < 100000 && y > 10000) return {x: x, y: `${Math.round(y/10000)} mil`}
    return {x: x, y: y}
  });
  */
  console.log(data[0]);

  return (
    <>
      <FlexBoxSpaceAroundRow >
        <FlexBoxSpaceAroundColumn
          sx={{ flexGrow: 2, backgroundColor: "#" + bgColors.lighterPink }}
        >
          <Card variant="outlined" sx={{}}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Savings
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button size="small">Add change</Button>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Add savings change card
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Add savings change card
              </Typography>
            </CardContent>
          </Card>
        </FlexBoxSpaceAroundColumn>
        <FlexBoxSpaceAroundColumn
          sx={{ flexGrow: 1, backgroundColor: "#" + bgColors.lightPink }}
        >
          <Card variant="outlined" sx={{}}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Expenses
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button size="small">Add change</Button>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Add expenses change card
              </Typography>
            </CardContent>
          </Card>
        </FlexBoxSpaceAroundColumn>
      </FlexBoxSpaceAroundRow>
      <FlexBoxSpaceAroundRow sx={{ backgroundColor: "#" + bgColors.beige }}>
        <Card variant="outlined" sx={{ flexGrow: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              GRAPH x2
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Information
            </Typography>
          </CardContent>
        </Card>
      </FlexBoxSpaceAroundRow>
    </>
  );

  /*return (
    <FireWrapper>
      <Card variant="outlined">hi there</Card>
      <FireBox>
        <BoxHeader>Input values</BoxHeader>
        <label>
          Monthly savings{" "}
          <input
            name="monthlySavings"
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(parseInt(e.target.value))}
          />
        </label>
        <label>
          Your age{" "}
          <input
            name="age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        </label>
        <label>
          Retire age{" "}
          <input
            name="retireAge"
            value={retireAge}
            onChange={(e) => setRetireAge(parseInt(e.target.value))}
          />
        </label>
        <label>
          Inflation percent{" "}
          <input
            name="inflationPercent"
            value={inflationPercent}
            onChange={(e) => setInflationPercent(parseInt(e.target.value))}
          />
          %
        </label>
      </FireBox>
      <FireBox>
        <V.VictoryChart>
          <V.VictoryLine data={data} />
          <V.VictoryScatter
            data={data}
            dataComponent={<ScatterPoint min={min} max={max} />}
          />
        </V.VictoryChart>
      </FireBox>
    </FireWrapper>
  );*/
}

export default FireCalculator;
