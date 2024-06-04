import React from "react";
import SideBarMenu from "./sideBar/SidebarMenu";
import Header from "./mainHeader/Header";
import { useMediaQuery } from "@react-hook/media-query";
export default function ScreenFixed({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
 // const { selectedMusic, setSelectedMusic } = useContext(MusicContext);

  return (
    <div>
      <Header />

      {isMobile ? (
        <div className="flex flex-row h-screen">
          <SideBarMenu />

          <div className="mt-[2.5rem]  border-t w-full">{children}</div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row h-screen">
            <SideBarMenu />
            <div className="mt-[5rem]  ml-[14.6rem] border-t w-full">
              {children}
            </div>
          </div>{/* 
          {selectedMusic && <PlayerAudio selectedMusic={selectedMusic} />} */}
        </div>
      )}
    </div>
  );
}
