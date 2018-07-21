import React from 'react';

// import itemRequests from '../../firebaseRequests/item';
// import Items from '../../components/Items/Items';

class AllRecipes extends React.Component {
  // state = {
  //   items: [],
  // }

  // redirectToMyRecipes = () => {
  //   this.props.history.push('/MyRecipes');
  // }

  // componentDidMount () {
  //   itemRequests
  //     .getRequestAll()
  //     .then((items) => {
  //       this.setState({ items });
  //     })
  //     .catch((err) => {
  //       console.error('error in items', err);
  //     });
  // }
  render () {
    // const itemComponents = this.state.items.map((item) => {
    //   return (
    //     <Items
    //       key={item.id}
    //       details={item}
    //       redirectToMyRecipes={this.redirectToMyRecipes}
    //       flag='FromAllTheStuff'
    //     />
    //   );
    // });
    return (
      <div className="New">
        <div className="col-xs-8 inventory-container">
          <h1>All Recipes</h1>
          <ul className="recipes">
            <p>RecipesComponents</p>
          </ul>

        </div>

      </div>
    );
  }
}

export default AllRecipes;
