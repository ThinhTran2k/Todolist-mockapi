import React from "react";
import "./controlField.scss";

export default function controlField() {
  return (
    <div className="container_filter">
      <span className="filter_title">Filter</span>
      <select className="filter_option">
        <option value="0">All</option>
        <option value="1">Active</option>
        <option value="2">Completed</option>
      </select>
    </div>
  );
}
