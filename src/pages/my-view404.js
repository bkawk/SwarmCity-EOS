import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class MyView404 extends PolymerElement { static get template() { return html`

    <style>
      :host {
        display: block;

        padding: 10px 20px;
      }
    </style>

    Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a>

`;} 
  static get is() { return 'my-view404'; }
  static get properties() {return {rootPath: String,};}}
  customElements.define('my-view404', MyView404);
