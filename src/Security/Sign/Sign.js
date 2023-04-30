
// librairies
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkValidity } from "../../shared/utility";
import axios from "../../config/axios-firebase"
import { toast } from "react-toastify";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import routes from "../../config/routes"

// components
import Input from "../../component/UI/Input/Input";






const Sign = () => {

    // state    

    const [inputs, setInputs] = useState({
        email : {
            elementType:"input",
            elementConfig :{
                type:"email",
                placeholder :"Email"
            },
            value: "",
            label: "Email",
            valid: false,
            validation: {
                required:true,
                email: true,                
            },
            errorMessage :  "L'adresse email n'est pas valide",
            touched: false
        },
        password : {
            elementType:"input",
            elementConfig :{
                type:"password",
                placeholder :"Mot de passe"
            },
            value: "",
            label: "Mot de passe",
            valid: false,
            validation: {
                required:true,
                minLength : 6                    
            },
            errorMessage : "Le mot de passe doit etre renseigné et possédé au moins 6 charcater ",
            touched: false
        },    
    });

    const [valid,setValid]= useState(false);
  

    // function
    const inputChangeHandler = (event,id)=> {
        const newInputs = {...inputs};
        newInputs[id].value = event.target.value;
        newInputs[id].touched = true
        newInputs["email"].errorMessage="L'adresse email n'est pas valide" 
        
        // verificaiton de la valeur
        newInputs[id].valid = checkValidity(event.target.value,newInputs[id].validation); 
        setInputs (newInputs);

        // Vérification du formulaire
        let formIsValid = true ;
        for (let input in newInputs)  {
            formIsValid = newInputs[input].valid && formIsValid;            
        };
        setValid(formIsValid)
    }    
 
    const registerClickHandler = ()=> {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth,inputs.email.value ,inputs.password.value )
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;        
            axios.post("/users.json",{uid: user.uid,nickname : "user"+Math.floor(Math.random()*100)})
            .then( response => {                
                navigate(routes.PROFILCONF)
                toast("Vous etes inscrit ! Merci de renseigné votre profil")
            })           
           
        })
        .catch((error) => {
           console.log(error.code)
           switch (error.code) {
                case "auth/email-already-in-use":
                    toast.error("L'adresse email est déja utilisé. Merci d'en utilisé une autre ou de vous connecter.")                
                    break;
            
                default:
                    toast.error(error.code + ":" + error.message)                
                    break;
            }
           
        });
    }

    const loginClickHandler = ()=> {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, inputs.email.value ,inputs.password.value)
        .then( userCredential => {           
            navigate("/")
            toast("Vous êtes connecté")
           
        })
        .catch((error) => {
            console.log(error.code + ":" + error.message)
            switch (error.code) {
                case "auth/user-not-found":
                    toast.error("L'utilisateur ou le mot de passe ne corresponde pas")
                    break;
                case "auth/wrong-password":
                    toast.error("L'utilisateur ou le mot de passe ne corresponde pas")
                    break;
                case "auth/too-many-requests":
                    toast.error("L'acces à ce compte à été temporairement désactivé suite à de trop nombreuse erreurs. Veuillez réessayer plus tard ou contacter un administrateur ")
                    break; 
                default:
                    toast.error("Une erreur est survenue, Merci de contacter l'administrateur si cette erreur persiste")
                    break;
            }
        
        });

    }
    
    const formHandler = (e)=> {
        e.preventDefault()
        
    }


     // variables
     
     const navigate = useNavigate() 
     const formElementsArray = [];
     for (let key in inputs){
         formElementsArray.push({
             id:key,
             config: inputs[key]
         })         
     }
    
    let form= (
        <>
        
        <Form className="mt-5 p-5" onSubmit={(e)=> formHandler(e) }>
            {formElementsArray.map(formElement =>(                 
                <Input 
                    key             = {formElement.id}
                    id              = {formElement.id}
                    value           = {formElement.config.value}
                    label           = {formElement.config.label}
                    type            = {formElement.config.elementType}
                    config          = {formElement.config.elementConfig}
                    valid           = {formElement.config.valid}
                    touched         = {formElement.config.touched}
                    errorMessage    = {formElement.config.errorMessage}
                    changed         = {(e) => inputChangeHandler(e,formElement.id)}
                />                
                
            ))}
            <ButtonGroup >
                <Button variant="primary" type="submit" onClick={registerClickHandler} disabled={!valid}>Inscription</Button>
                <Button variant="primary" type="submit" onClick={loginClickHandler} disabled={!valid}>Connection</Button>
            
            </ButtonGroup>
        </Form>     
        </>
    )


    return ( 
        <>
            <h1>Authentification</h1>
            <div > 
                {form}
            </div>
        </>        
    );
}
 
export default Sign;