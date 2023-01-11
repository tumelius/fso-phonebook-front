const Form = (props) => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={props.formHanlder}>
        <div>
          name: <input value={props.nameValue} onChange={props.nameChangeHandler} />
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.phoneChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form