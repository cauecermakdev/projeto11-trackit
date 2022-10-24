import { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import Login_context from "../providers/loginContext";
import TopoMenu from "./TopoMenu";
import GlobalStyle from "../GlobalStyle";

export default function Hoje() {
    const [iconeClicado,setIconeClicado] = useState(false);

    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    var d = new Date();

    const userContext = useContext(Login_context);
    /* const listaHabitosHoje = userContext.user.listaHabitosHoje; */
    const [listaHabitosHoje,setListaHabitosHoje] = useState([]);
    
    const [checkHabito,setCheckHabito] = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${userContext.user.token}` }
    }

    useEffect(() => {
        const response = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
        );

        response.then((res) =>{
            setListaHabitosHoje(res.data)
/*             userContext.user.listaHabitosHoje = res.data;  */
         }
         );
        response.catch((error)=>console.log(error));
    }, [checkHabito]);
    

    function doNothing(){
        return
    }

    function selecionaHabito(n){
        if(listaHabitosHoje.includes(n)){
        console.log("n: ", n)
        console.log("selecionaHabito - id: ", n.id)
        const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${n.id}/check`,null, config);

        requisicao.then(()=>setCheckHabito(!checkHabito));
        requisicao.catch(erro => console.log("erro",erro));
        }
    }

    function tarefasConcluidasPorCento(){
        let contCheck = 0;

        listaHabitosHoje.forEach(element => {
            if(element.done){
                contCheck++;
            }
        });
  
        if(contCheck !== 0){
            let porcentoConcluido = (contCheck/listaHabitosHoje.length)*100;
            return Math.round(porcentoConcluido);
        } else{
            return 0;
        }
        
    }

    function deselecionaHabito(n){
        const response = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${n.id}/uncheck`,
        null,config);

        response.then(() => setCheckHabito(!checkHabito));
        response.catch((error)=>console.log("erro no checkUncheck",error));
        
    }

    function checkUncheck(n){

        if(n.done === true){
            deselecionaHabito(n);

        }else{
            selecionaHabito(n);
        }
    }

    return (
        <ContainerHoje>
            <GlobalStyle></GlobalStyle>
            <TopoMenu></TopoMenu>
            <HeaderHabitos>
                <p className ="title">{semana[d.getDay()]} - {d.getDate()}/{d.getMonth()}</p>
                <p className ="tarefasConcluidas">{ tarefasConcluidasPorCento()}% dos hábitos concluídos </p>
            </HeaderHabitos>

            {listaHabitosHoje.map((n,i) =>
                <CardHabito key={i}>
                    <div>
                        <TituloHabito>{n.name}</TituloHabito>
                        <p>Sequencia atual: {n.currentSequence} dias</p>
                        <p>Sequencia recorde: {n.highestSequence} dias</p>
                    </div>
                    
                    <IconCheck  done = {n.done}/* onClick = {() => checkUncheck(n)} */>
                        <ion-icon 
                            onClick = {() => checkUncheck(n)}
                            /* class = {n.done?"select":"unselect"}  */
                            class = "check"
                            name="checkbox">
                        </ion-icon>
                    </IconCheck>
                </CardHabito>

            )}
        </ContainerHoje>
    );
};

const IconCheck = styled.div`

    .check{
        color:${props => props.done == true? "#8FC549":"#e7e7e7"};
    }
    
    font-size:69px;

    .select{
        color:#8FC549;
    }

    .unselect{
        color: #e7e7e7;
    }
`

const ContainerHoje = styled.div`
        background-color:#E5E5E5;
        font-family: 'Lexend Deca', sans-serif; 
        padding:0px 18px 100px 18px;
        padding:18px 18px 120px 18px;

`

const TituloHabito = styled.div`
    font-family: 'Lexend Deca', sans-serif; 
    margin-bottom:10px;
    font-size:20px;
    font-weight:400;
    color:#666666;

`


const CardHabito = styled.div`
    margin-top:20px;
    padding: 18px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    align-items:center;
    justify-content:space-between;

    .divDiasDasemana{
        display:flex;
        align-items:center;
        justify-content:flex-start;
    }

    p{
        font-size:13px;
        color:#666666;
        font-weight:400;
    }
`


const HeaderHabitos = styled.div`
    
    padding-top:70px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    .title{
        margin:28px 0px 0px 0px;
        font-size:23px;
        color:#126BA5;
        font-weight:400;
    }

    .tarefasConcluidas{
        color: #8fc549;
        font-size:18px;
        margin-top:5px;
    }

`
