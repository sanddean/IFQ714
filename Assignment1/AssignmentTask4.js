// Step 1: Loading the JSON neoData

const fs = require('fs');
const data = fs.readFileSync("Assignment1/NEOWISE_Dataset.json", "utf8");
const neowise = JSON.parse(data);

// Step 2: Basic function
// Display NEO index number
function displayNEOIndex(value){
    console.log('+------------------+');
    console.log('    NEO No: ', value+1,);
    console.log('+------------------+');
}
/* Display NEO neoData in a readable format
If the value available then display the value otherwise display N/A
*/
function displayNEOData(neoData) {
    console.log(`   + Designation: ${neoData.designation ? neoData.designation : 'N/A'} `);
    console.log(`   + Discovery Date: ${neoData.discovery_date ? neoData.discovery_date : 'N/A'}`);
    console.log(`   + Observed Magnitude: ${neoData.h_mag ? neoData.h_mag : 'N/A'}`);
    console.log(`   + Mininum Orbit Intersection Distance (MOID): ${neoData.moid_au ? neoData.moid_au : 'N/A'}`);
    console.log(`   + Perihelion Distance: ${neoData.q_au_1 ? neoData.q_au_1 : 'N/A'}`);
    console.log(`   + Aphelion Distance: ${neoData.q_au_2 ? neoData.q_au_2 : 'N/A'}`);
    console.log(`   + Orbital Period (year): ${neoData.period_yr ? neoData.period_yr : 'N/A'}`);
    console.log(`   + Orbital Inclination: ${neoData.i_deg ? neoData.i_deg : 'N/A'}`);
    switch (neoData.pha) {
        case true:
            console.log('   + Potentially Hazardous Asteriod (PHA): YES');
            break;
        case false:
            console.log('   + Potentially Hazardous Asteriod (PHA): NO');
            break;
        case null:
            console.log('   + Potentially Hazardous Asteriod (PHA): N/A');
            break; 
    }
    console.log(`   + ORBIT CLASS: ${neoData.orbit_class ? neoData.orbit_class : 'N/A'}`);
    console.log('========================================================');
}

// Find NEO based on its orbit_class then add to an array
function findNEO_OrbitClass(neoData, searchValue){
    let result = [];
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class == searchValue){
            result.push(neoData[i]);
        }
    return result;
}

// Finding NEO based on its designation then return that NEO object
function findNEO_Designation(neoData, searchValue) {
    let tempNEO = [];
    neoData.forEach(element => {
        if (element.designation === searchValue) {
            //displayNEOData(element);
            tempNEO = element;
        }
    });
    return tempNEO;
}

// Measure the maximum orbit of a NEO
function NEOMaxOrbit (neo){
    let maxOrbit = Math.max(neo.moid_au, neo.q_au_1, neo.q_au_2);
    return maxOrbit;
}

// Measure the minimum orbit of a NEO
function NEOMinOrbit (neo){
    let minOrbit = Math.min(neo.moid_au, neo.q_au_1, neo.q_au_2);
    return minOrbit;
}

// Measure the average orbit of a NEO
function NEOAverageOrbit (neo) {
    let averageOrbit = (neo.moid_au + neo.q_au_1 + neo.q_au_2) / 3;
    return averageOrbit;
}

// Step 3:
// 3.1 Display information of all NEOs in the datasheet
function displayAllNEODataInfo(neoData){
    for (let i = 0; i < neoData.length; i++) {
        displayNEOIndex(i);
        displayNEOData(neoData[i]);
    }
}
// Testing display all NEO data
//displayAllNEODataInfo(neowise);

// 3.2.a Display information on NEOs data that have vertain criteria. Eg. Certain Orbit Class
function displayNEO_OrbitClass(neoData, searchValue){
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class == searchValue){
            displayNEOIndex(i);
            displayNEOData(neoData[i]);
        }
}
// Test finding NEO with orbit_class 'Halley-type Comet*'
//displayNEO_OrbitClass(neowise,'Halley-type Comet*');

// 3.2.b Display information on NEOs data that have vertain criteria. Eg. Certain PHA
function displayNEO_PHA(neoData, searchValue){
    for (let i = 0; i < neoData.length; i++) {
        if (neoData[i].pha == searchValue) {
            displayNEOIndex(i);
            displayNEOData(neoData[i]);
        }
    }
}
// Test display NEOs with PHA [true, false, null]
//displayNEO_PHA(neowise,true);


