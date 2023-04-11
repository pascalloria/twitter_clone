// libraries
import './App.css';
import { Route,Routes } from 'react-router-dom';
import routes from './config/routes';


// composant
import Home from './container/Home/Home';
import Layout from './hoc/Layout/Layout';
import Contact from './component/Contact/Contact';
import { useEffect, useState } from 'react';
import Sign from './Security/Sign/Sign';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './config/firebase';

function App() {

  useEffect(()=>{
    authListener(); 
    console.log ("mount")
  },[])

    let [user , setUser] = useState("")


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
        console.log(user)
        let newUser = {
          ...user,
          pseudo : "@pseudo",
          nickname : "Nickname"

        }

        setUser(newUser)
        // ...
      } else {
        // User is signed out
        setUser("")
      }

    })
  }
  


  return (
    <div className="App container">     
    <Layout user={user}> 
      <Routes>
        <Route path={routes.HOME} element={<Home  />} /> 
        <Route path={routes.CONTACT} element={<Contact />}></Route>
        <Route path={routes.SIGN} element={<Sign />}></Route>
      </Routes>
    </Layout>
   
    </div>
  );
}

export default App;
