import { observable } from "../store/index.js";

export class Store {
    #state; #mutations; #actions;
    state = {};

    constructor({state, mutations, actions}){
        this.#state = observable(state);
        this.#mutations = mutations;
        this.#actions = actions
        
        Object.keys(state).forEach(key => {
            Object.defineProperty(
                this.state,
                key,
                {get : () => this.#state[key]}
            )
        })
    }

    commit ( action, payload){
        this.#mutations[action](this.#state, payload)
    }

    dispatch(action, payload){
        return this.#actions[action]({
            state: this.#state,
            commit: this.commit.bind(this),
            dispatch: this.dispatch.bind(this)
        }, payload)
    }
    
}

export const createStore = reducer => {

    const state = observable(reducer())

    const frozenState = {}
    Object.keys(state).forEach(key => {
        Object.defineProperty(frozenState, key, {
            get: () => state[key]
        })
    }) 
    const dispatch  = action => {
        const newState = reducer(state,action);
        for ( const [key,value] of Object.entries(newState)){
            if(!state[key]) continue;
            state[key] = value
        }
    }
    const getState = () => frozenState

    return {getState, dispatch}
}