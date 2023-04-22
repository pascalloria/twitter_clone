
// Components
import Tweets from "../Tweets/Tweets";


const Home = (props) => {   

    return ( 
        <>            
            <h3> Bonjour <b>{props.user.nickname}</b>, voici les Tweet que vous suivez</h3>
            <Tweets user={props.user} filter={props.user.follow}></Tweets>
        </>
        
     );
}
 
export default Home;