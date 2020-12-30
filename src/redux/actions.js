
import NotificationPayLoad from 'components/NotificationPayload'
import {

    // notifications
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,

    // Loader
    SHOW_PAGE_LOADER,
    HIDE_PAGE_LOADER,

    //Modals
    SHOW_MODAL,
    HIDE_MODAL,

    // fields
    SET_FIELD_VALUES,
    SET_CONSTRAINTS,

    API

} from './constants';

/*
Tell the app to show the page loader
*/
export function showPageLoader() {


    return { type: SHOW_PAGE_LOADER }
}

/*
Tell the app to hide the page loader
*/
export function hidePageLoader() {


    return { type: HIDE_PAGE_LOADER }
}

/*
Tell the app to communicate with PAS endpoint
url: string, the endpoint url
method: post | get
data: the querystring or post data | optional, 
headers: http headers | optional
*/
export function api(url, method, data, headers) {

    let payload = {
        url: url,
        method: method,
        data: data,
        headers: headers
    }

    return { type: API, payload }
}



/*
Dispatch show modal redux store
guid: the guid of the modal control
config: config for this dispatch, optional
*/
export function showModal(guid, config) {
    let payload = {
        guid: guid,
        config: config
    }

    return { type: SHOW_MODAL, payload }
}

/*
Dispatch hide modal redux store
guid: the guid of the modal control
config: config for this dispatch, optional
*/
export function hideModal(guid, config) {
    let payload = {
        guid: guid,
        config: config
    }

    return { type: HIDE_MODAL, payload }
}


/**
 * notifications
 * 
 */
export const addNotification = (message,type) => {    
    let notification = new NotificationPayLoad(message, type);
    return {
        type: ADD_NOTIFICATION,
        notification: notification
    }   
};

export const removeNotification = (key) => ({
    type:  REMOVE_NOTIFICATION,
    key: key
});

/* LOADER METHODS */
export function showLoader() {    
    return { type: SHOW_PAGE_LOADER, payload:{} }
}

export function hideLoader() {    
    return { type: HIDE_PAGE_LOADER, payload:{} }
}

/**
 *  Set Field Values 
 *  Pass ID and value
 *  @param {*} parameters 
 */
export function setFieldValues(params){
    return { type: SET_FIELD_VALUES , payload: params} 
}
/**
 * Set Constraints on Field
 * @param {*} params 
 */
export function setFieldConstraints(params){
    return { type: SET_CONSTRAINTS , payload: params} 
}