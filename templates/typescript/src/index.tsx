import { mount, Accepts } from "wallace";

interface iGreeting {
  msg: string;
  name: string;
}

const Greeting: Accepts<iGreeting> = ({ msg, name }) => (
  <div>
    {name} says {msg}!
  </div>
);

mount("main", Greeting, { msg: "hello", from: "Wallace" });