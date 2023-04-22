// libraries
import moment from "moment/moment";
import { Card,Button, ButtonGroup} from "react-bootstrap";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../config/routes"
import { Link } from "react-router-dom";
import { useState } from "react";
import Replys from "./Replys/Replys";

const Tweet = (props) => {
    const [replyFormShowed,setReplyFormShowed] = useState(false)
    const [valueTextArea,setValueTextArea]= useState("")      
    moment.locale("fr")

    //methods

    const showReplyAreaHandler = ()=> {
        setReplyFormShowed(!replyFormShowed)
    }

    const onChangeTexteArea = (e)=> {        
        setValueTextArea(e.target.value)
    }

    
   

    return (
        <>

       
        <Card className="mt-4">
            <Card.Header>
            {props.tweet.shared ?
              <p> <i>Partager par :</i>   <b> <Link to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b></p>  
            : null    
            }
                <Card.Title>{props.tweet.titre}</Card.Title>                 
            </Card.Header>
            <Card.Body>
                <Card.Text >
                    {props.tweet.Contenu}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-wrap justify-content-between">
                <div>
                    {props.tweet.shared ?
                        <p>Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.originalAuthorID}>{props.tweet.originalAuthor}</Link></b> </p> 
                    :   <p>Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b> </p> 
                    }
                    
                </div>
                <div>
                    {moment(props.tweet.date).calendar() }
                </div>
                <ButtonGroup>
                    {props.tweet.auteurId === props.user.id ?
                    <Button variant="outline-dark" onClick={() => props.deleteHandler(props.tweet.id)} ><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                    : null
                    }
                    <Button onClick={showReplyAreaHandler} ><FontAwesomeIcon icon={faReply} /> </Button> 
                    {props.tweet.auteurId !== props.user.id && props.tweet.originalAuthorID !== props.user.id ?
                        <Button  variant="outline-dark" onClick={()=>props.shareHandler(props.tweet)} ><FontAwesomeIcon icon={faShare}  style={{color: "#006400",}} /> </Button> 
                        : null
                    }
                    
                </ButtonGroup>  
                
            </Card.Footer>            
        </Card>
         <div className={replyFormShowed ? "" : "d-none"}>
            <textarea onChange={onChangeTexteArea} className="my-2 w-75 rounded" name="reply" id="reply"  rows="5" placeholder="Ecrivez votre réponse ici"></textarea>
            <div className="text-end">
                <Button className="w-25 text-center "  onClick={() => {props.addReplyHandler(props.tweet.id,valueTextArea,props.tweet.auteurId);showReplyAreaHandler()}}> Envoyer </Button>    
            </div>
         </div>   

        <div className="w-75">
            <Replys user ={props.user} tweetID= {props.tweet.id}/>    
        </div>            
             
       
       

        </>
       
    );
}
 
export default Tweet;