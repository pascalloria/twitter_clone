import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// components
import Navigation from "./Navigation/Navigation";
import UserCard from "./UserCard/UserCard";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


const Header = (props) => {

    let pseudo = props.user.pseudo;
    let nickname = props.user.nickname;

    return (  
     
        <div className=" d-flex flex-column align-items-center h-100 py-4 p-0 ">
           
            <div className="flex-grow-1">
             
                <nav className="px-0 px-lg-4">
                    <div className="flex-columns">
                        <div className="navbar-brand">
                            <FontAwesomeIcon icon={faCoffee} size='3x' />
                            <span className='ms-3 h4 d-none d-xl-inline '>RETTWIT</span> 
                        </div>
                       


                        <div className="mt-4">
                            <Navigation /> 
                        </div>
                    </div>
                        
                </nav>
                
            </div>          

            <div className="px-0 px-lg-4">                
                <UserCard pseudo={pseudo} nickname = {nickname}/>
            </div>
        </div>
    );
}
 
export default Header;