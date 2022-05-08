import React, { useContext, useEffect, useRef, useState } from "react";
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
import {shuffle} from "../util";
import { Link } from "react-router-dom";

const Quiz = (item)=>{

    const userId = localStorage.getItem("userId")
    const selectedLangCode = localStorage.getItem("selectedLang")
    const quizLength = 10
    const nextButton = useRef(null)
    const incorrectText = useRef(null)
    const correctText = useRef(null)
    const totalScore = useRef(null)
    const retryButton = useRef(null)
    const[displayQuestion,setDisplayQuestion] = useState("")
    const[displayAnswer,setDisplayAnswer] = useState("")
    const[displayChoice1,setDisplayChoice1] = useState("")
    const[displayChoice2,setDisplayChoice2] = useState("")
    const[displayChoice3,setDisplayChoice3] = useState("")
    const[displayChoice4,setDisplayChoice4] = useState("")
    const[currentQuestionIndex,setCurrentQuestionIndex] = useState(0)
    const[correctAnswerIndex,setCorrectAnswerIndex] = useState(0)
    const[quizList,setQuizList] = useState([])
    const[possibleAnswers,setPossibleAnswers] = useState([])
    const[correctAnswerCount,setCorrectAnswerCount] = useState(0)
    const[restartQuiz,setRestartQuiz] = useState(0)
    var answerChoiced = false


    const getLangListByType = async function (langType){
        console.log("userId=" + userId + " , selectedLangCode=" + selectedLangCode)
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
              headers: headers
            })
            .then((resp) => {
              //console.log(resp.data);
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
                console.log("loadquiz")
                loadQuiz(vocabs)
              }
            });
    }

    const loadQuiz = function(vocabs){
        var possibleAnswersLocal = []
        vocabs.map((vocab)=>{
            possibleAnswersLocal.push(vocab)
        })
        var quizListLocal = shuffle(vocabs).slice(0,quizLength)
        setQuizList(shuffle(vocabs).slice(0,quizLength))
        setPossibleAnswers(possibleAnswersLocal)
        console.log(quizListLocal)
        loadQuestionCache(quizListLocal,possibleAnswersLocal,0)
    }

    const loadQuestion = ()=>{
        var currentQuestionIndexLocal = currentQuestionIndex + 1
        if(currentQuestionIndexLocal < quizLength){
            setCurrentQuestionIndex(currentQuestionIndexLocal)
            loadQuestionCache(quizList,possibleAnswers,currentQuestionIndexLocal)
        }
    }

    const loadQuestionCache = function(quizListLocal,possibleAnswersLocal,currentQuestionIndexLocal){
        if(currentQuestionIndexLocal < quizLength){
            const question = quizListLocal[currentQuestionIndexLocal]
            var possibleAnswerList = []
            possibleAnswersLocal.map((answer)=>{
                if(answer.vocab != question.vocab){
                    possibleAnswerList.push(answer)
                }
            })
            console.log(possibleAnswerList)
            var answerList = shuffle(possibleAnswerList).slice(0,3)
            var correctAnswerIndexLocal = 0
            answerList.push(question)
            answerList = shuffle(answerList)
            console.log(answerList)
            for(var i = 0 ; i < 4 ; i++){
                console.log(answerList[i].vocab + "=" + question.vocab + " is " + (answerList[i].vocab == question.vocab))
                if(answerList[i].vocab == question.vocab){
                    correctAnswerIndexLocal = i
                }
            }
            console.log("question=" + question.vocab + " choices = " + JSON.stringify(answerList) + " correctAnswerIndex=" + correctAnswerIndexLocal)
            setCorrectAnswerIndex(correctAnswerIndexLocal)
            setDisplayQuestion(question.vocab)
            setDisplayChoice1(answerList[0].meaning)
            setDisplayChoice2(answerList[1].meaning)
            setDisplayChoice3(answerList[2].meaning)
            setDisplayChoice4(answerList[3].meaning)
            setDisplayAnswer(question.meaning)
            nextButton.current.style="display:none"
            correctText.current.style="display:none"
            incorrectText.current.style="display:none"
            totalScore.current.style="display:none"
            retryButton.current.style="display:none"
            document.getElementById("choice1").style=""
            document.getElementById("choice2").style=""
            document.getElementById("choice3").style=""
            document.getElementById("choice4").style=""
        }
        
    }

    const validateAnswer = (index)=>{
        answerChoiced = true
        console.log("index=" + index + " correctAnswerIndex=" + correctAnswerIndex)
        if(currentQuestionIndex < 9){
            nextButton.current.style="display:block"
        }else{
            totalScore.current.style="display:block"
            retryButton.current.style="display:block"
        }
        if(index == correctAnswerIndex){
            correctText.current.style="display:block"
            setCorrectAnswerCount(correctAnswerCount + 1)
        }else{
            incorrectText.current.style="display:block"
        }
    }

    const resetQuiz = ()=>{
        setRestartQuiz(restartQuiz + 1)
        setCurrentQuestionIndex(0)
        setCorrectAnswerCount(0)
    }

    useEffect(() => {
        getLangListByType();
      }, [restartQuiz]);
    //getLangListByType()

    return(
        <>
        <Container fluid>
            <Container id="navbar">
                <img src={memberLogo} className="account-icon" alt="acc" />
                <Link to='/login' ><Button variant="outline-success" className="btn-logout" onClick={item.logout}>Logout</Button></Link>
                <Link to='/vocab' ><button type="button" className="btn btn-primary blue btn-float-right">Go Back</button></Link>
                <button type="button" ref={retryButton}  className="btn btn-primary blue btn-float-right" onClick={resetQuiz}>Restart Quiz</button>
            </Container>
            <hr/>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8} lg={8} id="quiz-panel">
                        <h1 className="center">Question {currentQuestionIndex + 1}</h1>
                        <p className="center">Please select the correct translation</p>
                        <br/>
                        <h2 className="center">{displayQuestion}</h2>
                        <br/>
                        <br/>
                        <div className="quizbox" id="choice1" 
                            onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(0); 
                                document.getElementById("choice1").style="background-color:lightgray"
                            }}}>
                            <p>{displayChoice1}</p>
                        </div>
                        <div className="quizbox" id="choice2" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(1); 
                                document.getElementById("choice2").style="background-color:lightgray"
                            }}}>
                            <p>{displayChoice2}</p>
                        </div>
                        <div className="quizbox" id="choice3" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(2); 
                                document.getElementById("choice3").style="background-color:lightgray"
                            }}}>
                            <p>{displayChoice3}</p>
                        </div>
                        <div className="quizbox" id="choice4" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(3); 
                                document.getElementById("choice4").style="background-color:lightgray"
                            }}}>
                            <p>{displayChoice4}</p>
                        </div>
                    </Col>
                    <p ref={correctText} className="text-correct">Correct!</p>
                    <p ref={incorrectText} className="text-incorrect hide">Incorrect! The answer is : {displayAnswer}</p>
                    <button type="button" ref={nextButton} className="btn btn-primary blue btn-next-quiz" onClick={loadQuestion}>Next &gt;</button>
                    <p ref={totalScore} className="text-total-score">Total Score: {correctAnswerCount}/10</p>
                </Row>
            </Container>
        </Container>
        </>
    )
}

export default Quiz;