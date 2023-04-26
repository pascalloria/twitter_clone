//librairis
import {  faAddressCard, faGlobe, faHome, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../config/routes";

// components
import NavigationItem from "./NavigaitonItem/NavigationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../Context/user-context";

const Navigation = (props) => {
    const user = useContext(UserContext)
    return ( 
    <div className="flex-column justify-content-center align-items-center">
        <ul className="navbar-nav d-grid gap-2 justify-content-center ">
            <NavigationItem path={routes.HOME} name="Home" icon = {faHome}  />
            <NavigationItem path={routes.ALLTWEETS} name="Explorer"  icon = {faGlobe} />
            {user ? 
                <NavigationItem path={routes.PROFIL +"/"+ user.id} name="Profil"  icon = {faUser} />
                : null
            }
            
            <NavigationItem path={routes.CONTACT} name="Contact"  icon = {faAddressCard} />
        </ul>
        {user ?
           <Link to={routes.POSTTWEET} >
                <button className="btn btn-primary  p-1 mt-4 d-grid fs-4 w-100  ">
                    <span className="d-xl-none "> <FontAwesomeIcon icon={faPenNib} size="xl"/></span>
                    <span className="d-none d-xl-inline"> Poster </span>
                </button> 
            </Link> 
            :null
        }
                      
            
       
        

    </div>
        

     );
}
 
export default Navigation;