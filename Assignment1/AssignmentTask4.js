// Step 1: Loading the JSON neoData

const fs = require('fs');
const data = fs.readFileSync("Assignment1/NEOWISE_Dataset.json", "utf8");
const neowise = JSON.parse(data);

// Step 4: Changing the JSON format
/*
We have 02 type of NEOs
+ Asteriods have following classes: "Aten", "Apollo", "Amor".
+ Comets have following classes: "Comet", "Encke-type Comet", "Jupiter-family Comet", "Halley-type Comet" and "Parabolic Comet".
Noted: Some of these comet classifications may also include an asterisk ("*") at the end.
*/

// Create arrays that store Asteriods and Comets
const asteriods = [];
const comets = [];
