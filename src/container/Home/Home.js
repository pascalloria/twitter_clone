
// Components
import { useContext } from "react";
import Tweets from "../Tweets/Tweets";
import { UserContext } from "../../Context/user-context";


const Home = (props) => { 
    const user = useContext(UserContext) 

    return ( 
        <>            
            <h3> Bonjour <b>{user.nickname}</b>, voici les Tweet que vous suivez</h3>
            <Tweets filter={user.follow}></Tweets>
        </>
        
     );
}
 
export default Home;