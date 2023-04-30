//Libraries
import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios-firebase";
import { UserContext } from "../../Context/user-context";
import { toast } from "react-toastify";

//Components
import Tweet from "./Tweet/Tweet";



// Recupere tous les Tweets et les tris selon la props.filter
const Tweets = (props) => {

    const [tweets, SetTweets]= useState([])
    const [tweetDeleted,SetArticleDeleted]=useState(false)
    const [replyAdded, setReplyAdded]=useState(false)   
    const user = useContext(UserContext)

    let filterArray = props.filter   
    console.log(filterArray)

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
            if (props.home){
                tweetsArray=tweetsArray.filter((f)=>f["originalAuthorID"] != user.id)
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
            toast("L'article à été supprimé avec succes")
        })
        .catch(error => {
            console.log(error)
        })
    }

    const addReplyHandler = (id,value,auteurId)=> {
        let reply = {
            contenue : value,
            tweetID : id,
            auteurID : user.id,
            auteur : user.nickname,
            tweetAuteur : auteurId,
            date : Date.now()
        }

        axios.post("TweetReplys.json",reply)
        .then (response => {
            setReplyAdded(!replyAdded)
            toast("Votre réponse est ajoutée")
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
       newTweet.auteurId = user.id
       newTweet.auteur = user.nickname


       axios.post("tweets.json",newTweet)
       .then( response =>{
        console.log(response)
        toast("Le Message est maintenant partagé il apparaitra dans votre profil et sera visible dans le flux des gens qui vous suivent")
       })
       .catch (error =>{
        console.log(error)
       })
    }


    // variable

    let affichageTweets = (
        tweets.map(tweet => (            
            <Tweet tweet={tweet} shareHandler={(tweet)=> shareHandler(tweet)} key={tweet.id}  deleteHandler={(id)=>deleteHandler(id)} addReplyHandler={(id,value,auteurId)=>addReplyHandler(id,value,auteurId)} replyAdded={replyAdded} />
        ))
    )

    return ( 
        <>             
            {affichageTweets}
        </>       

    );
}
 
export default Tweets;