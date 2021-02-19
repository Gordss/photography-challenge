import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js'
import { StateManager } from './utils/state-manager/state-manager.js';
import { LOGIN } from './utils/state-manager/reducers.js'

const UserLogInFormTemplate = (context) => html`
    <link href="/styles/log-in.css" rel="stylesheet">
    <div class="container">
        <form @submit=${context.submitHandler.bind(context)}>
            <h1>Please sign in</h1>
            <p>
              <input type="email" id="inputEmail" name="email" placeholder="Email address" required autofocus>
            </p>
            <p>
              <input type="password" id="inputPassword" name="password" placeholder="Password" required>
            </p>
            <p>
              <span id="error">Invalid email or password!</span>
            </p>
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me"> Remember me
              </label>
            </div>
            <ul>
                <li><button type="submit" class="submit-button">Sign in</button></li>
                <li style="float:right"><a href="/">Cancel</a></li>
            </ul>
        </form>
    </div>
`;

export class UserLogInFormComponent extends HTMLElement {
    static selector = 'app-sign-in-form';

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, UserLogInFormTemplate);
    }

    verifyUser(email, passHash)
    {
        return fetch(`/api/users/${email}/${passHash}`)
            .then(res => res.json());
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

        this.verifyUser(body['email'], body['password']).then((result) => {
            if(!this.isObjectEmpty(result)){
                StateManager.dispatch({
                    type: LOGIN,
                    payload: {
                        user: {
                            id: result[0]['_id'],
                            username: result[0]['username']
                        }
                    }
                });
                Vaadin.Router.go('/');
            }
            else
            {
                this.displayError();
            }
        });
    }
}

customElements.define(UserLogInFormComponent.selector, UserLogInFormComponent);