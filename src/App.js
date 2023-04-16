// libraries
import './App.css';
import { Route,Routes } from 'react-router-dom';
import routes from './config/routes';
import axios from './config/axios-firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './config/firebase';
import { useEffect, useState } from 'react';

// composant
import Home from './container/Home/Home';
import Layout from './hoc/Layout/Layout';
import Contact from './component/Contact/Contact';
import ProfilConf from './container/ProfilConf/ProfilConf';
import Tweet from './container/AjouterTweet/AjouterTweet';
import Profil from './container/Profil/Profil';
import Explorer from './container/Explorer/Explorer';
import Sign from './Security/Sign/Sign';



function App() {


  //sates
  let [user, setUser] = useState("")
  let [userLog , setUserLog] = useState("")
  const [userInfoChange, setUserInfoChange]= useState()



  useEffect(()=>{    
    authListener();    
  },[]);



  // recuperer les informaitons sur l'utilisateur si il est connecté
  useEffect(()=>{
    getUserInfo(user)   
    //console.log("Apps Rerender")     
  },[user,userInfoChange])


  // methods 
  // Recuperer le changement d'une info Users
  const callback = ()=>{
    setUserInfoChange(!userInfoChange)
  }

  const authListener = () => {
    const auth = getAuth(app)
    // Gere l'etat Conecté et deconnecté avec FireBase
    onAuthStateChanged(auth,(user)=>{
      if (user) {        
        setUser(user)        
      } else {
        setUser("")
      }
    })
  };

  const getUserInfo = (user) => {
    if(user.uid ){
      // Récuperation de tous les users dans un tableau
      axios.get("users.json")  
      .then (response =>{
        let usersArray = [];
        for (let key in response.data){
          usersArray.push({
            ...response.data[key],
            id : key
          }) 
        }    
        // filtre le tableau pour avoir uniquement l'utilisateur connecté
        let newUser = usersArray.filter(userBDD => userBDD.uid === user.uid )         
        setUserLog(newUser[0]) 
    })       
    } else {
      setUserLog("")
    }
  }

  return (
    <div className="App container">     
    <Layout user={userLog}> 
      <Routes>
        <Route path={routes.HOME} element={<Home user={userLog} />} /> 
        <Route path={routes.CONTACT} element={<Contact />}></Route>
        <Route path={routes.PROFILCONF} element={<ProfilConf user={userLog} callback={callback}/>}></Route>
        <Route path={routes.POSTTWEET} element={<Tweet user={userLog}/>}></Route>
        <Route path={routes.ALLTWEETS} element={<Explorer />} />
        <Route path={routes.PROFIL + "/:id"} element={<Profil user={userLog} callback={callback} />}  />
        <Route path={routes.LOGIN} element = {<Sign /> } />
      </Routes>
    </Layout>
   
    </div>
  );
}

export default App;
