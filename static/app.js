import { html } from '/lit-html/lit-html.js';
import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';
import { UserListComponent } from './user-list.js';
import { NewChallengeFormComponent } from './new-challenge-form.js';
import { UserLogInFormComponent } from './user-log-in-form.js'
import { UserRegistrationFormComponent } from './user-register-form.js';

import { StateManager } from './utils/state-manager/state-manager.js';
import { LOGIN, LOGOUT } from './utils/state-manager/reducers.js';

const logOrRegister = html`
    <li style="float: right" id="register-button"><a href="/register">Register</a></li>
    <li style="float: right" id="login-button"><a href="/log-in">Log in</a></li>
`;

const appTemplate = context => html`
    <link href="/styles/index.css" rel="stylesheet">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Challenges</a></li>
        <li><a href="/new-challenge">New challenge</a></li>
        ${context.auth.isLoggedIn ? html`<li style="float: right" id="username"><h3>${(context.auth.user.username)}</h3></li>` : logOrRegister}
    </ul>
    <div id="outlet"></div>
`;

class AppComponent extends HTMLElement {
    routes = [
        { path: '/', component: UserListComponent.selector },
        { path: '/new-challenge', component: NewChallengeFormComponent.selector },
        { path: '/register', component: UserRegistrationFormComponent.selector },
        { path: '/log-in', component: UserLogInFormComponent.selector }
    ];

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, appTemplate);

        decorateAsStateProperty(this, 'auth', StateManager.getState().auth);
        StateManager.subscribe((action) => {
            if(action.type === LOGIN || action.type === LOGOUT)
            {
                this.auth = StateManager.getState().auth;
            }
        });

        Promise.resolve().then(() => {
            const outlet = this.shadowRoot.getElementById('outlet');
            const router = new Vaadin.Router(outlet);

            router.setRoutes(this.routes);
        })
    }

    displayNavButtons(isLogged)
    {
        if(isLogged)
        {
            this.shadowRoot.getElementById('register-button').setAttribute('style', 'display: none');
            this.shadowRoot.getElementById('login-button').setAttribute('style', 'display: none');
            this.shadowRoot.getElementById('username').setAttribute('style', 'float:right');
        }
        else
        {
            this.shadowRoot.getElementById('register-button').setAttribute('style', 'float:right');
            this.shadowRoot.getElementById('login-button').setAttribute('style', 'float:right');
            this.shadowRoot.getElementById('username').setAttribute('style', 'display: none');
        }
    }
}

customElements.define('app-root', AppComponent);