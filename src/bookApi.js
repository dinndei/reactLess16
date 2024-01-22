import axios from "axios";

let baseUrl="http://localhost:5000/";

export const getAllBooks=()=>{
   return axios.get(`${baseUrl}book`) ;
}
export const deleteBook=(id)=>{
    return axios.delete(`${baseUrl}book/${id}`) ;
 }