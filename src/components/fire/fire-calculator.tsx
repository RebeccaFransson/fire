import React, { useEffect, useMemo, useState } from "react";
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
import { FlexBoxSpaceAroundColumn, FlexBoxSpaceAroundRow } from "./style";
import Chart from "./chart";

function FireCalculator() {
  const medianLifeLength = 85;
  const [monthlySavings, setMonthlySavings] = useState(1000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [inflationPercent, setInflationPercent] = useState(7);

  const [moneyData, setMoneyData] = useState<number[]>([]);
  const [ageData, setAgeData] = useState<number[]>([]);

  const calculateFire = (): { moneyData: number[]; ageData: number[] } => {
    const yearlySavings = monthlySavings * 12;
    const inflationPercentile = inflationPercent / 100;
    const moneyData = [],
      ageData = [];
    let sumSavedMoney = yearlySavings;

    for (let index = age + 1; index <= medianLifeLength; ++index) {
      moneyData.push(Math.round(sumSavedMoney));

      sumSavedMoney =
        sumSavedMoney * inflationPercentile + sumSavedMoney + yearlySavings;

      ageData.push(index);
    }
    return { moneyData, ageData };
  };

  const calculateIdealRetirementAge = (
    exampleRetireAge: number,
    maximumSavedMoney?: number
  ): any => {
    const maxSavedMoney =
      maximumSavedMoney ?? moneyData[exampleRetireAge - age];
    const yearlyExpenses = monthlyExpenses * 12;
    let yearsToLiveOnSavedMoney = Math.round(maxSavedMoney / yearlyExpenses);
    let yearsThatNeedMoney = Math.round(medianLifeLength - exampleRetireAge);

    console.log("-------------------");
    console.log("moneyData", moneyData);
    console.log("exampleRetireAge", exampleRetireAge);
    console.log("maxSavedMoney", maxSavedMoney);
    console.log("yearsToLiveOnSavedMoney", yearsToLiveOnSavedMoney);
    console.log("yearsThatNeedMoney", yearsThatNeedMoney);
    console.log(
      `can retire earlier than ${exampleRetireAge}? `,
      yearsToLiveOnSavedMoney > yearsThatNeedMoney
    );
    console.log(
      `need to retire later than ${exampleRetireAge}? `,
      yearsToLiveOnSavedMoney < yearsThatNeedMoney
    );

    // Perfect age to retire
    if (yearsToLiveOnSavedMoney + 1 === yearsThatNeedMoney ||
      yearsToLiveOnSavedMoney - 1 === yearsThatNeedMoney) {
      console.log("You can comfortably retire at age " + exampleRetireAge);
      return "You can comfortably retire at age " + exampleRetireAge;
    }
    // Can retire earlier
    else if (yearsToLiveOnSavedMoney > yearsThatNeedMoney) {
      console.log("re-calculate - retire earlier");

      const yearsToRetireEarlier = Math.round(
        (yearsToLiveOnSavedMoney - yearsThatNeedMoney) / 2
      );
      console.log("yearsToRetireEarlier", yearsToRetireEarlier);

      // Update values with new retire age and money saved
      const updatedRetireAge = exampleRetireAge - yearsToRetireEarlier;
      console.log("updatedRetireAge", updatedRetireAge);
      calculateIdealRetirementAge(updatedRetireAge, moneyData[updatedRetireAge - age]);
      return null;
    }
    // Needs to retire later
    else if (yearsToLiveOnSavedMoney < yearsThatNeedMoney) {
      console.log("re-calculate - retire later");

      const yearsToRetireLater = Math.round(
        (yearsThatNeedMoney - yearsToLiveOnSavedMoney) / 2
      );
      console.log("yearsToRetireLater", yearsToRetireLater);

      // Update values with new retire age and money saved
      const updatedRetireAge = exampleRetireAge + yearsToRetireLater;
      console.log("updatedRetireAge", updatedRetireAge);

      calculateIdealRetirementAge(updatedRetireAge, moneyData[updatedRetireAge - age]);
      return null;
    }
  };

  /**
   * Calculate the data for the graph on load.
   */
  useEffect(() => {
    const calculatedFire = calculateFire();
    //console.log(hejsan(calculatedFire.moneyData, retireAge));
    setMoneyData(calculatedFire.moneyData);
    setAgeData(calculatedFire.ageData);
    console.log(calculateIdealRetirementAge(retireAge));
  }, []);

  useEffect(() => {
    console.log(calculateIdealRetirementAge(retireAge));
  }, [moneyData, ageData]);

  /**
   * Whenever [monthlySavings, age, retireAge, inflationPercent] change
   * the data for the graph will re-calculate on the new values after 0,5 second.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const calculatedFire = calculateFire();
      setMoneyData(calculatedFire.moneyData);
      setAgeData(calculatedFire.ageData);
    }, 500);
    return () => clearTimeout(timer);
  }, [monthlySavings, age, retireAge, inflationPercent]);

  //console.log(moneyData[moneyData.length - 1]);

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
            <Chart yData={moneyData} xData={ageData}></Chart>
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
