// class 발행기관 {
//     #state;
//     #observers = new Set()
//     constructor(state){
//         this.#state = state;
//         Object.keys(state).forEach(key => Object.defineProperty(this, key, {
//             get: () => this.#state[key],
//             set: (value) => { 
//                 this.#state[key] = value 
//                 this.내부에_변화가_생김(this.#state)
//             }
//         }))
//     }
//     내부에_변화가_생김 (newState) {
//         this.#state = {...this.#state, ...newState}
//         this.구독자에게_알림();
//     }
//     구독자_등록 (subscriber) {
//         this.#observers.add(subscriber)
//     }
//     구독자에게_알림 (){
//         this.#observers.forEach(fn => fn());
//     }
// }

// //observer패턴은 내부의 변화 (state의 변화) 가 생길 때 구독자들에게 변화를 주는 것!

// class 구독자 {
//     #fn;
//     constructor( 발행기관에_변화가_생길_때_하는일) {
//         this.#fn = 발행기관에_변화가_생길_때_하는일
//     }
//     구독 (publisher) {
//         publisher.구독자_등록(this.#fn)
//     }
// }

// const state = new 발행기관 ({
//     a:10,
//     b: 20
// })

// const addCal = new 구독자(()=>console.log(`a+b = ${state.a + state.b}`))
// const mulCal = new 구독자(()=>console.log(`a*b = ${state.a * state.b}`))
// addCal.구독(state)
// mulCal.구독(state)

// console.log(state.a=20)



let currentObserver = null;

const observe  = fn => {
    currentObserver = fn;
    fn();
    currentObserver = null;
}

const observable = obj => {
    Object.keys(obj).forEach(key => {
        let _value = obj[key];
        const observers = new Set();
        Object.defineProperty(obj,key,{
            get() {
                if(currentObserver) observers.add(currentObserver)
                return _value
            },
            set(value) {
                if ( value === _value) return
                if ( JSON.stringify(_value)=== JSON.stringify(value)) return
                _value = value;
                observers.forEach(fn => fn())
            }
        })
    }) 
    return obj; 
}

const _obj = {a:1,b:3,c:5}
let _value = _obj['a']
let __value = _obj['b']
Object.defineProperty(_obj,'a',{
    get(){
        return _value
    },
    set(value){
        console.log(_value,value)
        _value = value;
    }
})
_obj.a = 5

console.log("sd",_obj.a,_obj.b)
_obj.a = 10

console.log("sd",_obj.a,_obj.b)
_value = 20
__value =20
console.log("sd",_obj.a,_obj.b)

// const observable = obj => {

//     const oberverMap = {}

//     return new Proxy(obj,{
//         get(target, name) {
//             oberverMap[name] = oberverMap[name] || new Set();
//             if (currentObserver) oberverMap[name].add(currentObserver)
//             console.log(1)
//             return target[name]
//         },
//         set (target,name,value) {
//             if (target[name] === value) return true
//             if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
//             target[name] = value;
//             oberverMap[name].forEach(fn=> fn())
//             return true;
//         }
//     })
// }


export {observe, observable}