import * as ACTIONS from "./constants";
import { cloneDeep, mergeWith, assign } from 'lodash';

const initialState = {

    token: null, //token
    profile: null, //user profile

    //For notifications
    //Snackbars, notistack
    nextNotification: -1, // used for notifications keys
    notifications: [], // contains the list of notifications

    //api effects result / response
    //all request=>responses will be dump into this area
    api: {
        /* 
        timestamp of the request or the key provided in the request payload
        timestamp : {
            
            the request payload dispatch via API action
            request: {
                url: "http://example.com"
            },

            the axios response will be logged here
            response: {

            }
        }
        */
    },

    //common ui effects
    uiEffects: {
        pageLoader: false
    },

    //below is for modals to listen to their guid
    //if present in this object, they must display themselves
    //if not present in this object, they must hide themselves
    modals: {

    },

    // for fields across different pages
    fields: {

    },

    //below is for fields to listen to their guid
    //if present in this object, they must display themselves as readonly    
    readOnly: {

    },

    // set field constraints
    constraints: {

    },

    fieldErrors: {

    },

    version: process.env.REACT_APP_PAS2_VERSION
};


export function reducer(state = initialState, action) {
    var newState = cloneDeep(state);

    switch (action.type) {

        case ACTIONS.ADD_NOTIFICATION:

            // increment notification key
            newState.nextNotification = newState.nextNotification + 1;

            let notification = cloneDeep(action.notification);
            notification.key = newState.nextNotification;


            // add notification with incremented key at the start of the list
            newState.notifications.unshift(notification);
            return newState;

        case ACTIONS.REMOVE_NOTIFICATION:
            newState.notifications = newState.notifications.filter(notification => notification.key !== action.key)
            return newState;

        case ACTIONS.API_SAVE_RESPONSE: //API effects


            newState.api = assign({}, newState.api, action.payload);

            return newState;

        //UI Effects
        case ACTIONS.SHOW_PAGE_LOADER:
            newState.uiEffects.pageLoader = true;
            return newState;

        case ACTIONS.HIDE_PAGE_LOADER:
            newState.uiEffects.pageLoader = false;
            return newState;

        case ACTIONS.UPDATE_PDPA:
            newState.pdpa.optIn = action.payload.optIn;

            return newState;
        case ACTIONS.UPDATE_COMMON_VALUES:
            newState = mergeWith({}, newState, action.payload);
            return newState;

        case ACTIONS.SHOW_MODAL:

            if (!(action.payload.guid in newState.modals)) {
                if (action.payload.config) {
                    newState.modals = Object.assign({}, newState.modals, { [action.payload.guid]: action.payload.config });
                } else {
                    newState.modals = Object.assign({}, newState.modals, { [action.payload.guid]: { show: true } });
                }
            }

            return newState;

        case ACTIONS.HIDE_MODAL:

            if (action.payload.guid in newState.modals) {
                delete newState.modals[action.payload.guid];

            } else if ("guid" in action.payload && action.payload.guid === "*") {
                //clear all modals
                newState.modals = {};
            }

            return newState;

        // Set Field Values
        case ACTIONS.SET_FIELD_VALUES:
            newState.fields = { ...newState.fields, ...action.payload };
            return newState;

        // Set Field Constraints
        case ACTIONS.SET_CONSTRAINTS:
            newState.constraints = { ...newState.constraints, ...action.payload };
            return newState;

        case ACTIONS.ADD_FIELD_ERROR:
            return mergeWith({}, state, {
                fieldErrors: { ...state.fieldErrors, ...action.payload }
            });

        case ACTIONS.CLEAR_FIELD_ERROR:
            if (action.payload in newState.fieldErrors) {
                delete newState.fieldErrors[action.payload];
                return newState;
            }

            return state;

        default:
            return state;


    }

}

