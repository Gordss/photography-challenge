import { html } from '/lit-html/lit-html.js';
import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';
import { IndexContentComponent } from './index-content.js';
import { NewChallengeFormComponent } from './new-challenge-form.js';
import { UserLogInFormComponent } from './user-log-in-form.js'
import { UserRegistrationFormComponent } from './user-register-form.js';
import { ChallengesGridComponent } from './challenges-grid.js'

import { StateManager } from './utils/state-manager/state-manager.js';
import { LOGIN, LOGOUT } from './utils/state-manager/reducers.js';

const logOrRegister = html`
    <li style="float: right"><a href="/register">Register</a></li>
    <li style="float: right"><a href="/log-in">Log in</a></li>
`;

const appTemplate = context => html`
    <link href="/styles/index.css" rel="stylesheet">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/challenges">Challenges</a></li>
        ${ifThen(context.auth.isLoggedIn, html`<li><a href="/new-challenge">New challenge</a></li>`)}
        ${ifThen(context.auth.isLoggedIn, html`<li style="float: right"><a @click="${context.logoutHandler.bind(context)}">Log out</a></li>`)}
        ${context.auth.isLoggedIn ? html`<li style="float: right"><a>${(context.auth.user.username)}</a></li>` : logOrRegister}
        </ul>
    <div id="outlet"></div>
`;

class AppComponent extends HTMLElement {
    routes = [
        { path: '/', component: IndexContentComponent.selector },
        { path: '/challenges', component: ChallengesGridComponent.selector },
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

    logoutHandler(event) {
        StateManager.dispatch({
            type: LOGOUT
        });
    }

}

customElements.define('app-root', AppComponent);