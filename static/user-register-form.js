import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';

const UserRegisterFormTemplate = (context) => html`
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
          <span id="error">Passwords do not match</span>
        </p>
        <ul>
          <li><button class="submit-button">Register</button></li>
          <li style="float:right"><a href="/">Cancel</a></li>
        </ul>
    </form>
  </div>
`;

export class UserRegistrationFormComponent extends HTMLElement {
    static selector = 'app-register-form';

    constructor () {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, UserRegisterFormTemplate);
    }

    verifyNewUser(email, passHash)
    {
        return fetch(`/api/users/${email}/${passHash}`)
            .then(res => res.json())
            .finally(result => {
              if(!this.isObjectEmpty(result))
              {
                this.displayError();
                reject();
              }
            });
    }

    displayError()
    {
        this.shadowRoot.getElementById('error').setAttribute('style', 'display: block;');
    }

    isObjectEmpty(value) {
        return (
          Object.prototype.toString.call(value) === '[object Array]' &&
          JSON.stringify(value) === '[]'
        );
    }

    submitHandler(event) {
        event.preventDefault();
        const formFields = Array.from(this.shadowRoot.querySelectorAll('p [name]'));
        const body = formFields.reduce((acc, currField) => {
            acc[currField.name] = currField.value;
            return acc;
        }, {});

        if(body['password'] !== body['confirm_password'])
        {
          this.displayError();
        }
        else
        {
          let checkExisting = this.verifyNewUser(body['email'], body['password']);

          if(!checkExisting.isRejected)
          {
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
    }
}

customElements.define(UserRegistrationFormComponent.selector, UserRegistrationFormComponent);