import React from "react";

const Recipe = ({ title, image, ingredient, recipeLink, id }) => {
	let backgroundGradients = [
		"linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
		"linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
		"linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
		"linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
		"linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
		"linear-gradient(to right, #fa709a 0%, #fee140 100%)",
		"linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
		"linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
		"linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
		"linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
	];
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
	}
	shuffle(backgroundGradients);

	return (
		<div
			className="card"
			style={{
				background: backgroundGradients[id],
			}}
		>
			<div className="card-header">
				<img src={image} alt={title} className="recipe-img" />
			</div>
			<div className="card-body">
				<h1>{title}</h1>
				<ul className="ingredient-list">
					{ingredient.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
			<div className="card-footer">
				<p>
					<a
						href={recipeLink}
						className="recipe-link"
						target="blank"
						title={title}
					>
						Full Recipe
					</a>
				</p>
			</div>
		</div>
	);
};
export default Recipe;
