import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy(); // Détruire l'instance précédente de Chart
        chartRef.current.innerHTML = ""; // Vider le contenu du canvas
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "#FFA07A", // Red
                "#D2B48C ", // Blue
                "#FF8C00 ", // Yellow
                "#708090 ", // Green
                "#556B2F", // Purple
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, []);

  return (
    <div className="w-[22rem] max-md:w-[15rem]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
