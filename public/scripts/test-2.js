import {TapeMachine} from "./test-class.js";

const tp = new TapeMachine();
tp.record("Hello... Hellooooo!!! Helloooooo!!!!!");
tp.play();

const p = document.createElement("p");
p.innerText = "Victory!";
document.querySelector("body").appendChild(p);
