import { useEffect, useState } from "react";
import axios from "../../../../config/axios-firebase"
import Reply from "./Reply/Reply";

const Replys = (props) => {

    //states
    const [replys,setReplys]= useState([]);
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
           replyArray = replyArray.filter(f => f.tweetID === props.tweetID);  
           setReplys(replyArray);         

        })
        .catch (error =>{
            console.log(error)
        })
    },[props,replyDeleted])

    // fonctions
    const deleteHandler = (id)=>{
            axios.delete("TweetReplys/"+ id + ".json")
            .then (response =>{               
                setReplyDeleted(!replyDeleted)            
            })
            .catch(error => {
                console.log(error)
            })
        }

    // variables
    let rep = (
        replys.map(reply => (
            <Reply user={props.user} key={reply.id} reply= {reply}  deleteHandler={(id)=> deleteHandler(id)}/>
        ))
    )

    return ( 
        <> 
            {rep}
        </>
    );
}
 
export default Replys;