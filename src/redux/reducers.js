import * as ACTIONS from "./constants";
import { cloneDeep, mergeWith, assign } from 'lodash';

const initialState = {
    //api effects result / response
    //all request=>responses will be dump into this area
    posts: [],
    pageNo: '',

    currentPost: {},

    //common ui effects
    uiEffects: {
        pageLoader: false
    },

    // for fields across different pages
    fields: {},
};


export function reducer(state = initialState, action) {
    var newState = cloneDeep(state);

    switch (action.type) {
        // save api data
        case ACTIONS.API_SAVE_RESPONSE:
            newState.api = assign({}, newState.api, action.payload);
            return newState;
        
            // save api data
        case ACTIONS.SAVE_POSTS:
            newState.posts = [...newState.posts, ...action.payload];
            return newState;

        // Loader
        case ACTIONS.SHOW_LOADER:
            newState.pageLoader = true;
            return newState;

        case ACTIONS.HIDE_LOADER:
            newState.pageLoader = false;
            return newState;

        // Set Field Values
        case ACTIONS.SET_FIELD_VALUES:
            newState.fields = { ...newState.fields, ...action.payload };
            return newState;

        case ACTIONS.SET_PAGE_NO:
            newState.pageNo = action.payload;
            return newState;

        default:
            return state;


    }

}

