import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import PageHome from "./components/PageHome/PageHome";
import PageProduct from "./components/PageProduct/pageProduct";
import PageMenu from "./components/PageMenu/PageMenu";
import PageTables from "./components/PageTables/PageTables";
import PageWaiters from "./components/PageWaiters/PageWaiters";
import PageRequests from "./components/PageRequests/PageRequests";
import PageSettings from "./components/PageSettings/PageSettings";
import PageLogin from "./components/PageLogin/PageLogin";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/pageProduct" element={<PageProduct />} />
        <Route path="/PageMenu" element={<PageMenu />} />
        <Route path="/PageTables" element={<PageTables />} />
        <Route path="/PageWaiters" element={<PageWaiters />} />
        <Route path="/PageRequests" element={<PageRequests />} />
        <Route path="/PageSettings" element={<PageSettings />} />
        <Route path="/PageLogin" element={<PageLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
