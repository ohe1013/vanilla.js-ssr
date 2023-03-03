import { Store,createStore } from "../core/Store.js";

// export const store = new Store({
//     state : {
//         a:10,
//         b:20
//     },

//     mutations: {
//         SET_A (state, payload) {
//             state.a = payload
//         }, 

//         SET_B (state,payload) {
//             state.b = payload
//         }
//     }
// })

const initState = {
    a:10,
    b:20
}

export const SET_A = 'SET_A'
export const SET_B = 'SET_B'

export const store = createStore((state= initState, action= {})=>{
    switch(action.type) {
        case 'SET_A':
            return {...state, a: action.payload}
        case 'SET_B':
            return {...state, b:action.payload}
        default:
            return state; 
    }
})

export const setA = payload => ({type:SET_A,payload})
export const setB = payload => ({type:SET_B,payload})