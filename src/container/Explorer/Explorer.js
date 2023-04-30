import Tweets from "../Tweets/Tweets";

const Explorer = () => {

    // Ce composant affiche tous les tweets tout en filtrant les partages.

    return ( 
        <>
           <h2> Tous les Tweets</h2>
           {/* Appelle le composant Tweets et precise le type de filtrage */}
            <Tweets sharedFilter= {true} /> 
        </>
        
     );
}
 
export default Explorer;