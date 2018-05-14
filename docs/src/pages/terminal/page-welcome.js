import { PolymerElement, html } from "../../../node_modules/@polymer/polymer/polymer-element.js";
import '../../styles/shared-styles.js';
import '../../components/component-jumbo.js';

class PageWelcome extends PolymerElement {
  static get template() {
    return html`

    <style include="shared-styles">
      :host {
        display: block;
        padding: 10px;
        background-color: #303D8D;
      }
    </style>

    <component-jumbo><component-jumbo>

`;
  }

  static get is() {
    return 'page-welcome';
  }

}

customElements.define('page-welcome', PageWelcome);