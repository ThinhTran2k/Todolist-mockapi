import React from "react";
import { useSelector } from "react-redux";
import { Itasks } from "../../interface";
import ItemField from "../itemField/itemField";
import "./listField.scss";

export default function ListField() {
  const { tasks, fitlerType } = useSelector((state: Itasks) => state);
  console.log("tasks", tasks);
  return (
    <div className="container_item">
      <ul>
        <ItemField />
      </ul>
    </div>
  );
}
