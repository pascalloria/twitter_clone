import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes"
import {getAuth, signOut} from 'firebase/auth'
import { UserContext } from "../../../Context/user-context";
import { useContext } from "react";

const UserCard = (props) => {

    let navigate = useNavigate()

    const user = useContext(UserContext)
       
    const logoutClickHandler = ()=>{
        const auth = getAuth()
        auth.signOut()
        navigate("/")
    }

    return ( 
       <div className="card">
            
            <div className="card-body p-0 p-xl-3 ">
                <div className="d-flex justify-content-between gap-2 align-items-center">
                    <div ><FontAwesomeIcon icon={faUserAlt} size="xl"/></div>  
                    <div className="d-none d-xl-block flex-grow-1  ">
                        <b className="fs-4">{user.nickname}</b>                        
                    </div>

                    <div> 
                        <DropdownButton variant="light" id="dropdown-basic" drop="end" title="">
                            {user ?
                                <Dropdown.Item onClick={logoutClickHandler} >Deconnection</Dropdown.Item>
                                
                                :
                                <Dropdown.Item> <Link to={routes.LOGIN}>Connection</Link></Dropdown.Item>
                            }                            
                            <Dropdown.Item> <Link to={routes.PROFILCONF}>Option de profil</Link></Dropdown.Item>                            
                        </DropdownButton>                        
                    </div> 
                </div>
                
            </div>
        </div>
      
     );
}
 
export default UserCard;