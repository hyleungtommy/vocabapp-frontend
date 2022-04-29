import React, { useEffect, useState } from "react";
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
import { Dropdown } from "bootstrap";
import memberLogo from "../img/member4.jpg";
import flag1 from "../img/flag-jp.png";
import flag2 from "../img/flag-kr.jpg";
import flag3 from "../img/flag-ru.png";
import VocabCard from "./components/VocabCard";
import VocabModal from "./components/VocabModal";
import axios from "axios";
import LangDropdown from "./components/LangDropdown";
import LangModal from "./components/LangModal";

const Vocab = () => {
  const [vocabs, setVocabs] = useState([]);
  const [show, setShow] = useState(false);
  const [langModalShow, setLangModalShow] = useState(false);
  const [modalMode, setModalMode] = useState("New");
  const [selectedVocab, setSelectedVocab] = useState({});
  const [userId, setUserId] = useState("620d9b717b9958aab63462e3");
  const [selectedLang, setSelectedLang] = useState(0);
  const [selectedLangCode, setSelectedLangCode] = useState("jp");
  const [langList, setLangList] = useState([]);
  const [updateView, setUpdateView] = useState(0);

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
    setUpdateView(updateView + 1);
  };

  const getVocabList = async function () {
    getVocabListCache(langList);
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
          console.log(langList);
          getVocabListCache(langList); // pass in langList when loading the first time
        }
      });
  };

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
  }, [updateView]);

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
          <Button className="btn btn-outline-success">Logout</Button>
          <LangDropdown
            userId={userId}
            langList={langList}
            selectedLang={selectedLang}
            handleClick={selectLanguage}
            openLangModal={openLangModal}
          />
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
              <li>
                <a className="dropdown-item" href="#">
                  Verb
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Adjective
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Noun
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Adverb
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
            updateView={updateView}
            setUpdateView={setUpdateView}
          />
        </Container>
      </Container>
    </>
  );
};

export default Vocab;
