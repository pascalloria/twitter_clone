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


function App() {

  useEffect(()=>{
    authListener();    
  },[])

    let [userLog , setUserLog] = useState("")


    // let user = {
    //   pseudo : "@pseudo",
    //   nickname : "Nickname"
    // }

  // methods 

  const authListener = () => {
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User  
        axios.get("users.json")  
        .then (response =>{
          let usersArray = [];
          for (let key in response.data){
            usersArray.push({
              ...response.data[key],
              id : key
            })         
          } 
                 
        let newUser = usersArray.filter(userBDD=>userBDD.uid == user.uid )         
        setUserLog(newUser[0])   
        })  
        .catch (error => {
          console.log(error)
        })  
        
        // ...
      } else {
        // User is signed out
        setUserLog("")
      }

    })
  }
  


  return (
    <div className="App container">     
    <Layout user={userLog}> 
      <Routes>
        <Route path={routes.HOME} element={<Home user={userLog} />} /> 
        <Route path={routes.CONTACT} element={<Contact />}></Route>
        <Route path={routes.PROFILCONF} element={<ProfilConf user={userLog}/>}></Route>
      </Routes>
    </Layout>
   
    </div>
  );
}

export default App;
