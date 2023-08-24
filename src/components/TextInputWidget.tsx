import React from "react";
import {Input, Button} from "@mui/material";

const TextInputWidget = () => {
	const [isEditMode, setIsEditMode] = React.useState(true);
	const [inputText, setInputText] = React.useState("");
	
	const handleStartEdit = () => {
		setIsEditMode(true);
	}

	const handleStopEdit = () => {
		setIsEditMode(false);
	}

	const handleTextChange = (event: any) => {
    setInputText(event.target.value);
  };

	return (
		<div style={{width: "100%", height: "100%"}}>
			{isEditMode && (
				<div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "end"}}>
					<Input type="text" fullWidth onChange={handleTextChange} value={inputText}/>
					<Button sx={{bottom: "0", right: "0"}} onClick={handleStopEdit}>완료</Button>
				</div>
			)}
			{!isEditMode && (
				<div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "end"}}>
					<h3 style={{width: "100%"}}>
						{inputText}
					</h3>
					<Button sx={{bottom: "0", right: "0"}} onClick={handleStartEdit}>수정</Button>
				</div>
			)}
		</div>
	);
}

export default TextInputWidget;