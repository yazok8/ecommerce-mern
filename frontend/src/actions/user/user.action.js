import { config } from "dotenv/types"
import axios from "axios"
import { USER_LOGIN_REQUEST } from "./user.types"



export const login = (email, password) => async (dispatch)=>{
    try{
        dispatch({
            type= USER_LOGIN_REQUEST
        })
        config={
            headers:{
                "Content-Type": "application/json"

            }
        }
        const {data} = await axios.post("/api/users/signin", {email, password}, config)
    }catch(err){
            
    }
}