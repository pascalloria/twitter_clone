
import UserPreferences from "./UserPreferences/UserPreferences";

const ProfilConf = (props) => {
   
    const callback = (callback) => {     
        props.callback(callback) 
    }


    return ( 
        <UserPreferences user={props.user} callback={callback}/>       
      );
}
 
export default ProfilConf;