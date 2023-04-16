//Libraries
import { useEffect, useState } from "react";
import axios from "../../config/axios-firebase";

//Components
import Tweet from "./Tweet/Tweet";

// Recupere tous les Tweets et les tris selon la props.filter
const Tweets = (props) => {

    const [tweets, SetTweets]= useState([])
    const [articleDeleted,SetArticleDeleted]=useState(false)

    let filterArray = props.filter       
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
           
            if (props.filter){
                tweetsArray = tweetsArray.filter((f) => filterArray.includes(f["auteurId"]))                
            }            
            tweetsArray = tweetsArray.reverse();
            SetTweets(tweetsArray)            
        })


    },[articleDeleted,props.filter,filterArray])

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
            <Tweet key={tweet.id} tweet={tweet} deleteHandler={(id)=>deleteHandler(id)} />
        ))
    )

    return ( 
        <>             
            {affichageTweets}
        </>       

    );
}
 
export default Tweets;