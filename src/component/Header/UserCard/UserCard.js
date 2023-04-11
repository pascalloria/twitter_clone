import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

const UserCard = (props) => {
    return ( 
       <div className="card">
            
            <div className="card-body">
                <div className="d-flex justify-content-between gap-2 align-items-center">
                    <div ><FontAwesomeIcon icon={faUserAlt} size="xl"/></div>  
                    <div className="card-title d-none d-lg-block flex-grow-1 ">
                        <h4>{props.nickname}</h4>
                        <p>{props.pseudo}</p>
                    </div>

                    <div>
                        <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">                            
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Deconnection</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Option de profil</Dropdown.Item>                            
                        </Dropdown.Menu>
                        </Dropdown>
                    </div> 
                </div>
                
            </div>
        </div>
      
     );
}
 
export default UserCard;