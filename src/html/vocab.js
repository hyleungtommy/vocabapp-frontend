import React, { useEffect, useState } from 'react';
import { Col, Container, DropdownButton, Form, Row,Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/login.css';
import { Dropdown } from 'bootstrap';
import memberLogo from '../img/member4.jpg'
import flag1 from '../img/flag-jp.png'
import flag2 from '../img/flag-kr.jpg'
import flag3 from '../img/flag-ru.png'
import VocabCard from './components/VocabCard'
import VocabModal from './components/VocabModal'
import axios from 'axios';

const Vocab= () =>{

  /*
  const vocabs= [{
    vocab:"明るい",
    wordtype:"Adj.",
    meaning:"Bright",
    sentence:"この部屋は明るい",
    translation:"This room is bright"
  },{
    vocab:"いちご",
    wordtype:"Noun",
    meaning:"Strawberry"
  }];
  */
 const[vocabs,setVocabs] = useState([])
 const[show,setShow] = useState(false);
 const[modalMode,setModalMode] = useState("New");
 const[selectedVocab,setSelectedVocab] = useState({})
 const[updateView,setUpdateView] = useState(0);

 const handleClose = () => {
    setShow(false)
    setUpdateView(updateView + 1)
  };
 const openModalAsNewVocab = ()=>{
    setShow(true)
    setModalMode("New")
 }
 const openModalAsExistingVocab = (selectedVocab)=>{
    setShow(true)
    setModalMode("Exist")
    setSelectedVocab(selectedVocab)
 }

 useEffect(()=>{
   axios.get("http://localhost:8081/vocab/list").then((resp)=>{
    console.log(resp.data);
     if(resp.data){
        var vocabs = [];
        resp.data.map(vocab=>{
          vocabs.push({
            _id:vocab._id,
            vocab : vocab.vocab,
            wordtype : vocab.type,
            meaning : vocab.meaning,
            sentence : vocab.sentence,
            translation : vocab.translation,
            note:vocab.note
          });
        })
        //console.log(vocabs);
        setVocabs(vocabs);
     }
   })
 },[updateView])

  //store all display vocab cards
  //todo: update number of card when user scroll down
  var cards = [];
  vocabs.map((vocab)=>
      {
        cards.push(<VocabCard _id={vocab._id} vocab={vocab.vocab} wordtype={vocab.wordtype} meaning={vocab.meaning} sentence={vocab.sentence} translation={vocab.translation} handleShow={openModalAsExistingVocab}/>);
      }
  )

  return(
  <>
    <Container fluid>
      <Container id="navbar">
        <img src={memberLogo} className="account-icon" alt="acc" />
        <Button className='btn btn-outline-success'>Logout</Button>
        <div className="dropdown dropstart text-end display-inline float-right">
          <img
            src={flag1}
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            width="70px"
            height="45px"
          />
          <ul className="dropdown-menu flag-dropdown">
            <li>
              <a className="dropdown-item" href="#"
                ><img className="flags" src={flag1}
              /></a>
            </li>
            <li>
              <a className="dropdown-item" href="#"
                ><img className="flags" src={flag2}
              /></a>
            </li>
            <li>
              <a className="dropdown-item" href="#"
                ><img className="flags" src={flag3}
              /></a>
            </li>
            <li><a className="dropdown-item blue" href="#">Add new</a></li>
          </ul>
        </div>
      </Container>
      <hr/>
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
            <li><a className="dropdown-item" href="#">Verb</a></li>
            <li><a className="dropdown-item" href="#">Adjective</a></li>
            <li><a className="dropdown-item" href="#">Noun</a></li>
            <li><a className="dropdown-item" href="#">Adverb</a></li>
          </ul>
        </div>
      </Container>
      <Container fluid>
        {cards}
      </Container>
      <Container fluid>
        <VocabModal show={show} handleClose={handleClose} modalMode={modalMode} vocab={selectedVocab}/>
      </Container>
    </Container>
  </>
	
)};

export default Vocab;
