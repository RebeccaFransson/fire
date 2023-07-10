import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  InputAdornment,
  Slider,
  TextField,
} from "@mui/material";
import { Card, Flexbox } from "../../style";
import { getAgeTextField } from "../extra/inputs";
import { getText, getTitle } from "../extra/text";
import {
  FlexBoxSpaceAroundColumn,
  FlexBoxSpaceAroundRow,
} from "./style";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { bgColors } from "../../styles/colors";


function FireCalculator() {
  const [monthlySavings, setMonthlySavings] = useState(100);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [inflationPercent, setInflationPercent] = useState(7);

  const calculateFire = () => {
    const yearlySavings = monthlySavings * 12;
    const inflationPercentile = inflationPercent / 100;
    const moneyGrowth = [];
    let sumSavedMoney = yearlySavings;
    for (let index = age; index < retireAge; index++) {
      sumSavedMoney = sumSavedMoney * inflationPercentile + sumSavedMoney;
      
      moneyGrowth.push(Math.round(sumSavedMoney));
    }
    return moneyGrowth;
  };

  const [moneyGrowth, setMoneyGrowth] = useState<number[]>([]);

  useEffect(() => {
    setMoneyGrowth(calculateFire());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoneyGrowth(calculateFire());
    }, 500);
    return () => clearTimeout(timer);
  }, [monthlySavings, age, retireAge, inflationPercent]);


  console.log(moneyGrowth[moneyGrowth.length - 1]);

  const data2 = {
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 10,
          left: 7,
          blur: 7,
          opacity: 0.2,
        },
        toolbar: {
          show: true,
        },
      },
      colors: [bgColors.darkPink],
      stroke: {
        curve: "straight",
      },
      markers: {
        size: 1,
      },
      yaxis: {
        labels: {
          formatter: (money) => {
            if (money > 100000) return `$${Math.round(money/10000)/10}mil`;
            if (money > 1000) return `$${Math.round(money/100)/10}k`;
            return `$${money}`;
          },
        },
      },
      xaxis: {
        categories: Array.apply(null, { length: retireAge + 1 } as unknown[])
          .map(Number.call, Number)
          .slice(age),
        title: {
          text: "Your age",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      annotations: {
        yaxis: [
          {
            y: 10000,
            borderColor: bgColors.green,
            label: {
              borderColor: bgColors.green,
              style: {
                color: "#000",
                background: bgColors.lightGreen,
              },
              text: "Your first 100k!",
            },
          },
        ],
        xaxis: [
          {
            x: 37,
            borderColor: bgColors.green,
            label: {
              borderColor: bgColors.green,
              style: {
                color: "#000",
                background: bgColors.lightGreen,
              },
              text: "Your made a svanings change",
            },
          },
        ],
      },
    } as ApexOptions,
    series: [
      {
        name: "$",
        data: moneyGrowth,
      },
    ],
  };

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
        <Card variant="outlined" sx={{ flexGrow: 2 }}>
          <CardContent>
            {getTitle("Result")}

            <Divider />
            <Chart
              options={data2.options}
              series={data2.series}
              type="line"
              width="100%"
            />
          </CardContent>
        </Card>
      </FlexBoxSpaceAroundRow>
      <FlexBoxSpaceAroundRow>
        <Card variant="outlined" sx={{ flexGrow: 2 }}>
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
