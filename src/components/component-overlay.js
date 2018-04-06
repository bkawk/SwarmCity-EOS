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
        width: 322px;
        padding: 45px;
        cursor: default;
    }
    .center {
        padding: 20px 0 0;
        text-align: center;
        color: #8d919a;
        font-size: 12px;
        line-height: 20px;
    }
    .center span {
        color: #4079B0;
        cursor: pointer;
        font-weight: 700;
    }
    </style>


<div class="overlay" on-click="_hide">
    
    <template is="dom-if" if="{{join}}">
        <div class="card" on-click="_clickCard">
            <h2>Join Swarm City <small>SwarmCity is the place to transact and communicate without interference.</small></h2>
            <input type="text" class="text" name="username" placeholder="Username">
            <button class="btn-critical">Check Availability</button>
            <div class="center">Already on Swarm City? <span on-click="_logIn">Log In</span></div>
        </div>
    </template>

    <template is="dom-if" if="{{!join}}">
        <div class="card" on-click="_clickCard">
            <h2>Log In</h2>
            <input type="text" class="text" name="username" placeholder="Username">
            <input type="text" class="text" name="password" placeholder="Password or Private Key">
            <button class="btn-critical">Login</button>
            <div class="center">New to Swarm City? <span on-click="_join">Join Swarm City</span></div>
        </div>
    </template>

</div>

`;} 

static get is() { 
    return 'component-overlay'; 
}

ready() {
    super.ready();
    window.addEventListener('overlay', (event) => {this._show(event.detail.action)});
}

_logIn(){
    this.join = false;
}

_join(){
    this.join = true;
}

_show(event){
    this.updateStyles({'--display-none-block': 'block'});
    if(event === 'join'){
        this._join();
    } else {
        this._logIn();
    }
}

_hide(){
    this.updateStyles({'--display-none-block': 'none'});
}

_clickCard(event){
    event.stopPropagation();
}

static get properties() {
    return {
        join: {
            type: Boolean,
        },
    };
}

} customElements.define('component-overlay', ComponentOverlay);
