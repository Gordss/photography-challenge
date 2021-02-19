import { html } from '/lit-html/lit-html.js'
import { repeat } from '/lit-html/directives/repeat.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

const challengesGrid = (context) => html`
    <link href="/styles/challenges-grid.css" rel="stylesheet">
    <div class="cards">
    ${repeat(
        context.challenges || [],
        challenge => challenge._id,
        (challenge) => html`
            <div class="card">
            <img src="./challenge-photos/${challenge._id}.jpg" alt="CardBack">
            <div>
                <h4 class="text"><b>${challenge.title}</b></h4>
                <p class="text">Prize: ${challenge.prize}€</p>
            </div>
            </div>
        `
    )}
    </div>
`;


export class ChallengesGridComponent extends HTMLElement {
    static selector = 'app-challenges-grid';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        decorateAsComponent(this, challengesGrid);
        
        decorateAsStateProperty(this, 'challenges', null);

        this.loadChallenges();
    }

    loadChallenges() {
        this.challenges = null;
        fetch('/api/challenges')
            .then(res => res.json())
            .then(challenges => {
                this.challenges = challenges;
            });
    }
}

customElements.define(ChallengesGridComponent.selector, ChallengesGridComponent);