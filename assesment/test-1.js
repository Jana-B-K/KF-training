
function isNumber(val){
    if( typeof(val) === Number ){
        console.log("It is  a number")
    }else{
        console.log("It is not a number")
    }
}
isNumber(9)

function getFive(str){
    console.log(str.substring(0,5));
}

getFive("aeroplane");


function oddOrEven(num){
    for(let i=0;i<num;i++){
        if(i%2 === 0){
            console.log(`${i} is Even `);
        }else{
            console.log(`${i} is Odd`);
        }
    }
}

oddOrEven(23)
function removeAndAdd(colors){
    console.log(colors);
    colors.pop();
    colors.pop();
    console.log(colors);
    colors.push("White");
    colors.push("violet");
    console.log(colors);
}

const colors =  ['Green','Red','Blue','Orange','Yellow']
removeAndAdd(colors);

function upperCase(str) {
    let split = str.split(" ");

    for (let i = 0; i < split.length; i++) {
        let temp = split[i];
        temp = temp.at(0).toUpperCase() + temp.slice(1);
        split[i] = temp;
    }

    console.log(split.join(" "));
}

upperCase("this is string upper case");
