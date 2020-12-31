import axios from "axios";

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
        console.log(error.response);
      });
  }
};

export default requests;