import React, { useState } from "react";
import { IoMdContact } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import imperial from "../../asset/imperial.jpeg";
import { useMediaQuery } from "@react-hook/media-query";
import { logout } from "../../features/user/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import NavLink from "../navigation/NavLink";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { LuIceCream2 } from "react-icons/lu";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { BsClipboardDataFill } from "react-icons/bs";
import { GiShop } from "react-icons/gi";

function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {isMobile ? (
        <div className="fixed z-50  flex-1 text-white  h-10 bg-[#fff] w-full  flex items-center justify-between">
          <div className=" flex w-[5.5rem] h-10 items-center gap-2 justify-center bg-[#8B5742]">
            <div>
              <button
                className=" lg:hidden text-white ml-2 transition-all duration-1000"
                onClick={toggleMenu}
              >
                <GiHamburgerMenu />
              </button>
              {isMenuOpen && (
                <div className="fixed h-screen bg-[#fff]  mt-2 left-0 ">
                  <div className="">
                    <NavLink to={`/commande`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <MdOutlineShoppingCartCheckout className="mr-2 text-xl font-semibold" />
                        <p>Commandes</p>
                      </div>
                    </NavLink>
                    <NavLink to={`/Produits`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <LuIceCream2 className="mr-2 text-xl font-semibold" />
                        <p className="">Produits</p>
                      </div>
                    </NavLink>
                    <NavLink to={`/operation`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <FaArrowsDownToPeople className="mr-2 text-[1.2rem] font-semibold" />
                        <p>Operation</p>
                      </div>
                    </NavLink>
                    <NavLink to={`/affectation`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <BsClipboardDataFill className="mr-2 text-[1rem] font-semibold" />
                        <p>Affectation</p>
                      </div>
                    </NavLink>
                    <NavLink to={`/shop`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <GiShop className="mr-2 text-xl font-semibold" />
                        <p>Sites ventes</p>
                      </div>
                    </NavLink>
                    <NavLink to={`/user`}>
                      <div className="flex flex-row px-2 h-10 text-[12px] hover:bg-[#8B5742] items-center  hover:text-[#ffff]  mb-2 cursor-pointer">
                        <GiShop className="mr-2 text-xl font-semibold" />
                        <p>Utilisateur</p>
                      </div>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <img src={imperial} className=" rounded-full h-8 w-8" />
          </div>

          <div className=" flex items-center">
            {/* <form>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiSearch className="w-4 h-4  text-white-600 text-[#8C461F]" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className=" outline-[#8B5742]  h-6 p-2  w-[10rem] pl-10 flex flex-row placeholder-[#8B5742] border-2 border-[#8C461F]"
                  placeholder="Rechercher"
                  required
                />
              </div>
            </form> */}
            <div className="flex items-center">
              <div className="inline-flex items-center group">
                <div className="relative left-1 transform -translate-x-1 opacity-0 text-sm text-gray-600 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-[5px]">Log Out</p>
                </div>
                <IoMdContact
                  className="text-3xl text-[#8C461F] cursor-pointer group-hover:text-red-500 transition-colors duration-200"
                  onClick={handleLogout}
                />
                <p className=" text-[#8C461F] mr-2">{data.first_name}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1  text-black  h-20 fixed z-50 bg-[#ffff] w-full flex">
          <div className=" flex justify-center items-center gap-5 w-[17.5rem] h-[5rem] bg-[#8B5742] border-r border-b">
            <img src={imperial} className="rounded-full h-[4rem] w-[4rem]" />
            <p className="text-white">Dashbord</p>
          </div>
          <div className=" flex flex-row items-center w-full justify-between">
            <div className="ml-[2rem] text-3xl text-[#8C461F] ">
              <p>Imperial Icream</p>
            </div>
            <div className="items-center flex ">
              {/* <form>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FiSearch className="w-5 h-6 text-white-600 text-[#8C461F] " />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className=" outline-[#8B5742] w-80 h-10 p-6 mr-10  pl-10 flex flex-row placeholder-[#8B5742] border-2 border-[#8C461F]"
                    placeholder="Rechercher"
                    required
                  />
                </div>
              </form> */}
              <div className="ml-[2rem] flex items-center">
                <div className="inline-flex items-center group">
                  <div className="relative left-1 transform -translate-x-1 opacity-0 text-sm text-gray-600 group-hover:opacity-100 transition-opacity duration-200">
                    Log Out
                  </div>
                  <IoMdContact
                    className="text-4xl text-[#8C461F] cursor-pointer group-hover:text-red-500 transition-colors duration-200"
                    onClick={handleLogout}
                  />
                  <p className="ml-2 text-[#8C461F] mr-2">{data.first_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
