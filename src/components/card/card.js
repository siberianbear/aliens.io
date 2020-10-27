import React from 'react';
import './card.css';

import Container from '@material-ui/core/Container';
import {Input, TextField} from '@material-ui/core/'

import DeleteIcon from '@material-ui/icons/HighlightOff'

import { connect } from "react-redux"
import { alienRENAME, alienDEL } from "../../redux/alienfarm.actions"

const path = './imgs/'
const filenamebase = 'im'
const ext = '.png'
// const totalnum = 11


const getAvatar = (num) => {
  // random image
  // const getImg = Math.floor(Math.random()*totalnum)
  const getImg = num
  const theImg = path+filenamebase+getImg+ext

  // if static image
  // const avatar = require('./imgs/im0.png')
  // if dynamic image - need to add these two quotes ""+[imgfullpath]
  const avatar = require(""+theImg)

  return avatar
}

function card(props) {

  const deleteAlien = () => {

    props.REMOVEALIEN(props.id)
  }

  const renameTheAlien = () => {
    let name = document.getElementById("aliennameinput").value;

    if (name !== "") {
      props.EDITALIEN(props.id, name)
    }
    // console.log("renaming alien with ID: " + props.id + " and name " + name)
    
  }
  

  return (
    <div className="card-wrapper">
      <Container maxWidth='md'>
        <div className="card">

          <header>

            <div className="unit-avatar" onClick={renameTheAlien}>

              <img src={getAvatar(props.avatar)} alt=""></img>

            </div>

            <div className="unit-name" >

              <Input id="aliennameinput" placeholder={props.name} disableUnderline>{props.name}</Input>

            </div>

            <div id="unit-delete-bttn">
              <DeleteIcon onClick={deleteAlien} />
            </div>
            
          </header>
          
          <section className="unit-data">
            <TextField id="unit-comment-area" label="Type your comment here..." variant="outlined" multiline/>
          </section>

        </div>
        
      </Container>

    </div>
  );
}

// export default card;
const mapStateToProps = state => {
  return state.alienfarm
}

const mapDispatchToProps = dispatch => {
  return {
    EDITALIEN: (id, name) => dispatch(alienRENAME(id, name)),
    REMOVEALIEN: (arg) => dispatch(alienDEL(arg)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(card);