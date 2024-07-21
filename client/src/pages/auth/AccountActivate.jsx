import { useParams } from "react-router-dom";
import { useEffect } from "react";
import  axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/auth";


function AccountActivate() {
    const[auth,setAuth]=useAuth();
    const {token} = useParams();
    console.log(token);
    const navigate=useNavigate();


useEffect(()=>{
    if(token) Activation()

},[token])


const Activation=async()=>{
    try{

        const{data}=await axios.post("/register",{token})

        if(data.error){
            toast.error(data.error)
        }else{
            setAuth(data);
            localStorage.setItem("auth",JSON.stringify(data))
            toast.success("You have been successfully registered.")
            navigate('/');
        }


    }catch(err){
        console.log(err);
       toast.error("Error Activating your account")
    }
}





    


    return (  
        <div>
            <h1 className="display-1 d-flex justify-content-center align-items-center vh-100 " style={{marginTop:"-5%"}}>Please Wait</h1>
        </div>
    );
}

export default AccountActivate;