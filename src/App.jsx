import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import ScreenFixed from "./pages/ScreenFixed";
import Commande from "./pages/body/Commande";
import Affectation from "./pages/body/Affectation";
import ArtistAmis from "./pages/body/SiteVente";
import Users from "./pages/body/Users";
import Operation from "./pages/body/Operation";
import Login from "./pages/login/Login";
import { loginUser } from "./features/user/actions";
import Produits from "./pages/body/Produits";

export default function App() {
  const { authenticated, data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      dispatch(loginUser({ token }));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? <Navigate to="/commande" /> : <Login />
            } /* path="/" element={<Login />} */
          />
          <Route
            path="/commande"
            element={
              authenticated ? (
                <ScreenFixed>
                  <Commande />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/produits"
            element={
              authenticated ? (
                <ScreenFixed>
                  <Produits />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/operation"
            element={
              authenticated ? (
                <ScreenFixed>
                  <Operation />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/affectation"
            element={
              authenticated ? (
                <ScreenFixed>
                  <Affectation />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/bonus"
            element={
              authenticated ? (
                <ScreenFixed>
                  <ArtistAmis />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/shop"
            element={
              <ScreenFixed>
                <ArtistAmis />
              </ScreenFixed>
            }
          />
          <Route
            path="/user"
            element={
              authenticated ? (
                <ScreenFixed>
                  <Users />
                </ScreenFixed>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/play"
            element={
              <ScreenFixed>
                <ArtistAmis />
              </ScreenFixed>
            }
          />
          <Route
            path="/music/:cardId"
            element={
              <ScreenFixed>
                <ArtistAmis />
              </ScreenFixed>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
