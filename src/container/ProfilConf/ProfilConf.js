// libraries
import { useContext, useEffect, useState } from "react";
import { checkValidity } from "../../shared/utility";
import axios from "../../config/axios-firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/user-context";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

// Component
import Input from "../../component/UI/Input/Input";


const ProfilConf = (props) => {

    
    // Ce composant permet de mettre a jour les informations sur l'utilisateurs.
    // Pour cela il utilise un formulaire.

    // states   
    
    const userLog = useContext(UserContext)
    const navigate = useNavigate()
    const [infoUpdate, SetInfoUpdate] = useState(false)
    const [user, SetUser] = useState() 
    // Defini les inputs du formulaire ainsi que leur parametres  
    const [inputs, setInputs] = useState({
        nickname : {
            elementType:"input",
            elementConfig :{
                type:"text",
                placeholder :"Entrez votre pseudo"
            },
            value: userLog ? userLog.nickname :"" ,
            label: "Pseudo",
            valid: userLog !== "" ? true : false,
            validation: {
                required:true,
                maxLength :24                              
            },
            errorMessage :  "Le champs ne doit pas etre vide et comporter au maximum 24 caracteres",
            touched: false
        },
        bio : {
            elementType:"textarea",
            elementConfig :{
                type:"text",
                placeholder :"Quelques mots sur vous...",
                rows: 5
            },
            value:   userLog && userLog.bio ? userLog.bio : "",
            label: "Biographie",
            valid: userLog.bio !== "" ? true : false,
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
            value:   userLog && userLog.location !== "" ? userLog.location : "",
            label: "Localisation",
            valid:userLog.location !== "" ? true : false,
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
            value:  userLog && userLog.dispo !== "" ? userLog.dispo : "",
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
            value:   userLog && userLog.jeux !== "" ? userLog.jeux : "",
            label: "Jeux",
            valid: userLog.jeux !== "" ? true : false,
            validation: {       
                required : true  ,       
                maxLength :50  
                              
            },
            errorMessage :  "Merci de citer au moins un systeme de jeux, le champs doit comporter au maximum 50 caracteres",
            touched: false

        }
        
    }); 

    // Permet de charger les données deja renseigné sur la bdd depuis le context 
    // dans le formulaire.
    useEffect(()=>{
        if (userLog ){
        const newInputs = {...inputs};
        newInputs.nickname.value = userLog.nickname;
        if (userLog.bio){
            newInputs.bio.value=userLog.bio 
        }
        if (userLog.dispo){
            newInputs.disponibilité.value=userLog.dispo
        }      
        
       
        setInputs(newInputs)
        }
        
    },[userLog])

    // Récupere les informations de l'utilisateurs via la BDD
    useEffect(()=>{
        if ( userLog && userLog !== "") {
            axios.get('/users.json')
            .then (response =>{
                // en cas de succes ajouter les donéne dans un tableau
                let usersArray = []
                for (let key in response.data){
                    usersArray.push({
                        ...response.data[key],
                        id:  key
                    })
                }            
                // filtre de façon a ne garder que les donées de l'utilisateur en question
                usersArray = usersArray.filter( user => user.uid === userLog.uid)
                SetUser(usersArray[0])
            })
            .catch(error =>{
                console.log ("error : " + error)
            })
        }
    },[userLog])

    // Etat qui vérifie si le formulaire peut etre envoyé
    const [valid,setValid]= useState( userLog !== "" ? true :false );  

    // Methods

    // Lorsque les inputs sont remplis, verification de la validité des entrées en fonction 
    // des regles édites dans le formulaire et si toutes les régles sont respecté le formulaire sera
    // valide et pourra etre envoyé.
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
    
    // Envoie du formulaire  => modification des infos de l'utilisateur dans la BDD
    const formHandler =((e)=> {
        e.preventDefault()  
        // Creation d'un objet heritant des infos de l'utilisateurs avec ajout
        // des données issue du formulaire.      
        let newUser = {
            ...user,
            nickname : inputs.nickname.value,
            bio : inputs.bio.value,
            location : inputs.localisation.value,
            dispo : inputs.disponibilité.value,
            jeux : inputs.jeux.value
        }
        // envoie des donnée à la BDD
        axios.put("users/" + user.id + ".json",newUser)
        .then (response => { 
            // Met a jour le composant
            SetInfoUpdate(!infoUpdate)
            // envoie la callback pour prevenir d'une modification au parents.            
            props.callback(infoUpdate)      
            // redirige vers HOME             
            navigate("/")
            // Notifie l'utilisateur 
            toast("Le profil à été mis à jour")
        })
        .catch (error =>{
            console.log (error)
        })

    })



    // Variable

    // Créer un tableau comportant tous les elements du formulaire.
    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id:key,
            config: inputs[key]
        })         
    }

    // pour chaque élement on appelle le composant Input et on lui passe les Props

    let form = (
       
        <Form onSubmit={(e) =>formHandler(e)} className="mt-3">
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
            
            <Button variant="success" disabled={!valid} type="submit">Valider</Button>        
         </Form>
    )

    return (
       
        <>      
            <h2>Préférence du profil</h2>
            {form}  
        </>
         
      );
}
 
export default ProfilConf;