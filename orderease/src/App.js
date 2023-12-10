import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import PageHome from "./Components/ComponentPageHome/PageHome";
import PageProduct from "./Components/ComponentPageProduct/pageProduct";
import PageMenu from "./Components/ComponentPageMenu/PageMenu";
import PageCardapio from "./Components/ComponentPageCardapio/PageCardapio";
import PageTables from "./Components/ComponentPageTables/PageTables";
import PageWaiters from "./Components/ComponentPageWaiters/PageWaiters";
import PageRequests from "./Components/ComponentPageRequests/PageRequests";
import PageSettings from "./Components/ComponentPageSettings/PageSettings";
import PageLogin from "./Components/ComponentPageLogin/PageLogin";
import NavigationBar from "./Components/ComponentNavigationBar/NavigationBar";
import HomeCardapio from "./Components/ComponentPageCardapio/homeCardapio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<LayoutWithNavbar />}>
          <Route path="/home" element={<PageHome />} />
          <Route path="/pageProduct" element={<PageProduct />} />
          <Route path="/PageMenu" element={<PageMenu />} />
          <Route path="/PageTables" element={<PageTables />} />
          <Route path="/PageWaiters" element={<PageWaiters />} />
          <Route path="/PageRequests" element={<PageRequests />} />
          <Route path="/PageSettings" element={<PageSettings />} />
        </Route>
        <Route path="/PageLogin" element={<PageLogin />} />
        <Route path="/PageCardapio" element={<PageCardapio />} />
        <Route path="/HomeCardapio" element={<HomeCardapio />} />

      </Routes>
    </Router>
  );
}

function LayoutWithNavbar() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default App;
