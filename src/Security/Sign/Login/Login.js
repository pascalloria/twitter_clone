import { Form, Button} from "react-bootstrap";
import { toast } from "react-toastify";
import { checkValidity } from "../../../shared/utility";
import routes from "../../../config/routes"
import { useState } from "react";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

// components
import Input from "../../../component/UI/Input/Input";

const Login = (props) => {



    const [valid,setValid]= useState(false);
    const navigate = useNavigate() 

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
        }
    });


    // Permet la connection de l'utilisateur en fonction de son email et de son password
    const loginClickHandler = ()=> {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, inputs.email.value ,inputs.password.value)
        .then( userCredential => {   
            // redirection        
            navigate(routes.HOME)
            // notificaiton
            toast("Vous êtes connecté")
           
        })
        // Notification en fonction des erreurs
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
            <Form className=" pt-3 mt-xl-5 px-5" onSubmit={(e)=> props.formHandler(e) }>
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
            
            <div >     
                {form}                
                <Button variant="primary" type="submit" onClick={loginClickHandler} disabled={!valid}>Connection</Button>
            </div>
        </>
        
     );
}
 
export default Login;