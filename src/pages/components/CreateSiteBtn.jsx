import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@material-tailwind/react";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunes,
  getProvinces,
  getVilles,
} from "../../features/user/actions";
import { getAllSiteVente, createSite } from "../../features/siteVente/actions";
import { IoMdContact } from "react-icons/io";
import {
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  InputLabel,
  Input,
  Avatar,
} from "@mui/material";
import { toast } from "react-toastify";

function CreateUserBtn() {
  const dispatch = useDispatch();

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const { provinces, villes, communes } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contacts, setContacts] = useState();
  const [ID_province, setID_province] = useState();
  const [ID_commune, setID_commune] = useState();
  const [ID_ville, setID_ville] = useState();
  const userCreatedId = useSelector((state) => state.user.user_ID);

  const handleSubmitUser = async (event) => {
    event.preventDefault();

    if (!contacts || !name) {
      return;
    }

    try {
      await dispatch(
        createSite({
          name,
          location,
          contacts,
          ID_province,
          ID_commune,
          ID_ville,
          ID_user_created_at: userCreatedId,
        })
      ).unwrap();
      closeCreate();
      toast.success("site créée avec succès");
      dispatch(getAllSiteVente());
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (ID_province) {
      dispatch(getVilles({ ID_province }));
    }
  }, [dispatch, ID_province]);

  useEffect(() => {
    if (ID_ville) {
      dispatch(getCommunes({ ID_ville }));
    }
  }, [dispatch, ID_ville]);

  return (
    <div>
      <Button className="h-[2rem] bg-[#8C461F]" onClick={openCreate}>
        <Add /> Créer un site
      </Button>
      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Nouveau site de vente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="location"
            label="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />

          <TextField
            margin="dense"
            id="phone-contacts"
            label="Numéro de téléphone"
            type="tel"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
            fullWidth
          />
          <div className="mt-4">
            <TextField
              select
              label="Province"
              value={ID_province}
              onChange={(e) => setID_province(parseInt(e.target.value))}
              fullWidth
            >
              {provinces.map((province) => (
                <MenuItem key={province.ID} value={province.ID}>
                  {province.labele}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="mt-4">
            <TextField
              select
              label="Ville"
              value={ID_ville}
              onChange={(e) => setID_ville(parseInt(e.target.value))}
              fullWidth
            >
              {villes.map((ville) => (
                <MenuItem key={ville.ID} value={ville.ID}>
                  {ville.labele}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="mt-4">
            <TextField
              select
              label="Commune"
              value={ID_commune}
              onChange={(e) => setID_commune(parseInt(e.target.value))}
              fullWidth
            >
              {communes.map((commune) => (
                <MenuItem key={commune.ID} value={commune.ID}>
                  {commune.labele}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={closeCreate}
          >
            Fermer
          </button>
          <button
            className="bg-[#8C461F] text-white font-bold px-5 py-2"
            onClick={handleSubmitUser}
          >
            Valider
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateUserBtn;
