// libraries
import moment from "moment/moment";
import { Card,Button, ButtonGroup} from "react-bootstrap";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faReply, faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../../config/routes"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../Context/user-context";


const TweetDisplay = (props) => {

    // affichage du Tweet
    
    const user = useContext(UserContext)

    return ( 
        <Card className="mt-4">
            {props.tweet.shared ?
                <Card.Header className="bg-info py-0 m-0 ">
                    <p className="small text-start m-0"> <i>Partagé par :</i>   <b> <Link className="" to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b></p>
                </Card.Header>  
                : null    
            }
            <Card.Header className="py-1 m-0">                
                <Card.Title className="py-1 m-0 text-start">{props.tweet.titre}</Card.Title>                 
            </Card.Header>
            <Card.Body>
                <Card.Text >
                    {props.tweet.Contenu}
                </Card.Text>
            </Card.Body>
            <Card.Footer className=" row  m-0 p-1 justify-content-between align-items-center">
                <div className="small d-flex align-items-center flex-wrap col-6 gap-2 text-start" >

                    <div>
                        {props.tweet.shared ?
                            <span className="small">Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.originalAuthorID}>{props.tweet.originalAuthor}</Link></b> </span> 
                        :   <span className="small">Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b> </span> 
                        }                        
                    </div>
                    <div>
                        <i className="small"> <span className="d-none d-xl-inline">-</span>  {moment(props.tweet.date).calendar() }</i> 
                    </div>
                </div>
                <Button variant="light" className="col-1 d-flex align-items-center gap-1 p-0" onClick={props.showReplyHandler} title="Afficher les réponses" >
                    <span>{props.replysLenght} </span>
                    <FontAwesomeIcon icon={faMessage}/>
                </Button>
                { user ?
                    <ButtonGroup className="col-4  ">                    
                        {props.tweet.auteurId ===user.id ?
                        <Button variant="outline-dark" onClick={() => props.deleteHandler(props.tweet.id)} title="Supprimmer" ><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                        : null
                        }
                        <Button onClick={props.showReplyAreaHandler} title="Répondre"><FontAwesomeIcon icon={faReply} /> </Button> 
                        {props.tweet.auteurId !== user.id && props.tweet.originalAuthorID !== user.id ?
                            <Button  variant="outline-dark" onClick={()=>props.shareHandler(props.tweet)} title="Partager" ><FontAwesomeIcon icon={faShare}  style={{color: "#006400",}} /> </Button> 
                            : null
                        }                    
                    </ButtonGroup> 

                    :null
                }
                 
                
            </Card.Footer>            
        </Card>
     );
}
 
export default TweetDisplay;