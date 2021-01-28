import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';
import { UserListComponent } from './user-list.js';

const appTemplate = context => html`
    <link href="/styles/index.css" rel="stylesheet">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Challenges</a></li>
        <li><a href="/">New challenge</a></li>
        <li style="float:right"><a href="/register">Register</a></li>
        <li style="float:right"><a href="/log-in">Log in</a></li>
    </ul>
    <app-user-list></app-user-list>
`;

class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, appTemplate);
    }
}

customElements.define('app-root', AppComponent);