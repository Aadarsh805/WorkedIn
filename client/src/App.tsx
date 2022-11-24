import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Rooms from "./Pages/Rooms";
import GlobalStyles from "./Utils/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./Utils/Themes";

function App() {
  return (
    <ThemeProvider theme={light} >
    <GlobalStyles />
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

//  Profile Page Setup
//  Profile API
// --> Name, Pic, Description, About, Social Links
// Skills
// Past Projects/Contracts

// Decide a coloe scheme
// Work on Auth Pages
// Post Pages
// Profile Page
// Chat Pages
