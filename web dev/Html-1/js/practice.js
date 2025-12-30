const b=document.getElementById("button");
let text="learning function";
b.addEventListener("click",()=>{
    document.querySelector("#demo").innerText=text;
});

//js objects
const car = {
    id: 1,
    name: "jana",
    age : 22 ,
};

const t = car.id + " " + car.name + " " + car.age ;
console.log(t);
const p = document.createElement("p");
p.innerText = t ;

document.querySelector("h1").append(p);

const person = {
    id: 1,
    fname: "Jana",
    lname: "B K",
    fullname: function () {
        return this.fname + " " + this.lname;
    }
};

console.log(person.fullname());


function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  this.nationality = "English";
}

const myFather = new Person("kumar", "bk", 44, "normal");
const myMother = new Person("Santhi","B",40,"normal")

console.log(myFather.firstName + " " + myFather["age"]);
console.log(myMother.firstName + " " + myMother["age"]); 

let forIn = "";

for (let x in myFather){
    forIn += myFather[x] + " ";
}

console.log(forIn);



document.getElementById("submit").addEventListener("click",() => {
    const val = document.getElementById("input");
    const div = document.getElementById("container");
    const para=document.createElement("p");
    console.log(val.value)
    para.innerText = val.value;
    div.append(para);
    
})

const points = [40, 100, 1, 5, 25, 10];
document.getElementById("demo1").innerHTML = points;

function myFunction1() {
  points.sort();
  document.getElementById("demo1").innerHTML = points;
}

function myFunction2() {
  points.sort(function(a, b){return a - b});
  document.getElementById("demo1").innerHTML = points;
}

//foreach
const letters = new Set(["a","b","c"]);

// List all entries
let vals = "";
letters.forEach(letter=>{
    vals += letter;
});
console.log(vals);

//set
const letter = new Set(["a","b","c"]);

// Create an Iterator
const myIterator = letter.keys();
letter.add("a");
// List all Elements
let set = "";
for (const x of myIterator) {
  set += x ;
}
console.log(set);