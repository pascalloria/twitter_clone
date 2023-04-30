import axios from "axios"

// url de la base de donnée Firebase utilisé avec Axios 
// permet d'utiliser la commande axios sans reécrir l'url à chaque fois
const instance = axios.create({
    baseURL : "https://rettwit-19e6f-default-rtdb.europe-west1.firebasedatabase.app/"
})

export default instance;