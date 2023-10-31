import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PageHome from "./Components/PageHome/PageHome";
import PageProduct from "./Components/PageProduct/pageProduct";
import PageMenu from "./Components/PageMenu/PageMenu";
import PageTables from "./Components/PageTables/PageTables";
import PageWaiters from "./Components/PageWaiters/PageWaiters";
import PageRequests from "./Components/PageRequests/PageRequests";
import PageSettings from "./Components/PageSettings/PageSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/pageProduct" element={<PageProduct />} />
        <Route path="/PageMenu" element={<PageMenu />} />
        <Route path="/PageTables" element={<PageTables />} />
        <Route path="/PageWaiters" element={<PageWaiters />} />
        <Route path="/PageRequests" element={<PageRequests />} />
        <Route path="/PageSettings" element={<PageSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
