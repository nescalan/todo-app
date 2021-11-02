import React, { useState } from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Viernes de Películas", completed: true },
//   { text: "Tomar el cursso de intro a React", completed: true },
//   { text: "Llorar con la llorona", completed: false },
//   { text: "LALALALAA", completed: false },
// ];

function App() {
  // Guardo los Todos en LocalStorage con la version 1.0
  const localStorageTodos = localStorage.getItem("TODOS_V1");
  let parsedTodos;

  if (!localStorageTodos) {
    // Cuando localStorageTodos está vacío seteamos el localStorage con un arreglo vacío
    localStorage.setItem("TODOS_V1", JSON.stringify("[]"));
    // asignamos a la variable parsedTodos un arreglo vacío
    parsedTodos = [];
  } else {
    // Transformamos localStorageTodos de nuevo a JSON
    parsedTodos = JSON.parse(localStorageTodos);
  }

  // Estados de la Aplicacion
  const [todos, setTodos] = useState(parsedTodos);
  const [searchValue, setSearchValue] = useState("");

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      const textLocated = todoText.includes(searchText);
      return textLocated;
    });
  }

  //Funcion para actualizar el estado y el localStorage
  const saveTodo = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem("TODOS_V1", stringifiedTodos);
    setTodos(newTodos);
  };

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    // Copiamos el estado para trabajar sobre la copia de newTodos
    const newTodos = [...todos];
    // Cambiamos la propiedad "completed" a true
    newTodos[todoIndex].completed = true;
    saveTodo(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];

    newTodos.splice(todoIndex, 1);
    saveTodo(newTodos);
  };

  return (
    <AppUI
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodos={completeTodos}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
