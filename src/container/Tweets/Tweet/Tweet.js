// libraries
import moment from "moment/moment";
import { Button} from "react-bootstrap";
import "moment/locale/fr";
import { useContext, useState, useEffect} from "react";
import { UserContext } from "../../../Context/user-context";
import axios from "../../../config/axios-firebase"
import { toast } from "react-toastify";

// component
import Reply from "./Reply/Reply";
import TweetDisplay from "./TweetDisplay/TweetDisplay";

const Tweet = (props) => {

    const [replys,setReplys]= useState([]);
    const [replyFormShowed,setReplyFormShowed] = useState(false)
    const [valueTextArea,setValueTextArea]= useState("")  
    const [showReply,setShowReply]=useState(false)
    const [replyDeleted , setReplyDeleted]= useState(false)
      


    useEffect(()=>{
        
        axios.get("TweetReplys.json")
        .then (response=>{
            let replyArray = [];            
            for (let key in response.data){
                replyArray.push({
                    ...response.data[key],
                    id : key
                });
            };                        
           replyArray = replyArray.filter(f => f.tweetID === props.tweet.id);  
           setReplys(replyArray);                    
        })
        .catch (error =>{
            console.log(error)
        })
    },[replyDeleted, props.replyAdded])
    
   
    moment.locale("fr")

    // fonctions

    const showReplyAreaHandler = ()=> {
        setReplyFormShowed(!replyFormShowed)
        clearReplyArea()       
    }

    const onChangeTexteArea = (e)=> {        
        setValueTextArea(e.target.value)
    }

    // affiche / cache les reponses au tweet
    const showReplyHandler = () => {
        setShowReply(!showReply)       
    }

    const clearReplyArea = () =>{
        let replyTextArea = document.querySelector("#reply");
        console.log(replyTextArea.valueTextArea)       
    }
    
    const deleteReplyHandler = (id)=>{
        axios.delete("TweetReplys/"+ id + ".json")
        .then (response =>{               
            setReplyDeleted(!replyDeleted) 
            toast("La réponse à bien été supprimmée")                         
        })
        .catch(error => {
            console.log(error)
        })
    }


    // variables

    let rep = (
        replys.map(reply => (
            <Reply   key={reply.id} reply= {reply}  deleteReplyHandler={(id)=> deleteReplyHandler(id)}/>
        ))
    )

    return (
        <>  
            {/* Affichage du Tweet */}
            <TweetDisplay shareHandler={(tweet)=> props.shareHandler(tweet)} key={props.tweet.id}  deleteHandler={(id)=>props.deleteHandler(id)} tweet = {props.tweet} showReplyAreaHandler={showReplyAreaHandler}  showReplyHandler={showReplyHandler} replysLenght={replys.length}></TweetDisplay>
            {/* Bloc réponse */}
            <div className={replyFormShowed ? "" : "d-none"}>
                <textarea onChange={onChangeTexteArea} className="my-2 w-75 rounded" name="reply" id="reply"  rows="5" placeholder="Ecrivez votre réponse ici"></textarea>
                <div className="text-end">
                    <Button className="w-25 text-center "  onClick={() => {props.addReplyHandler(props.tweet.id,valueTextArea,props.tweet.auteurId);showReplyAreaHandler()}}> Envoyer </Button>    
                </div>
            </div> 
            {/* Affichage des réponses */}
            <div className={showReply ? "": "d-none"}> 
                {rep}
            </div> 

        </>
       
    );
}
 
export default Tweet;