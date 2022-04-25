import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./html/login";
import Vocab from "./html/vocab";
import Signup from "./html/signup";

export default function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Vocab/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}