import { Button } from "react-bootstrap";
import { categories } from "../category";

export default function HeroForm() {
  return (
    <div className="d-flex flex-column w-100" >
      {/* <label>What was lost or found *</label>
      <input type="text" name="itemName" id="itemName" className="inputField" /> */}
      <label>Categories of item</label>
      {/* <input list="categories" placeholder="Search" /> */}
      {/* <datalist id="categories" className="h-50"> */}
      <select name="category" className="p-2">
      <option defaultValue={"All category"}>All category</option>
        {categories.map((category, index) => (
          <option value={category} key={index}> {category} </option>
        ))}
      </select>
          <Button className="mt-3 py-2"> Search</Button>
    </div>
  );
}
