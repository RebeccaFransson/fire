import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import { bgColors } from "../../styles/colors";

type Props = {yData: number[], xData: number[]} 
function Chart({yData, xData}: Props) {
  const options = {
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
        formatter: (money: number) => {
          if (money > 100000) return `$${Math.round(money / 10000) / 10}mil`;
          if (money > 1000) return `$${Math.round(money / 100) / 10}k`;
          return `$${money}`;
        },
      },
    },
    xaxis: {
      categories: xData,
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
          strokeDashArray: 0,
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
            text: "Your made a savings change",
          },
        },
      ],
    },
  } as ApexOptions;

  const series = [
    {
      name: "$",
      data: yData,
    },
  ];

  return <ApexChart options={options} series={series} type="line" width="100%" />;
}

export default Chart;