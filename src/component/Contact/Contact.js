import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pascal from "../../img/pascal.jfif"
import { faEnvelope, faMessage } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
    return ( 
        
           <div class="my-3 my-md-7 text-center"> 

                <h1>Contacter un membre de l'équipe:</h1>
                
                <div class="m-3 m-md-7 d-flex flex-column flex-sm-row justify-content-center align-items-center mx-auto gap-5">
                    <div class="mt-5 bg-info d-flex flex-column align-items-center rounded pb-2">
                        <img src={pascal} width="200" class="clip-photo"  alt="pascal en photo" title="pascal en photo"/>
                        <h2>Pascal</h2>
                        <div class="d-flex gap-3">                        
                            <a href="https://github.com/pascalloria/" target="_blank" rel="noreferrer"><i class="fa-brands fa-github fs-4"></i></a>
                            <a href="https://www.linkedin.com/in/pascal-loria/" target="_blank" rel="noreferrer" ><i class="fab fa-linkedin fs-4"></i></a>
                            <a href="mailto:dev.pascalloria@gmail.com?subject=demande de renseignements&body=Bonjour je vous contacte," ><FontAwesomeIcon icon={faEnvelope} className="fs-4"/></a> 
                        </div>
                    </div>                   

                </div>

            </div>


        
        
     );
}
 
export default Contact;