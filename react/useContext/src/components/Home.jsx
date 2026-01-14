import { useContext } from "react";
import { ThemeContext, ThemeUpdateContext } from "./ThemeProvide";

export default function Home() {
  const darkTheme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdateContext);

  const style = {
    backgroundColor: darkTheme ? "black" : "white",
    height: "100px",
    width: "100px"
  };

  return (
    <>
      <button onClick={toggleTheme}>Toggle</button>
      <div style={style}></div>
    </>
  );
}
