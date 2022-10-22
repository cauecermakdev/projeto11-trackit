import logo from "../assets/img/trackitLogo.png";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Login_context from "../providers/login";


export default function Login() {
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [token,setToken] = useState("");
    const navigate = useNavigate();

    const {user,setUser}  = useContext(Login_context);
    console.log("aqui",user.name);

    function estaPreenchido() {
        if (email == "" || senha == "") {
            alert("Preencha os campos abaixo");
            return false;
        }
        return true;
    }

    function logar(event) {

         event.preventDefault(); // impede o redirecionamento 

        if (!estaPreenchido()) {
            return;
        };

        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: email,
            password: senha
        });


        if (requisicao === undefined) {
            return <img key={1} alt="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
        }

        requisicao.then(
            (resposta) => {
                setToken(resposta.data.token);
                navigate("/habitos");
                console.log(resposta.data);
            }
        );

        requisicao.catch((error) => {
            console.log(error);
            alert("Login ou Senha não correspondem");
        })


    }

    return (
        <ContainerLogin>
            <GlobalStyle></GlobalStyle>
            <Logo src={logo} alt="logoTrackit"></Logo>
            <form onSubmit={(e) => logar(e)}>
                <InputsContainer>
                    <input name="email" type="text" placeholder="email" onChange={e => setEmail(e.target.value)} /* value={email} */></input>
                    <input name="senha" type="text" placeholder="senha" onChange={e => setSenha(e.target.value)} /* value={senha} */></input>
                </InputsContainer>

                <div className="centerFlex" >
                    <Button type="submit" onClick={(e) => logar(e)}>Entrar</Button>
                </div>

            </form>
            <Link to={"/cadastro"} className="centerFlex">
                <CadastreLink>Não tem uma conta? Cadastre-se!</CadastreLink>
            </Link>
        </ContainerLogin>
    );
};

const Logo = styled.img`
    margin:65px 0px  32px 0px;
`

const ContainerLogin = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;    
    width:100%;
`


const InputsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    font-size:18px;
    padding:0px 24px;
    

/*     input{
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
    } */
    `



const Button = styled.button`
    margin:6px 0px 25px 0px;
    background-color:#52B6FF;
    width:100%;
    height:45px;
    border-radius:3px;
    color: white;
    font-size:21px;
    border:0px;
    
`

const CadastreLink = styled.p`
    color:#52B6FF;
    font-size:14px;
    font-weight:400;
    margin-bottom:110px;
`
