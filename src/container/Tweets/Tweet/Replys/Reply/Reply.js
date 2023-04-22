import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import routes from "../../../../../config/routes"

const Reply = (props) => {
    
    moment.locale("fr")  

    return ( 

        <Card>      
            <Card.Header className="d-flex flex-wrap justify-content-between">
                <div>
                    Ecrit par :<b> <Link to={routes.PROFIL + "/" + props.reply.auteurID}>{props.reply.auteur}</Link></b> 
                </div>
                <div>
                    {moment(props.reply.date).calendar() }
                </div>
                { props.user.id === props.reply.auteurID ?
                   <Button variant="outline-dark" onClick={() => props.deleteHandler(props.reply.id)} ><FontAwesomeIcon icon={faTrashAlt}/></Button> 
                   :null
                }
                
            </Card.Header>      
            <Card.Text>
                <p> {props.reply.contenue} </p>                  
            </Card.Text>
            
        </Card>
     );
}
 
export default Reply;