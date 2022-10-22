import React from "react";

const Login_context = React.createContext({});
/*     id: 6162,
    name: 'caue',
    image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2…ved=2ahUKEwik2Zya5u76AhVBQ7gEHcsQChsQMygBegQIARAl',
    email: 'cauecermak@gmail.com',
    password: '1234' */

export default Login_context;

/* export const LoginProvider = (props) =>{
    const user = {
        id: 6162,
        name: 'caue',
        image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2…ved=2ahUKEwik2Zya5u76AhVBQ7gEHcsQChsQMygBegQIARAl',
        email: 'cauecermak@gmail.com',
        password: '1234' 
    }
    return (
        <LoginProvider.Provider value={{user}}>
            {props.children}
        </LoginProvider.Provider>
    ) 
} */