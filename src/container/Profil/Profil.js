import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios-firebase"
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import routes from "../../config/routes";
import img from "../../img/numbers-closeup-metal-dice-gold-Dungeons-and-Dragons-229829-wallhere.com.jpg"
import { UserContext } from "../../Context/user-context";

// components
import ProfilInfo from "./ProfilInfo/ProfilInfo";
import Tweets from "../Tweets/Tweets";



const Profil = (props) => {

    // ce composant affiche les informations de l'utilisateur ainsi que ces tweet il depend de l'id de l'url

    // states
    const userLog = useContext(UserContext)
    // récuperation des parametre de l'url
    const id = useParams().id
    const [cible,setCible]=useState("")    
    const [user , setUser] = useState({...userLog})
    

    useEffect(()=>{
        // recuperation des donnée de l'utilisateur ciblé
        axios.get("users/" + id +".json")       
        .then (response => {            
            setCible(response.data)
        })
        .catch (error => {
            console.log (error)
        })
    },[id])

    useEffect(()=>{
        // Si l'utilisateur n'a pas de tableau avec les personnes suivis on en créer un
        if(!user.follow){                           
            let newUser = {
                ...userLog,
                follow:[]
            };
            setUser(newUser)                     
        }
    },[userLog,user.follow])

    // function

    // Function pour suivre un utilisateur
    const followHandler = () => {
        
        let newUser = {
            ...user
        };
        // on verifie que l'on est pas sur notre profil        
        if (cible.id !== user.id){
            // ajoute l'uid du profil dans le tableau des follow
            newUser.follow.push(cible.id);  
            // Method put pour mettre a jour l'utilisateur dans la BDD firebase
            axios.put("users/" + user.id +".json", newUser)
            .then (response => {                     
                setUser(newUser) 
                // on appelle la callback pour signaler une modification au composant parents.                  
                props.callback()       
            })
            .catch (error =>{
                console.log(error)
            }) 
        }
        
    }

    const unfollowHandler = () => {         
        let newUser = {
            ...user
        };        
        // on verifie que l'on est pas sur notre profil        
        if (cible.id !== user.id){

            // retire l'uid du profil dans le tableau des follow a l'aide de "filter"

            newUser.follow = newUser.follow.filter(f => f !== cible.id);  

            // Method put pour mettre a jour l'utilisateur dans la BDD firebase
            axios.put("users/" + user.id +".json", newUser)
            .then (response => {
                console.log(response)
                setUser(newUser)   
                 // on appelle la callback pour signaler une modification au composant parents.              
                props.callback()    
            })
            .catch (error =>{
                console.log(error)
            }) 
        }
        
    }   
    // variable

    // Definit l'option de filtrage pour obtenir les tweets de la cible
    let filterArray=[cible.id]

    return (
        <>
            
            <Card className="mt-2" >
                <Card.Img variant="top" src={img} />
                <Card.Header className="d-flex justify-content-center flex-wrap gap-2 align-items-center"> 
                    <Card.Title><h3 className="mb-0 overflow-hidden text-break ">{cible.nickname }</h3></Card.Title> 
                    { !user.id || !cible.id || user.id === cible.id ?
                        <Link to={routes.PROFILCONF}><Button className="text-end " variant="outline-danger">Modifier le profil</Button></Link>
                        : null
                    }
                    

                </Card.Header>
                <Card.Body className="py-0">
                    <Card.Text >                        
                        <ProfilInfo label="Bio" info={cible.bio} ></ProfilInfo>
                        <ProfilInfo label="Disponibilité" info={cible.dispo} ></ProfilInfo>
                        <ProfilInfo label="Localisation" info={cible.location} ></ProfilInfo>
                        <ProfilInfo label="Systemes" info={cible.jeux} ></ProfilInfo>
                    </Card.Text> 
                </Card.Body>

                { userLog && cible.id !== user.id && user.follow ? 
                    
                    <Card.Footer>
                       
                        {user.follow.includes(cible.id) ?
                            <Button onClick={unfollowHandler}>
                                Ne plus Suivre
                            </Button>
                        : 
                            <Button onClick={followHandler}>
                                Suivre
                            </Button>
                            
                        }  
                        
                    </Card.Footer>
                : null}
            </Card>
            <hr />
            <h3 className="mt-2">{userLog.id === cible.id ? <span>Mes Tweets</span> : <span> Ses Tweets </span> }</h3>
            <Tweets user={userLog} filter={filterArray}/>
        </>         

    );
}

export default Profil;