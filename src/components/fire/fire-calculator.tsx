import { BoxHeader, Flexbox, Card } from "../../style";
import {
  FlexBoxSpaceAroundColumn,
  FlexBoxSpaceAroundRow,
  StyledPoint,
} from "./style";
import * as V from "victory";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { bgColors } from "../../styles/colors";
import { getAgeTextField } from "../extra/inputs";
import { getText, getTitle } from "../extra/text";

const ScatterPoint = ({ x, y, datum, min, max }: any) => {
  const colors = ["#FF8C94", "#FFAAA6", "#FFD3B5", "#DCEDC2", "#A8E6CE"];
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);
  return <StyledPoint color={colors[i]} cx={x} cy={y} r={3} />;
};

type ChartData = { x: number; y: number };

function FireCalculator() {
  const [monthlySavings, setMonthlySavings] = useState(100);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [inflationPercent, setInflationPercent] = useState(7);

  const calculateFire = () => {
    const yearlySavings = monthlySavings * 12;
    const inflationPercentile = inflationPercent / 100;
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
  console.log(data[data.length - 1]);

  return (
    <>
      <FlexBoxSpaceAroundRow sx={{ marginBottom: "20px" }}>
        <FlexBoxSpaceAroundColumn sx={{ flexGrow: 2 }}>
          <Card variant="outlined">
            <CardContent>
              {getTitle("Savings")}
              <Divider sx={{ mb: "20px" }} />
              <Flexbox>
                <FlexBoxSpaceAroundColumn
                  sx={{
                    flexGrow: 2,
                    alignItems: "baseline",
                    padding: "0 20px",
                  }}
                >
                  {getAgeTextField("Current age", age, setAge)}
                  <Box sx={{ mt: "20px" }}>
                    {getTitle(`Inflation: ${inflationPercent}%`)}
                  </Box>
                </FlexBoxSpaceAroundColumn>
                <FlexBoxSpaceAroundColumn
                  sx={{
                    flexGrow: 2,
                    alignItems: "baseline",
                    padding: "0 20px",
                  }}
                >
                  <TextField
                    sx={{ width: "100px" }}
                    id="standard-basic"
                    label="Save each month"
                    variant="standard"
                    defaultValue={monthlySavings}
                    size="small"
                    onChange={(e) =>
                      setMonthlySavings(parseInt(e.target.value))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ mt: "25px", width: "280px" }}>
                    <Slider
                      aria-label="Volume"
                      value={inflationPercent}
                      onChange={(e: Event, newValue: number | number[]) =>
                        setInflationPercent(newValue as number)
                      }
                      step={1}
                      marks={true}
                      min={0}
                      max={10}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value: number) => {
                        return `${value}%`;
                      }}
                    />
                  </Box>
                </FlexBoxSpaceAroundColumn>
              </Flexbox>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button size="small">Add change</Button>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardContent>{getText("Add savings change card")}</CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>{getText("Add savings change card")}</CardContent>
          </Card>
        </FlexBoxSpaceAroundColumn>
        <FlexBoxSpaceAroundColumn sx={{ flexGrow: 1 }}>
          <Card variant="outlined">
            <CardContent>
              {getTitle("Expenses")}
              <Divider sx={{ mb: "20px" }} />
              <Flexbox>
                <Flexbox
                  sx={{
                    flexGrow: 2,
                    alignItems: "baseline",
                  }}
                >
                  <TextField
                    sx={{ width: "100px" }}
                    id="standard-basic"
                    label="Monthly expenses"
                    variant="standard"
                    defaultValue={monthlyExpenses}
                    size="small"
                    onChange={(e) =>
                      setMonthlyExpenses(parseInt(e.target.value))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Flexbox>
                <Flexbox
                  sx={{
                    flexGrow: 2,
                    alignItems: "baseline",
                  }}
                >
                  {getAgeTextField("Age to retire", retireAge, setRetireAge)}
                </Flexbox>
              </Flexbox>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button size="small">Add change</Button>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardContent>{getText("Add expenses change card")}</CardContent>
          </Card>
        </FlexBoxSpaceAroundColumn>
      </FlexBoxSpaceAroundRow>
      <FlexBoxSpaceAroundRow>
        <Card variant="outlined">
          <CardContent>
            {getTitle("Result")}

            <Divider />
            <V.VictoryChart>
              <V.VictoryLine data={data} />
              <V.VictoryScatter
                data={data}
                dataComponent={<ScatterPoint min={min} max={max} />}
              />
            </V.VictoryChart>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ maxWidth: "280px" }}>
          <CardContent>
            {getText(
              "You will have to save more to be able to retire at age " +
                retireAge
            )}
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
  );
  
  
  
                  <Slider
                    sx={{ margin: "auto", width: "60%" }}
                    aria-label="inflation"
                    getAriaValueText={(value: number) => `${value}%`}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={getInflationMarks()}
                    min={0}
                    max={10}
                    value={inflationPercent}
                    onChange={(e: Event, newValue: number | number[]) =>
                      setInflationPercent(newValue as number)
                    }
                  />*/
}

export default FireCalculator;
