const Form = (props) => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={props.formHanlder}>
        <div>
          name: <input onChange={props.nameChangeHandler} />
        </div>
        <div>
          number: <input onChange={props.phoneChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form