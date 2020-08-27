import React, { Component } from "react";
import ReactDOM from "react-dom";
import Recipe from "./components/Recipe";
import "./style.css";
class App extends Component {
	constructor() {
		super();
		this.APP_ID = process.env.REACT_APP_API_ID;
		this.API_KEY = process.env.REACT_APP_API_KEY;
		this.state = {
			query: "chicken",
			dataArray: [],
			error: null,
		};
	}
	componentDidMount = () => {
		this.fetchData().catch((err) => {
			if (err) {
				this.setState({ error: err });
				document.querySelector("#spinner-container").classList.remove("loaded");
				document.querySelector("#food-spinner").classList.remove("spinner");
			}
		});
	};
	handleChange = (e) => {
		e.preventDefault();
		this.fetchData().catch((err) => {
			if (err) {
				document.querySelector("#spinner-container").classList.remove("loaded");
				document.querySelector("#food-spinner").classList.remove("spinner");
				this.setState({ error: err });
			}
		});
	};
	fetchData = async () => {
		document.querySelector("#spinner-container").classList.add("loaded");
		document.querySelector("#food-spinner").classList.add("spinner");
		const response = await fetch(
			`https://api.edamam.com/search?q=${
				this.state.query || "chicken"
			}&app_id=${this.APP_ID}&app_key=${this.API_KEY}`
		);
		const data = await response.json();
		document.querySelector("#spinner-container").classList.remove("loaded");
		document.querySelector("#food-spinner").classList.remove("spinner");

		this.setState({ dataArray: data.hits });
		if (this.state.error) {
			this.setState({ error: null });
		}
	};
	render() {
		return (
			<div className="App">
				<div className="form-container">
					<form className="search-form" onSubmit={this.handleChange}>
						<div
							style={{
								position: "relative",
							}}
							className="btn-container"
						>
							<input
								className="search-bar"
								type="search"
								value={this.state.query}
								onChange={(e) => {
									this.setState({ query: e.target.value });
								}}
								style={{
									width: "100%",
									padding: "10px 5px",
									borderRadius: "5px",
									border: "none",
									outline: "none",
									fontWeight: "bold",
									boxShadow: "1px 1px 8px 1px grey",
								}}
							/>
							<span
								style={{
									background: "none",
									border: "none",
									position: "absolute",
									right: "5px",
									top: "25%",
									outline: "none",
									cursor: "pointer",
								}}
								onClick={(e) => {
									e.preventDefault();
									console.log("cleared");
									this.setState({ query: "" });
								}}
								id="clear-button"
							>
								<i className="fa fa-times"></i>
							</span>
							<span
								style={{
									position: "absolute",
									right: "-25px",
									top: "20%",
									cursor: "pointer",
								}}
							>
								<i
									className="fa fa-search"
									aria-hidden="true"
									onClick={this.handleChange}
								></i>
							</span>
						</div>
					</form>
				</div>
				<div className="recipe-data-container">
					<div id="spinner-container">
						<div className="spinner" id="food-spinner">
							{" "}
						</div>
					</div>
					{this.state.error ? (
						<div className="error-container">
							<h1>Error Occured</h1>
							<h3>Try again later</h3>
						</div>
					) : (
						<div className="recipe-container">
							{this.state.dataArray.map(
								({ recipe: { label, image, ingredientLines, url } }, index) => (
									<Recipe
										key={index}
										id={index}
										title={label}
										image={image}
										ingredient={ingredientLines}
										recipeLink={url}
									/>
								)
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.querySelector("#root"));
