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

// const getRequestGarage = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${constants.firebaseConfig.databaseURL}/garage.json`)
//       .then(res => {
//         const items = [];
//         if (res.data !== null) {
//           Object.keys(res.data).forEach(fbKey => {
//             res.data[fbKey].id = fbKey;
//             items.push(res.data[fbKey]);
//           });
//         }
//         resolve(items);

//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

export default { getRequestAll };
