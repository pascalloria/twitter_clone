import { useEffect, useState } from "react";
import { checkValidity } from "../../../shared/utility";
import axios from "../../../config/axios-firebase";

// components
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import Input from "../../../component/UI/Input/Input";

const UserPreferences = (props) => {


    // states    

    useEffect(()=>{

    if ( props.user && props.user != "") {
        //orderBy='id'&equalTo="+props.user.uid
        axios.get('/users.json')
        .then (response =>{
            let usersArray = []

            for (let key in response.data){
                usersArray.push({
                    ...response.data[key],
                    id:  key
                })
            }            
            usersArray = usersArray.filter( user => user.uid == props.user.uid)
            SetUser(usersArray[0])
        })
        .catch(error =>{
            console.log ("error : " + error)
        })
    }
    },[])

    // variables

    const [user, SetUser] = useState()

    const [inputs, setInputs] = useState({
        nickname : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Entrez votre pseudo"
            },
            value: "",
            label: "Pseudo",
            valid: false,
            validation: {
                required:true,
                maxLength :50  
                              
            },
            errorMessage :  "Le champs ne doit pas etre vide et comporter au maximum 50 caracteres",
            touched: false
        },
        bio : {
            elementType:"textarea",
            elementConfig :{
                type:"text",
                placeholder :"Quelques mots sur vous...",
                rows: 5
            },
            value: "",
            label: "Biographie",
            valid: true,
            validation: {                
                maxLength :160              
            },
            errorMessage :  "La biographie ne peut comporter au maximum 160 charactere",
            touched: false
        },
        localisation : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Pays / Département / Ville"
            },
            value: "",
            label: "Localisation",
            valid: false,
            validation: {
                required:true,
                maxLength :70  
                              
            },
            errorMessage :  "Le champs ne doit pas etre vide merci d'indiquer au moins le pays et comporter au maximum 70 caracteres",
            touched: false
        },
        disponibilité : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Indiquez vos creneau de jeux préférentiel"
            },
            value: "",
            label: "Disponiblité",
            valid: true,
            validation: {                
                maxLength :50  
                              
            },
            errorMessage :  "Le champs doit comporter au maximum 50 caracteres",
            touched: false
        },
        jeux :{
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Systemes de jeux favoris"
            },
            value: "",
            label: "Jeux",
            valid: false,
            validation: {       
                required : true  ,       
                maxLength :50  
                              
            },
            errorMessage :  "Merci de citer au moins un systeme de jeux, le champs doit comporter au maximum 50 caracteres",
            touched: false

        }
        
    });

    const [valid,setValid]= useState(false);
    console.log (user)

    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }

    
  

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
    
    const formHandler =((e)=> {
        e.preventDefault()
        console.log("Submit")
        let newUser = {
            ...user,
            nickname : inputs.nickname.value,
            bio : inputs.bio.value,
            location : inputs.localisation.value,
            dispo : inputs.disponibilité.value,
            jeux : inputs.jeux.value
        }
        axios.put("users/" + user.id + ".json",newUser)
        .then (response => {
            console.log(response)
        })

    })




    let form = (
        
        <Form onSubmit={(e) =>formHandler(e)} className="mt-5">
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
            
            <Button variant="success" disabled={!valid} type="submit">
                Valider
            </Button>

         </Form>

        
    )

    return (
        <>  
            <h2>Préférence du profil</h2>
            {form}
            
        </>
         
      );
}
 
export default UserPreferences;