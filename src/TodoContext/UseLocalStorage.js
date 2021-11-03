import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  // Simulacion de una API
  const [loading, setLoading] = useState(true);

  // Estado de los Todo's
  const [item, setItem] = useState(initialValue);

  // Estado para manejar el error en la carga
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
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

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 2000);
  });

  //Funcion para actualizar el estado y el localStorage
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  // Cuando retornamos mas de dos estados es mejor hacerlo como un objeto
  return { item, saveItem, loading };
}

export { useLocalStorage };
