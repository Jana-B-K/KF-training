// document.getElementById("form").addEventListener("submit",(e) => {
//     e.preventDefault();
//     const fname = document.getElementById("first-name").value;
//     const lname = document.getElementById("last-lname").value;
//     const username = document.getElementById("username").value;
//     const passwordLen = document.getElementById("password").value.length;
//     const phone = document.getElementById("phone").value;
    
//     if (!/^[a-zA-Z]+$/.test(fname)) {
//         alert("First name should contain only letters");
//     }else if(!/^[a-zA-Z]$+/.test(lname)){
//         alert("Last name should contain only letters");
//     }else if(!/^[a-zA-Z]$+/.test(username)){
//         alert("User name should contain only letters");
//     }else if(passwordLen<8){
//         alert("Password should contain atleast 8 character");
//     }else if(phone.length != 10 || /^[0-9]{10}$+/.test(phone)){
//         alert("Enter valid phone number");
//     }else{
//         alert("form submited successfully")
//     }
// });

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const fname = document.getElementById("first-name").value.trim();
    const lname = document.getElementById("last-name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();

    if (!/^[a-zA-Z]+$/.test(fname)) {
        alert("First name should contain only letters");
        return;
    }

    if (!/^[a-zA-Z]+$/.test(lname)) {
        alert("Last name should contain only letters");
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        alert("Username can contain letters, numbers and _ only");
        return;
    }

    if (password.length < 8) {
        alert("Password should contain at least 8 characters");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter a valid 10-digit phone number");
        return;
    }

    alert("Form submitted successfully ✅");
});
