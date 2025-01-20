import { mount } from "wallace";

const Greeting = ({ msg, name }) => (
  <div>
    {name} says {msg}!
  </div>
);

mount("main", Greeting, { msg: "hello", from: "Wallace" });