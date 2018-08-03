import React from 'react';

class Buttons extends React.Component {

  render () {
    return (
      <div className="initialButtons">
        <button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button>
        <button className="btn btn-info vieww button" onClick={this.viewDetail}>Add Notes</button>
      </div>
    );
  }
}
export default Buttons;
