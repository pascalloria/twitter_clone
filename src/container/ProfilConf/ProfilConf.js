import Sign from "../../Security/Sign/Sign";
import UserPreferences from "./UserPreferences/UserPreferences";

const ProfilConf = (props) => {
    return ( 
        <>  
            { props.user != "" ?
                <UserPreferences user={props.user}/>
            :
                <Sign />

            }
            


        </>


      );
}
 
export default ProfilConf;