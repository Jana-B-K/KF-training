// EVEN / ODD
document.getElementById("evenoddbtn").addEventListener("submit", (e) => {
    e.preventDefault();
    const num = Number(document.getElementById("input1").value);

    if (isNaN(num)) {
        alert("Enter a valid number");
    } else if (num % 2 === 0) {
        alert("This is an Even number");
    } else {
        alert("This is an Odd number");
    }
});

// LARGEST NUMBER
document.getElementById("largestbtn").addEventListener("submit", (e) => {
    e.preventDefault();

    const inp = document.getElementById("input2").value.trim();
    const nums = inp.split(/\s+/);

    if (nums.some(isNaN)) {
        alert("Enter valid numbers");
        return;
    }

    alert(Math.max(...nums));
});

// FACTORIAL
document.getElementById("factorialbtn").addEventListener("submit", (e) => {
    e.preventDefault();
    const num = Number(document.getElementById("input3").value);

    if (isNaN(num) || num < 0) {
        alert("Enter a valid number");
    } else {
        alert(factorial(num));
    }
});

// REVERSE STRING
document.getElementById("reversebtn").addEventListener("submit", (e) => {
    e.preventDefault();
    const str = document.getElementById("input5").value.trim();

    if (!str) {
        alert("Enter a string");
    } else {
        alert(reverseString(str));
    }
});

// COUNTDOWN TIMER
let timer;

document.getElementById("startTimer").addEventListener("submit", (e) => {
    e.preventDefault();

    let count = Number(document.getElementById("input4").value);
    const display = document.getElementById("remaining-timer");

    if (count <= 0 || isNaN(count)) {
        alert("Enter a valid number");
        return;
    }

    clearInterval(timer);
    display.innerText = count;

    timer = setInterval(() => {
        count--;
        display.innerText = count;

        if (count === 0) {
            clearInterval(timer);
            alert("Time over");
        }
    }, 1000);
});

// MULTIPLICATION TABLE
document.getElementById("multiplebtn").addEventListener("submit", (e) => {
    e.preventDefault();

    const num = Number(document.getElementById("input6").value);
    const resultDiv = document.getElementById("multiplication-ans");

    if (num <= 0 || isNaN(num)) {
        resultDiv.innerHTML = "Enter a valid number";
        return;
    }

    let table = "";
    for (let i = 1; i <= 10; i++) {
        table += `${num} × ${i} = ${num * i}<br>`;
    }

    resultDiv.innerHTML = table;
});

// PRIME / COMPOSITE
document.getElementById("primebtn").addEventListener("submit", (e) => {
    e.preventDefault();
    const num = Number(document.getElementById("input7").value);

    if (isNaN(num)) {
        alert("Enter a number");
    } else if (isPrime(num)) {
        alert("This is a Prime number");
    } else {
        alert("This is a Composite number");
    }
});

// PRIME FUNCTION
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// FACTORIAL FUNCTION
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// REVERSE STRING FUNCTION
function reverseString(str) {
    let ans = "";
    for (let i = str.length - 1; i >= 0; i--) {
        ans += str[i];
    }
    return ans;
}
