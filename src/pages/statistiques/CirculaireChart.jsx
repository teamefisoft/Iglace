// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';

// const data = {
//   labels: ['jan', 'fev', 'mar', 'apr', 'may'],
//   datasets: [
//     {
//       data: [400, 300, 200, 100, 150],
//       backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0088'],
//       hoverBackgroundColor: ['#0058D4', '#00A87B', '#FF9E1F', '#FF6621','#FF8821' ],
//     },
//   ],
// };

// const CircleGraph = () => {
//   return <div>
//  <Doughnut data={data}/>
//   </div>
// };

// export default CircleGraph;

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CircleGraph = () => {
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
        type: "pie",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              data: [400, 300, 200, 100, 150],
              backgroundColor: [
                "#0088FE",
                "#00C49F",
                "#FFBB28",
                "#FF8042",
                "#FF0088",
              ],
              hoverBackgroundColor: [
                "#0058D4",
                "#00A87B",
                "#FF9E1F",
                "#FF6621",
                "#FF8821",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    <div className="w-[25rem] max-md:w-[15rem]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default CircleGraph;
