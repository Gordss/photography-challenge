import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';

const NewChallengeFormTemplate = (context) => html`
  <link href="/styles/new-challenge.css" rel="stylesheet">
  <div class="container">
    <form @submit=${context.submitHandler.bind(context)}>
        <h1>Create your challenge</h1>
        <p>
          <input type="text" id="title" name="title" placeholder="Title" required>
        </p>
        <p>
          <input type="text" id="details" name="details" placeholder="Challenge details">
        </p>
        <p>
          <label for="finalDate">Select final date:</label>
          <input type="date" id="finalDate" name="finalDate" min="${new Date().toISOString().split('T')[0]}" required>
        </p>
        <p>
            <label for="image">Upload challenge background:</label>
            <input type="file" id="image" name="image" accept="image/*">
        </p>
        <ul>
          <li><button>Create</button></li>
        </ul>
    </form>
  </div>
`;

export class NewChallengeFormComponent extends HTMLElement {
    static selector = 'new-challenge-form';

    constructor () {
        super();
        this.attachShadow({ mode: 'open' });

        decorateAsComponent(this,  NewChallengeFormTemplate);
    }

    submitHandler(event) {
      event.preventDefault();
      const formFields = Array.from(this.shadowRoot.querySelectorAll('p [name]'));
      const body = formFields.reduce((acc, currField) => {
          acc[currField.name] = currField.value;
          return acc;
      }, {});

    }
}

customElements.define(NewChallengeFormComponent.selector, NewChallengeFormComponent);