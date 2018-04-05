import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../shared-styles.js';

class ComponentSprite extends PolymerElement { 
    static get template() { 
        return html`

    <style include="shared-styles">
    :host {
        filter: invert(100%);
        display: block;
        width: 47px;
        height: 21px;
        overflow: hidden;
        background: url(../../images/sprite@2x.png) -77px -72px;
        background-size: 200px 200px;
        background-repeat: no-repeat;
    }
    </style>


`;} 

static get is() { 
    return 'component-sprite';
}

static get properties() {
    return {
        filter: {
            type: String,
            reflectToAttribute: true,
            value: 'none',
        },
        filterValue: {
            type: Number,
            reflectToAttribute: true,
            value: 100,
        },
        width: {
            type: Number,
            reflectToAttribute: true,
            value: 100,
        },
        height: {
            type: Number,
            reflectToAttribute: true,
            value: 100,
        },
        zoom: {
            type: Number,
            reflectToAttribute: true,
            value: 200,
        },
        offsetX: {
            type: Number,
            reflectToAttribute: true,
            value: -77,
        },
        offsetY: {
            type: Number,
            reflectToAttribute: true,
            value: -72,
        }
    };
}

} customElements.define('component-sprite', ComponentSprite);
