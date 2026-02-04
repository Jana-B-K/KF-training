export default function validateForm(data) {
  const { email, password } = data;
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    throw new Error("email should be in email format");
  }

  if (password.length < 4 || password.length > 8) {
    throw new Error("Password should be between 4 to 8 characters");
  }

  return data;
}
