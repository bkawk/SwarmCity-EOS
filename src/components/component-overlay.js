import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../shared-styles.js';
import './component-sprite.js';

class ComponentOverlay extends PolymerElement { static get template() { return html`

    <style include="shared-styles">
    :host {
        --display-none-block: none;
        position: fixed; 
        display: var(--display-none-block); 
        width: 100%; 
        height: 100%; 
        top: 0; 
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); 
        z-index: 2; 
    }
    .overlay{
        position: fixed; 
        display: block;
        width: 100%; 
        height: 100%; 
        top: 0; 
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3; 
        cursor: pointer; 
    }

    </style>

<div class="overlay" on-click="_hide">
sss
</div>

`;} 

static get is() { 
    return 'component-overlay'; 
}



ready() {
    super.ready();
    window.addEventListener('overlay', (event) => {this._show(event.detail.action)});
}

_show(event){
    if(event === 'join'){
        this.updateStyles({'--display-none-block': 'block'});
    } 
}

_hide(){
    this.updateStyles({'--display-none-block': 'none'});
}

} customElements.define('component-overlay', ComponentOverlay);
