import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import '../../css/style.css';
import React, { useState } from 'react';
import axios from 'axios';

const VocabModal = (modal)=>{
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [type,setType] = useState("")
    const [meaning,setMeaning] = useState("")
    const [comment,setComment] =  useState("")
    const [translation,setTranslation] = useState("")
    const [notes,setNotes] = useState("")
    const loadVocabData = ()=>{
        if(modal.modalMode == "Exist"){
            console.log(modal.vocab)
            setId(modal.vocab._id)
            setName(modal.vocab.vocab)
            setType(modal.vocab.wordtype)
            setMeaning(modal.vocab.meaning)
            setComment(modal.vocab.sentence)
            setTranslation(modal.vocab.translation)
            setNotes(modal.vocab.notes)
        }else{
            setName("")
            setType("N")
            setMeaning("")
            setComment("")
            setTranslation("")
            setNotes("")
        }
    }
    const addNewVocab = ()=>{
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*"
        }
        const body={
            vocab:name,
            type:type,
            meaning:meaning,
            sentence:comment,
            translation:translation,
            note:notes
        }
        console.log('add new vocab=' +JSON.stringify(body))
        axios.post('http://localhost:8081/vocab/add-single',body).then(()=>{
            modal.handleClose()
        })
        
    }

    const updateVocab = ()=>{
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*"
        }
        const body={
            _id:id,
            vocab:name,
            type:type,
            meaning:meaning,
            sentence:comment,
            translation:translation,
            note:notes
        }
        console.log('update new vocab=' + JSON.stringify(body))
        axios.post('http://localhost:8081/vocab/update-single',body,{headers:headers}).then(()=>{
            modal.handleClose()
        })
    }

    const deleteVocab = (e)=>{
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*"
        }
        const body={
            _id:id
        }
        console.log('delete vocab=' + JSON.stringify(body))
        
        axios.post('http://localhost:8081/vocab/delete-single',body,{headers:headers}).then(()=>{
            modal.handleClose()
        })
    }

    return(
        <Modal show={modal.show} onHide={modal.handleClose} onEntered={loadVocabData}>
            <Modal.Body>
                <Form>
                    <label class="form-label">Vocab:</label>
                    <input type="text" class="form-control" placeholder="Enter vocab" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label class="form-label">Type:</label>
                    <select name="cars" id="cars" value={type} class="vocab-dropdown" onChange={(e)=>setType(e.target.value)}>
                        <option value="N">Noun</option>
                        <option value="V">Verb</option>
                        <option value="ADJ">Adjective</option>
                        <option value="ADV">Adverb</option>
                        <option value="P">Phrase</option>
                    </select>
                    <label class="form-label">Meaning:</label>
                    <input type="text" class="form-control" placeholder="Enter vocab" value={meaning} onChange={(e)=>setMeaning(e.target.value)}/>
                    <label class="form-label">Sentences:</label>
                    <textarea class="form-control" rows="2" id="comment" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                    <label class="form-label">Sentence Translation:</label>
                    <textarea class="form-control" rows="2" id="translation" name="translation" value={translation} onChange={(e)=>setTranslation(e.target.value)}></textarea>
                    <label class="form-label">Notes:</label>
                    <textarea class="form-control" rows="2" id="notes" name="notes" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="vocab-delete me-auto" variant="outline-secondary" onClick={deleteVocab}>Delete</Button>
                <Button variant="secondary" onClick={modal.handleClose}>Close</Button>
                {(modal.modalMode == "New" ? <Button variant="primary" onClick={addNewVocab}>Add Vocab</Button> : <Button variant="primary" onClick={updateVocab}>Save Change</Button>)}
            </Modal.Footer>
        </Modal>
    );
}

export default VocabModal;