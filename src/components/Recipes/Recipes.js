import React from 'react';
import './Recipes.css';
// import myRecipesRequests from '../../firebaseRequests/MyRecipes';
// import authRequests from '../../firebaseRequests/auth';
// import recipesRequests from '../../firebaseRequests/recipes';

class Recipes extends React.Component {
  // addClickEvent = () => {
  //   this.props.addToGarage(this.props.details.id);

  // }

  // viewDetail = () => {
  //   const id = this.props.details.id;
  //   this.props.redirectViewDetail(id);

  // }

  // state = {
  //   itemDescription: this.props.details.itemDescription,
  //   itemImage: this.props.details.itemImage,
  //   itemName: this.props.details.itemName,
  //   uid: authRequests.getUid(),
  //   flag: this.props.flag,
  // }
  // saveNewGarage = () => {
  //   garageRequests
  //     .postRequest(this.state)
  //     .then(() => {
  //       this.props.redirectToGarage();
  //     })
  //     .catch((err) => {
  //       console.error('error in post', err);
  //     });
  // }

  // deleteNewGarage = () => {
  //   console.error(this.props);
  //   garageRequests
  //     .deleteRequest(this.props.details.id)
  //     .then(() => {
  //       itemRequests
  //         .getRequestGarage()
  //         .then((items) => {
  //           this.props.updateState(items);
  //         });
  //     })
  //     .catch((err) => {
  //       console.error('error in post', err);
  //     });
  // }

  render () {
    const { details } = this.props;
    // console.error('bb', this.props.details.itemDescription);

    const image = `${details.itemImage}`;
    const ingredientList = this.props.details.itemDescription;
    const stepsList = this.props.details.steps;
    const ingredients = ingredientList.map((ingredient, index) =>
      <p key={index}>
        {ingredient.name}: {ingredient.quantity}
      </p>
    );
    const steps = stepsList.map((step, index) =>
      <p key={index}>
        {step}
      </p>
    );

    console.error('cc', ingredientList);

    return (

      <li className="Item thumbnail">
        <img src={image} alt={details.itemImage} />
        <h3 className="name">
          {details.itemName}
        </h3>
        <h5 className="ingredients">
          <b>Ingredients:</b>
          {ingredients}
        </h5>
        <h5 className="steps">
          <b>Steps</b>
          {steps}
        </h5>
      </li>

    );
  }
}

export default Recipes;
