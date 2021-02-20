import { html } from '/lit-html/lit-html.js';
import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

import { StateManager } from './utils/state-manager/state-manager.js';
import { LOGIN, LOGOUT } from './utils/state-manager/reducers.js'

const IndexContentTemplate = (context) => html`
    <link href="/styles/index-content.css" rel="stylesheet">
    <div class="container">
        <div>
            <img src="./assets/logo-vector.png" alt="Logo">
        </div>
        <div class="text">
            <h1><b>Photo Race</b></h1>
            <h3>Create challenges and compete with other professional photographers!</h3>
            <h3>Upload your photos</h3>
            <h3>Get highest rating</h3>
            <h3>Win prizes</h3>
        </div>
        
        ${ifThen(!context.auth.isLoggedIn, html`<a @click="${context.registerHandler.bind(context)}">Join now for FREE</a>`)}
    </div>
`;

export class IndexContentComponent extends HTMLElement {
    static selector = 'index-content';

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, IndexContentTemplate);

        decorateAsStateProperty(this, 'auth', StateManager.getState().auth);
        StateManager.subscribe((action) => {
            if(action.type === LOGIN || action.type === LOGOUT)
            {
                this.auth = StateManager.getState().auth;
            }
        });

    }

    registerHandler(event) {
        Vaadin.Router.go('/register');
    }
}

customElements.define(IndexContentComponent.selector, IndexContentComponent);