import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';

class ComponentSprite extends PolymerElement { 
    static get template() { 
        return html`

    <style>
    :host {
        display: block;
        overflow: hidden;
        background: url(../../images/sprite@1x.png);
        background-size: 200px 200px;
        background-repeat: no-repeat;
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
        :host {
            background: url(../../images/sprite@2x.png) -77px -72px;
        }
    }
    </style>

`;} 

static get is() { 
    return 'component-sprite';
}

static get properties() {
    return {
        icon: {
            type: String,
            reflectToAttribute: true,
            value: 'none',
        },
    };
}

} customElements.define('component-sprite', ComponentSprite);
