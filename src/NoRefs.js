// import React from "react";

export function NoRefsForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    console.log('email', form.email, form.elements.email.value)
    console.log('name', form.name, form.elements.name.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" />
      </div>
      <div>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
