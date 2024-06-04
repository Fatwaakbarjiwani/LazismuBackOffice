import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import NoAccessToken from "./components/NoAccessToken";
import { ToastContainer } from "react-toastify";
import ModalNotif from "./components/ModalNotif";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route
            path="/lazismubackoffice/homePage"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          ></Route>
          <Route
            path="/lazismubackoffice"
            element={
              <NoAccessToken>
                <Login />
              </NoAccessToken>
            }
          ></Route>
        </Routes>
        <ModalNotif />
      </BrowserRouter>
    </>
  );
}

export default App;
