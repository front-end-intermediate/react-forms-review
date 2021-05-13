# React Forms Review

```html
function ContactForm() { return (
<form>
  <div>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" />
  </div>
  <div>
    <label htmlFor="email">Email</label>
    <input id="email" type="email" />
  </div>
  <div>
    <label htmlFor="message">Message</label>
    <textarea id="message" />
  </div>
  <button type="submit">Submit</button>
</form>
); }
```

Each label has an htmlFor prop that matches the id on its corresponding input.
(In HTML, the label attribute would be for. React uses htmlFor instead.)

## Controlled vs. Uncontrolled

- uncontrolled input is the simpler of the two. It’s the closest to a plain HTML input. React puts it on the page, and the browser keeps track of the rest. When you need to access the input’s value, React provides a way to do that. Uncontrolled inputs require less code, but make it harder to do certain things.

- controlled input: YOU explicitly control the value that the input displays. You have to write code to respond to keypresses, store the current value somewhere, and pass that value back to the input to be displayed. It’s a feedback loop with your code in the middle. It’s more manual work to wire these up, but they offer the most control.

## Controlled

Add 3 calls to useState to create 3 variables to hold the inputs’ values:

```js
function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('name:', name);
    console.log('email:', email);
    console.log('message:', message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

Each input has gained:

- value: tells the input what to display - the value from the corresponding state variable
- onChange: a function that gets called when the user changes the input. We take the input’s current value (e.target.value) and save it into state

With every keypress, the component will re-render the whole form.

## Uncontrolled Inputs

- create 3 refs with the useRef hook
- bind the refs to the inputs with the ref prop

```js
function ContactForm() {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const messageRef = React.useRef();

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" ref={messageRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Refs

A ref holds a reference to a DOM node.

To get the value from an uncontrolled input, you need a reference to it, which we get by assigning a ref prop.

Then you can read out the value when the form is submitted.

When the component is first rendered, React will set up the refs. nameRef.current will then refer to the name input’s DOM node, emailRef.current will refer to the email input ...

```js
function ContactForm() {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const messageRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('name:', nameRef.current.value);
    console.log('email:', emailRef.current.value);
    console.log('message:', messageRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" ref={messageRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

These refs hold the same values as the ones you’d get if you ran `document.querySelector('input[id=name]')` in your browser console. It’s the browser’s raw input node; React is just passing it back to you.

Uncontrolled inputs are the best choice when you only need to do something with the value at a specific time, such as when the form is submitted.

If you need to inspect/validate/transform the value on every keypress, use a controlled input.

Note: we’re calling event.preventDefault() at the top. Without this, submitting the form would refresh the page.

Use controlled inputs for

- Instantly validating the form on every keypress
- preventing certain characters from being typed

E.g.:

```js
function EmailField() {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    // no exclamations allowed!
    setEmail(e.target.value.replace(/!/g, ''));
  };

  return (
    <div>
      <label htmlFor="email">Email address</label>
      <input id="email" value={email} onChange={handleChange} />
    </div>
  );
}
```

Becasue controlled inputs are more complex we combine inputs into a single state object:

```js
function MultipleInputs() {
  const [values, setValues] = useState({
    email: '',
    name: '',
  });

  const handleChange = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
```

Adding overhead like this is why form libraries are popular.

See [Formik](https://formik.org/docs/tutorial)

As the number of inputs grows keypresses can start to feel perceptibly laggy - esp. on mobile devices.

## Uncontrolled Inputs Don’t Re-render

You don’t need to update state, which means you don’t need to re-render. Every keypress bypasses React and goes straight to the browser.

You can even go without refs:

```js
function NoRefsForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log('email', form.email, form.elements.email);
    console.log('name', form.name, form.elements.name);
  };

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
  );
}
```
