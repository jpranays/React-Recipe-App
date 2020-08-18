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
				console.log(err);
				this.setState({ error: err });
				if (this.state.error) {
					document.write(this.state.error);
				}
			}
		});
		console.log("Component Mounted");
	};
	componentDidUpdate() {
		console.log("Just Updated");
	}
	handleChange = (e) => {
		e.preventDefault();
		console.log("Submitted");
		this.fetchData().catch((err) => {
			if (err) {
				document.querySelector("#message-container").innerHTML = "Error";
				console.log(err);
			}
		});
	};
	fetchData = async () => {
		document.querySelector("#message-container").innerHTML = "Loading...";
		const response = await fetch(
			`https://api.edamam.com/search?q=${
				this.state.query || "chicken"
			}&app_id=${this.APP_ID}&app_key=${this.API_KEY}`
		);
		const data = await response.json();
		document.querySelector("#message-container").innerHTML = "";
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
					<span
						style={{
							background: "none",
							border: "none",
							position: "absolute",
							left: "145px",
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
						x
					</span>

					<button className="search-button" type="submit">
						Search
					</button>
					<div id="recipe-container">
						<div id="message-container"></div>
						{this.state.dataArray.map(
							({ recipe: { label, calories, image } }, index) => (
								<Recipe
									key={index}
									title={label}
									calories={calories}
									image={image}
								/>
							)
						)}
					</div>
				</form>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.querySelector("#root"));
