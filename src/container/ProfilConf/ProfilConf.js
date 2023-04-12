
import Sign from "../../Security/Sign/Sign";
import UserPreferences from "./UserPreferences/UserPreferences";

const ProfilConf = (props) => {
   
    const callback = (callback) => {     
        props.callback(callback) 
    }


    return ( 
        <>  
            { props.user !== "" ?
                <UserPreferences user={props.user} callback={callback}/>
            :
                <Sign />
            }            
        </>
      );
}
 
export default ProfilConf;