import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/actions";
import CreateSiteBtn from "../components/CreateSiteBtn";
import {
  getPriceBySiteVente,
  getAllSiteVente,
} from "../../features/siteVente/actions";

export default function SiteVente() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.products.products);
  const sitePriceSite = useSelector((state) => state.siteVente.priceSite);
  const siteVente = useSelector((state) => state.siteVente.siteVente);
  //console.log("siteVentett", siteVente);
  const colors = ["#F5DEB3", "#FFA07A", "#D2B48C", "#F6E3CE", "#F3E0D6"];
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    dispatch(getPriceBySiteVente());
    dispatch(getAllSiteVente())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const disponibile = () => {
    if (orders?.data) {
      const isAvailable = orders.data.some((item) => item.is_available === 1);
      return isAvailable ? "En stock" : "Rupture de stock";
    }
    return null;
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            color: "#8C461F",
          }}
        >
          <div role="status" className="flex items-center justify-center">
            <svg
              ariaHidden="true"
              className="w-[50px] h-[50px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#8C461F]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="m-[2rem] flex justify-between">
            <p className="text-[18px] text-[#8C461F]">{siteVente?.message}</p>
            <div>
              <CreateSiteBtn />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              cursor: "pointer",
              margin: "2rem",
              flexWrap: "wrap",
            }}
          >
            {siteVente?.data?.map((site, index) => (
              <Card
                key={site.id}
                sx={{
                  width: 220,
                  backgroundColor: colors[index % colors.length],
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="" component="div">
                    Nom du site : {site.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Location : {site.location}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Contact : {site.contacts}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
