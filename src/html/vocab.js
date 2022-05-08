import React, { useContext,useRef, useEffect, useState } from "react";
import {
  Col,
  Container,
  DropdownButton,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "../css/login.css";
import memberLogo from "../img/member4.jpg";
import VocabCard from "./components/VocabCard";
import VocabModal from "./components/VocabModal";
import axios from "axios";
import LangDropdown from "./components/LangDropdown";
import LangModal from "./components/LangModal";
import { Link } from "react-router-dom";

const Vocab = (item) => {
  
  const quizButton = useRef(null)
  const [vocabs, setVocabs] = useState([]);
  const [show, setShow] = useState(false);
  const [langModalShow, setLangModalShow] = useState(false);
  const [modalMode, setModalMode] = useState("New");
  const [selectedVocab, setSelectedVocab] = useState({});
  const [userId, setUserId] = useState(item.getId());
  //const userId = item.userId;
  //console.log(item.userId)
  const [selectedLang, setSelectedLang] = useState(0);
  const [selectedLangCode, setSelectedLangCode] = useState("jp");
  const [selectedLangType, setSelectedLangType] = useState("");
  const [langList, setLangList] = useState([]);
  const [updateView, setUpdateView] = useState(0);
  const [updateLangView, setUpdateLangView] = useState(0);

  const handleClose = () => {
    setShow(false);
    setUpdateView(updateView + 1);
  };
  const openModalAsNewVocab = () => {
    setShow(true);
    setModalMode("New");
  };
  const openModalAsExistingVocab = (selectedVocab) => {
    setShow(true);
    setModalMode("Exist");
    setSelectedVocab(selectedVocab);
  };
  const selectLanguage = (pos) => {
    console.log("selected pos=" + pos);
    setSelectedLang(pos);
    setSelectedLangCode(langList[pos].code);
    storeUserInfo(userId,langList[pos].code)
    setUpdateView(updateView + 1);
  };

  const getVocabList = async function () {
    console.log("langtype=" + selectedLangType)
    if(selectedLangType == '')
      getVocabListCache(langList);
    else
      getLangListByType(selectedLangType)
  };

  const getVocabListCache = async function (langListCache) {
    console.log(
      "get vocab list langList=" + langListCache + " userId=" + userId
    );
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      userId: userId,
      langCode: selectedLangCode,
    };
    axios
      .post("http://localhost:8081/vocab/list-langcode", body, {
        headers: headers,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          var vocabs = [];
          resp.data.map((vocab) => {
            vocabs.push({
              _id: vocab._id,
              vocab: vocab.vocab,
              wordtype: vocab.type,
              meaning: vocab.meaning,
              sentence: vocab.sentence,
              translation: vocab.translation,
              note: vocab.note,
            });
          });
          //console.log(vocabs);
          setVocabs(vocabs);
          if(vocabs.length > 20){
            quizButton.current.style="display:inline-block"
          }else{
            quizButton.current.style="display:none"
          }
        }
      });
  };

  const getLangList = async function () {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      _id: userId,
    };
    axios
      .post("http://localhost:8081/user/get-langlist", body, {
        headers: headers,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          var langList = [];
          resp.data.map((lang) => {
            langList.push(lang);
          });
          setLangList(langList);
          getVocabListCache(langList); // pass in langList when loading the first time
        }
      });
  };

  const storeUserInfo = (userId,selectedLang)=>{
    localStorage.setItem("userId",userId)
    localStorage.setItem("selectedLang",selectedLang)
  }

  const getLangListByType = async function (langType){
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      userId: userId,
      langCode: selectedLangCode,
      type:langType
    };
    axios
      .post("http://localhost:8081/vocab/filter/type", body, {
        headers: headers,
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          var vocabs = [];
          resp.data.map((vocab) => {
            vocabs.push({
              _id: vocab._id,
              vocab: vocab.vocab,
              wordtype: vocab.type,
              meaning: vocab.meaning,
              sentence: vocab.sentence,
              translation: vocab.translation,
              note: vocab.note,
            });
          });
          //console.log(vocabs);
          setVocabs(vocabs);
          setSelectedLangType(langType)
          
        }
      });
  }

  const openLangModal = ()=>{
    setLangModalShow(true);
  }

  const closeLangModal = ()=>{
    setLangModalShow(false);
  }

  useEffect(() => {
    getVocabList();
  }, [updateView]);

  useEffect(() => {
    getLangList();
  }, [updateLangView]);

  //store all display vocab cards
  //todo: update number of card when user scroll down
  var cards = [];
  vocabs.map((vocab) => {
    cards.push(
      <VocabCard
        _id={vocab._id}
        vocab={vocab.vocab}
        wordtype={vocab.wordtype}
        meaning={vocab.meaning}
        sentence={vocab.sentence}
        translation={vocab.translation}
        note={vocab.note}
        handleShow={openModalAsExistingVocab}
      />
    );
  });
  //console.log(langList)
  return (
    <>
      <Container fluid>
        <Container id="navbar">
          <img src={memberLogo} className="account-icon" alt="acc" />
          <Link to='/login' ><Button variant="outline-success" className="btn-logout" onClick={item.logout}>Logout</Button></Link>
          <Link to='/quiz' ><Button ref={quizButton} variant="info" >Quiz</Button></Link>
          {
            (langList.length == 0 ? 
            <button
            type="button"
            className="btn btn-primary blue float-right btn-add-lang"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            onClick={openLangModal}
          >Add Language</button> :
          <LangDropdown
          userId={userId}
          langList={langList}
          selectedLang={selectedLang}
          handleClick={selectLanguage}
          openLangModal={openLangModal}
        />
          )
          }
          
          
        </Container>
        <hr />
        <Container id="vocab-main">
          <button
            type="button"
            className="btn btn-primary blue"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            onClick={openModalAsNewVocab}
          >
            Add new
          </button>
          <div className="dropdown dropstart text-end display-inline float-right">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle blue"
              data-bs-toggle="dropdown"
            >
              Filter
            </button>
            <ul className="dropdown-menu">
              <li onClick={(e)=>{getLangListByType("V");e.preventDefault()}}>
                <a className="dropdown-item" href="#" onClick={(e)=>e.preventDefault()}>
                  Verb
                </a>
              </li>
              <li onClick={()=>getLangListByType("ADJ")}>
                <a className="dropdown-item" href="#" >
                  Adjective
                </a>
              </li>
              <li onClick={()=>getLangListByType("N")}>
                <a className="dropdown-item" href="#">
                  Noun
                </a>
              </li>
              <li onClick={()=>getLangListByType("ADV")}>
                <a className="dropdown-item" href="#" >
                  Adverb
                </a>
              </li>
              <li onClick={()=>getLangListByType("P")}>
                <a className="dropdown-item" href="#" >
                  Pharse
                </a>
              </li>
              <li onClick={()=>getLangListByType("")}>
                <a className="dropdown-item" href="#" >
                  All
                </a>
              </li>
            </ul>
          </div>
        </Container>
        <Container fluid>{cards}</Container>
        <Container fluid>
          <VocabModal
            show={show}
            handleClose={handleClose}
            modalMode={modalMode}
            vocab={selectedVocab}
            langCode={selectedLangCode}
            userId={userId}
          />
        </Container>
        <Container fluid>
          <LangModal
            langModalShow={langModalShow}
            closeLangModal={closeLangModal}
            userId={userId}
            updateView={updateLangView}
            setUpdateView={setUpdateLangView}
          />
        </Container>
      </Container>
    </>
  );
};

export default Vocab;
