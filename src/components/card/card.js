import React from 'react';
import './card.css';

import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid'
import {Button, Input, TextField} from '@material-ui/core/'

import DeleteIcon from '@material-ui/icons/HighlightOff'
// import Zopa from '@material-ui/icons/SearchRounded'

import { connect } from "react-redux"
import { alienRENAME, alienDEL } from "../../redux/alienfarm.actions"

const path = './imgs/'
const filenamebase = 'im'
const ext = '.png'
const totalnum = 11



const getAvatar = (num) => {
  // random image
  // const getImg = Math.floor(Math.random()*totalnum)
  const getImg = num
  const theImg = path+filenamebase+getImg+ext

  // if static image
  // const avatar = require('./imgs/im0.png')
  // if dynamic image - need to add these two quotes ""+[imgfullpath]
  const avatar = require(""+theImg)
  // const avatar = theImg

  return avatar
}

function card(props) {

  const deleteAlien = () => {
    // console.log("remove alien with ID: " + props.id)
    props.REMOVEALIEN(props.id)
  }

  // console.log(props.name)
  // console.log(props.id)

  // let switcher = (arg) => {return !arg}
  // switcher(true)
  // const editName = () => {
  //   console.log("triggered")
  //   document.getElementById("aliennameinput").setAttribute("disabled", false);
  //   // el.
  //   switcher(false)
  // }

  const renameTheAlien = () => {
    let name = document.getElementById("aliennameinput").value;
    console.log("renaming alien with ID: " + props.id + " and name " + name)
    props.EDITALIEN(props.id, name)
  }
  

  return (
    <div className="card-wrapper">
      <Container maxWidth='md'>
        <div className="card">

          <header>
          {/* <div className="unit-avatar" onClick={(text) => editName(!text.target.value)}> */}
            <div className="unit-avatar" onClick={renameTheAlien}>
              {/* <img src={require('./imgs/im0.png')} ></img> */}
              <img src={getAvatar(props.avatar)} alt=""></img>
              {/* <img src={require(""+getAvatar())} ></img> */}
            </div>

            <div className="unit-name" >
              {/* <Input id="aliennameinput" placeholder={props.name} disabled={switcher()} disableUnderline >{props.id}</Input> */}
              {/* <div id="aliennameinput2">{props.name}</div> */}
              {/* onChange={renameTheAlien} */}
              <Input id="aliennameinput" placeholder={props.name} disableUnderline>{props.name}</Input>
              {/* props.alienRENAME */}
            </div>

            <div id="unit-delete-bttn">
              <DeleteIcon onClick={deleteAlien} />
            </div>
            
            {/* <Button variant='text' color='secondary'><Test /></Button> */}
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
  // return {
  //   id: state.alienfarm.id,
  //   name: state.alienfarm.name,
  //   avatar: state.alienfarm.avatar,
  // }
  return state.alienfarm
}

const mapDispatchToProps = dispatch => {
  return {
    // ADDALIEN: (arg) => dispatch(alienADD(arg)),
    // ADDALIEN: (arg) => dispatch(alienADD({id : 11, name: "Jo", avatar: 3})),
    EDITALIEN: (id, name) => dispatch(alienRENAME(id, name)),
    REMOVEALIEN: (arg) => dispatch(alienDEL(arg)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(card);