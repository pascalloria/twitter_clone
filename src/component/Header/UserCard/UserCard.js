import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../config/routes"
import {getAuth, signOut} from 'firebase/auth'
import { UserContext } from "../../../Context/user-context";
import { useContext, useEffect } from "react";

const UserCard = () => {

    // state
    let navigate = useNavigate()
    const user = useContext(UserContext)

  
    // déconnection
    const logoutClickHandler = ()=>{
        const auth = getAuth()
        auth.signOut()
        // redirige sur la page HOME
        navigate("/")
    }
    
    return ( 
      
            
        <div className="card-body p-0 p-xl-3 ">
            <div className="d-flex justify-content-between gap-xl-2 align-items-center">
                <div ><FontAwesomeIcon icon={faUserAlt} size="xl"/></div>  
                <div className="d-none d-xl-inline-block flex-grow-1  ">
                    <b className="fs-4 text-break">{user ?  user.nickname : "User"}</b>                        
                </div>

                <div> 
                    <DropdownButton variant="light" id="dropdown-basic" drop="end" size="small" title="">
                        {user ?
                            <Dropdown.Item onClick={logoutClickHandler} >Deconnexion</Dropdown.Item>
                            
                            :
                            <Dropdown.Item> <Link to={routes.LOGIN}>Connexion</Link></Dropdown.Item>
                        }
                        {user ?
                            <Dropdown.Item> <Link to={routes.PROFILCONF}>Option de profil</Link></Dropdown.Item> 
                            :null
                        }                            
                                                   
                    </DropdownButton>                        
                </div> 
            </div>
            
        </div>
       
      
     );
}
 
export default UserCard;