import React from "react";
import { Line } from "@ant-design/charts";

const SalesChart = () => {
  // Data with accumulated sales for each wood category
  const data = [
    { category: "Pine", sales: 100 },
    { category: "Oak", sales: 150 },
    { category: "Fir", sales: 120 },
    { category: "Walnut", sales: 180 },
    { category: "Maple", sales: 200 },
    { category: "Cedar", sales: 130 },
  ];

  // Configuring the chart
  const config = {
    data,
    xField: "category", // x-axis: categories (wood types)
    yField: "sales", // y-axis: accumulated sales numbers
    seriesField: "category", // One line per category
    lineStyle: {
      lineWidth: 2,
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    legend: {
      position: "top-left",
    },
    tooltip: {
      shared: true,
      showMarkers: false,
    },
    title: {
      visible: true,
      text: "Sales Data by Wood Category",
    },
  };

  return (
    <div>
      <h2>Sales Data Visualization</h2>
      <Line {...config} />
    </div>
  );
};

export default SalesChart;
