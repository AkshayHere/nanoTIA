import * as ACTIONS from "./constants";

/**
 * Can do some sction before store is mounted
 * @param {*} store 
 */
export const commonProcessors = store => next => action => {
  switch (action.type) {
    case 'test':
      break;

    default:
      break;
  }

  return next(action);
}