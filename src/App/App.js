import React from "react";
import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Viernes de Películas", completed: true },
//   { text: "Tomar el cursso de intro a React", completed: true },
//   { text: "Llorar con la llorona", completed: false },
//   { text: "LALALALAA", completed: false },
// ];

function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;
