import * as ACTIONS from "./constants";
import { cloneDeep, mergeWith, assign, merge, sortBy } from 'lodash';

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

    // for api errors
    errors: {},
};


export function reducer(state = initialState, action) {
    var newState = cloneDeep(state);

    switch (action.type) {
        // save api data
        case ACTIONS.API_SAVE_RESPONSE:
            newState.api = assign({}, newState.api, action.payload);
            return newState;

        case ACTIONS.SAVE_POST_DETAILS:
            newState.currentPost = assign({}, newState.currentPost, action.payload);
            return newState;

        // save api data
        case ACTIONS.SAVE_POSTS:
            // newState.posts = [...newState.posts, ...action.payload];
            // let allPosts = [...newState.posts, ...action.payload];
            // let sortedPost = sortBy(allPosts, ['modified_gmt']);
            // newState.posts = sortedPost;
            // newState.posts = merge(newState.posts,action.payload);

            var slugs = new Set(newState.posts.map(d => d.slug));
            var merged = [...newState.posts, ...action.payload.filter(d => !slugs.has(d.slug))];
            newState.posts = merged;
            console.log('newState.posts', newState.posts);
            return newState;

        // Loader
        case ACTIONS.SHOW_LOADER:
            newState.pageLoader = true;
            return newState;

        case ACTIONS.HIDE_LOADER:
            newState.pageLoader = false;
            return newState;

        // save page no
        case ACTIONS.SET_PAGE_NO:
            newState.pageNo = action.payload;
            return newState;

        // save error response
        case ACTIONS.API_ERROR_RESPONSE:
            newState.errors = action.payload;
            return newState;

        default:
            return state;


    }

}

