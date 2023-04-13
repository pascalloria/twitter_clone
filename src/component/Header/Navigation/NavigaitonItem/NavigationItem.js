import { NavLink } from "react-router-dom";

// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavigationItem = (props) => {
    return (        
      
        
        <li  className="text-start nav-item ">
        
            <div className="nav-link fs-2"> 
                <NavLink to={props.path}> 

                    <button className="btn btn-outline-dark w-100  text-xl-start ">
                        <FontAwesomeIcon icon={props.icon} size="xl" />
                        <span className="ms-lg-4 fs-4 d-none d-xl-inline ">{props.name}</span>  
                    </button>                                
                    
                </NavLink>
            </div>
            
        </li> 
       
    );
}
 
export default NavigationItem;