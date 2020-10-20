import React from 'react';
import logo from './logo.svg';
import './App.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import {Button, Input} from '@material-ui/core'

import AddIcon from '@material-ui/icons/PersonAdd'
import CloseIcon from '@material-ui/icons/Close';
// import DeleteIcon from '@material-ui/icons/HighlightOff'
import DeleteIcon from '@material-ui/icons/Backspace'


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'

// custom components
import Card from './components/card/card'

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Dialog direction="up" ref={ref} {...props} />;
// });

function App() {

  const [open, setOpen] = React.useState(false);
  const [locked, setUnlock] = React.useState(true);

  // const [sorting, activeFilter] = React.useState(false);

   const [searchErase, activeSearch] = React.useState(false);

  const [robots, addNewRobot] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unlockBuild = () => {
    setUnlock(false);
  };

  const clearSearch = () => {
    document.getElementById("search-input").value = ""
    activeSearch(false)
  }

  const filterRobots = (e) => {

    if (document.getElementById("search-input").value !== "") {
      activeSearch(true)
    }

  }


  const addRobot = () => {
    console.log("robot " + document.getElementById('robotname').value + " has been added")
    robots.push(document.getElementById('robotname').value)
    console.log(robots)
    setOpen(false);
    setUnlock(true)
  }

  const chooseItem = (item) => {
    console.log(document.querySelector(".robots-list"))

    const allrobots = document.querySelector(".robots-list")
    const list = allrobots.childNodes[0].children

    let listArr = Array.from(list)
    listArr.map(item => {
      // total devastation
      // item.remove("active")
      item.classList.remove("active")
    })

    item.target.classList.add("active")
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
                  <Input id="search-input" color="primary" placeholder='Search...' onChange={filterRobots} ></Input>
                  <div id="clean-search-bttn" className={searchErase ? "visible" : "hidden"}>
                    <DeleteIcon onClick={clearSearch} />
                  </div>
                  
                </div>
                
                <Button size='large' startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleClickOpen} >New Robot</Button>
              </div>

              <div className="robots-list">
                <ul>
                  {
                    robots.map(robot => {
                      return (<li key={robot} onClick={chooseItem}>{robot}</li>)
                    })
                  }
                </ul>
              </div>
              
            </div>
            
          </Grid>

          <Grid container xs={8}>
            <div id="block-right">
              <h1 color='red'>Select a robot</h1>
              <Card />
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
         <DialogTitle id="form-dialog-title">New Robot</DialogTitle>
          <CloseIcon color='error' onClick={handleClose}/>
        </div>
        
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="robotname"
              label="Name for your robot"
              type="name"
              fullWidth
              onChange={unlockBuild}
            />

          <div id="dialog-footer">
            <Button id="dialog-build-bttn" variant='contained' color="primary" disabled={locked}onClick={addRobot} >Build</Button>
          </div>
            
        </DialogContent>
      </Dialog>

    </div>

    
  );
}

export default App;
