import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';
import { UserListComponent } from './user-list.js';
import { NewChallengeFormComponent } from './new-challenge-form.js'

const appTemplate = context => html`
    <link href="/styles/index.css" rel="stylesheet">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Challenges</a></li>
        <li><a href="/new-challenge">New challenge</a></li>
        <li style="float:right"><a href="/register">Register</a></li>
        <li style="float:right"><a href="/log-in">Log in</a></li>
    </ul>
    <div id="outlet"></div>
`;

class AppComponent extends HTMLElement {
    routes = [
        { path: '/', component: UserListComponent.selector },
        { path: '/new-challenge', component: NewChallengeFormComponent.selector },
    ];

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, appTemplate);

        Promise.resolve().then(() => {
            const outlet = this.shadowRoot.getElementById('outlet');
            const router = new Vaadin.Router(outlet);

            router.setRoutes(this.routes);
        })
    }
}

customElements.define('app-root', AppComponent);