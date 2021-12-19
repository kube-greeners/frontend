import React from "react";
import { Line } from "@ant-design/charts";

/**
 * @param {Array} data - The data to show. Must be an array of objects like
 * @example
 * const data = [
 *      {
 *          valueOne:"test" //X-axis
 *          valueTwo:20 //Y-axis
 *      },
 *      {
 *          valueOne:"test2"
 *          valueTwo:30
 *      }
 * ]
 */
const LineChart = ({ data }) => {
  const [xField, yField] = Object.keys(data[0]);

  const config = {
    data: data,
    xField,
    yField,
    height: 500,
    appendPadding: 20,
    xAxis: {
      tickCount: 10,
      title: {
        text: xField,
        style: { fontSize: 16 },
      },
    },
    yAxis: {
      title: {
        text: yField,
        style: { fontSize: 16 },
      },
    },
    slider: {
      start: 0,
      end: 0.99,
      trendCfg: {
        lineStyle: {
          opacity: 0.1,
          stroke: "black",
        },
      },
    },
  };
  return <Line {...config} />;
};

export default LineChart;
