import p5 from "p5";
import sketch from "./sketch";
import { io } from "socket.io-client";
import { TypedSocket } from "../../types";
import "destyle.css";

const sock: TypedSocket = io("/monitor");

sock.on("monitor:start", (initData) => {
  new p5(sketch(sock, initData));
});

document.addEventListener("touchmove", (e) => e.preventDefault(), {
  passive: false,
});
document.addEventListener("mousewheel", (e) => e.preventDefault(), {
  passive: false,
});
