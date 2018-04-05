import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../shared-styles.js';
import './component-sprite.js';

class ComponentOverlay extends PolymerElement { static get template() { return html`

    <style include="shared-styles">
    :host {
        position: fixed; 
        display: none; 
        width: 100%; 
        height: 100%; 
        top: 0; 
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5); 
        z-index: 2; 
        cursor: pointer; 
    }

    </style>

<div class="navigation">

</div>

`;} 

static get is() { 
    return 'component-overlay'; 
}

_close(){
    this.dispatchEvent(new CustomEvent('overlay', {bubbles: true, composed: true, detail: {action: 'close'}}));
}

} customElements.define('component-overlay', ComponentOverlay);
