// librairies
import { useContext, useState } from "react";
import { checkValidity } from "../../shared/utility";
import axios from "../../config/axios-firebase"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/user-context";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

// components

import Input from "../../component/UI/Input/Input";

const AjouterTweet = (props) => {

    // state    

    // personalisation des inputs du formulaire
    const [inputs, setInputs] = useState({
        Titre : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Titre"
            },
            value: "",
            label: "Titre",
            valid: false,
            validation: {
                required:true,
                minLength :6,                
            },
            errorMessage : "Le titre doit comporté au minimum 6 caractéres",
            touched: false
        },
        Contenu : {
            elementType:"textarea",
            elementConfig :{
                type:"text",
                placeholder :"Ecrivez votre message...",
                rows : 5
            },
            value: "",
            label: "Message",
            valid: false,
            validation: {
                required:true,
                maxLength : 280                  
            },
            errorMessage : "Le message de doit pas dépasser 280 caractères ",
            touched: false
        },    
    });


    const [valid,setValid]= useState(false);
    const navigate = useNavigate()
    const user = useContext(UserContext)

    // function

    // Gerer le comportement lors de l'ecriture dans les inputs
    const inputChangeHandler = (event,id)=> {
        const newInputs = {...inputs};
        newInputs[id].value = event.target.value;
        newInputs[id].touched = true       
        
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
    
    // empeche la redirection lors de l'envoie du formulaire
    const formHandler = (e)=>{
        e.preventDefault()
    }

    // function pour ajouter un tweet
    const postTweetHandler = ()=> {
        // créatoin de l'objet newTewt
        let newTweet = {
            titre : inputs.Titre.value,
            Contenu : inputs.Contenu.value,
            auteurId : user.id,
            auteur : user.nickname,
            date : Date.now()
        }
        // Ajout de l'objet newTweet a la base de donnée
        axios.post("tweets.json", newTweet)
        .then (response => {
            // en cas de succes redirige vers Home
            navigate("/")
            // Notification 
            toast("Message envoyé")
        })
        .catch (error => {
            console.log(error)
        })
    }

    
    // variable

    // ajouter tout les elments du formulaire dans un tableau
    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }
   
    // pour chaque élement on appelle le composant Input et on lui passe les Props
    let form = (
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
                {/* Bouton de submit */}
                <Button variant="primary" onClick={postTweetHandler} type="submit"  disabled={!valid}>Poster</Button>                
             </Form>     
        </>
    )


    return ( 
        <>
            <h2>Ecrire un Tweet</h2>
            {form}
        </>
        
     );
}
 
export default AjouterTweet;