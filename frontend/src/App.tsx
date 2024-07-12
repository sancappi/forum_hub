import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Delete from "./pages/user/Delete";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Create from "./pages/topics/Create";
import Topic from "./pages/topics/Topic";
import Topics from "./pages/topics/Topics";
import Update from "./pages/topics/Update";
import { Private, Anonymous } from './components/Auth';

const App = () => {
  return (
    <>
      <Routes>
          <Route element={ <Anonymous /> }>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
          </Route>
          
          <Route element={ <Private /> }>
              <Route path="/" element={<Home />} />
              <Route path="/delete" element={<Delete />} />
              <Route path="/create" element={<Create />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topic/:id" element={<Topic />} />
              <Route path="/update/:id" element={<Update />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
