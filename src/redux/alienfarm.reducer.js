import { ADDALIEN, EDITALIEN, REMOVEALIEN, FILTERALIENS } from './alienfarm.types';

const INITIAL_STATE = {
  aliensCrew: [],
};

const alienreducer = (state = INITIAL_STATE, action) => {
  // console.log(state)

  switch (action.type) {

    case ADDALIEN:
      state.aliensCrew.push(action.alien)
      return state

    case EDITALIEN:
      console.log("editing " + action.alien + " + " + action.name)

      const newArr = state.aliensCrew.slice()
      var foundIndex = newArr.findIndex(x => x.id == action.alien);
      // items[foundIndex] = item;
      // console.log(state.aliensCrew[foundIndex])
      // console.log(state.aliensCrew[foundIndex].name = action.name)
      // state.aliensCrew.push(action.alien)
      newArr[foundIndex].name = action.name
      newArr[foundIndex].path = '/alien/'+action.alien+'/'+action.name


      // return state
      // console.log(state.aliensCrew)
      return {...state, aliensCrew: newArr};

    case REMOVEALIEN:

      if (window.confirm("Do you really want to remove this alien?")) {
        const newArray = state.aliensCrew.filter(function(el){
          return el.id !== action.alien;
        });
        return {...state, aliensCrew: newArray};
      } else {
        //
      } 


    case FILTERALIENS:
      // console.log("reducer " + action.alien)
  
      // const filteredArray = state.aliensCrew.filter(function(el){
      //   return el.name === action.alien;
      // });
  
      // // state.aliensCrew2 = state.aliensCrew.slice()
  
      // if(filteredArray.length > 0 ) {
      //   return {...state, aliensCrew: filteredArray};
      // }
      // else {
      // }
    
    default: return state;

  }
};

export default alienreducer;