import { useContext, useEffect, useState } from "react";
import { checkValidity } from "../../../shared/utility";
import axios from "../../../config/axios-firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/user-context";
import Input from "../../../component/UI/Input/Input";
import { Button, Form } from "react-bootstrap";




const UserPreferences = (props) => {

    const userLog = useContext(UserContext)
    // states    

    useEffect(()=>{

    if ( userLog && userLog !== "") {
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
            usersArray = usersArray.filter( user => user.uid === userLog.uid)
            SetUser(usersArray[0])
        })
        .catch(error =>{
            console.log ("error : " + error)
        })
    }
    },[userLog])

    // variables
    const navigate = useNavigate()
    const [infoUpdate, SetInfoUpdate] = useState(false)
    const [user, SetUser] = useState()
    const [inputs, setInputs] = useState({
        nickname : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Entrez votre pseudo"
            },
            value: userLog !== "" ? userLog.nickname : "",
            label: "Pseudo",
            valid: userLog !== "" ? true : false,
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
            value:  userLog !== "" ? userLog.bio : "",
            label: "Biographie",
            valid: userLog !== "" ? true : false,
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
            value:  userLog !== "" ? userLog.location : "",
            label: "Localisation",
            valid:userLog !== "" ? true : false,
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
            value: userLog !== "" ? userLog.dispo : "",
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
            value:  userLog !== "" ? userLog.jeux : "",
            label: "Jeux",
            valid: userLog !== "" ? true : false,
            validation: {       
                required : true  ,       
                maxLength :50  
                              
            },
            errorMessage :  "Merci de citer au moins un systeme de jeux, le champs doit comporter au maximum 50 caracteres",
            touched: false

        }
        
    });

    const [valid,setValid]= useState( userLog !== "" ? true :false );  

    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }

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
            SetInfoUpdate(!infoUpdate)            
            props.callback(infoUpdate)                   
            navigate("/")
        })

    })

    
    return (
        <>      
            <h2>Préférence du profil</h2>
            {form}  
        </>
         
      );
}
 
export default UserPreferences;