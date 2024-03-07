// import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function ReportItem() {
    const [searchParams] = useSearchParams()
    const statusValue = searchParams.get("value");
    console.log(statusValue);
//     const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const buttonValue = queryParams.get("value");
//   console.log(buttonValue);

  return <div className="pt-5 mt-5">ReportItem
  <p>{statusValue}</p>
  <select name="category" id="" defaultValue={statusValue}>
    <option value="">selected</option>
    <option value="Found">Found </option>
    <option value="Lost">Lost </option>
  </select>
  </div>;
}
