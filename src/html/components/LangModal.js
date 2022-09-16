import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import "../../css/style.css";
import React, { useState } from "react";
import axios from "axios";
import LangModalItem from "./LangModalItem";
import url from '../../awsurl'

const LangModal = (modal) => {
    const[newLangList,setNewLangList] = useState([])
    //var newLangList = []
  const getAvailableLangList = () => {
      var list=[]
    //console.log("getAvailableLangList")
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      _id: modal.userId
    };
    axios
      .post(url + "/user/get-langlist-new", body, {
        headers: headers,
      })
      .then((resp) => {
        if(resp.data){
            console.log(resp.data)
            resp.data.map((lang) => {
                list.push(<LangModalItem lang={lang} addNewVocab={addNewVocab}/>);
            });
            //console.log(list)
            setNewLangList(list)
        }
      });
  };

  const addNewVocab = (code)=>{
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const body = {
        userId: modal.userId,
        code:code
      };
      axios
      .post(url + "/user/update-langlist", body, {
        headers: headers
      })
      .then(() => {
        modal.closeLangModal()
        modal.setUpdateView(modal.updateView + 1)
      });
  }

  

  return(
    <Modal
    show={modal.langModalShow}
    onHide={modal.closeLangModal}
    onEntered={()=>{
        
        getAvailableLangList()
    }}
  >
      <Modal.Header>
          Add a new language
      </Modal.Header>
    <Modal.Body>
        {newLangList}
    </Modal.Body>
    </Modal>
  )


};

export default LangModal
