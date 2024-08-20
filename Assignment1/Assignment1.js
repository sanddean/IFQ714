// Step 1: Loading the JSON neoData

const fs = require('fs');
const data = fs.readFileSync("Assignment1/NEOWISE_Dataset.json", "utf8");
const neowise = JSON.parse(data);

// Step 2: Basic function
// Display NEO index number
function displayNEOIndex(value){
    console.log('+------------------+');
    console.log('    NEO No: ', value);
    console.log('+------------------+');
}
/* Display NEO neoData in a readable format
If the value available then display the value otherwise display N/A
*/
// Export to Unit Test
//module.exports = displayNEOIndex;

function displayNEOData(neoData) {
    console.log(`   + Designation: ${neoData.designation ? neoData.designation : 'N/A'} `);
    console.log(`   + Discovery Date: ${neoData.discovery_date ? neoData.discovery_date : 'N/A'}`);
    console.log(`   + Observed Magnitude: ${neoData.h_mag ? neoData.h_mag : 'N/A'}`);
    console.log(`   + Minimum Orbit Intersection Distance (MOID): ${neoData.moid_au ? neoData.moid_au : 'N/A'}`);
    console.log(`   + Perihelion Distance: ${neoData.q_au_1 ? neoData.q_au_1 : 'N/A'}`);
    console.log(`   + Aphelion Distance: ${neoData.q_au_2 ? neoData.q_au_2 : 'N/A'}`);
    console.log(`   + Orbital Period (year): ${neoData.period_yr ? neoData.period_yr : 'N/A'}`);
    console.log(`   + Orbital Inclination: ${neoData.i_deg ? neoData.i_deg : 'N/A'}`);
    switch (neoData.pha) {
        case true:
            console.log('   + Potentially Hazardous Asteroid (PHA): YES');
            break;
        case false:
            console.log('   + Potentially Hazardous Asteroid (PHA): NO');
            break;
        case null:
            console.log('   + Potentially Hazardous Asteroid (PHA): N/A');
            break; 
    }
    console.log(`   + ORBIT CLASS: ${neoData.orbit_class ? neoData.orbit_class : 'N/A'}`);
    console.log('========================================================');
}

// Find NEO based on its orbit_class and PHA value then add to an array
function findNEO_OrbitClassPHA(neoData, searchOrbitClass, searchPHA){
    let result = [];
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class == searchOrbitClass && neoData[i].pha == searchPHA){
            result.push(neoData[i]);
        }
    return result;
}

// Find NEO based on its orbit_class value then add to an array
function findNEO_OrbitClass(neoData, searchOrbitClass){
    let result = [];
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class == searchOrbitClass){
            result.push(neoData[i]);
        }
    return result;
}

// Finding NEO based on its designation then return that NEO object
function findNEO_Designation(neoData, searchValue) {
    let tempNEO = [];
    neoData.forEach(element => {
        if (element.designation === searchValue) {
            tempNEO = element;
        }
    });
    return tempNEO;
}

// Measure the maximum orbit of a NEO
function NEOMaxOrbit (neo){
    //IF the orbit of the NEO is null then the value is 0
    let maxOrbit = Math.max(neo.moid_au ? neo.moid_au : 0, neo.q_au_1 ? neo.q_au_1 : 0, neo.q_au_2 ? neo.q_au_2 : 0);
    return maxOrbit;
}

// Measure the minimum orbit of a NEO
function NEOMinOrbit (neo){
    let minOrbit = 0;
    //If the orbit value of the NEO is null then exclude it from the calculation
    switch (true) {
        case neo.moid_au == null:
            minOrbit = Math.min(neo.q_au_1, neo.q_au_2);
            break;
        case neo.q_au_1 == null:
            minOrbit = Math.min(neo.moid_au, neo.q_au_2);
            break;
        case neo.q_au_2 == null:
            minOrbit = Math.min(neo.moid_au, neo.q_au_1);
            break;
        default:
            minOrbit = Math.min(neo.moid_au, neo.q_au_1, neo.q_au_2);
    }
    return minOrbit;
}

// Measure the average orbit of a NEO
function NEOAverageOrbit (neo) {
    let averageOrbit = 0;
    //If the orbit value of the NEO is null then exclude it from the calculation
    switch (true) {
        case neo.moid_au == null:
            averageOrbit = (neo.q_au_1 + neo.q_au_2) / 2;
            break;
        case neo.q_au_1 == null:
            averageOrbit = (neo.moid_au + neo.q_au_2) / 2;
            break;
        case neo.q_au_2 == null:
            averageOrbit = (neo.moid_au + neo.q_au_1) / 2;
            break;
        default:
            averageOrbit = (neo.moid_au + neo.q_au_1 + neo.q_au_2) / 3;
    }
    return averageOrbit;
}

// Step 3: Analysis
// 3.1 Display information of all NEOs in the datasheet
function displayAllNEODataInfo(neoData){
    for (let i = 0; i < neoData.length; i++) {
        displayNEOIndex(i+1);
        displayNEOData(neoData[i]);
    }
}
// Testing display all NEO data
//displayAllNEODataInfo(neowise);

// 3.2.a Display information on NEOs data that have certain criteria. Eg. Certain Orbit Class
function displayNEO_OrbitClass(neoData, searchValue){
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class== searchValue){
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
//displayNEO_PHA(neowise,null);

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

    return maxOrbitValue;
}
// Testing
//    let searchString = "Encke-type Comet";
//   let tempMax = MaxOrbitOfSameClassNEO(neowise, searchString);

