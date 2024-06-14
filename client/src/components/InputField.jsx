export default function InputField({ label,name, type, placeholder, handleChange, value, disabled }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="d-flex flex-column fw-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className=" w-100 border rounded p-2"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        required
      />
    </div>
  );
}
