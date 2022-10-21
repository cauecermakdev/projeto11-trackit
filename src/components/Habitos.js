import styled from "styled-components";
import TopoMenu from "./TopoMenu";
import GlobalStyle from "../GlobalStyle";
import { useState } from "react";
import axios from "axios";
/* import imgRedondaAzul from "../assets/img/roundBlue.png";
import imgArco from "../assets/img/arco.png";


import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'; */



export default function Habitos() {
    const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [diasClicados, setDiasClicados] = useState([]);
    const [name, setName] = useState("");
    const [addClicado,setAddClicado] = useState(false);

    function jaFoiClicado(indiceDia) {
        if (diasClicados.includes(indiceDia)) {
            const novoArray = diasClicados.filter((item) => {
                if (item !== indiceDia) {
                    return item + 1;
                }
            })
            console.log("aqui", novoArray);
            setDiasClicados(novoArray);
            return true;
        }

    }

    function diaClicado(indiceDia) {

        if (jaFoiClicado(indiceDia)) {
            return;
        };

        console.log(indiceDia);
        const diasClicadosNovo = [...diasClicados, indiceDia];
        console.log(diasClicadosNovo);
        setDiasClicados(diasClicadosNovo);
    }

    function doNothing() {
        return;
    }

    function cancelarCriacaoHabito(){
        const arrayVazio = [];
        setDiasClicados(arrayVazio);

        setName("");

        setAddClicado(false);
    }

    function salvarHabito(event){
         event.preventDefault(); // impede o redirecionamento 
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                {
                    name: name,
                    days: diasClicados 
                }
            );

            console.log(  {
                    name: name,
                    days: diasClicados 
                });
           
    
            requisicao.then(resposta => {
                console.log("foi",resposta.data);
            });

            requisicao.catch((erro)=>console.log(erro));
    }

    return (
        <ContainerHabitos>
            <GlobalStyle></GlobalStyle>
            <TopoMenu></TopoMenu>
            <MeusHabitos>
                <HeaderHabitos>
                    <p>Meus Hábitos</p>
                    <button onClick={()=>setAddClicado(true)}>+</button>
                </HeaderHabitos>

                <p className="semHabitos">
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </p>

                <CardCriaHabito className={!addClicado?"display-none":doNothing()}>
                    <form onSubmit={(e) => salvarHabito(e)}>
                        <input name="nomeHabito" type="text" placeholder="nome do hábito"  onChange={ e => setName(e.target.value)} value={name}  ></input>

                        <div className="divDiasDasemana">
                            {diasDaSemana.map((dia, i) =>
                                <Dia key={i}
                                    className={diasClicados.includes(i) ? "clicado" : doNothing()}
                                    onClick={() => diaClicado(i)}>

                                    {dia}
                                </Dia>)}
                        </div>

                        <ActionsHabitos>
                            <p onClick ={()=> cancelarCriacaoHabito()}>Cancelar</p>
                            <button type="submit">Salvar</button>
                        </ActionsHabitos>
                    </form>
                </CardCriaHabito>


            </MeusHabitos>
        </ContainerHabitos>

    );
}



const ActionsHabitos = styled.div`
    margin-top:29px;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    width:100%;
    font-size:21px;
    
    
    button{
        font-size:21px;
        margin-left:20px;
        background-color:#52B6FF;
        width:84px;
        height:35px;
        border-radius:3px;
        color: white;
        border:0px;
    }

    p{
        color:#52B6FF;
    }
`

const CardCriaHabito = styled.div`
    margin-top:20px;
    padding: 18px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    .divDiasDasemana{
        display:flex;
        align-items:center;
        justify-content:flex-start;
    }
`

const Dia = styled.div`
        display:flex;
        align-items:center;
        justify-content:center;
        margin:2px;
        color:#D4D4D4;
        font-size:20px;
        width:30px;
        height: 30px;
        border:1px solid #D4D4D4;
        border-radius:5px;

        &.clicado{
            background-color:#CFCFCF;
            color:white;
        }
    `

const ContainerHabitos = styled.div`
        background-color:#E5E5E5;
        height:100vh;

        .display-none{
            display:none; 
            
        }
        
`

const MeusHabitos = styled.div`
    font-family: 'Lexend Deca', sans-serif; 
    margin:28px 17px;
    height:100%;
    

    .semHabitos{
        color:#666666;
        font-size:18px;
        line-height: 22px;
        font-weight:400;
        margin-top:29px;
    }

`

const HeaderHabitos = styled.div`
    padding-top:70px;
    display:flex;
    justify-content:space-between;

    p{
        font-size:23px;
        color:#126BA5;
        font-weight:400;
    }

    button{
        color:white;
        background-color:#52B6FF;
        font-size:27px;
        border-radius:5px;
        border:0px;
        width:40px;
        font-weight:400;
    }
`