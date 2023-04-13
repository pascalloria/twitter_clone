// librairies
import { useState } from "react";
import { checkValidity } from "../../shared/utility";
import axios from "../../config/axios-firebase"


// components
import { Form, Button } from "react-bootstrap";
import Input from "../../component/UI/Input/Input";
import { propTypes } from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";

const AjouterTweet = (props) => {

       // state    

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

    // function
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
    
    const formHandler = (e)=>{
        e.preventDefault()
    }

    const postTweetHandler = ()=> {

        let newTewt = {
            titre : inputs.Titre.value,
            Contenu : inputs.Contenu.value,
            auteurId : props.user.id,
            auteur : props.user.nickname,
            date : Date.now()
        }
        axios.post("tweets.json", newTewt)
        .then (response => {
            console.log(response)
            navigate("/")
        })
        .catch (error => {
            console.log(error)
        })
    }

    
    // variable

    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }
   

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