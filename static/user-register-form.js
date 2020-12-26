import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';

const userRegisterFormTemplate = (context) => html`
    <form @submit=${context.submitHandler.bind(context)}>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username">
        </div>
        <div class="form-group">
          <label for="person-first-name">First name:</label>
          <input type="text" id="person-first-name" name="firstName">
        </div>
        <div class="form-group">
          <label for="person-last-name">Last name:</label>
          <input type="text" id="person-last-name" name="lastName">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password">
        </div>
        <button>Register</button>
    </form>
`;

export class UserRegistrationFormComponent extends HTMLElement {
    static selector = 'app-register-form';

    constructor () {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, userRegisterFormTemplate);
    }

    submitHandler(event) {
        event.preventDefault();
        const formFields = Array.from(this.shadowRoot.querySelectorAll('div.form-group *[name]'));
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

customElements.define(UserRegistrationFormComponent.selector, UserRegistrationFormComponent);