// Measure the maximum orbit value of NEOs in the same orbit_class
function MaxOrbitOfSameClassNEO (data, searchValue) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClass(data,searchValue);
    
    // 2D Array that hold NEO designation and Max orbit value
    let tempNEO2Darray = [];
    
    // Calculate the max orbit value of each NEO in the array above
    tempNEOs.forEach(element => {
        // Add each Neo with its max orbit to an 2D array
        tempNEO2Darray.push([element.designation, NEOMaxOrbit(element)]);
    });
    
    // Compare all the Max orbit value then return the orbit designation
    // Extract the second values of each sub-array
    const secondValues = tempNEO2Darray.map(element => element[1]);

    // Find the maximum value among the secondValues array
    const maxOrbitValue = Math.max(...secondValues);
    
    // Find the NEO Designation that has the max orbit in the array
    const result = tempNEO2Darray.find(element => element[1] === maxOrbitValue)[0]; // the [0] return the designation of the NEO in the 2D array
    
    // Display the NEO with max orbit in the same Orbit Class
    console.log('===================================================================');
    console.log('The NEO with MAX orbit in the same Orbit Class: [', searchValue, '] has the MAX Orbit value: ', maxOrbitValue, ' AUs');
    console.log('===================================================================');
    displayNEOData(findNEO_Designation(neowise, result));  
}
// Testing
//let searchString = "Comet";
//MaxOrbitOfSameClassNEO(neowise, searchString);

// Measure the minimum orbit value of NEOs in the same orbit_class
function MinOrbitOfSameClassNEO (data, searchValue) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClass(data,searchValue);
    
    // 2D Array that hold NEO designation and Max orbit value
    let tempNEO2Darray = [];
    
    // Calculate the max orbit value of each NEO in the array above
    tempNEOs.forEach(element => {
        // Add each Neo with its max orbit to an 2D array
        tempNEO2Darray.push([element.designation, NEOMinOrbit(element)]);
    });
    
    // Compare all the Max orbit value then return the orbit designation
    // Extract the second values of each sub-array
    const secondValues = tempNEO2Darray.map(element => element[1]);

    // Find the minimum value among the secondValues array
    const minOrbitValue = Math.min(...secondValues);
    
    // Find the NEO Designation that has the max orbit in the array
    const result = tempNEO2Darray.find(element => element[1] === minOrbitValue)[0]; // the [0] return the designation of the NEO in the 2D array
    
    // Display the NEO with max orbit in the same Orbit Class
    console.log('===================================================================');
    console.log('The NEO with MIN orbit in the same Orbit Class: [', searchValue, '] has the MIN orbit value: ', minOrbitValue, ' AUs');
    console.log('===================================================================');
    displayNEOData(findNEO_Designation(neowise, result));  
}
// Testing
//MinOrbitOfSameClassNEO(neowise, searchString);

// Measure the average orbit value of NEOs in the same orbit_class
function AveOrbitOfSameClassNEO (data, searchValue) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClass(data,searchValue);
    
    // 2D Array that hold NEO designation and Max orbit value
    let tempNEO2Darray = [];
    
    // Calculate the max orbit value of each NEO in the array above
    tempNEOs.forEach(element => {
        // Add each Neo with its max orbit to an 2D array
        tempNEO2Darray.push([element.designation, NEOAverageOrbit(element)]);
    });
    
    // Compare all the Max orbit value then return the orbit designation
    // Extract the second values of each sub-array
    const secondValues = tempNEO2Darray.map(element => element[1]);

    // Find the average value of the secondValues array
    let sum = 0;
    for (let i = 0; i < secondValues.length; i++){
        sum += secondValues[i];
    }
    const aveOrbitValue = sum / secondValues.length;
    
    // Find the NEO Designation that has the max orbit in the array
    //const result = tempNEO2Darray.find(element => element[1] === aveOrbitValue)[0]; // the [0] return the designation of the NEO in the 2D array
    
    // Display the NEO with max orbit in the same Orbit Class
    console.log('===================================================================');
    console.log('The AVERAGE orbit value of all NEOs in the same Orbit Class: [', searchValue ,'] is: ', aveOrbitValue, 'AUs' );
    console.log('===================================================================');
}
// Testing
//AveOrbitOfSameClassNEO(neowise, searchString);

// Step 4: Changing the JSON format

// Rearrange the NEO data 
function rearrangedNEOs (neoData) {
    // create temp object to store the rearranged data
    let tempNEOs = {};
    // Go through each element of the JSON file 
    neoData.forEach(element => {
        let orbit_class = element.orbit_class;
        // Create the new array to store the data if the paticular orbit class has not existed in the temp array yet
        if (!tempNEOs[orbit_class]) {
            tempNEOs[orbit_class] = [];
        }
        //add the element to the correspoding array.
        tempNEOs[orbit_class].push(element);
    });
    return tempNEOs;
}
// This 2D array will hold the reagrranged Neo Data. The data is categorised based on the orbit_class.
const rearrangedNEOdata = rearrangedNEOs(neowise);

// Write the rearranged data to the new JSON file.
fs.writeFileSync('Assignment1/Rearranged NEO Data.json', JSON.stringify(rearrangedNEOdata, null, 4));
