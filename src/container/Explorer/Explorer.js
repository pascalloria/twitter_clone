import Tweets from "../Tweets/Tweets";

const Explorer = (props) => {


    return ( 
        <>
           <h2> Tous les Tweets</h2>
            <Tweets user={props.user} sharedFilter= {true} /> 
        </>
        
     );
}
 
export default Explorer;