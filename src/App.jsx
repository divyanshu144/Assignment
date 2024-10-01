import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Quotes from "./components/Quotes";
import CreateQuote from "./components/CreateQuote";

function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-quote" element={<CreateQuote />} />
        <Route path="/quotes" element={<Quotes />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
