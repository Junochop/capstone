import React from 'react';
// import itemRequests from '../../firebaseRequests/item';
// import Items from '../../components/Recipes/Recipes';

import './MyRecipes.css';

class MyRecipes extends React.Component {
  // state = {
  //   items: [],
  // }

  // componentDidMount() {
  //   itemRequests
  //     .getRequestGarage()
  //     .then((items) => {
  //       this.setState({ items });
  //     })
  //     .catch((err) => {
  //       console.error('error in items', err);
  //     });
  // }

  // updateState = (newItems) => {
  //   this.setState({ items: newItems });

  // }

  // redirectViewDetail = (id) => {
  //   this.props.history.push(`/View/${id}`);
  // }

  render () {

    // const itemComponents = this.state.items.map((item) => {
    //   return (
    //     <Items
    //       key={item.id}
    //       details={item}
    //       flag='FromAllGarage'
    //       updateState={this.updateState}
    //       redirectViewDetail={this.redirectViewDetail}
    //     />
    //   );
    // });
    // console.error('ll', this.state.items);
    return (
      <div className="Garage">
        <p>recipesComponents</p>
      </div>
    );
  }
};

export default MyRecipes;
