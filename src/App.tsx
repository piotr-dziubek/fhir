import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChooseUri from "./components/ChooseUri";
import FhirAuthoriser from "./components/FhirAuthoriser";
import AuthorisedPage from "./pages/AuthorisedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<ChooseUri/>}/>
        <Route path={"/home"} element={<FhirAuthoriser redirectUri="./auth"/>}/>
        <Route path={"/fails"} element={<FhirAuthoriser redirectUri="./auth"/>}/>
        <Route path={"/auth"} element={<AuthorisedPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
