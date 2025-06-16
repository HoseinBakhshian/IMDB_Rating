import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

function LineChart({ allPoins, allLables }) {
  const chartWidth = Math.max(allPoins.length * 50);

  return (
    <div id="LineChartWrapper">
      <div className="" style={{ width: `${chartWidth}px`, height: `100%` }} id="">
        <Line
          datasetIdKey="id"
          data={{
            labels: allLables,
            datasets: [
              {
                data: allPoins,
                borderWidth: 2,
                pointRadius: 4,
                fill: false,
                pointBackgroundColor: "rgb(18, 105, 236)",
                tension: 0,
                segment: {
                  borderColor: "rgb(226, 90, 0)",
                },
              },
            ],
          }}
          options={{
            layout: {
              padding: {
                top: 20, // Increase this value as needed
              },
            },

            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `IMDB: ${tooltipItem.raw}`;
                  },
                },
              },

              datalabels: {
                display: false,
              },
            },

            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "category",
                grid: {
                  color: "rgb(0, 0, 0)",
                  lineWidth: 0.05,
                },
                ticks: {
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 90,
                  padding: 10,
                  color: "black",
                },
              },
              y: {
                beginAtZero: true,
                suggestedMax: 15,
                min: 0,
                max: 12,
                grid: {
                  color: "rgb(0, 0, 0)",
                  lineWidth: 0.05,
                },
                ticks: {
                  callback: function (value, index, ticks) {
                    if (index === ticks.length - 1) {
                      return "";
                    }
                    return value;
                  },

                  padding: 10,
                  stepSize: 2,
                  color: "black",
                },
              },
            },
            elements: {
              point: {
                radius: 5,
                borderWidth: 2,
                hoverRadius: 7,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
