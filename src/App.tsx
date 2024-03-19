import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import {theme}from "./theme/theme"
import { CssBaseline, ThemeProvider } from "@mui/material";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/report" element={<Report />}></Route>
            {/* 何にもマッチしなかった場合 */}
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
