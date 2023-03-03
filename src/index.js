import Home from './views/Home.js'
import Signup from './views/Signup.js'

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = url => {
    history.pushState(null,null,url)
    router();
}

const router = async () => {
    const routes = [
        { path : '/', view: Home},
        { path : '/signup', view : Signup}
    ]

    const availableMatches = routes.map(route => {
        return {
            route : route,
            result : location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = availableMatches.find( availableMatch => availableMatch.result !== null )

    if ( !match ){
        match = {
            route : routes[0],
            result : [location.pathname]
        }
    }
    const view = new match.route.view();
    document.querySelector('.app').replaceChildren( await view.getHTML());
    document.querySelector('.app').insertAdjacentElement('')
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router()
})