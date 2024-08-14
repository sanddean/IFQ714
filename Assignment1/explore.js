// Step 1: Loading the JSON neoData

const fs = require('fs');
const data = fs.readFileSync("Assignment1/NEOWISE_Dataset.json", "utf8");
const neowise = JSON.parse(data);

// Step 2: Basic functions
// Display NEO index number
function displayNEOIndex(value){
    console.log('+------------------+');
    console.log('    NEO No: ', value+1,);
    console.log('+------------------+');
}
/* Display NEO neoData in a readable format
If the value availe then display the value otherwise display N/A
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

// Finding NEO based on its designation
function findNEO_Designation(neoData, searchValue) {
    neoData.forEach(element => {
        if (element.designation === searchValue) {
            displayNEOData(element);
        }
    });
}
// Test Finding NEO with Designation '(2010 DM21)'
//findNEO_Designation(neowise,'(2010 DM21)');

// Function to display All NEO neoData in a readable format
function displayAllNEODataInfo(neoData){
    for (let i = 0; i < neoData.length; i++) {
        displayNEOIndex(i);
        displayNEOData(neoData[i]);
    }
}
// Testing display all NEO data
//displayAllNEODataInfo(neowise);

// Finding NEO based on its orbit_class
function findNEO_OrbitClass(neoData, searchValue){
    for (let i = 0; i < neoData.length; i++)
        if (neoData[i].orbit_class == searchValue){
            displayNEOIndex(i);
            displayNEOData(neoData[i]);
         }
}
// Test finding NEO with orbit_class 'Halley-type Comet*'
//findNEO_OrbitClass(neowise,'Halley-type Comet*');

// Finding NEO based on its PHA
function findNEO_PHA(neoData, searchValue){
    for (let i = 0; i < neoData.length; i++) {
        if (neoData[i].pha == searchValue) {
            displayNEOIndex(i);
            displayNEOData(neoData[i]);
        }
    }
}
// Test finding NEO according to its PHA
//findNEO_PHA(neowise,null);

// Measure the maximum orbit of a NEO
function NEOMaxOrbit (neo){
    return console.log(`Max orbit of the NEO [${neo.designation}] is: ${Math.max(neo.moid_au, neo.q_au_1, neo.q_au_2)} AUs`);
}
// Test finding max orbit of a NEO
//NEOMaxOrbit(neowise[1]);

// Measure the minimum orbit of a NEO
function NEOMinOrbit (neo){
    return console.log(`Min orbit of the NEO [${neo.designation}] is: ${Math.min(neo.moid_au, neo.q_au_1, neo.q_au_2)} AUs`);
}
// Test finding min orbit of a NEO
//NEOMinOrbit(neowise[1]);

// Measure the average orbit of a NEO
function NEOAverageOrbit (neo) {
    let averageOrbit = (neo.moid_au + neo.q_au_1 + neo.q_au_2) / 3;
    return console.log(`Average orbit of the NEO [${neo.designation}] is: ${averageOrbit} AUs`);
}
// Test calculate average orbit of a NEO
NEOAverageOrbit(neowise[0]);