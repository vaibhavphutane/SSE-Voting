import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Voting from "./Voting";
import Header from "./components/Header";

function App() {
  const [listening, setListening] = useState(false);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3030/getOffices");
      events.onmessage = (event) => {
        const updatedOffices = JSON.parse(event.data);
        setOffices(updatedOffices);
      };
      setListening(true);
    }
  }, [listening, offices]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Voting offices={offices} />} />
          <Route path="/dashboard" element={<Dashboard offices={offices} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
