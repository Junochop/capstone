import axios from 'axios';

import constants from '../constants';

const getRequestAll = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/recipes.json`)
      .then(res => {
        const items = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            items.push(res.data[fbKey]);
          });
        }
        console.error(items, 'hi');
        resolve(items);

      })
      .catch(err => {
        reject(err);
      });
  });
};

const getRequestMyRecipes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/myrecipes.json`)
      .then(res => {
        const items = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            items.push(res.data[fbKey]);
          });
        }
        resolve(items);

      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (newRecipe) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/myrecipes.json`, newRecipe)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getRequestAll, getRequestMyRecipes, postRequest };
