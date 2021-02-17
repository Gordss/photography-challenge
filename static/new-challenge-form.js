import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';

const NewChallengeFormTemplate = (context) => html`
  <link href="/styles/new-challenge.css" rel="stylesheet">
  <div class="container">
    <form action="fileupload" @submit=${context.submitHandler.bind(context)}>
        <h1>Create your challenge</h1>
        <p>
          <input type="text" id="title" name="title" placeholder="Title" required>
        </p>
        <p>
          <input type="text" id="details" name="details" placeholder="Challenge details">
        </p>
        <p>
          <input type="number" id="prize" name="prize" min="1" step="any" placeholder="1,000.00€">
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

      fetch('/api/challenges', {
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

customElements.define(NewChallengeFormComponent.selector, NewChallengeFormComponent);