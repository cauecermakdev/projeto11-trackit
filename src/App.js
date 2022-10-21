import React from "react";

import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import Cadastro from "./components/Cadastro";
import Habitos from "./components/Habitos"
import Hoje from "./components/Hoje"
import Historico from "./components/Historico"

export default function App() {


    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje/" element={< Hoje />} />
                    <Route path="/historico/" element={< Historico />} />
                </Routes>
        </BrowserRouter>
    );

}

/* const ContainerPage = styled.div`
    display:flex;
    flex-direction:column;
    
` */