//Libraries
import { useEffect, useState } from "react";
import axios from "../../config/axios-firebase";

//Components
import Tweet from "./Tweet/Tweet";


const Tweets = () => {

    const [tweets, SetTweets]= useState([])
    const [articleDeleted,SetArticleDeleted]=useState(false)

    useEffect(()=> {
        // Récuperation des Tweets sur la database
        SetArticleDeleted(false)
        axios.get("tweets.json")
        .then (response => {
            let tweetsArray = []
            for (let key in response.data){
                tweetsArray.push({
                    ...response.data[key],
                    id : key
                })
            } 
            tweetsArray = tweetsArray.reverse()
            SetTweets(tweetsArray)            
        })


    },[articleDeleted])

    // Methods

    const deleteHandler = (id)=>{
        axios.delete("tweets/"+ id + ".json")
        .then (response =>{
            console.log(response)
            SetArticleDeleted(!articleDeleted)
        })
        .catch(error => {
            console.log(error)
        })
    }


    // variable

    let affichageTweets = (
        tweets.map(tweet => (
            <>
                <Tweet key={tweet.id} tweet={tweet} deleteHandler={(id)=>deleteHandler(id)} />
            </>
        ))
    )

    return ( 
        <> 
            <h2 className="mb-5"> Tous les JdR_tweets </h2>
            {affichageTweets}
       
        </>
        

    );
}
 
export default Tweets;