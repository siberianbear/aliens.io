
import { ADDALIEN, REMOVEALIEN, EDITALIEN, FILTERALIENS } from './alienfarm.types';

export const alienADD = (alien) => {
    return {
        type: ADDALIEN,
        alien
    };
};

export const alienRENAME = (alien, name) => {
    // console.log("action with: " + alien + " & " + name)
    return {
        type: EDITALIEN,
        alien, name
    };
};

export const alienDEL = (alien) => {
    return {
        type: REMOVEALIEN,
        alien
    };
};

export const filterAliens = (alien) => {
  return {
      type: FILTERALIENS,
      alien
  };
};