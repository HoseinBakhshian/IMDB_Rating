import React from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS1, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS1.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PiesChart({ allCounts }) {
  const setColor = (rating) => {
    if (rating == 10) {
      return "#006400";
    } else if (rating >= 9) {
      return "#379237";
    } else if (rating >= 8) {
      return "#7dd47d";
    } else if (rating >= 7) {
      return "#F9CB43";
    } else if (rating >= 6) {
      return "#FF7D29";
    } else if (rating >= 5) {
      return "#F05945";
    } else if (rating >= 4) {
      return "#C21010";
    } else {
      return "#4635B1";
    }
  };

  return (
    <div id="PieChartWrapper" className="">
      <Pie
        id="PieChart"
        data={{
          labels: Object.keys(allCounts),
          datasets: [
            {
              data: Object.values(allCounts),
              backgroundColor: (context) => {
                return setColor(context.chart.data.labels[context.dataIndex]);
              },
              // borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.parsed;
                  return `Quantity: ${value}`;
                },
              },
            },

            legend: {
              display: false,
            },

            datalabels: {
              // display: false,
              align: "end", // Positions labels outside
              anchor: "end",
              color: "white",

              font: {
                size: 16,
                weight: "bold",
              },
              formatter: (value) => {
                const total = Object.values(allCounts).reduce((sum, value) => sum + value, 0);
                const percentage = Math.floor((value * 100) / total);
                return percentage < 5 ? "" : percentage + "%";
              },
            },
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 40,
              right: 40,
            },
          },
        }}
      />
    </div>
  );
}

export default PiesChart;
