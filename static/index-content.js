import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js'

const IndexContentTemplate = (context) => html`
    <link href="/styles/index-content.css" rel="stylesheet">
    <div class="container">
        <div class="text">
            <h1><b>Photo Race</b></h1>
            <h3>Create challenges and compete with other professional photographers!</h3>
            <h3>Upload your photos</h3>
            <h3>Get highest rating</h3>
            <h3>Win prizes</h3>
        </div>
        
        <button>Join now for FREE</button>
    </div>
`;

export class IndexContentComponent extends HTMLElement {
    static selector = 'index-content';

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        decorateAsComponent(this, IndexContentTemplate);
    }
}

customElements.define(IndexContentComponent.selector, IndexContentComponent);