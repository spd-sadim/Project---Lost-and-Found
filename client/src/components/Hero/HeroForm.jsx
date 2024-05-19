import { categories } from "../category";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HeroForm() {
  const [categoryValue, setCategoryValue] = useState("all");

  return (
    <div className="px-lg-5 d-flex w-100 justify-content-center">

    <div className="d-flex px-lg-5 w-100" style={{maxWidth: "75%"}}>
      {/* <label>What was lost or found *</label>
      <input type="text" name="itemName" id="itemName" className="inputField" /> */}
      {/* <input list="categories" placeholder="Search" /> */}
      {/* <datalist id="categories" className="h-50"> */}
      <select name="category" className="p-2 w-100"  onChange={(e)=> { setCategoryValue(e.target.value)}}>
      <option defaultValue={"all"}>All category</option>
        {categories.map((category, index) => (
          <option value={index+1} key={index}> {category} </option>
        ))}
      </select>
      <Link to={`/view-item?category=${categoryValue}`} className="w-25 h-100">
          <button className="text-white myBtn-primary py-2  w-100"> Search</button>
      </Link>
    </div>
    </div>

  );
}
