
// Components
import { useContext} from "react";
import Tweets from "../Tweets/Tweets";
import { UserContext } from "../../Context/user-context";
import { Link } from "react-router-dom";
import routes from "../../config/routes";


const Home = () => { 
    
    // Ce composant  sert à la fois d'instruction pour les nouveaux utilisateurs
    // Puis d'affichage des Tweets des utilisateurs suivit par l'utilisateur Connecté
    const user = useContext(UserContext)

    return ( 
        <>            
            
            <h3> Bonjour <b className="text-break">{user ? user.nickname : "user"}</b></h3>


            {!user ?                 
                <p className="mt-2"> Vous n'etes pas connecté ! <br></br>  Vous pouvez vous inscrire / connecter sur <Link to={routes.LOGIN}>"Inscription/Connexion"</Link></p> 
                :  <> 
                    <p className="mt-2"> Vous pouvez modifier votre profil sur <Link to={routes.PROFILCONF}>"Profil"</Link></p>                           
                    {/* Verifie si l'utilisateur ne suit personne */}
                    {!user.follow ? 
            
                        <div>{/*si oui Affichage des instructions */}
                            <h3 className="mt-5">Vous ne suivez aucun utilisateur</h3>
                            <h5 className="mt-4">Pour suivre un utilisateur aller sur son profil en cliquant sur son pseudo</h5>                        
                        
                            <p className="mt-2"> Vous retrouverez la totalité des tweets sur <Link to={routes.ALLTWEETS}>"Explorer"</Link></p>
                        
                        </div>                                
                        :
                        <div>
                        {/* Sinon affichage des tweets des utilisateurs suivis  */}
                        <h3>Voici les Tweets que vous suivez</h3>
                            <Tweets filter={user.follow} home={true}></Tweets>  
                        </div> 
                    } 
                </> 
            }
           
        </>
        
     );
}
 
export default Home;