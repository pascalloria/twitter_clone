import { Card } from "react-bootstrap";

const SideItem = (props) => {
    return (  
        <li className="list-group-item mt-2">
            <a className="text-decoration-none text-body "  href={props.link}>
                <Card className="cardLink p-2">
                    <Card.Title className="bg-primary text-white">
                        {props.titre}
                    </Card.Title>
                    <Card.Text>
                        {props.content}
                    </Card.Text>
                </Card>
            </a>
        </li>

    );
}
 
export default SideItem;