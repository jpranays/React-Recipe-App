import React, { Component } from "react";
import ReactDOM from "react-dom";
import Recipe from "./components/Recipe";
class App extends Component {
	constructor() {
		super();
		this.APP_ID = process.env.REACT_APP_API_ID;
		this.API_KEY = process.env.REACT_APP_API_KEY;
		this.state = {
			query: "chicken",
			dataArray: [],
		};
	}
	componentDidMount = () => {
		this.fetchData();
	};
	handleChange = (e) => {
		e.preventDefault();
		this.fetchData();
	};
	fetchData = async () => {
		const response = await fetch(
			`https://api.edamam.com/search?q=${this.state.query}&app_id=${this.APP_ID}&app_key=${this.API_KEY}`
		);
		const data = await response.json();
		this.setState({ dataArray: data.hits });
	};
	render() {
		return (
			<div className="App">
				<form className="search-form" onSubmit={this.handleChange}>
					<input
						className="search-bar"
						type="text"
						value={this.state.query}
						onChange={(e) => {
							this.setState({ query: e.target.value });
						}}
					/>
					<button className="search-button" type="submit">
						Search
					</button>
					{this.state.dataArray.map(({ recipe }) => (
						<Recipe
							key={recipe.label}
							title={recipe.label}
							calories={recipe.calories}
							image={recipe.image}
						/>
					))}
				</form>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.querySelector("#root"));
