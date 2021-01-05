import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';

const userRegisterFormTemplate = (context) => html`
  <link href="/styles/register.css" rel="stylesheet">
  <div class="container">
    <form @submit=${context.submitHandler.bind(context)}>
        <h1>Register</h1>
        <p>
          <input type="text" id="username" name="username" placeholder="Username" required>
        </p>
        <p>
          <input type="email" id="email" name="email" placeholder="E-mail" required>
        </p>
        <p>
          <input type="password" id="password" name="password" placeholder="Password" required>
        </p>
        <p>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required>
          <span>Passwords do not match</span>
        </p>
        <button type="submit" class="submit-button">Register</button>
        <button class="cancel-button">Cancel</button>
    </form>
  </div>
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