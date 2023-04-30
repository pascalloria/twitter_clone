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

    // paramétre de filtrage depuis la props
    let filterArray = props.filter     

    // récupération des Tweets
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
            // Empeche l'affichage des retweets d'article ecrit par l'utilisateur
            if (props.home){
                tweetsArray=tweetsArray.filter((f)=>f["originalAuthorID"] !== user.id)
            }
            tweetsArray = tweetsArray.reverse();
            SetTweets(tweetsArray)            
        })


    },[tweetDeleted,props.filter,filterArray,replyAdded, props.sharedFilter,props.home,user])

    // Methods

    // Suppression d'un Tweet dans la BDD et mise a jour du rendu du composant.
    const deleteHandler = (id)=>{
        // Suppression du Tweet
        axios.delete("tweets/"+ id + ".json")
        .then (response =>{
            // mise a jour du composant
            SetArticleDeleted(!tweetDeleted)
            // Notification à l'utilisateur.
            toast("Le Tweet à été supprimé avec succes")
        })
        .catch(error => {
            console.log(error)
        })
    }

    // Ajout d'une réponse.
    const addReplyHandler = (id,value,auteurId)=> {
        // création de l'objet Réponse.
        let reply = {
            contenue : value,
            tweetID : id,
            auteurID : user.id,
            auteur : user.nickname,
            tweetAuteur : auteurId,
            date : Date.now()
        }
        // Envoie de la réponse à la BDD
        axios.post("TweetReplys.json",reply)
        .then (response => {
            // mise a jour du composant
            setReplyAdded(!replyAdded)
            // Notification de l'utilisateur
            toast("Votre réponse est ajoutée")
        })
        .catch (error =>{
            console.log(error)
        })        
    }

    // Gere le partage d'un tweet
    const shareHandler = (tweet) => {
        // création d'un objet a partir des donnée du tweet
        // + les donnée de l'utilisateur qui partage
       let newTweet = {
            ...tweet,
            originalAuthor : tweet.auteur,
            originalAuthorID : tweet.auteurId,
            shared : true
       }
       // Modification des donnée auteurId et auteur       
       newTweet.auteurId = user.id
       newTweet.auteur = user.nickname

       // Ajout du tweet partagé dans la BDD
       axios.post("tweets.json",newTweet)
       .then( response =>{
            // Notification de l'utilisateur
            toast("Le Message est maintenant partagé il apparaitra dans votre profil et sera visible dans le flux des gens qui vous suivent")
       })
       .catch (error =>{
        console.log(error)
       })
    }


    // variable
    // A partir du tableau des tweet filtré afficher les tweet
    // dans un composant Tweet pour chacun d'entre eux.

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