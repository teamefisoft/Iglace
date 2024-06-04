import React from "react";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import { useMediaQuery } from "@react-hook/media-query";
/* import { useHistory } from "react-router-dom"; */

export default function BtnBackandNext() {
  const isMobile = useMediaQuery("(max-width: 768px)");

 /*  const history = useHistory(); */

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-row text-1xl px-3 py-2">
          <IoChevronBackCircle
            className="text-[#D9D9D9]"
            onClick={handleGoBack}
          />
          <IoChevronForwardCircle className="text-[#D9D9D9]" />
        </div>
      ) : (
        <div className="flex flex-row text-3xl px-3 py-4">
          <IoChevronBackCircle
            className="text-[#D9D9D9]"
            onClick={handleGoBack}
          />
          <IoChevronForwardCircle className="text-[#D9D9D9]" />
        </div>
      )}
    </div>
  );
}
