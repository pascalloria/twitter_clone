//Libraries
import { useEffect, useState } from "react";
import axios from "../../config/axios-firebase";


//Components
import Tweet from "./Tweet/Tweet";


// Recupere tous les Tweets et les tris selon la props.filter
const Tweets = (props) => {

    const [tweets, SetTweets]= useState([])
    const [tweetDeleted,SetArticleDeleted]=useState(false)
    const [replyAdded , setReplyAdded]=useState(false)   


    let filterArray = props.filter       
    useEffect(()=> {
        // Récuperation des Tweets sur la database     
        SetArticleDeleted(false)
        setReplyAdded(false)
        axios.get("tweets.json")
        .then (response => {
            let tweetsArray = []
            for (let key in response.data){
                tweetsArray.push({
                    ...response.data[key],
                    id : key
                })
            } 
            
            // n'afiche que les tweets dont l'auteur est contenur dans le tableau de filtre
            if (props.filter){
                tweetsArray = tweetsArray.filter((f) => props.filter.includes(f["auteurId"]))                
            }            
            // Empeche l'affichage des retweet si props.sharedFilter = true 
            if(props.sharedFilter){
                tweetsArray = tweetsArray.filter((f) => f["shared"] !== true)  
            }
            tweetsArray = tweetsArray.reverse();
            SetTweets(tweetsArray)            
        })


    },[tweetDeleted,props.filter,filterArray,replyAdded, props.sharedFilter])

    // Methods

    const deleteHandler = (id)=>{
        axios.delete("tweets/"+ id + ".json")
        .then (response =>{
            console.log(response)
            SetArticleDeleted(!tweetDeleted)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const addReplyHandler = (id,value,auteurId)=> {
        let reply = {
            contenue : value,
            tweetID : id,
            auteurID : props.user.id,
            auteur : props.user.nickname,
            tweetAuteur : auteurId,
            date : Date.now()
        }

        axios.post("TweetReplys.json",reply)
        .then (response => {
            setReplyAdded(!replyAdded)
        })
        .catch (error =>{
            console.log(error)
        })        
    }

    const shareHandler = (tweet) => {
       let newTweet = {
            ...tweet,
            originalAuthor : tweet.auteur,
            originalAuthorID : tweet.auteurId,
            shared : true

       }
       newTweet.auteurId = props.user.id
       newTweet.auteur = props.user.nickname


       axios.post("tweets.json",newTweet)
       .then( response =>{
        console.log(response)
       })
       .catch (error =>{
        console.log(error)
       })
    }


    // variable

    let affichageTweets = (
        tweets.map(tweet => (            
            <Tweet user= {props.user} shareHandler={(tweet)=> shareHandler(tweet)} key={tweet.id} tweet={tweet} deleteHandler={(id)=>deleteHandler(id)} addReplyHandler={(id,value,auteurId)=>addReplyHandler(id,value,auteurId)}  />
        ))
    )

    return ( 
        <>             
            {affichageTweets}
        </>       

    );
}
 
export default Tweets;