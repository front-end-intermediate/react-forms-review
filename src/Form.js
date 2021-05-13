import React from 'react'
// import { NoRefsForm } from "./NoRefs";

function Form() {
  const [values, setValues] = React.useState({
    email: '',
    name: '',
    message: '',
  })

  const handleChange = (e) => {
    console.log('  ', e.target.name)
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('name:', values.name)
    console.log('email:', values.email)
    console.log('message:', values.message)
  }

  return (
    <>
      {/* <NoRefsForm /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={values.message}
            onChange={handleChange}
            name="message"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form
