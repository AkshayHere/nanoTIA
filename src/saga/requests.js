import axios from "axios";
import {
	API_ERROR_RESPONSE
} from 'redux/constants';

const requests = {

  /**
   * Get posts based on page & limit
   * @param {*} page 
   * @param {*} limit 
   */
  getPosts(page = 1, limit = 10) {
    let url = process.env.REACT_APP_TIA_URL + "posts?" +
      "page=" + page +
      "&per_page=" + limit;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.log('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  },

  /**
   * Get Post Details by slug 
   * @param {*} slug 
   */
  getPostDetails(slug) {
    let url = process.env.REACT_APP_TIA_URL + "posts/" +slug;
    return axios.get(url, {
    })
      .then(response => {
        console.log(response.data);
        return response;
      })
      .catch(error => {
        let errorData = error.response.data;
        console.log('errorData',errorData);
        window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
        throw error;
      });
  }

};

export default requests;