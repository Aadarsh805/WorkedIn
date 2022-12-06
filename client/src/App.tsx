import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import GlobalStyles from "./utils/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { light, dark, workedinScheme } from "./utils/Themes";
import Contracts from "./pages/Contracts";
import SinglePost from "./components/postComp/SinglePost";

function App() {
  return (
    <ThemeProvider theme={workedinScheme} >
    <GlobalStyles />
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/posts/:id" element={<SinglePost />} />
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
