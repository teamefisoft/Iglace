import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@material-tailwind/react";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCapcity } from "../../features/capacity/actions";
import {
  getAllProducts,
  createProducts,
} from "../../features/products/actions";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";

function CreateProductBtn() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const capacity = useSelector((state) => state.capacity.capacity.data);
  const agentId = useSelector((state) => state.user.agent_ID);
  const userCreatedId = useSelector((state) => state.user.user_ID);

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);

  const [productDescription, setProductDescription] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [unit_quatity, setUnit_quatity] = useState();
  const [ID_currency, setID_currency] = useState(1);
  const [is_available, setIs_available] = useState();

  const [saleSiteId, setSaleSiteId] = useState(1);
  const [lines, setLines] = useState([]);

  const handleLineChange = (index, field, value) => {
    const updatedLines = [...lines];
    updatedLines[index] = {
      ...updatedLines[index],
      [field]: value,
    };
    setLines(updatedLines);
  };

  const handleAddLine = () => {
    setLines([...lines, {}]);
  };

  const handleRemoveLine = (index) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCapcity());
  }, []);

  const handleSubmit = async () => {
    if (
      !productDescription ||
      !unit_price ||
      !userCreatedId ||
      !unit_quatity ||
      !is_available ||
      ID_currency === 0
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newProduct = {
      description: productDescription,
      unit_price: unit_price,
      unit_quatity: unit_quatity,
      ID_user_created_at: userCreatedId,
      ID_currency: ID_currency,
      is_available: is_available,
    };

    dispatch(createProducts(newProduct))
      .unwrap()
      .then(() => {
        setProductDescription("");
        setUnit_price(""); 
        setUnit_quatity("");
        setIs_available(""); 
        closeCreate();
        toast.success("Produit créée avec succès");
        dispatch(getAllProducts());
      })
      .catch((err) => {
        toast.error(`${err}`);
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        className="bg-[#8C461F] h-[2rem] items-center flex"
        onClick={openCreate}
      >
        <Add /> Nouveau produit
      </Button>
      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Votre commande</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description du produit"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="prix"
            label="Prix unitaire"
            value={unit_price}
            onChange={(e) => setUnit_price(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            type="number"
            id="prix"
            label="Quantiter unitial"
            value={unit_quatity}
            onChange={(e) => setUnit_quatity(e.target.value)}
            fullWidth
          />
          <div className="mt-3">
            <FormControl fullWidth>
              <TextField
                label="En stock"
                labelId="valide"
                id="valide"
                value={is_available}
                onChange={(e) => setIs_available(e.target.value)}
                select // Ajouter l'attribut select pour indiquer que c'est un select
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
              </TextField>
            </FormControl>
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
            onClick={handleSubmit}
          >
            Valider
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateProductBtn;
