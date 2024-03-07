import { categories } from "../category";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HeroForm() {
  const [categoryValue, setCategoryValue] = useState("all");

  return (
    <div className="d-flex flex-column w-100" >
      {/* <label>What was lost or found *</label>
      <input type="text" name="itemName" id="itemName" className="inputField" /> */}
      <label>Categories of item</label>
      {/* <input list="categories" placeholder="Search" /> */}
      {/* <datalist id="categories" className="h-50"> */}
      <select name="category" className="p-2" onChange={(e)=> { setCategoryValue(e.target.value)}}>
      <option defaultValue={"all"}>All category</option>
        {categories.map((category, index) => (
          <option value={category} key={index}> {category} </option>
        ))}
      </select>
      <Link to={`/view-item?category=${categoryValue}`} className="w-100">
          <button className="text-white myBtn-primary mt-3 py-2  w-100"> Search</button>
      </Link>
    </div>
  );
}
