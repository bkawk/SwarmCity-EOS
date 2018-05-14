import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-selector/iron-selector.js";

class ComponentSprite extends PolymerElement {
  static get template() {
    return html`

    <style>
    :host {
        overflow: hidden;
    }

    .sprite {
        background-image: url(./images/sprite@1x.png);
        background-size: 200px 200px;
        background-repeat: no-repeat;
        display: block;
    }
    
    .logo-invert {
        filter: invert(100%);  
        width: 47px;
        height: 21px;
        background-position: -77px -72px;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 1.5),
    only screen and (min--moz-device-pixel-ratio: 1.5),
    only screen and (min-resolution: 240dpi) {
        .sprite {
            background-image: url(./images/sprite@2x.png);
        }
    }
    </style>
    <div id="icon" class="sprite"></div>
`;
  }

  static get is() {
    return 'component-sprite';
  }

  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true,
        value: 'none'
      }
    };
  }

  ready() {
    super.ready();
    this.$.icon.classList.add(this.icon);
  }

}

customElements.define('component-sprite', ComponentSprite);