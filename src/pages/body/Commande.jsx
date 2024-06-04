import React, { useEffect, useRef } from "react";

import BarChart from "../statistiques/BarChart.jsx";
import CircleGraph from "../statistiques/CirculaireChart.jsx";
import CommandeGrid from "./CommandeGrid";
import GridCommande from "./GridCommande";

function Commande() {
  return (
    <div>
      <div className=" text-[#8C461F] ml-7 mr-4 py-6">
        <h2 className=" py-2 px-3 text-2xl font-semibold">
          Statistique de commandes
        </h2>
        <div className="py-4 flex gap-[15rem] w-[60rem] max-md:w-full  max-md:flex-col max-md:gap-[2rem]">
          <BarChart />
          <CircleGraph />
        </div>
        <div>
          <div className="">
            <GridCommande />
            {/* <CommandeGrid /> */}
          </div>
        </div>
        <div>
          <p className=" font-semibold px-3 py-4"></p>
          <div className=" flex flex-row gap-2 flex-wrap"></div>
        </div>

        <div>
          <p className=" font-semibold px-3 py-4"></p>
          <div className="flex flex-row gap-2 flex-wrap"></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default Commande;
