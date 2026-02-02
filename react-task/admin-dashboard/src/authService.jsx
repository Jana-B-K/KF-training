// authService.js
const fakeUser = {
  email: "admin@gmail.com",
  password: "admin123",
  name: "Admin"
};

export function login(email, password) {
  if (email === fakeUser.email && password === fakeUser.password) {
    return { email: fakeUser.email, name: fakeUser.name };
  }
  throw new Error("Invalid credentials");
}
