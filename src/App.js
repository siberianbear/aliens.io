import React from 'react';
import './App.css';

import uniqueId from 'lodash/uniqueId';
import { Link, Route } from 'react-router-dom';

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

function App() {

  const [open, setModalOpen] = React.useState(false);
  const [locked, setModalButtonLock] = React.useState(true);


  const [searchErase, activeSearch] = React.useState(false);

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

  const filterAliens = (e) => {
    if (document.getElementById("search-input").value !== "") {
      activeSearch(true)
    }
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
      <Route path={"/alien/"+data.id+"/"+data.name} render={(props) => (
        <Card {...props} name={data.name} avatar={data.avatar} />
      )} />
      
      // <Card obj={todo} />
    );
  };


  const addAlien = () => {
    const newAlien = {
      id: uniqueId(),
      name: document.getElementById('alienname').value,
      avatar: generateAvatar(),
    }

    const updateTeam = [...aliens, newAlien];
    updateAliens(updateTeam);
    setModalOpen(false);
    setModalButtonLock(true);
    // console.log("robot " + document.getElementById('robotname').value + " has been added")
  }

  const chooseItem = (item) => {
    const allaliens = document.querySelector(".aliens-list")
    const list = allaliens.childNodes[0].children

    let listArr = Array.from(list)
    
    listArr.map(item => {
      // total devastation
      // item.remove("active")
      item.classList.remove("active")
    })

    // item.target.classList.add("active")
    // listArr[item].classList.add("active")
  };



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
                  <Input id="search-input" color="primary" placeholder='Search...' onChange={filterAliens} variant=''></Input>
                  <div id="clean-search-bttn" className={searchErase ? "visible" : "hidden"}>
                    <DeleteIcon onClick={clearSearch} />
                  </div>
                  
                </div>
                
                <Button size='large' startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleClickOpen} >New Alien</Button>
              </div>

              <div className="aliens-list">
                <ul>
                  {
                    aliens.map(alien => {
                      return (
                        // fyking wrong!
                        // <Link to={'/alien/${alien.name}'}>
                        // correct
                        // <Link to={'/alien/' + alien.name}>
                          <li key={alien.id} onClick={e => chooseItem(alien.id)}>
                            <Link to={'/alien/'+alien.id+ "/" + alien.name}>
                            {alien.name} {alien.id}
                            </Link>
                          </li>
                        // </Link>
                      )
                        
                    })
                  }
                </ul>
              </div>
              
            </div>
            
          </Grid>

          <Grid container xs={8}>
            <div id="block-right">
                  <Route path="/" exact >
                    <h1>{aliens.length === 0 ? "Add new alien" : "Select an alien"}</h1>
                  </Route>
                
                {/* <Route path="/robot/:id" component={Card} /> */}

                {aliens.map((alien, index) => (
                  <Alien
                    key={index}
                    index={index}
                    data={alien}
                  />
                ))}

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
            <Button id="dialog-build-bttn" variant='contained' color="secondary" disabled={locked} onClick={addAlien} >Create</Button>
          </div>
            
        </DialogContent>
      </Dialog>

    </div>
    
  );
}

export default App;
