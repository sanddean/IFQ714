// STEP 1
console.log("This is the output of STEP 1");
function createGreeting(name){
    // TODO: Create a new variable named "greeting"
    // Assign to it the string "Hi! It's great to meet you, "

    let greeting = "Hi! It's great to meet you, ";

    return greeting + name;
}

// TODO: Create a new variable called "name"
// Assign to it the string "Tim", or alternatively your name
let myname = "Cat VO";
const message = createGreeting(myname);

// Show the message in the console
console.log(message);

//------------------STEP 2-----------------------
console.log("\nThis is the output of STEP 2");
//Function for checking if two value are the same
function checkValuesEqual(first, second){
    //TODO: Check if the values are the same, including their types
    if (first === second){
        console.log("The values are equal");
    } else {
        console.log("The values are not equal");
    }
}
// See if these pairs of values are the same.
checkValuesEqual("hello", "goodbye");
checkValuesEqual("hello", "hello");
checkValuesEqual(5, 5);
checkValuesEqual(5, "5");

// -----------------STEP 3--------------------------
console.log("\nThis is the output of STEP 3");

const applePrice = 2.50;
const appleQuantity = 2;

const orangePrice = 1.54;
const orangeQuantity = 4;

// TODO: Make up a price and quantity for your favourite fruit
const kiwiPrice = 4.5;
const kiwiQuantity = 3;

const totalCostApple = applePrice * appleQuantity;

//TODO: Calculate the total cost for oranges and your favourite fruit
const totalCostOrange = orangePrice * orangeQuantity;
const totalCostKiwi = kiwiPrice * kiwiQuantity;

// TODO: Calculate the overall total cost
const overallTotalCost = totalCostApple + totalCostOrange + totalCostKiwi;

// Display the individual and overall total costs
console.log(`Total cost for apples: $${totalCostApple}`);
console.log(`Total cost for oranges: $${totalCostOrange}`);

// TODO: Log out the cost for your favourite fruit
console.log(`Total cost for oranges: $${totalCostKiwi}`);

console.log(`Overall total cost: $${overallTotalCost}`);

//I cant commnit to git >"<