import React from 'react';
import './App.css';

import uniqueId from 'lodash/uniqueId';
import { Link, Route, Redirect } from 'react-router-dom';

import {Button, Input} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'

import AddIcon from '@material-ui/icons/PersonAdd'
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Backspace'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent';

// custom components
import Card from './components/card/card'

import { connect } from "react-redux"
import { alienADD, filterAliens } from "./redux/alienfarm.actions"

function App(props) {

  const [open, setModalOpen] = React.useState(false);
  const [locked, setModalButtonLock] = React.useState(true);
  const [searchErase, activeSearch] = React.useState(false);


  // console.log(props)
  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalButtonLock(true);
    setModalOpen(false);
  };

  const unlockBuild = () => {
    setModalButtonLock(false);
  };

  const clearSearch = () => {
    document.getElementById("search-input").value = ""
    activeSearch(false)
  }

  const [aliens, updateAliens] = React.useState([]);

  const generateAvatar = () => {
    return Math.floor(Math.random()*11)
  }

  const Alien = ({ data }) => {

    return (
      // <div className="todo">
      //   {todo.text}
      // </div>
      // <Route path="/robot/:id" component={Card} />
      // <Route path="/robot/${todo.newRobotObj.name}" exact component={Card} />

      // <Route path={"/alien/"+data.id+"/"+data.name} render={(props) => (
      <Route path={data.path} render={(props) => (
        <Card {...props} name={data.name} avatar={data.avatar} id={data.id} />
      )} />
      
      // <Card obj={todo} />
    );
  };

// before of redux
  // const addAlien_r = () => {
  //   const newAlien = {
  //     id: uniqueId(),
  //     name: document.getElementById('alienname').value,
  //     avatar: generateAvatar(),
  //   }

  //   const updateTeam = [...aliens, newAlien];
  //   updateAliens(updateTeam);
  //   setModalOpen(false);
  //   setModalButtonLock(true);
  //   // console.log("robot " + document.getElementById('robotname').value + " has been added")
  // }

  const addAlien = () => {
    // console.log(the)
    const newAlien = {
      id: uniqueId(),
      name: document.getElementById('alienname').value,
      avatar: generateAvatar(), 
    }

    let newWithPath = {...newAlien, path: "/alien/" + newAlien.id + "/" + newAlien.name}

    // console.log(props)
    props.ADDALIEN(newWithPath)

    setModalOpen(false);
    setModalButtonLock(true);
  }

  const chooseItem = (item) => {
    const allaliens = document.querySelector(".aliens-list")
    // const list = allaliens.childNodes[0].children
    const list = allaliens.childNodes[0].childNodes

    let listArr = Array.from(list)
    
    listArr.map(it => {
      // total devastation
      // item.remove("active")
      // console.log(it.children[0])
      it.children[0].classList.remove("active")
    })

    item.target.classList.add("active")
  };

// console.log(props.aliensCrew)

  const searching = () => {

    // console.log(props)

    let query = document.getElementById("search-input").value
      if (query !== "") {
        activeSearch(true)
        // console.log(query)
        props.FILTERALIENS(query)
      }

    // if (!document.getElementById('search-input')) {
    //   console.log("null")
    //   let query = document.getElementById("search-input").value
    //   if (query !== "") {
    //     activeSearch(true)
    //     console.log(query)
    //     props.FILTERALIENS(query)
    //   }
    // }
    // else {
    //   console.log("not null")

    // }

  }

  return (
    <div className="App">
      <Container maxWidth='md'>

        <Grid container direction="row"
        justify="center"
        // alignItems="center"
        >
          <Grid container xs={4}>
            <div id="block-left">
              <div id="controls">
                <div id="search-block">
                  <Input id="search-input" color="primary" placeholder='Search...' onChange={searching} variant=''></Input>
                  <div id="clean-search-bttn" className={searchErase ? "visible" : "hidden"}>
                    <DeleteIcon onClick={clearSearch} />
                  </div>
                  
                </div>
                
                <Button size='large' startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleClickOpen} >New Alien</Button>
              </div>

              <div className="aliens-list">
                <ul>
                  {
                    props.aliensCrew.map(alien => {
                      return (
                        // fysking wrong!
                        // <Link to={'/alien/${alien.name}'}>
                        // correct
                        // <Link to={'/alien/' + alien.name}>
                        // <Link to={'/alien/'+alien.id+ "/" + alien.name}>
                        <Link to={alien.path}>
                          <li key={alien.id} onClick={e => chooseItem(e)}>
                            {alien.name}
                          </li>
                          </Link>
                        // </Link>
                      )
                        
                    })
                  }
                </ul>
                { !props.aliensCrew.length ? <p>No aliens around</p> : null }
              </div>
              
            </div>
            
          </Grid>

          <Grid container xs={8}>
            <div id="block-right">
                  <Route path="/" exact >
                    <h1>{props.aliensCrew.length === 0 ? "Add new alien" : "Select an alien"}</h1>
                  </Route>
                
                {/* <Route path="/robot/:id" component={Card} /> */}

                {/* { !props.aliensCrew.length ?
                  <Route render={({ history}) => (
                    <button
                      type='button'
                      onClick={() => { history.push('/') }}
                    >
                      Click Me!
                    </button>
                  )} />
                : null } */}

                {/* <Switch> */}
                { !props.aliensCrew.length
                  ? <Redirect to="/" />
                  : props.aliensCrew.map((alien, index) => (
                    <Alien
                      key={index}
                      index={index}
                      data={alien}
                    />
                  ))
                }
{/* </Switch> */}
                {/* {props.aliensCrew.map((alien, index) => (
                  <Alien
                    key={index}
                    index={index}
                    data={alien}
                  />
                ))} */}
            </div>

          </Grid>

        </Grid>

      </Container>


      <Dialog
        // TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">

        <div id="dialog-title">
         <DialogTitle id="form-dialog-title">New Alien</DialogTitle>
          <CloseIcon color='error' onClick={handleClose}/>
        </div>
        
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="alienname"
              label="Name for your alien"
              type="name"
              fullWidth
              onChange={unlockBuild}
            />

          <div id="dialog-footer">
          {/* onClick={addAlien} >Create</Button> */}
            <Button id="dialog-build-bttn" variant='contained' color="secondary" disabled={locked} onClick={addAlien} >Create</Button>
            
            
          </div>
            
        </DialogContent>
      </Dialog>

    </div>
    
  );
}

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
    ADDALIEN: (arg) => dispatch(alienADD(arg)),
    FILTERALIENS: (arg) => dispatch(filterAliens(arg)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
