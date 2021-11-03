import React, { useState } from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Viernes de Películas", completed: true },
//   { text: "Tomar el cursso de intro a React", completed: true },
//   { text: "Llorar con la llorona", completed: false },
//   { text: "LALALALAA", completed: false },
// ];

function useLocalStorage(itemName, initialValue) {
  // Guardo los Todos en LocalStorage con la version 1.0
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if (!localStorageItem) {
    // Cuando localStorageItem está vacío seteamos el localStorage con un arreglo vacío
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    // asignamos a la variable parsedItem un arreglo vacío
    parsedItem = initialValue;
  } else {
    // Transformamos localStorageItem de nuevo a JSON
    parsedItem = JSON.parse(localStorageItem);
  }

  // EStado de los Todo's
  const [item, setItem] = useState(parsedItem);

  //Funcion para actualizar el estado y el localStorage
  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };
  return [item, saveItem];
}

function App() {
  // Estados de la Aplicacion
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);
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

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    // Copiamos el estado para trabajar sobre la copia de newTodos
    const newTodos = [...todos];
    // Cambiamos la propiedad "completed" a true
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];

    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
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
