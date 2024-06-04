import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "../carousel/Data";
//import MusicCard from "../carousel/MusicCard";
import BtnBackandNext from "./BtnBackandNext";

export default function MusicList() {
  const { cardId } = useParams();
  const selectedCard = Data.find((data) => data.id == cardId);
  return (
    <div className="text-white">
      <div className=" bg-gradient-to-r  from-blue-500 to-yellow-400 ">
        <div>
          <BtnBackandNext />
        </div>
        <div className="text-white bg-[#1F222B] rounded-2xl ml-6 mr-6 px-10 py-6 flex flex-row justify-between ">
          <div className="flex flex-row gap-10">
            <img src={selectedCard.image} className="rounded-3xl h-[15rem]" />
            <div className="flex flex-col justify-between ">
              <p className="text-1xl">playlist</p>
              <h3 className="font-bold text-2xl"> {selectedCard.name}</h3>
              <p className="font-semibold">{selectedCard.name}</p>
            </div>
          </div>
          <div className="float-right">
            <p>Bienvenue sur votre playlist</p>
          </div>
        </div>
        <div className="flex justify-between ml-11 mr-6 mt-3 mb-3">
          <p className="w-[25%]">Artiste</p>
          <p className="w-[25%]">#Titre</p>
          <p className="w-[25%]">Album</p>
          <p className="w-[23%] text-right">Heure</p>
        </div>
      </div>
      {selectedCard?.subObjet?.length > 0 ? (
        <div>
          <MusicCard />
        </div>
      ) : (
        <p>Pas de musique</p>
      )}
    </div>
  );
}
