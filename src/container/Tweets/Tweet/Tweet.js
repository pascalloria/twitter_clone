// libraries
import moment from "moment/moment";
import { Card,Button} from "react-bootstrap";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../config/routes"
import { Link } from "react-router-dom";

const Tweet = (props) => {

    moment.locale("fr")
    return (
        <>

       
        <Card className="mt-4">
            <Card.Header>
                <Card.Title>{props.tweet.titre}</Card.Title>                 
            </Card.Header>
            <Card.Body>
                <Card.Text >
                    {props.tweet.Contenu}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <div>
                    Ecrit par :<b> <Link to={routes.PROFIL + "/" +props.tweet.auteurId}>{props.tweet.auteur}</Link></b> 
                </div>
                <div>
                    {moment(props.tweet.date).calendar() }
                </div>
                <Button variant="outline-dark" onClick={() => props.deleteHandler(props.tweet.id)} ><FontAwesomeIcon icon={faTrashAlt}/></Button>

            </Card.Footer>
        </Card>

        </>
       
    );
}
 
export default Tweet;