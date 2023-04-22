import Tweets from "../Tweets/Tweets";

const Explorer = () => {


    return ( 
        <>
           <h2> Tous les Tweets</h2>
            <Tweets sharedFilter= {true} /> 
        </>
        
     );
}
 
export default Explorer;