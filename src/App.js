import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import Trips from "./pages/Trips.js";
import UserProfile from "./pages/UserProfile.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
