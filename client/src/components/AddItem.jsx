
export default function AddItem() {

  return (
    <div>
        <h4>Add Lost Item</h4>
        <p>description</p>
        <div className="form">
            <form>
                <label htmlFor="" className="d-flex flex-column"><span>
                What was lost
                </span> <span>(Dog, Jacket, Smartphone )</span></label>
                <input type="text" name="name" placeholder="What was lost"/>
            </form>
        </div>
    </div>
  )
}
