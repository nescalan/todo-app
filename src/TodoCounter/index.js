import React from "react";
import "./TodoCounter.css";

function TodoCounter({ completed, total }) {
  return (
    <React.Fragment>
      <h2 className="TodoCounter">
        Has completado {completed} de {total} TODOs
      </h2>
    </React.Fragment>
  );
}

export { TodoCounter };
