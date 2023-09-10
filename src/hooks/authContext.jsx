import axios from "axios";
import { createContext, useState } from "react";

import jwt_decode from 'jwt-decode'

import { url } from "config/urlConfig";
import { useEffect } from "react";
import { withRouter,useHistory } from "react-router-dom";
import useGrapAuth from "./useRefresh";

export const AuthContext = createContext("")







export const AuthContextProvider = withRouter((props) => {
  const storedValue = localStorage.getItem('User');
    const history = useHistory()
    // const navigate = useNavigate()
    const userData = storedValue ? JSON.parse(storedValue) : undefined;
    const refresh = useGrapAuth()

    const [settings,setSettings] = useState({logo:"", name:"", loginlogo:"", address1:"", address2:""})
    const [authState, setAuthState] = useState({
        id:"",
        username:"",
        email:"",
        role:"",
        image:"",
        state:false,
        accessToken:""
    })



  


useEffect(()=>{

        const getData = async()=>{
          await axios.get(`${url}/settings`).then((resp)=>{
            const data = resp.data[0]
            setSettings({id:data.id,logo:data.logo,name:data.name,loginlogo:data.loginlogo,address1:data.address1, address2:data.address2})
        }).catch((error)=>{
          // console.log(error);
      })

          if(userData?.state!==true){
            if(history.location.pathname==='/login'){
                return
            }else{
              history.push('/')
            }
            }else{
              setAuthState({ id:userData?.id,username:userData?.username, email:userData?.email,image:userData?.image, role:userData?.role,state:true,accessToken:userData?.accessToken })
              if(props.history.length>0){
                // console.log('hello')
                  // console.log(props.history);
                  if(history.location.pathname==='/login'){
                    history.goBack()
                  }else{
                    return
                  }
                 
                //  console.log('runned',userData?.state);
              }
            }


        }



       
        getData()

      
    
        // Set the interval to send the refresh token every 5 minutes
        const intervalId = setInterval(async() => {
          try {
            const resp = await axios.post(`${url}/login/refreshToken`, { id: userData?.id });
            if(resp.data.error) return setAuthState({ id: '', username: '', email: '', image: '', role: '', state: false });
            const data = resp.data;
            const usersData = {
                id: data.id,
                username: data.name,
                email: data.email,
                image: data.image,
                role: data.role,
                state: true,
            
            };
            const stringFied = JSON.stringify(usersData);
            setAuthState({ id: data?.id, username: data?.name, email: data?.email, image: data?.image, role: data?.role, state: true });
            localStorage.setItem('User', stringFied);
            console.log('called authcontext');
  
        } catch (error) {
            setAuthState({ id: '', username: '', email: '', image: '', role: '', state: false });
            localStorage.setItem('User', "");
            props.history.push('/login')
        }
        },1*60*1000); // 5 minutes (in milliseconds)
    
        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };

       
    },[])


    return (
      <AuthContext.Provider value = {{ authState, setAuthState,settings,setSettings } } > 
            { props.children }
      </AuthContext.Provider>
    )
})