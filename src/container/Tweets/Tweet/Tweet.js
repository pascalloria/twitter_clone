// libraries
import moment from "moment/moment";
import { Card,Button, ButtonGroup} from "react-bootstrap";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../config/routes"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Replys from "./Replys/Replys";
import { UserContext } from "../../../Context/user-context";

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

    const user = useContext(UserContext)
   

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
            <Card.Footer className="row justify-content-between align-items-center">
                <div className="small d-flex align-items-center flex-wrap col-8 gap-2 " >

                    <div >
                        {props.tweet.shared ?
                            <span className="small">Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.originalAuthorID}>{props.tweet.originalAuthor}</Link></b> </span> 
                        :   <span className="small">Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b> </span> 
                        }
                        
                    </div>
                    <div >
                        <i className="small"> <span className="d-none d-xl-inline">-</span>  {moment(props.tweet.date).calendar() }</i> 
                    </div>
                </div>
                <ButtonGroup className="col-4  h-50">
                    {props.tweet.auteurId ===user.id ?
                    <Button variant="outline-dark" onClick={() => props.deleteHandler(props.tweet.id)} ><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                    : null
                    }
                    <Button onClick={showReplyAreaHandler} ><FontAwesomeIcon icon={faReply} /> </Button> 
                    {props.tweet.auteurId !== user.id && props.tweet.originalAuthorID !== user.id ?
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
        
        <div className="d-flex justify-content-center">
            <div className="w-75" >
            <Replys  tweetID= {props.tweet.id}/>    
            </div> 
        </div>
                   
             
       
       

        </>
       
    );
}
 
export default Tweet;