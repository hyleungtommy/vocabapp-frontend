import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./html/login";
import Vocab from "./html/vocab";
import Signup from "./html/signup";
import Quiz from "./html/quiz";
import { createContext, useState } from "react";
import { browserHistory } from 'react-router';

export default function Routers(){
    const [token,setToken] = useState("")
    const [userId,setUserId] = useState("")

    function setUserToken(userToken) {
        sessionStorage.setItem('token', userToken);
        setToken(userToken)
    }
      
    function getUserToken() {
        const tokenString = sessionStorage.getItem('token');
        console.log("storedToken=" + tokenString)
        return tokenString
    }

    function setId(id){
        sessionStorage.setItem('userId', id);
        setUserId(id)
    }

    function getId(){
        const idString = sessionStorage.getItem('userId');
        console.log("storedToken=" + idString)
        return idString
    }

    function logout(){
        sessionStorage.clear()
    }

    const t = getUserToken()

    //if(!t && !token){
    //    return(<Login setToken={setUserToken} setUserId={setId}/>)
    //}
    const haveLogin = t || token;
    console.log(haveLogin)
    const loginPage = <Login setToken={setUserToken} setUserId={setId}/>

    const VocabPage = <Vocab logout={logout} getId={getId} />
    const QuizPage = <Quiz logout={logout} getId={getId} />
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(haveLogin ? VocabPage :loginPage)} ></Route>
                <Route path="/vocab" element={(haveLogin ? VocabPage :loginPage)} ></Route>
                <Route path="/quiz" element={(haveLogin ? QuizPage :loginPage)} ></Route>
                <Route path="/login" element={loginPage}></Route>
                <Route path="/signup" element={<Signup />}></Route>

            </Routes>
        </BrowserRouter>
    );
}