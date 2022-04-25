import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import Vocab from '../../html/vocab'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VocabCard = (vocab)=>{

    return(
        <div className="vocab-card" onClick={()=>vocab.handleShow(vocab)}>
            <p>{vocab.vocab}<span className="badge bg-secondary">{vocab.wordtype}</span></p>
            <p>{vocab.meaning}</p>
            {vocab.sentence &&
                <p className="senetence">{vocab.sentence}</p>
            }
            {vocab.translation &&
                <p className="senetence">{vocab.translation}</p>
            }
      </div>
    );
}

export default VocabCard;