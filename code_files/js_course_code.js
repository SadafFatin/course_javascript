/** Object in Javascript. Everything is an object in javascript */
var person = {

    "name": "Sadaf Fatin",
    "address": {
        "street": "Main road CA",
        "city": "JS",
        "state": "CA"
    },
    "isFromState": function(nameOfTheState) {

        if (nameOfTheState == this.address.state) {
            console.log("The Person is from State")
            return true;
        } else {
            console.log("The Person is not from State")
            return false;
        }

    }
}


/** For Each  loop JS */
var myArray = [1, 2, 4]
myArray.forEach(function(item, index, myArray) {
    console.log(item);

})


//** arguments Argument are default with every function in JS.Array like but not array; an object holding all the arguments sent to the function.*/
function argumentsArgument(...a) {
    console.log(a);
    console.log(arguments);
}
argumentsArgument([1, 2, 3, 1, 2, 3], [4, 4, 5, 6]);

//Function by expression
var isFromState = (nameOfTheState) => {

    if (nameOfTheState == "CA") {
        console.log("The Person is from State")
        return true;
    } else {
        console.log("The Person is not from State")
        return false;
    }

}

/** Calling function inside  object*/
console.log(person.isFromState("CA"));



/** IIFE pattern */

(function add(c) {
    var a = 10;
    var b = 20;
    a = a * b;
    console.log("a:", a);
    console.log("c:", c);
})(10);

/** Read and Write Operation */

var a = 10; // assignment operation
console.log(a) // read operation

function greet(name) { // write operation 
    console.log(name); // read operation 
}

/** Compilation and Interpretation: */



/** Understanding the interpretation step: */

var myName = "Sadaf Fatin"; // var greeting declared in the global scope

// var greet declared in the global scope. although it is a function but JS treats it like a property in the global object.
function greet(greeting) { // var greeting declared in the greet function scope
    console.log("Hello " + greeting + myName);
    //** no object called console in the greet function scope, 
    //so the interpreter looks one level up in the scope hierarchy 
    //(in this case : global scope ) for console object. */
}
greet("Good Evening!!")



/** The Global scope problem: */

var myName = "Sadaf Fatin"; // var greeting declared in the global scope

// var greet declared in the global scope. as it is a function but JS treats it like a property in the global object.
function greet(greeting) { // var greeting declared in the greet function scope
    myAge = 28; // at compilation step these are ignored.
    //But while interpreting var myAge gets declared at the global scope rather than function scope
    console.log("Hello " + greeting + myName + " your age:" + myAge);
}
greet("Good Morning!!")

/** Some Exercises and a surprising result */
var a = 10;

function outer() {
    var b = 10;

    function inner() {
        var c = b;
        console.log(c); // *** this line prints undefined
        var b = 50;
    }
    inner();
}
outer();

//** another example of this case */
console.log(temp);
var temp = 12;

/** Function hoisting */
function a() {
    b();
}

function b() {
    a();
}

//** Closures definition */
var a = 20; // a in global scope
function outer() { // outer in global scope
    var b = 10; // b in outer scope
    var inner = function() { // function by exp. inner is a var in outer scope.
        b = b + 9;
        console.log(a); // remembers a from global scope;
        console.log(b) // remembers the scope the function was declared in which the 
            // had the var b in it.
    }
    return inner;
}

var innerFunction = outer(); // function inner returned by outer
innerFunction(); //inner() is being executed out of the context it was declared 
// but it remembers the scope chain at the time of its declaration

var innerFunction2 = outer(); // this will create a new function object inner which 
//will have new set of variables 
innerFunction2();


//**Real world closure example as callback function**//
// continuing form previous example...
setTimeout(innerFunction, 1); //sending the function object as a function parameter
//where setTimeout function will execute it in its context where variable a or b 
//doesn't even exists;


//** Closures In-depth-The Module Pattern**//
function createPerson() {
    var firstName = "";
    var lastName = "";

    var personObject = {

        getFirstName: function() {
            return firstName;
        },
        getLastName: function() {
            return lastName;
        },
        setFirstName: function(name) {
            firstName = name;
        },
        setLastName: function(name) {
            lastName = name;
        }

    }
    return personObject;

}

