import axios from "axios"

const instance = axios.create({
    baseURL : "https://rettwit-19e6f-default-rtdb.europe-west1.firebasedatabase.app/"
})

export default instance;