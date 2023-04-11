import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = (props) => {
    return ( 
       <div className="card">
            
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div ><FontAwesomeIcon icon={faUserAlt} size="xl"/></div>  
                    <div className="card-title d-none d-lg-block flex-grow-1 ">
                        <h4>{props.nickname}</h4>
                        <p>{props.pseudo}</p>
                    </div>
                </div>
            </div>
        </div>
      
     );
}
 
export default UserCard;