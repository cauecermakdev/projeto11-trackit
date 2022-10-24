import TopoMenu from "./TopoMenu";
import styled from "styled-components";

export default function Historico() {

    return (
        <>
            <TopoMenu></TopoMenu>
            <NaoEntendi>Não entendi o que era pra mostrar no histórico! </NaoEntendi>
        </>
    );
};


const NaoEntendi =styled.div`
    margin-top:100px;
    color:red;
    font-size:18px;
    color:white;
    background-color:#363636;
    border-radius:2px;
`