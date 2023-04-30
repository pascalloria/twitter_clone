import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import routes from "../../../../config/routes"
import { useContext } from "react";
import { UserContext } from "../../../../Context/user-context";

const Reply = (props) => {
    
    moment.locale("fr")  
    const user = useContext(UserContext)

    return ( 

        <Card>  
            <Card.Body>
                <div className="d-flex justify-content-between text-start">
                    <div className="small">
                        <b> <Link to={routes.PROFIL + "/" + props.reply.auteurID}>{props.reply.auteur}</Link></b>                    
                    
                        <i className="text-break"> - {moment(props.reply.date).calendar() }</i>
                    </div> 
                    <div>
                        { user.id === props.reply.auteurID ?
                            <Button variant="outline-dark" onClick={() => props.deleteReplyHandler(props.reply.id)} title="Supprimer"><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                            :null
                         }
                    </div>                    
                </div>               
                <Card.Text>            
                    <p className="m-0"> {props.reply.contenue} </p>                  
                </Card.Text>    
            </Card.Body>  
        </Card>
     );
}
 
export default Reply;