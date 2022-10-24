import React, { useState } from "react";

/* import styled from "styled-components"; */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import Cadastro from "./components/Cadastro";
import Habitos from "./components/Habitos"
import Hoje from "./components/Hoje"
import Historico from "./components/Historico"
import  Login_context  from "./providers/loginContext";



export default function App() {
    const [user,setUser] = React.useState({
        id: 0,
        name: "teste",
        image: "https",
        email: "gmail",
        password: "****",
        token:"0000",
        listaHabitosHoje:[]
    }); 

    return (
        <Login_context.Provider value ={{user,setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje/" element={< Hoje />} />
                    <Route path="/historico" element={< Historico />} />
                </Routes>
            </BrowserRouter>
        </Login_context.Provider>
    );

}

/* const ContainerPage = styled.div`
    display:flex;
    flex-direction:column;
    
` */