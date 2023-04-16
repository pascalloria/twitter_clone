import { useEffect, useState } from "react";
import axios from "../../config/axios-firebase"
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";



const Profil = (props) => {

    const id = useParams().id
    const [cible,setCible]=useState("")    
    

    // if(!props.user.follow){    
    //     console.log("Pas de follow")    
    //     // let newUser = {
    //     //     ...props.user,
    //     //     follow:[]
    //     // };
    //     // setUser(newUser)        
    // }
   

    useEffect(()=>{
        axios.get("users/" + id +".json")
        .then (response => {
            setCible(response.data)
        })
        .catch (error => {
            console.log (error)
        })
    },[id])

    // function

    const followHandler = () => {
        let newUser = {
            ...props.user
        };
        // on verifie que l'on est pas sur notre profil        
        if (cible.uid !== props.user.uid){
            // ajoute l'uid du profil dans le tableau des follow
            newUser.follow.push(cible.uid);  
            // Method put pour mettre a jour l'utilisateur dans la BDD firebase
            axios.put("users/" + props.user.id +".json",newUser)
            .then (response => {
                console.log(response)                
            })
            .catch (error =>{
                console.log(error)
            }) 
        }
        
    }

    const unfollowHandler = () => {
        let newUser = {
            ...props.user
        };
        console.log(newUser)
        // on verifie que l'on est pas sur notre profil        
        if (cible.uid !== props.user.uid){
            // retire l'uid du profil dans le tableau des follow
            newUser.follow.pop(cible.uid);  
            // Method put pour mettre a jour l'utilisateur dans la BDD firebase
            axios.put("users/" + props.user.id +".json",newUser)
            .then (response => {
                console.log(response)
            })
            .catch (error =>{
                console.log(error)
            }) 
        }
        
    }

    return (
        <>
            
            <Card className="mt-5" >
                <Card.Img variant="top" src="https://pbs.twimg.com/media/CcsnDQKWIAAXTUP?format=jpg&name=900x900" />
                <Card.Header>
                    <Card.Title>{cible.nickname }</Card.Title> 

                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div className="row">
                            <div className="col-2 h3 text-start">Bio :</div>
                            <div className="col-10">{cible.bio}</div>  
                        </div>                  
                        <hr />
                        <div className="row">
                            <div className="col-6"><h3 className="text-start">Disponibilité : </h3></div>
                            <div className="col-6"><p >{cible.dispo}</p></div>  
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6"><h3 className="text-start">Localisation : </h3></div>
                            <div className="col-6"><p >{cible.location}</p></div>  
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6"><h3 className="text-start">Systeme : </h3></div>
                            <div className="col-6"><p >{cible.jeux}</p></div>  
                        </div>
                    </Card.Text> 
                </Card.Body>
                { cible.uid !== props.user.uid && props.user.follow ? 
                    <Card.Footer>
                        {props.user.follow.includes(cible.uid) ?
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


        </>
         

    );
}

export default Profil;