//Updated function MaxOrbit_SameClass_SamePHA
function MaxOrbit_SameClassPHA (data, searchValue, searchValue2) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClassPHA(data, searchValue, searchValue2);

    // Find max moid_au
    let all_moid_au = [];
    // Add all moid_au to an array
    tempNEOs.forEach(element => {
        all_moid_au.push(element.moid_au);
    });
    let max_moid_au = Math.max(...all_moid_au);
    return max_moid_au;
}

// Measure the minimum orbit value of NEOs in the same orbit_class
function MinOrbitOfSameClassNEO (data, searchValue) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClass(data,searchValue);
    
    // 2D Array that hold NEO designation and Min orbit value
    let tempNEO2Darray = [];
    
    // Calculate the min orbit value of each NEO in the array above
    tempNEOs.forEach(element => {
        // Add each Neo with its min orbit to an 2D array
        tempNEO2Darray.push([element.designation, NEOMinOrbit(element)]);
    });
    
    // Compare all the Min orbit value then return the orbit designation
    // Extract the second values of each sub-array
    const secondValues = tempNEO2Darray.map(element => element[1]);

    // Find the minimum value among the secondValues array
    const minOrbitValue = Math.min(...secondValues);
    
    // Find the NEO Designation that has the max orbit in the array
    const result = tempNEO2Darray.find(element => element[1] === minOrbitValue)[0]; // the [0] return the designation of the NEO in the 2D array
    
    // Display the NEO with min orbit in the same Orbit Class
    console.log('===================================================================');
    console.log('The NEO with MIN orbit in the same Orbit Class: [', searchValue, '] has the MIN orbit value: ', minOrbitValue, ' AUs');
    console.log('===================================================================');
    displayNEOData(findNEO_Designation(neowise, result));  

    return minOrbitValue;
}
// Testing
//    let tempMin = MinOrbitOfSameClassNEO(neowise, searchString);

//Updated function MinOrbit_SameClass_SamePHA
function MinOrbit_SameClassPHA (data, searchValue, searchValue2) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClassPHA(data, searchValue, searchValue2);

    // Find max moid_au
    let all_moid_au = [];
    // Add all moid_au to an array
    tempNEOs.forEach(element => {
        all_moid_au.push(element.moid_au);
    });
    let min_moid_au = Math.min(...all_moid_au);
    return min_moid_au;
}
/* Testing the updated functions to meet the assignment requirements
let testClass = 'Apollo';
let testPHA = true;
let testresult = MaxOrbit_SameClassPHA(neowise, testClass, testPHA); // This return 0.049 AUs
console.log(`Max Moid_au of all NEOs in Apollo class that has a true PHA value is: ${testresult} AUs`);
let testresult2 = MinOrbit_SameClassPHA(neowise, testClass, testPHA); // This return 0.0002 AUs
console.log(`Min Moid_au of all NEOs in Apollo class that has a true PHA value is: ${testresult2} AUs`);
*/

// Measure the average orbit value of NEOs in the same orbit_class
function AveOrbitOfSameClassNEO (data, searchValue) {
    // Search all NEO with the same Orbit Class and add to an array
    let tempNEOs = findNEO_OrbitClass(data,searchValue);
    
    // 2D Array that hold NEO designation and average orbit value
    let tempNEO2Darray = [];
    
    // Calculate the average orbit value of each NEO in the array above
    tempNEOs.forEach(element => {
        // Add each Neo with its average orbit to an 2D array
        tempNEO2Darray.push([element.designation, NEOAverageOrbit(element)]);
    });
    
    // Calculate the average orbit value then return the orbit designation
    // Extract the second values of each sub-array
    const secondValues = tempNEO2Darray.map(element => element[1]);

    // Find the average value of the secondValues array
    let sum = 0;
    for (let i = 0; i < secondValues.length; i++){
        sum += secondValues[i];
    }
    const aveOrbitValue = sum / secondValues.length;
    
    // Display the NEO with max orbit in the same Orbit Class
    console.log('===================================================================');
    console.log('The AVERAGE orbit value of all NEOs in the same Orbit Class: [', searchValue ,'] is: ', aveOrbitValue, 'AUs' );
    console.log('===================================================================');

    return aveOrbitValue;
    
}
// Display the NEO with max orbit in the same Orbit Class
//    let tempAve = AveOrbitOfSameClassNEO(neowise, searchString);

// Step 4: Changing the JSON format

// Rearrange the NEO data 
function rearrangedNEOs (neoData) {
    // create temp object to store the rearranged data
    let tempNEOs = {};
    // Go through each element of the JSON file 
    neoData.forEach(element => {
        let orbit_class = element.orbit_class;
        // Create the new array to store the data if the particular orbit class has not existed in the temp object yet
        if (!tempNEOs[orbit_class]) {
            tempNEOs[orbit_class] = [];
        }
        //add the element to the corresponding array.
        tempNEOs[orbit_class].push(element);
    });
    return tempNEOs;
}
// This 2D array will hold the rearranged Neo Data. The data is categorised based on the orbit_class.
//const rearrangedNEOdata = rearrangedNEOs(neowise);

// Write the rearranged data to the new JSON file.
//fs.writeFileSync('Assignment1/Rearranged NEO Data.json', JSON.stringify(rearrangedNEOdata, null, 4));

//Export all functions to Test Case
module.exports = {
    displayNEOIndex,
    displayNEOData,
    findNEO_OrbitClass,
    findNEO_Designation,
    NEOMaxOrbit,
    NEOMinOrbit,
    NEOAverageOrbit,
    MaxOrbitOfSameClassNEO,
    MinOrbitOfSameClassNEO,
    AveOrbitOfSameClassNEO,
    rearrangedNEOs
};
