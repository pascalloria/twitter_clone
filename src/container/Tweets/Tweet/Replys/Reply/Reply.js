import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import routes from "../../../../../config/routes"
import { useContext } from "react";
import { UserContext } from "../../../../../Context/user-context";

const Reply = (props) => {
    
    moment.locale("fr")  
    const user = useContext(UserContext)

    return ( 

        <Card>  
            <Card.Body>
                <Card.Text>            
                    <p className="m-0"> {props.reply.contenue} </p>                  
                </Card.Text>
            </Card.Body>    
                 
            
            <Card.Footer className="d-flex flex-wrap justify-content-between">
                <div>
                    Ecrit par :<b> <Link to={routes.PROFIL + "/" + props.reply.auteurID}>{props.reply.auteur}</Link></b> 
                </div>
                <div>
                    {moment(props.reply.date).calendar() }
                </div>
                { user.id === props.reply.auteurID ?
                   <Button variant="outline-dark" onClick={() => props.deleteHandler(props.reply.id)} ><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                   :null
                }
                
            </Card.Footer> 
            
        </Card>
     );
}
 
export default Reply;