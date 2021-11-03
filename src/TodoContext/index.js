import React, { useState } from "react";
import { useLocalStorage } from "./UseLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  // Estados de la Aplicacion
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
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
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodos,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}
export { TodoContext, TodoProvider };
