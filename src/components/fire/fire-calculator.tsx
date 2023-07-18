import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Card, Flexbox } from "../../style";
import { getAgeTextField, getDollarTextField } from "../extra/inputs";
import { getText, getTitle } from "../extra/text";
import { FlexBoxSpaceAroundColumn, FlexBoxSpaceAroundRow } from "./style";
import Chart from "./chart";

enum ResultEnum {
  EARLIER,
  LATER,
  IDEAL,
}

export type SavingsChange = {
  index: number;
  age: number;
  monthlySavings: number;
};

function FireCalculator() {
  const medianLifeLength = 85;
  const [monthlySavings, setMonthlySavings] = useState(1000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(50);
  const [inflationPercent, setInflationPercent] = useState(7);

  const [moneyGrowData, setMoneyGrowData] = useState<number[]>([]);
  const [moneyData, setMoneyData] = useState<number[]>([]);
  const [ageData, setAgeData] = useState<number[]>([]);

  const [retirementInformation, setRetirementInformation] =
    useState<ResultEnum | null>(null);

  const [savingChanges, setSavingChanges] = useState<SavingsChange[]>([]);

  const calculateFire = (): {
    moneyData: number[];
    moneyGrowData: number[];
    ageData: number[];
  } => {
    let yearlySavings = monthlySavings * 12;
    const yearlyExpenses = monthlyExpenses * 12;
    const inflationPercentile = inflationPercent / 100;
    const moneyGrowData = [],
      moneyData = [],
      ageData = [];
    let sumSavedMoney = yearlySavings;
    let sumSavedMoneyWithExpenses = yearlyExpenses;
    let indexForSavingChanges = 0;
    console.log("savingChanges");
    console.log(savingChanges);

    // Add savings to data, graph going up
    for (let indexAge = age; indexAge <= medianLifeLength; indexAge++) {
      // Change yearly savings with a savings change
      if (
        savingChanges[indexForSavingChanges] &&
        indexAge === savingChanges[indexForSavingChanges].age
      ) {
        yearlySavings =
          savingChanges[indexForSavingChanges].monthlySavings * 12;
        indexForSavingChanges++;
      }

      sumSavedMoney =
        sumSavedMoney * inflationPercentile + sumSavedMoney + yearlySavings;
      moneyGrowData.push(Math.round(sumSavedMoney));

      // Add data to the graph with expenses
      if (indexAge === retireAge) {
        sumSavedMoneyWithExpenses = sumSavedMoney;
        moneyData.push(Math.round(sumSavedMoney));
      } else if (indexAge > retireAge) {
        const newSavedMoneyAfterYearlyExpenses =
          sumSavedMoneyWithExpenses - yearlyExpenses;
        sumSavedMoneyWithExpenses =
          newSavedMoneyAfterYearlyExpenses * inflationPercentile +
          newSavedMoneyAfterYearlyExpenses;

        moneyData.push(Math.round(sumSavedMoneyWithExpenses));
      } else {
        moneyData.push(Math.round(sumSavedMoney));
      }

      ageData.push(indexAge);
    }
    return { moneyData, moneyGrowData, ageData };
  };

  const calculateIdealRetirementAgeWhileLoop = (): number => {
    let tries = 0;
    // Start values, for user inpuuted retirement age
    let exampleRetireAge = retireAge;
    let maxSavedMoney = moneyGrowData[retireAge - age];
    const yearlyExpenses = monthlyExpenses * 12;

    while (tries < 100) {
      let yearsThatNeedMoney = Math.round(medianLifeLength - exampleRetireAge);
      let yearsToLiveOnSavedMoney = Math.round(maxSavedMoney / yearlyExpenses);

      /*
      console.log("-------------------");
      console.log("exampleRetireAge", exampleRetireAge);
      console.log("maxSavedMoney", maxSavedMoney);
      console.log("yearsToLiveOnSavedMoney", yearsToLiveOnSavedMoney);
      console.log("yearsThatNeedMoney", yearsThatNeedMoney);
      */

      if (
        yearsToLiveOnSavedMoney + 1 === yearsThatNeedMoney ||
        yearsToLiveOnSavedMoney - 1 === yearsThatNeedMoney
      ) {
        return exampleRetireAge;
      }
      // Can retire earlier
      else if (yearsToLiveOnSavedMoney > yearsThatNeedMoney) {
        const yearsToRetireEarlier = Math.round(
          (yearsToLiveOnSavedMoney - yearsThatNeedMoney) / 2
        );
        const updatedRetireAge = exampleRetireAge - yearsToRetireEarlier;
        //console.log(`re-calculate - retire earlier, remove ${yearsToRetireEarlier} years and try with ${updatedRetireAge}`);
        exampleRetireAge = updatedRetireAge;
        maxSavedMoney = moneyGrowData[updatedRetireAge - age];
      }
      // Needs to retire later
      else if (yearsToLiveOnSavedMoney < yearsThatNeedMoney) {
        const yearsToRetireLater = Math.round(
          (yearsThatNeedMoney - yearsToLiveOnSavedMoney) / 2
        );
        const updatedRetireAge = exampleRetireAge + yearsToRetireLater;
        //console.log(`re-calculate - retire later, add ${yearsToRetireLater} years and try with ${updatedRetireAge}`);
        exampleRetireAge = updatedRetireAge;
        maxSavedMoney = moneyGrowData[updatedRetireAge - age];
      }
      tries++;
    }
    return 0;
  };

  /**
   * Calculate the data for the graph on load.
   */
  useEffect(() => {
    const calculatedFire = calculateFire();
    //console.log(hejsan(calculatedFire.moneyData, retireAge));
    setMoneyData(calculatedFire.moneyData);
    setMoneyGrowData(calculatedFire.moneyGrowData);
    setAgeData(calculatedFire.ageData);
  }, []);

  /*useEffect(() => {
    console.log("changed money and age data");
    const idealRetirementAge = calculateIdealRetirementAgeWhileLoop();

    if (idealRetirementAge === retireAge)
      setRetirementInformation(ResultEnum.IDEAL);
    if (idealRetirementAge < retireAge)
      setRetirementInformation(ResultEnum.LATER);
    if (idealRetirementAge > retireAge)
      setRetirementInformation(ResultEnum.EARLIER);

    //console.warn(retireAge);
    //console.warn(idealRetirementAge);
  }, [moneyData, ageData]);*/

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
  }, [
    monthlySavings,
    monthlyExpenses,
    age,
    retireAge,
    inflationPercent,
    savingChanges,
  ]);

  const addSavningsChange = () => {
    const latestSavingsChangeAge = savingChanges[savingChanges.length - 1]
      ? savingChanges[savingChanges.length - 1].age
      : age;
    setSavingChanges([
      ...savingChanges,
      {
        age: latestSavingsChangeAge + 1,
        index: savingChanges.length,
        monthlySavings: monthlySavings,
      },
    ]);
  };

  const saveSavningsChange = ({
    index,
    age,
    savingsSum,
  }: {
    index: number;
    age?: number;
    savingsSum?: number;
  }) => {
    setSavingChanges(
      savingChanges.map((change) => {
        if (change.index === index) {
          if (age) return { ...change, age: age };
          if (savingsSum || savingsSum === 0)
            return { ...change, monthlySavings: savingsSum };
        }
        return change;
      })
    );
  };

  const removeSavingsChange = (index: number) => {
    setSavingChanges(
      savingChanges.filter((change) => {
        return change.index !== index;
      })
    );
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
                  {getDollarTextField(
                    "Monthly savings",
                    monthlySavings,
                    setMonthlySavings
                  )}
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
              <Button size="small" onClick={addSavningsChange}>
                Add change
              </Button>
            </CardActions>
          </Card>
          {savingChanges.map((change) => (
            <Card variant="outlined" key={change.index}>
              <CardContent>
                <Flexbox sx={{ justifyContent: "space-between" }}>
                  <Flexbox sx={{ ml: "20px", flexGrow: 2, gap: "90px" }}>
                    <Box>
                      {getAgeTextField("When", change.age, (age) => {
                        saveSavningsChange({ index: change.index, age: age });
                      })}
                    </Box>
                    <Box>
                      {getDollarTextField(
                        "New savings",
                        change.monthlySavings,
                        (savings) => {
                          saveSavningsChange({
                            index: change.index,
                            savingsSum: savings,
                          });
                        }
                      )}
                    </Box>
                  </Flexbox>
                  <Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeSavingsChange(change.index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Flexbox>

                <Divider sx={{ m: "10px 0" }} />
                <Box sx={{ margin: "0 20px" }}>
                  {getText(
                    `At age ${change.age}, monthly savings will be changed to $${change.monthlySavings}.`
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
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
                  {getDollarTextField(
                    "Monthly expenses",
                    monthlyExpenses,
                    setMonthlyExpenses
                  )}
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
            {retirementInformation === ResultEnum.IDEAL
              ? getTitle(`${retireAge} is the ideal age for you to retire`)
              : null}
            {retirementInformation === ResultEnum.LATER
              ? getTitle(
                  `Your need to retire later than ${retireAge} to live upon your saved money.`
                )
              : null}
            {retirementInformation === ResultEnum.EARLIER
              ? getTitle(
                  `You have more money, you can retire earlier than ${retireAge} and still live upon your saved money.`
                )
              : null}
          </CardContent>
        </Card>
      </FlexBoxSpaceAroundRow>
      <FlexBoxSpaceAroundRow>
        <Card variant="outlined" sx={{ flexGrow: 2 }}>
          <CardContent>
            {getTitle("Result")}

            <Divider />
            <Chart
              yData={moneyData}
              xData={ageData}
              savingChanges={savingChanges}
            ></Chart>
          </CardContent>
        </Card>
      </FlexBoxSpaceAroundRow>
    </>
  );
}

export default FireCalculator;
