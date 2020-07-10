import React from "react";
import loadingGif from "../img/pingpongLoading.gif";

function Spinner() {
	return (
		<div>
			<img
				src={loadingGif}
				style={{
					width: "150px",
					height: "150px",
					margin: "auto",
					display: "block",
				}}
				alt="loading..."
			></img>
		</div>
	);
}

export default Spinner;
