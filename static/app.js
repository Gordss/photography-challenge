import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

import { UserListComponent } from './user-list.js';
import { UserRegistrationFormComponent } from './user-register-form.js';

const appTemplate = context => html`
    <div>${context.title}</div>
    <nav>
        <a href="/"> User List </a>
        <a href="/user/register"> Register </a>
    </nav>
    <div id="outlet"></div>
`;

class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, appTemplate);

        decorateAsStateProperty(this, 'title', 'User database');

        Promise.resolve().then(() => {
            const outlet = this.shadowRoot.getElementById('outlet');
            const router = new Vaadin.Router(outlet);

            router.setRoutes([
                { path: '/', component: UserListComponent.selector },
                { path: '/user/register', component: UserRegistrationFormComponent.selector },
              ]);
        });
    }
}

customElements.define('app-root', AppComponent);