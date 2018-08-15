import axios from 'axios';

import constants from '../constants';

const getRequest = (recipeID) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/comments.json?orderBy="recipeId"&equalTo="${recipeID}"`)
      .then(res => {
        const recipes = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            recipes.push(res.data[fbKey]);
          });
        }
        resolve(recipes);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getCommentsRequest = (recipeID) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/comments.json?orderBy="recipeId"&equalTo="${recipeID}"`)
      .then(res => {
        const commentKey = Object.keys(res.data)[0];
        console.error('test:',commentKey);
        // console.error(commentKey);
        resolve(res.data[commentKey]);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getCommentsKey = (recipeID) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/comments.json?orderBy="recipeId"&equalTo="${recipeID}"`)
      .then(res => {
        const commentKey = Object.keys(res.data)[0];
        console.error('test:', commentKey);
        // console.error(commentKey);
        resolve(commentKey);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (newComments) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/comments.json`, newComments)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putCommentRequest = (recipeID, newComments) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/comments/${recipeID}.json`, newComments)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteRequest = (recipeId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/mycomments/${recipeId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSingleRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/myrecipes/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const putRequest = (recipeId, updatedRecipe) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/myrecipes/${recipeId}.json`, updatedRecipe)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getRequest, postRequest, deleteRequest, getSingleRequest, putRequest, getCommentsRequest, putCommentRequest, getCommentsKey};
