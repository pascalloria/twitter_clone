import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkValidity } from "../../shared/utility";



import Input from "../../component/UI/Input/Input";






const Sign = () => {

    // variable
    const navigate = useNavigate() 

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
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const loginClickHandler = ()=> {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, inputs.email.value ,inputs.password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/")
           
        })
        .catch((error) => {
            console.log(error.code + ":" + error.message)
        
        });

    }
    
    const formHandler = (e)=> {
        e.preventDefault()
    }

     // variables

     const formElementsArray = [];
     for (let key in inputs){
         formElementsArray.push({
             id:key,
             config: inputs[key]
         })         
     }
    
    let form= (
        <form onSubmit={(e)=> formHandler(e) }>
            {formElementsArray.map(formElement =>( 
                <Input 
                    key = {formElement.id}
                    id = {formElement.id}
                    value = {formElement.config.value}
                    label = {formElement.config.label}
                    type = {formElement.config.elementType}
                    config = {formElement.config.elementConfig}
                    valid = {formElement.config.valid}
                    touched = {formElement.config.touched}
                    errorMessage = {formElement.config.errorMessage}
                    changed = {(e) => inputChangeHandler(e,formElement.id)
                    }
                /> 
            ))}
            <div className="btn btn-succes">
                <button onClick= {registerClickHandler} disabled={!valid}>Inscription</button>
                <button onClick={loginClickHandler} disabled={!valid} >Connection</button>
            </div>
            
        </form>
    )


    return ( 
        <>
        <h1>Authentification</h1>
        <div className=""  >                 

            {form}

        </div>
    </>
        
    );
}
 
export default Sign;