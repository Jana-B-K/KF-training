import { Routes, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />}>
        <Route path="team" element={<h3>Team Page</h3>} />
        <Route path="company" element={<h3>Company Page</h3>} />
      </Route>
      <Route path="/teams" element={<h3>Team normal Page</h3>} />
      <Route path="/company" element={<h3>Company Page</h3>} />
    </Routes>
   
  );
}

export default App;
