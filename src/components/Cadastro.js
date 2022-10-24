import logo from "../assets/img/trackitLogo.png";
import styled from "styled-components";

import React, { useState } from "react";
/* import { useEffect } from "react"; */
import { Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import axios from "axios";

import { useNavigate } from "react-router-dom";



export default function Cadastro() {
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();


    function camposEstaoPreenchidos() {
        if (senha === "") {
            alert("insira sua senha");
            return false;
        } else if (email === "") {
            alert("insira seu email");
            return false;
        } else if (nome === "") {
            alert("insira seu nome");
            return false;
        } else if (foto === "") {
            alert("insira o link da sua foto");
            return false;
        }
    }


    function cadastrar(event) {
        console.log("entra cadastrar");
        event.preventDefault(); // impede o redirecionamento

/*          if(!camposEstaoPreenchidos()){
            alert("campos não estão preenchidos")
            return;
        };  */


        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email: email,
            name: nome,
            image: foto,
            password: senha
        });


        if (requisicao === undefined) {
            return <img key={1} alt="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
        }

        requisicao.then(resposta => {console.log("cadastrado",resposta.data);});
        requisicao.catch((error) => console.log(error));
        navigate("/");
    }



    return (
        <ContainerLogin>
            <GlobalStyle></GlobalStyle>
            <Logo src={logo} alt="logoTrackit"></Logo>
            <form onSubmit={(e) => cadastrar(e)}>
                <InputsContainer>
                    <input name="email" type="text" placeholder="email" onChange={e => setEmail(e.target.value)} /* value={email} */></input>
                    <input name="senha" type="text" placeholder="senha" onChange={e => setSenha(e.target.value)} /* value={senha} */></input>
                    <input name="nome" type="text" placeholder="nome" onChange={e => setNome(e.target.value)}  /* value={nome}  */></input>
                    <input name="foto" type="text" placeholder="foto" onChange={e => setFoto(e.target.value)}  /* value={foto}  */></input>
                </InputsContainer>

                {/* <Link to="/" className="centerFlex"> */}
                    <Button type="submit">Cadastrar</Button>
                {/* </Link> */}
            </form>
            <Link to="/" className="centerFlex">
                <LoginLink>Já tem uma conta? Faça login!</LoginLink>
            </Link>
        </ContainerLogin>
    )
};

const Logo = styled.img`
    margin:65px 0px  32px 0px;
`

const ContainerLogin = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;    
`


const InputsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    font-size:18px;
    

    input{
        margin:3px 0px;
        font-size:18px;
        font-weight:400;
        width:303px;
        height:45px;
        background-color:#FFFFFF;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        padding-left:16px;
        color: #dbdbdb;;
    }

    input:focus{
        color:#52B6FF;
    }
`



const Button = styled.button`
    margin:6px 0px 25px 0px;
    background-color:#52B6FF;
    width:303px;
    height:45px;
    border-radius:3px;
    color: white;
    font-size:21px;
    border:0px;
    
`

const LoginLink = styled.p`
    color:#52B6FF;
    font-size:14px;
    font-weight:400;
    margin-bottom:110px;
`
