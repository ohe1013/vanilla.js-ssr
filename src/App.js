import { Component } from "./core/Component.js";
import { store,setA,setB } from "./store/store.js";


const InputA = () => `
    <input id="stateA" value ="${store.getState().a}" />
`
const InputB = () => `
    <input id="stateB" value ="${store.getState().b}" />
`
const Calcaulator = () => `
    <p> a+b =${store.getState().a + store.getState().b}</p>
`

export class App extends Component {

    template() {
        return `
        ${InputA()}
        ${InputB()}
        ${Calcaulator()}
        `
    }
    setEvent(){
        const {$el} = this
        $el.querySelector('#stateA').addEventListener('change', ({target}) => {
            store.dispatch(setA(Number(target.value)))
        })
        $el.querySelector('#stateB').addEventListener('change', ({target}) => {
            store.dispatch(setB(Number(target.value)))
        })
    }
}