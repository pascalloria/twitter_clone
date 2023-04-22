import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// components
import Navigation from "./Navigation/Navigation";
import UserCard from "./UserCard/UserCard";
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';


const Header = (props) => {
    

    return (  
     
        <div className=" d-flex flex-column align-items-center h-100 py-4 p-0 ">
           
            <div className="flex-grow-1">
             
                <nav className="px-0 px-lg-4">
                    <div className="flex-columns">
                        <div className="navbar-brand">                      
                            <FontAwesomeIcon icon={faDiceD20} style={{color: "#508df7",}} size='3x' />
                            <span className='ms-3 h4 d-none d-xl-inline '> JDR Flash</span> 
                        </div>
                       


                        <div className="mt-4">
                            <Navigation  /> 
                        </div>
                    </div>
                        
                </nav>
                
            </div>          

            <div className="px-0 px-lg-4">                
                <UserCard  />
            </div>
        </div>
    );
}
 
export default Header;