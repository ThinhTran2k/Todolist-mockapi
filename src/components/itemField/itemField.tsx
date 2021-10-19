import React from "react";
import "./itemField.scss";
import { FaTrashAlt, FaPen } from "react-icons/fa";

export default function itemField() {
  return (
    <li>
      <div className="wrapper_item">
        <input type="checkbox" className="item_checkbox" />
        <div className="wrapper_text">
          <p>
            Coding Coding CodingCoding Coding Coding Coding Coding Coding Coding
          </p>
        </div>
        <div className="wrapper_icons">
          <FaPen className="icon_edit" />
          <FaTrashAlt className="icon_delete" />
        </div>
      </div>
    </li>
  );
}
