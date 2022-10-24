import styled from "styled-components";
import TopoMenu from "./TopoMenu";
import GlobalStyle from "../GlobalStyle";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import Login_context from "../providers/loginContext";
/* import imgRedondaAzul from "../assets/img/roundBlue.png";
import imgArco from "../assets/img/arco.png";


import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'; */



export default function Habitos() {
    const { user, setUser } = useContext(Login_context);
    const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [diasClicados, setDiasClicados] = useState([]);
    const [name, setName] = useState("");
    const [addClicado, setAddClicado] = useState(false);
    const [listaHabitos, setListaHabitos] = useState([]);
    const [addRemoveHabito,setAddRemoveHabito]  = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);

        promise.then((res) => {
            console.log("lista de habitos")
            console.log(res.data);
            setListaHabitos(res.data);
        })

        promise.catch((error) => {
            console.log(error);
        })

    }, [addRemoveHabito]);

    function jaFoiClicado(indiceDia) {
        console.log("verifica se ja foi clicado indice", indiceDia);
        console.log("dias Clicados",diasClicados);

        if (diasClicados.includes(indiceDia)) {
            const novoArray = diasClicados.filter((item) => {
                if (item !== indiceDia) {
                    return item + 1;
                }
            })
            console.log("novoArray", novoArray);
            
            setDiasClicados(novoArray);
            return true;
        }

    }

    function diaClicado(indiceDia) {
        console.log("indice do dia Clicado", indiceDia);
        
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

    function cancelarCriacaoHabito() {

        setAddClicado(false);
    }


    function resetaDadosCriarHabito(){
        setName("");
        setDiasClicados([]);
    }

    function salvarHabito(event) {
        event.preventDefault(); // impede o redirecionamento 
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                name: name,
                days: diasClicados
            }, config
        );

        console.log({
            name: name,
            days: diasClicados
        });


        requisicao.then(resposta => {
            console.log("foi", resposta.data);
            setAddRemoveHabito(!addRemoveHabito);
        });

        requisicao.catch((erro) => console.log(erro));

        resetaDadosCriarHabito();

    }

    function deletarHabito(id){
        const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
    
        requisicao.then(resposta => {
            console.log("deletado >>", resposta.data);
            setAddRemoveHabito(!addRemoveHabito);
        });

        requisicao.catch((erro) => console.log(erro));
    
    }

    return (
        <ContainerHabitos>
            <GlobalStyle></GlobalStyle>
            <TopoMenu></TopoMenu>
            <MeusHabitos>
                <HeaderHabitos>
                    <p>Meus Hábitos</p>
                    <button onClick={() => setAddClicado(true)}>+</button>
                </HeaderHabitos>


                <CardHabito className={!addClicado ? "display-none" : doNothing()}>
                    <form onSubmit={(e) => salvarHabito(e)}>
                        <input name="nomeHabito" type="text" placeholder="nome do hábito" onChange={e => setName(e.target.value)} value={name}  ></input>

                        <div className="divDiasDasemana">
                            {diasDaSemana.map((dia, i) =>
                                <Dia key={i}
                                    className={diasClicados.includes(i+1) ? "clicado" : doNothing()}
                                    onClick={() => diaClicado(i+1)}>

                                    {dia}
                                </Dia>)}
                        </div>

                        <ActionsHabitos>
                            <p onClick={() => cancelarCriacaoHabito()}>Cancelar</p>
                            <button type="submit">Salvar</button>
                        </ActionsHabitos>
                    </form>
                </CardHabito>

                <p className={listaHabitos.length>0?"display-none":"semHabitos"}>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </p>

                <ListaHabitos>
                    {listaHabitos.map((n,i) =>
                        <CardHabito key ={i}>
                            <HeaderHabito>
                                <TituloHabito>{n.name}</TituloHabito>
                                <ion-icon onClick ={()=>deletarHabito(n.id)} name="trash-outline"></ion-icon>
                            </HeaderHabito>

                            <div className="divDiasDasemana">
                                {diasDaSemana.map((dia, i) =>
                                    <Dia key={i}
                                        className={n.days.includes(i + 1) ? "clicado" : doNothing()}
                                        onClick={() => diaClicado(i + 1)}>
                                        {dia}
                                    </Dia>)}
                            </div>

                        </CardHabito>
                    )}
                </ListaHabitos>


            </MeusHabitos>
        </ContainerHabitos>

    );
}

const HeaderHabito = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    color: #666666;
`

const TituloHabito = styled.div`
    font-family: 'Lexend Deca', sans-serif; 
    margin-bottom:10px;
`


const ListaHabitos = styled.div`
`

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

const CardHabito = styled.div`
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
        

        .display-none{
            display:none; 
        }
        
`

const MeusHabitos = styled.div`
    font-family: 'Lexend Deca', sans-serif; 
    margin:28px 17px; 
    margin-bottom:200px;
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