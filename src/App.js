import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPokemon from "./components/pages/ListPokemon";
import MyPokemonList from "./components/pages/MyPokemonList";
import PokemonDetail from "./components/pages/PokemonDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<ListPokemon />} />
          <Route path="/details" element={<PokemonDetail />} />
          <Route path="/mylist" element={<MyPokemonList />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
