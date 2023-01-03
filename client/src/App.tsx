import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/MyProfile";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import GlobalStyles from "./utils/globalStyles";
import { ThemeProvider } from "styled-components";
import { light, dark, workedinScheme } from "./utils/themes";
import Contracts from "./pages/Contracts";
import SinglePost from "./components/postComp/SinglePost";
import UserProfile from "./pages/UserProfile";

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
          <Route path="/profile/me" element={<Profile />} />
          <Route path="/profile/:name" element={<UserProfile />} />
          <Route path="/posts/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;