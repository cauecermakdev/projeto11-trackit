import styled from "styled-components";
import imgRedondaAzul from "../assets/img/roundBlue.png";
import imgArco from "../assets/img/arco.png";


import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function TopoMenu() {
    const percentage = 66;
    return (
        <>
            <Topo>
                TrackIt
                <ImgProfile src="https://hubstaff-talent.s3.amazonaws.com/avatars/09bf04483370af5dff80d9d470cc5dc3" alt="foto-perfil"></ImgProfile>
            </Topo>

            <FooterHabitos>
                    <p>Hábitos</p>
                    <HojeButton>
                        <CircularProgressbar
                            value={percentage}
                            text={`Hoje`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent",
                                textSize: "18px"
                            })}
                        />
                        
                    </HojeButton>
                    <p>Históricos</p>
                </FooterHabitos>
        </>
    );
};

const HojeButton = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:91px;
    height:91px;

    img{
        position:fixed;
    }
`


const FooterHabitos = styled.div`
    position:fixed;
    background-color:white;
    height:70px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#52B6FF;
    font-size:18px;
    bottom:0px;
    left:0px;
    
    p{
        margin:0px 30px;
    }
`

const HeaderHabitos = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;

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

const Topo = styled.div`
    box-sizing:border-box;
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:0px 18px;
    font-size:40px;
    height:70px;
    color:white;
    background-color:#126BA5;
    font-family: 'Playball', cursive;
`

const ImgProfile = styled.img`
    width:51px;
    height:51px;
    border-radius:50px;
`