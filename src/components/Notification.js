const Notification = ({ data }) => {
  if (data === null) {
    return null
  }

  return (
    <div className={`notification ${data.type}`}>
      {data.message}
    </div>
  )
}

export default Notification