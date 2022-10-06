import { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext("1");

const UserProvider = ({children}) => {

  // const [email, setEmail] = useState(()=> sessionStorage.getItem('email'))
  // const [name, setName] = useState(()=> sessionStorage.getItem('name'))
  // const [nickname, setNickname] = useState(()=> sessionStorage.getItem('nickname'))
  // const [phone, setPhone] = useState(()=> sessionStorage.getItem('phone'))
  // const [uid, setUid] = useState(()=> sessionStorage.getItem('uid'))
  // const [userId, setUserId] = useState(()=> sessionStorage.getItem('userId'))
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('accessToken'))
  // const [refreshToken, setRefreshToken] = useState(() => sessionStorage.getItem('refreshToken'))
  

  // useEffect(()=>{
  //   sessionStorage.setItem('email',email)
  // }, [email])

  // useEffect(()=>{
  //   sessionStorage.setItem('name',name)
  // }, [name])

  // useEffect(()=>{
  //   sessionStorage.setItem('nickname',nickname)
  // }, [nickname])

  // useEffect(()=>{
  //   sessionStorage.setItem('phone',phone)
  // }, [phone])

  // useEffect(()=>{
  //   sessionStorage.setItem('uid',uid)
  // }, [uid])

  // useEffect(()=>{
  //   sessionStorage.setItem('userId',userId)
  // }, [userId])

  useEffect(() => {
    sessionStorage.setItem('accessToken', accessToken)
  }, [accessToken])

  // useEffect(() => {
  //   sessionStorage.setItem('refreshToken', refreshToken)
  // }, [refreshToken])


  const value = {
    // email,
    // name,
    // nickname,
    // phone,
    // uid,
    // userId,
    accessToken,
    // refreshToken,
    // setEmail,
    // setName,
    // setNickname,
    // setPhone,
    // setUid,
    // setUserId,
    setAccessToken,
    // setRefreshToken,

  }

  return (<UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>)

  
}

export {UserProvider,UserContext}