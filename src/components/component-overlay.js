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
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card {
        width: 412px;
        height: 500px
        padding: 45px;
    }

    </style>


<div class="overlay" on-click="_hide">
<div class="card" on-click="_clickCard">
        <div>Join SwarmCity</div>
        <p>Username</p>
        <p>Password</p>
        <p>Download Backup</p>
    </div>
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

_clickCard(event){
    event.stopPropagation();
}

} customElements.define('component-overlay', ComponentOverlay);
