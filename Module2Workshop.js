function Employee (id, firstName, lastName, gender, age, position){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;
    this.logFullName = function(){
        return this.firstName + " " + this.lastName;
    }
}

function Sale (staffId, item, price, date){
    this.staffId = staffId;
    this.item = item;
    this.price = price;
    this.date = date;
}

let joannaBates = new Employee(30,"Joanna","Bates", "Female", 42, "Salesperson");
let gammingPCSale = new Sale(30, "Gamming PC", 1700, "01-11-2023");

console.log("Age: ",joannaBates.age);
console.log("Position: ", joannaBates.position);
console.log("Full name: ", joannaBates.firstName + " " + joannaBates.lastName);

console.log("Item sold: ", gammingPCSale.item);
console.log("Price of item: $", gammingPCSale.price);

let morningSale = new Sale(30, "4K monitor", 1100, "10-11-2023");
const sales = [gammingPCSale, morningSale];

console.log("Monitor price: $", sales[1].price);
console.log("Employee's fullname: ", joannaBates.logFullName());