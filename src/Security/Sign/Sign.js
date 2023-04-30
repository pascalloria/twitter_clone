// librairies
import { useState } from "react";
import { checkValidity } from "../../shared/utility";
import { Button, ButtonGroup } from "react-bootstrap";

// components
import Login from "./Login/Login";
import Register from "./Register/Register";

const Sign = () => {

    // Ce composant gere l'affichage de la zone d'inscription et de connection.
    
    // state 
    const [login,setLogin]= useState(true);  

    // Methods
    // empeche le rechargement de la page lors de la soumission du formulaire.
    const formHandler = (e)=> {
        e.preventDefault()        
    }


    return ( 

       <div>
            <h1 className="my-5">{login ? "Connection": "Inscription" }</h1>       
            <ButtonGroup>
                {/* Selon le bouton cliquer on appel le composant Login ou Register  */}
                <Button onClick={()=>{setLogin(true)}}>Connection</Button>
                <Button onClick={()=>{setLogin(false)}}>Inscription</Button>
            </ButtonGroup>
            {login ? 
                <Login  formHandler={(e)=>formHandler(e)} />
                :  <Register formHandler={(e)=>formHandler(e)} />
            }
       </div>
    );
}
 
export default Sign;