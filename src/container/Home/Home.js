
// Components
import { useContext, useEffect, useRef, useState } from "react";
import Tweets from "../Tweets/Tweets";
import { UserContext } from "../../Context/user-context";


const Home = () => { 
    const user = useContext(UserContext)

    return ( 
        <>            
            <h3> Bonjour <b className="text-break">{user.nickname}</b>, voici les Tweet que vous suivez</h3>
            <Tweets filter={user.follow} home={true}></Tweets>            
        </>
        
     );
}
 
export default Home;