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
				document.querySelector("#spinner-container").innerHTML = "Error";
				console.log(err);
			}
		});
	};
	fetchData = async () => {
		document.querySelector("#spinner-container").innerHTML = "Loading...";
		const response = await fetch(
			`https://api.edamam.com/search?q=${
				this.state.query || "chicken"
			}&app_id=${this.APP_ID}&app_key=${this.API_KEY}`
		);
		const data = await response.json();
		document.querySelector("#spinner-container").innerHTML = "";
		this.setState({ dataArray: data.hits });
		console.log(data.hits);
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
								type="text"
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
				<div id="recipe-container">
					<div id="spinner-container"></div>
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
			</div>
		);
	}
}
ReactDOM.render(<App />, document.querySelector("#root"));