var person = createPerson();
person.setFirstName("Sadaf");
console.log(person.getFirstName()); // the person object inside createPerson() remembers its scope
//using Closures


//** Closures In-depth - Closures In async Callbacks **//

var i; // var i in global scope
var print = function() {
    //console.log(i); //function print remembers the scope at the time of its declaration;
    //remembers i from global scope/scope of the function was in
}
for (i = 0; i < 10; i++) {
    setTimeout(print, 1); //set time out takes print function as parameter as callback function
    // takes the same function print() and waits 1 sec.
    // by the time it executes print() all iteration of loop is done
    // now the global var i has the value of 10.As print() function remembers its scope 
    // which had i declared it prints the value of that var i.

}


//** Closures In-depth - Solving async with closures **//
for (i = 0; i < 10; i++) {

    (function(currentVal) {
        setTimeout(() => {
            //console.log(currentVal);
        }, 1000);
    })(i)


}

/** Objects and Prototypes - Creating Objects **/

//Object creation by function
function employee(name, age) { // this functions are called constructor function
    var employee = {}; // In-line object
    employee.name = name;
    employee.age = age;
    return employee;
}

var employee1 = new employee("Mr. xyz", 56);
console.log(employee1)

//JavaScript Constructors
function Student(name, age) { // this functions are called constructor function
    //var this = {}//JS is taking care of this line
    this.name = name; //changed the var name with standard var name this
    this.age = age;
    //return this //JS is taking care of this line
}
var student = new Student("Sadaf", 29);
console.log(student);



/** Function Execution Types **/

function foo() {
    console.log("This is function by declaration");
}
var foo = function() {
    this.type = "Expression";
    console.log("This is function by Expression");
}
foo(); // #Method 1 : calling/executing the function object directly.

var temp = {
    "prop": "other property of temp.foo's this reference refers to the temp object.",
    "foo": function() {
        console.log("This function object is a property of object temp");
        console.log(this);
    }
}
temp.foo() // #Method 2 : calling/executing the function object as a property of another object.

var dummy = new foo(); // #Method 3: calling using new in constructor mode

/** #Method 4 example **/
function Car() {
    this.velocity = 10;
    this.accelerate = function() {
        this.velocity = this.velocity + 6; // this refers to the calling object.
        //this.property refers to the calling objects property
        console.log("Velocity after acc:" + this.velocity);
    }
}

function Runner() {
    this.runningSpeed = 10;
}

var toyotaCar = new Car();
var athlete = new Runner();
athlete.accelerate = toyotaCar.accelerate;

console.log(athlete.accelerate());
console.log(toyotaCar);

//solve using call function
console.log(athlete.accelerate.call(toyotaCar));
console.log(toyotaCar);

// ** Prototype Hands-on **//

function PrototypeExample() {
    this.type = "This object demonstrate the features of prototype";
}

PrototypeExample.prototype.type = " This custom key explains the presence prototype " +
    "object that gets created for every function declaration"; // Adding property to functions prototype object

console.log(PrototypeExample.prototype);
var protoTestObj1 = new PrototypeExample();
var protoTestObj2 = new PrototypeExample();
Object.getPrototypeOf(protoTestObj1).foo = "Adding foo to the prototype object";
console.log(Object.getPrototypeOf(protoTestObj1)); // accessing prototype object of an instance; __proto__ is replaced by .getPrototypeOf() as of ES5
console.log(Object.getPrototypeOf(protoTestObj2).foo); // property foo of prototype object is automatically accessible by different object.
console.log(Object.getPrototypeOf(protoTestObj2) === Object.getPrototypeOf(protoTestObj1)); // Proof that there is a single instance of Prototype object which is attached 
// to every new object and gets overwritten every time we add/remove/manipulate.
console.log(protoTestObj2.foo); //property lookup


//** Object Links With Prototypes **//
var prototypeObj = PrototypeExample.prototype;
console.log(prototypeObj.constructor);
console.log(Object.getPrototypeOf(protoTestObj1).constructor);