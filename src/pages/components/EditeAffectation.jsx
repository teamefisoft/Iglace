import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllSiteVente, createSite } from "../../features/siteVente/actions";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem
} from "@mui/material";
import { toast } from "react-toastify";

function EditeAffectationBtn({ open, onClose, agent, onSubmit }) {
    const dispatch = useDispatch();
    const siteVente = useSelector((state) => state.siteVente.siteVente.data);
    const [selectedSaleSite, setSelectedSaleSite] = useState(agent ? agent.ID_sale_site : '');

  
    useEffect(() => {
      if (agent) {
        setSelectedSaleSite(agent.ID_sale_site);
      }
    }, [agent]);
  
    useEffect(() => {
      dispatch(getAllSiteVente());
    }, [dispatch]);
  
    const handleSaleSiteChange = (event) => {
      setSelectedSaleSite(event.target.value);
    };
  
    const handleSubmit = () => {
      onSubmit(agent.ID_agent, selectedSaleSite);
      onClose(onClose)
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Modifier le site</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Site de vente"
            value={selectedSaleSite}
            onChange={handleSaleSiteChange}
            fullWidth
            margin="normal"
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              getContentAnchorEl: null,
            }}
          >
            {siteVente?.map((site) => (
              <MenuItem key={site.ID} value={site.ID}>
                {site.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default EditeAffectationBtn;