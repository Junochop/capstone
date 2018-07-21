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
    // const { details } = this.props;
    // console.error('bb', this.props.details);

    // const image = `${details.itemImage}`;
    return (
      <p>recipes</p>

      // <li className="Item thumbnail">
      //   <img src={image} alt={details.itemImage} />
      //   <h3 className="name">
      //     {details.itemName}
      //   </h3>
      //   <p>{details.itemDescription}</p>
      //   {this.state.flag === 'FromAllTheStuff' ?
      //     (<button className="btn btn-danger button" onClick={this.saveNewGarage}>add me</button>)
      //     :
      //     (
      //       <div>
      //         <button className="btn btn-danger button" onClick={this.deleteNewGarage}>Delete</button>
      //         <button className="btn btn-danger button" onClick={this.viewDetail}>View</button>
      //       </div>
      //     )}
      // </li>

    );
  }
}

export default Recipes;
