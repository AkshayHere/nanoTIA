import * as ACTIONS from "./constants";
/**
* Logs all actions and states after they are dispatched.
*/
export const logger = store => next => action => {
  if (process.env.NODE_ENV === "development") {
    console.group(action.type)
    console.info('dispatching', action)
  }
  let result = next(action)
  if (process.env.NODE_ENV === "development") {
    console.log('next state', store.getState())
    console.groupEnd()
  }

  return result
}

export const commonProcessors = store => next => action => {

  switch (action.type) {
    case ACTIONS.SET_FIELD_VALUES:
      let valid = true;
      let payload = action.payload;
      
      let fieldId = Object.keys(payload)[0];
      let value = Object.values(payload)[0];

      break;

    default:
      break;
  }

  return next(action)
}