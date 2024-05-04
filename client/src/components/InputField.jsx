export default function InputField({ label, type, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor="" className="d-flex flex-column mb-2">
        {label}
      </label>
      <input
        type={type}
        className=" w-100 border rounded p-2"
        placeholder={placeholder}
      />
    </div>
  );
}
