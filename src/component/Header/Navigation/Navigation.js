//librairis
import {  faAddressCard, faBellConcierge, faGlobe, faHome,  faMessage, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import routes from "../../../config/routes";

// components
import NavigationItem from "./NavigaitonItem/NavigationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navigation = (props) => {
    return ( 
    <div className="flex-column justify-content-center align-items-center">
        <ul className="navbar-nav d-grid gap-2 w-xl-100  ">
            <NavigationItem path={routes.HOME} name="Home" icon = {faHome}  />
            <NavigationItem path={routes.ALLTWEETS} name="Explorer"  icon = {faGlobe} />
            <NavigationItem path={routes.HOME} name="Notification"  icon = {faBellConcierge} />
            <NavigationItem path={routes.HOME} name="Message"  icon = {faMessage}/>
            {/* <NavigationItem path={routes.PROFIL +"/"+ props.user.id} name="Profil"  icon = {faUser} /> */}
            <NavigationItem path={routes.CONTACT} name="Contact"  icon = {faAddressCard} />
        </ul>
        
        <Link to={routes.POSTTWEET} >
            <button className="btn btn-primary mt-4 d-grid fs-4  w-100">
                <span className="d-xl-none "> <FontAwesomeIcon icon={faPenNib} size="xl"/></span>
                <span className="d-none d-xl-inline"> Poster </span>
            </button> 
        </Link>              
            
       
        

    </div>
        

     );
}
 
export default Navigation;