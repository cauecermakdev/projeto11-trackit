import React, { useState } from "react";

import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import Cadastro from "./components/Cadastro";
import Habitos from "./components/Habitos"
import Hoje from "./components/Hoje"
import Historico from "./components/Historico"
import  Login_context  from "./providers/login";



export default function App() {
    const [user,setUser] = React.useState({
        id: 6162,
        name: 'caue',
        image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2…ved=2ahUKEwik2Zya5u76AhVBQ7gEHcsQChsQMygBegQIARAl',
        email: 'cauecermak@gmail.com',
        password: '1234' 
    }); 

/*     const user = React.useContext(Login_context);
    console.log("context", user); */

    return (
        <Login_context.Provider value ={{user,setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje/" element={< Hoje />} />
                    <Route path="/historico/" element={< Historico />} />
                </Routes>
            </BrowserRouter>
        </Login_context.Provider>
    );

}

/* const ContainerPage = styled.div`
    display:flex;
    flex-direction:column;
    
` */