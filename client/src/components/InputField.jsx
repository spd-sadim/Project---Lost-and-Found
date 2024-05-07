export default function InputField({ label,name, type, placeholder, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor="" className="d-flex flex-column fw-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className=" w-100 border rounded p-2"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
