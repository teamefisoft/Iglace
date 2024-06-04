import React from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { LuIceCream2 } from "react-icons/lu";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { BsClipboardDataFill } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiShop } from "react-icons/gi";
import "../../index.css";

import {
  BsMusicNoteList,
  BsFillCollectionPlayFill,
  BsPeopleFill,
  BsFillHeartFill,
} from "react-icons/bs";
import NavLink from "../navigation/NavLink";
import { useMediaQuery } from "@react-hook/media-query";

export default function SideBarMenu() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      {isMobile ? (
        <div></div>
      ) : (
        /*  */
        <div className="h-screen sidebar  overflow-y-scroll w-[14.5rem] text-[#8C461F] fixed border-r-1 bg-[#ffffff]">
          <div className="mt-[6rem] tex-left ">
            <NavLink to={`/commande`}>
              <div className="flex flex-row px-10 h-[4rem]  hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                <MdOutlineShoppingCartCheckout className="mr-4 text-2xl font-semibold" />
                <p>Commandes</p>
              </div>
            </NavLink>
            <NavLink to={`/Produits`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]  mb-2 cursor-pointer hover:text-[#fff] ">
                <LuIceCream2 className="mr-4 text-2xl font-semibold" />
                <p>Produits</p>
              </div>
            </NavLink>

            <NavLink to={`/operation`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]  mb-2 cursor-pointer hover:text-[#fff] ">
                <FaArrowsDownToPeople className="mr-4 text-3xl font-semibold" />
                <p>Operation</p>
              </div>
            </NavLink>

            <NavLink to={`/affectation`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]   mb-2 cursor-pointer hover:text-[#fff] ">
                <BsClipboardDataFill className="mr-4 text-2xl font-semibold" />
                <p>Affectation</p>
              </div>
            </NavLink>
            {/* <NavLink to={`/bonus`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]  mb-2 cursor-pointer hover:text-[#fff] ">
                <FaMoneyBillTrendUp className="mr-4 custom-icon text-4xl font-semibold" />
                <p>Récompenses agent</p>
              </div>
            </NavLink> */}
            <NavLink to={`/shop`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]  mb-2 cursor-pointer hover:text-[#fff] ">
                <GiShop className="mr-4 text-2xl font-semibold" />
                <p>Sites ventes</p>
              </div>
            </NavLink>
            <NavLink to={`/user`}>
              <div className="flex flex-row px-10 h-[4rem] items-center  hover:bg-[#8B5742]  mb-2 cursor-pointer hover:text-[#fff] ">
                <GiShop className="mr-4 text-2xl font-semibold" />
                <p>Utilisateur</p>
              </div>
            </NavLink>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
