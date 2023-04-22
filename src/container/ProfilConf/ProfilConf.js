
import UserPreferences from "./UserPreferences/UserPreferences";

const ProfilConf = (props) => {
   
    const callback = (callback) => {     
        props.callback(callback) 
    }


    return ( 
        <UserPreferences callback={callback}/>       
      );
}
 
export default ProfilConf;