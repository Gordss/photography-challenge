import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';
import { UserListComponent } from './user-list.js';

const appTemplate = context => html`
    <div>${context.title}</div>
    <nav>
        <a href="/"> User List </a>
        <a href="/register"> Register </a>
        <a href="/sign-in"> Sign-in </a>
    </nav>
    <app-user-list></app-user-list>
`;

class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, appTemplate);

        decorateAsStateProperty(this, 'title', 'User database');
    }
}

customElements.define('app-root', AppComponent);