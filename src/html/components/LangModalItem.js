import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import "../../css/style.css";
import React, { useState } from "react";

const LangModalItem = (item)=>{
    return(
        <a
        className="dropdown-item"
        href="#"
        onClick={()=>item.addNewVocab(item.lang.code)}
        >
            <img className="flags" src={require("../../img/" + item.lang.flag)} />
            <p>{item.lang.name}</p>
        </a>
    )
}

export default LangModalItem