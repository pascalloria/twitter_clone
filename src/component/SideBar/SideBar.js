
// Components

import Footer from "./Footer/Footer";
import SideItem from "./SideItem/SideItem";

const SideBar = () => {
    return ( 
        <div className="border-start border-2 d-flex flex-column justify-content-between h-100 p-2">
            <h2>Liens utiles</h2>
            <ul className="content flex-grow-1">
                <SideItem link="https://www.blog.leroliste.com/" titre="Le rôliste" content={"Nouveau Joueur ou Rôliste aguerri ? Découvrez sur le Blog tous nos Articles et Guides pour devenir un Joueur un MJ accompli."} />
                <SideItem link="http://www.jdrp.fr/" titre="Jeu de rôle passion" content="Le moteur de recherche spécialisé dans le jeu de rôle : scénarios, aides de jeux, fiches & matériel pour meneurs et joueurs, critiques, previews, ambiance..." />
                <SideItem link="https://jdr-mania.com/" titre="jdr-mania" content="Découvrez le JDR & vivez des histoires passionnantes avec vos amis !"  />
            </ul>            
            <Footer />    
        </div>
        
     );
}
 
export default SideBar;