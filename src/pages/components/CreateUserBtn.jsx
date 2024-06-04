import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@material-tailwind/react";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunes,
  getProvinces,
  getVilles,
  insertUser,
} from "../../features/user/actions";
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
import { getAllUsers } from "../../features/user/actions";

function CreateUserBtn() {
  const dispatch = useDispatch();

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const { provinces, villes, communes } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [newPostnom, setNewPostnom] = useState("");
  const [newPrenom, setNewPrenom] = useState("");
  const [newSexe, setSexe] = useState("M");
  const [newLieuNaissance, setNewLieuNaissance] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [newborn_at, setNewBorn_at] = useState(Date);
  const [newhired_at, setNewHired_at] = useState(Date);
  const [ID_service, setID_service] = useState(1);
  const [ID_direction, setID_direction] = useState(1);
  const [ID_province, setID_province] = useState(1);
  const [ID_commune, setID_commune] = useState(1);
  const [ID_ville, setID_ville] = useState(1);
  const [pwd_confirm, setPwd_confirm] = useState("");
  const [availability, setAvailability] = useState(1);
  const [newfunction, setNewFunction] = useState("Chef de projet");

  const handleSubmitUser = async (event) => {
    event.preventDefault();

    if (!newUserPhone || !newUserPassword) {
      return;
    }

    try {
      await dispatch(
        insertUser({
          phone: newUserPhone,
          pwd: newUserPassword,
          first_name: name,
          photo: profilePicture,
          second_name: newPostnom,
          third_name: newPrenom,
          sex: newSexe,
          birth_place: newLieuNaissance,
          email: newEmail,
          Grade: newGrade,
          born_at: newborn_at,
          hired_at: newhired_at,
          ID_service: ID_service,
          ID_direction: ID_direction,
          ID_province: ID_province,
          ID_commune: ID_commune,
          ID_ville: ID_ville,
          pwd_confirm: pwd_confirm,
          availability: availability,
          fonction: newfunction,
          role,
        })
      ).unwrap();

      closeCreate();
      toast.success("utilisateur créée avec succès");
      dispatch(getAllUsers());
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
        <Add /> Créer un utilisateur
      </Button>
      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Inscription</DialogTitle>
        <DialogContent>
          <div className="flex items-center space-x-2 mt-4">
            <label htmlFor="profile-picture-input">
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                className="cursor-pointer text-[4rem] text-[#8C461F] overline ml-[12rem]"
                onClick={() =>
                  document.getElementById("profile-picture-input").click()
                }
              >
                <IoMdContact />
              </Avatar>
            </label>
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfilePicture(reader.result);
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              style={{ display: "none" }}
            />
          </div>
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
            id="postnom"
            label="Postnom"
            value={newPostnom}
            onChange={(e) => setNewPostnom(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="prenom"
            label="Prénom"
            value={newPrenom}
            onChange={(e) => setNewPrenom(e.target.value)}
            fullWidth
          />
          <div>
            <InputLabel id="sexe-label">Sexe</InputLabel>
            <Select
              labelId="sexe-label"
              id="sexe"
              value={newSexe}
              onChange={(e) => setSexe(e.target.value)}
              fullWidth
            >
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </Select>
          </div>
          <TextField
            margin="dense"
            id="lieuNaissance"
            label="Lieu de naissance"
            value={newLieuNaissance}
            onChange={(e) => setNewLieuNaissance(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="grade"
            label="Grade"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="born_at"
            label="Date de naissance"
            type="date"
            value={newborn_at}
            onChange={(e) => setNewBorn_at(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="hired_at"
            label="Date embauche"
            type="date"
            value={newhired_at}
            onChange={(e) => setNewHired_at(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Province"
            value={ID_province}
            onChange={(e) => setID_province(parseInt(e.target.value))}
            fullWidth
          >
            {provinces?.map((province) => (
              <MenuItem key={province.ID} value={province.ID}>
                {province.labele}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Ville"
            value={ID_ville}
            onChange={(e) => setID_ville(parseInt(e.target.value))}
            fullWidth
          >
            {villes?.map((ville) => (
              <MenuItem key={ville.ID} value={ville.ID}>
                {ville.labele}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Commune"
            value={ID_commune}
            onChange={(e) => setID_commune(parseInt(e.target.value))}
            fullWidth
          >
            {communes?.map((commune) => (
              <MenuItem key={commune.ID} value={commune.ID}>
                {commune.labele}
              </MenuItem>
            ))}
          </TextField>
    
          <TextField
            margin="dense"
            id="pwd"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="pwd-confirm"
            label="Confirmer le mot de passe"
            type={showPassword ? "text" : "password"}
            value={pwd_confirm}
            onChange={(e) => setPwd_confirm(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone-number"
            label="Numéro de téléphone"
            type="tel"
            value={newUserPhone}
            onChange={(e) => setNewUserPhone(e.target.value)}
            fullWidth
          />
          <div>
            <InputLabel id="function-label">
              Fonction de l'utilisateur
            </InputLabel>
            <Select
              labelId="function-label"
              id="user-function"
              value={newfunction}
              onChange={(e) => setNewFunction(e.target.value)}
              fullWidth
            >
              <MenuItem value="admin">Chef de projet</MenuItem>
              <MenuItem value="reponsable">Reponsable commande</MenuItem>
            </Select>
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
