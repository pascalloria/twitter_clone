import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios-firebase"
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import routes from "../../config/routes";

// components
import ProfilInfo from "./ProfilInfo/ProfilInfo";
import Tweets from "../Tweets/Tweets";
import { UserContext } from "../../Context/user-context";


const Profil = (props) => {

    // states
    const userLog = useContext(UserContext)
    const id = useParams().id
    const [cible,setCible]=useState("")    
    const [user , setUser] = useState({...userLog})
    

    useEffect(()=>{
        axios.get("users/" + id +".json")       
        .then (response => {            
            setCible(response.data)
        })
        .catch (error => {
            console.log (error)
        })
    },[id])

    useEffect(()=>{
        if(!user.follow){    
            console.log("Pas de follow")              
            let newUser = {
                ...userLog,
                follow:[]
            };

            setUser(newUser)  
            console.log (newUser)        
        }
    },[userLog,user.follow])

    // function

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

            // retire l'uid du profil dans le tableau des follow

            newUser.follow = newUser.follow.filter(f => f !== cible.id);  

            // Method put pour mettre a jour l'utilisateur dans la BDD firebase
            axios.put("users/" + user.id +".json", newUser)
            .then (response => {
                console.log(response)
                setUser(newUser)               
                props.callback()    
            })
            .catch (error =>{
                console.log(error)
            }) 
        }
        
    }   
    // variable

    let filterArray=[cible.id]

    return (
        <>
            
            <Card className="mt-5" >
                <Card.Img variant="top" src="https://pbs.twimg.com/media/CcsnDQKWIAAXTUP?format=jpg&name=900x900" />
                <Card.Header className="d-flex justify-content-center flex-wrap gap-xl-3 align-items-center"> 
                    <Card.Title><h3 className="mb-0 overflow-hidden text-break ">{cible.nickname }</h3></Card.Title> 
                    { !user.id || !cible.id || user.id === cible.id ?
                        <Link to={routes.PROFILCONF}><Button className="text-end " variant="outline-danger">Modifier le profil</Button></Link>
                        : null
                    }
                    

                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        
                        <ProfilInfo label="Bio" info={cible.bio} ></ProfilInfo>
                        <ProfilInfo label="Disponibilité" info={cible.dispo} ></ProfilInfo>
                        <ProfilInfo label="Localisation" info={cible.location} ></ProfilInfo>
                        <ProfilInfo label="Systemes" info={cible.jeux} ></ProfilInfo>   
                        
                    </Card.Text> 
                </Card.Body>
                { cible.id !== user.id && user.follow ? 

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