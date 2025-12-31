// const b=document.getElementById("button");
// let text="learning function";
// b.addEventListener("click",()=>{
//     document.querySelector("#demo").innerText=text;
// });

// //js objects
// const car = {
//     id: 1,
//     name: "jana",
//     age : 22 ,
// };

// const t = car.id + " " + car.name + " " + car.age ;
// console.log(t);
// const p = document.createElement("p");
// p.innerText = t ;

// document.querySelector("h1").append(p);

// const person = {
//     id: 1,
//     fname: "Jana",
//     lname: "B K",
//     fullname: function () {
//         return this.fname + " " + this.lname;
//     }
// };

// console.log(person.fullname());


// function Person(first, last, age, eye) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.eyeColor = eye;
//   this.nationality = "English";
// }

// const myFather = new Person("kumar", "bk", 44, "normal");
// const myMother = new Person("Santhi","B",40,"normal")

// console.log(myFather.firstName + " " + myFather["age"]);
// console.log(myMother.firstName + " " + myMother["age"]); 

// let forIn = "";

// for (let x in myFather){
//     forIn += myFather[x] + " ";
// }

// console.log(forIn);



// document.getElementById("submit").addEventListener("click",() => {
//     const val = document.getElementById("input");
//     const div = document.getElementById("container");
//     const para=document.createElement("p");
//     console.log(val.value)
//     para.innerText = val.value;
//     div.append(para);
    
// })

// const points = [40, 100, 1, 5, 25, 10];
// document.getElementById("demo1").innerHTML = points;

// function myFunction1() {
//   points.sort();
//   document.getElementById("demo1").innerHTML = points;
// }

// function myFunction2() {
//   points.sort(function(a, b){return a - b});
//   document.getElementById("demo1").innerHTML = points;
// }

// //foreach
// const letters = new Set(["a","b","c"]);

// // List all entries
// let vals = "";
// letters.forEach(letter=>{
//     vals += letter;
// });
// console.log(vals);

// //set
// const letter = new Set(["a","b","c"]);

// // Create an Iterator
// const myIterator = letter.keys();
// letter.add("a");
// // List all Elements
// let set = "";
// for (const x of myIterator) {
//   set += x ;
// }
// console.log(set);


// const fruits =  new Set();
// fruits.add("apple");
// fruits.add("mango");
// fruits.add("grapes");

// for (let fruit of fruits){
//   console.log(fruit + " ");
// }

// for (const x of fruits.entries()){
//   console.log(x + "<br>");
// }

// for (const [key, value] of fruits.entries()) {
//   console.log(key, value);
// }

// //union
// const set1 = new Set([1,2,3,4,5]);
// const set2 = new Set([1,3,5,9,10]);
// const union = set1.union(set2);
// for (const x of union){
//   console.log(x);
// }

// const obj = {};
// obj["apples"] = 500;
// obj["bananas"] = 300;

// console.log(obj);
//Regular expression
// const text = "This is Jana jana jana";
// const search = text.search(/jana/i);
// const match = text.match(/jana/ig);
// console.log(match);
// document.getElementById("demo1").innerText = match;

// const time = document.querySelector("#time").addEventListener("click",()=>{
//   document.getElementById("demo1").innerText = new Date();
// })

const mouse = document.getElementById("box");
mouse.addEventListener("mouseover",()=>{
  mouse.innerHTML = "Mouse is over me";
})

mouse.addEventListener("mouseout",()=>{
  mouse.innerHTML = "Mouse is out me";
})

// document.querySelector("body").addEventListener("keypress",(event)=>{
//   console.log(event.key);
//   console.log(event.code);
// })
// document.getElementById("time").addEventListener("click",() => {
//   console.log("i");
//   setTimeout(showmsg, 1000);
// });
// function showmsg(){
//   document.getElementById("settimeout").innerText = "hi";
// }
// document.getElementById("time1").addEventListener("click", () => {
//   console.log("i");
//   setInterval(showmsg, 1000);
// });

// function showmsg(){
//   document.getElementById("settimeout").innerText = new Date();
// }

// document.getElementById("sub").addEventListener("click",() => {
//   console.log("h");
//   let i1 = Number(document.getElementById("input1").value);
//   let i2 = Number(document.getElementById("input2").value);
//   console.log(i1+i2);
//   document.getElementById("ans1").textContent = i1+i2;
// })
document.getElementById("b").addEventListener("submit",(e) => {
  e.preventDefault();
  const input = document.querySelector("#i").value;
  
  document.getElementById("p").innerText = input;
})