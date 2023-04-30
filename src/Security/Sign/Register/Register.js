import { Form, Button, ButtonGroup } from "react-bootstrap";
import axios from "../../../config/axios-firebase"
import { toast } from "react-toastify";
import { checkValidity } from "../../../shared/utility";
import routes from "../../../config/routes"
import { useState } from "react";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

// components
import Input from "../../../component/UI/Input/Input";


const Register = (props) => {

    // state    
    const navigate = useNavigate()
    const [valid,setValid]= useState(false);

    // Définition des eléments du formulaire ainsi que leurs parametres
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
            errorMessage : "Le mot de passe doit etre renseigné et possédé au moins 6 charcateres ",
            touched: false
        },
        verifyPassword : {
            elementType:"input",
            elementConfig :{
                type:"password",
                placeholder :"Mot de passe"
            },
            value: "",
            label: "Verifier le Mot de passe",
            valid: false,
            validation: {
                required:true,
                minLength : 6,                   
            },
            errorMessage : "Le mot de passe doit etre renseigné et possédé au moins 6 charcateres et les 2 mots de passe doivent etre identiques",
            touched: false
        },      
    });

    


    // Permet l'inscription de l'utilisateur en fonction de son email et de son password
    // ainsi que la creation de l'utilisateur relié dans la BDD.

    const registerClickHandler = ()=> {
        if( inputs.password.value === inputs.verifyPassword.value){
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth,inputs.email.value ,inputs.password.value )
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;  
                // creation de l'utilisateur dans la BDD lié avec son uid      
                axios.post("/users.json",{uid: user.uid,nickname : "user"+Math.floor(Math.random()*100) })
                .then( response => { 
                    // redirection
                    navigate(routes.HOME)
                    // Notification
                    toast("Vous etes inscrit ! Merci de renseigné votre profil")
                })           
            
            })
                    // Notification en fonction des erreurs

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
        }else {
            toast("Les 2 mots de passes doivent correspondre")
        }
       
    }
    
    // Met a jours les donnée du formulaire lors du remplissage des inputs
    // Verifie la validité des informations saisie.
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


    // Creation d'un tableau qui contient les élements du formulaire
    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }

    // Creation du formulaire en appelent le composant Input pour tous les elements du tabeau.
    let form= (
        <>       
            <Form className="pt-3 px-5" onSubmit={(e)=> props.formHandler(e) }>
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
            </Form>  
        </>
    )   



    return ( 
       <>
            {form}  
            <Button variant="primary" type="submit" onClick={registerClickHandler} disabled={!valid}>Inscription</Button>

       </> 
       


     );
}
 
export default Register;