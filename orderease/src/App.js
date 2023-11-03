import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import PageHome from "./Components/ComponentPageHome/PageHome";
import PageProduct from "./Components/ComponentPageProduct/pageProduct";
import PageMenu from "./Components/ComponentPageMenu/PageMenu";
import PageTables from "./Components/ComponentPageTables/PageTables";
import PageWaiters from "./Components/ComponentPageWaiters/PageWaiters";
import PageRequests from "./Components/ComponentPageRequests/PageRequests";
import PageSettings from "./Components/ComponentPageSettings/PageSettings";
import PageLogin from "./Components/ComponentPageLogin/PageLogin";
import NavigationBar from "./Components/ComponentNavigationBar/NavigationBar";

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
