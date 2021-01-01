import{
    GET_POSTS,
    GET_POST_DETAILS,
    SAVE_POST_DETAILS
} from './constants'

export function getPosts(payload) {
    console.log('actions > getPosts');
    return { type: GET_POSTS, payload }
}

export function getPostDetails(payload) {
    return { type: GET_POST_DETAILS, payload }
}

export function setPostDetails(payload) {
    return { type: SAVE_POST_DETAILS, payload }
}