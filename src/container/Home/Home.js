
// Components
import Tweets from "../Tweets/Tweets";


const Home = (props) => {   

    return ( 
        <>
            <h1>Home</h1>
            <h3> Bonjour <b>{props.user.nickname}</b>, voici les Tweet que vous suivez</h3>
            <Tweets  filter={props.user.follow}></Tweets>
        </>
        
     );
}
 
export default Home;