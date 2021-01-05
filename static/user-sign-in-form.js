import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js'

const UserSignInFormTemplate = (context) => html`
    <link href="/styles/sign-in.css" rel="stylesheet">
    <div class="container">
        <form @submit=${context.submitHandler.bind(context)}>
            <h1>Please sign in</h1>
            <p>
              <input type="email" id="inputEmail" name="email" placeholder="Email address" required autofocus>
            </p>
            <p>
              <input type="password" id="inputPassword" name="password" placeholder="Password" required>
            </p>
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me"> Remember me
              </label>
            </div>
            <button type="submit" class="submit-button">Sign in</button>
            <button class="cancel-button">Cancel</button>
        </form>
    </div>
`;

export class UserSignInFormComponent extends HTMLElement {
    static selector = 'app-sign-in-form';

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, UserSignInFormTemplate);
    }

    submitHandler(event) {
        event.preventDefault();
        const formFields = Array.from(this.shadowRoot.querySelectorAll('input'));
        const body = formFields.reduce((acc, currField) => {
            acc[currField.name] = currField.value;
            return acc;
        }, {});

        fetch('/api/users', {
            headers: {
                'content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(() => {
            window.location = '/';
        });
    }
}

customElements.define(UserSignInFormComponent.selector, UserSignInFormComponent);