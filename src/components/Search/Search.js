import React from 'react';
import './Search.css';

const API_KEY = '6ab20a5cd7b25def23b11b775d1ac383';

class Search extends React.Component {

  state = {
    recipes: [],
  }

  getRecipe = async (e) => {

    const SearchRecipeName = e.target.elements.SearchRecipeName.value;
    e.preventDefault();
    const apiCall = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${SearchRecipeName}&count=18`);
    const data = await apiCall.json();

    console.log(SearchRecipeName);
    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
  }

  render () {
    return (
      <div>
        <div>
          <form onSubmit={this.getRecipe} style={{ marginBottom: '2rem' }}>
            <input className="form__input" type="text" name="SearchRecipeName" />
            <button className="form__button btn btn-default">Search</button>
          </form>;
        </div>

        <div className="container">
          <div className="row">
            {this.state.recipes.map((recipe) => {
              return (
                <div className="col-md-6 col-md-6">
                  <div className="thumbnail">
                    <div className="recipe__box">
                      <img className="recipe__box-img"
                        src={recipe.image_url}
                        alt={recipe.title} />
                      <div className="recipe__text">
                        <h5><b>{recipe.title}</b></h5>
                        <p>Source: <span>{recipe.publisher}</span></p>
                      </div>
                      <button className="recipe__button btn btn-info ">
                        <a target="_blank" href={recipe.source_url}>More Info</a>
                      </button>
                    </div>
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
