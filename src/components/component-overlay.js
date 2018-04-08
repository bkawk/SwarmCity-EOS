import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '../shared-styles.js';
import './component-sprite.js';

import './data/component-api.js';
import './data/component-ecc.js';

class ComponentOverlay extends PolymerElement { static get template() { return html`

    <style include="shared-styles">
    :host {
        --opacity: 0;
        --display-none-block: none;
        position: fixed; 
        display: var(--display-none-block);
        width: 100%; 
        height: 100%; 
        top: 0; 
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2; 
    }

    .overlay{
        opacity: var(--opacity);
        background-color: rgba(0, 0, 0, 0.5); 
        transition: opacity 0.2s ease-in-out;
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

<component-api id="api"></component-api>
<component-ecc id="ecc"></component-ecc>

<div class="overlay" on-click="_hide">
    
    <template is="dom-if" if="{{join}}">
        <div class="card" on-click="_clickCard">
            <h2>Join Swarm City <small>SwarmCity is the place to transact and communicate without interference.</small></h2>
            <input type="text" class$="{{error}}" placeholder="Username" id="username">
            <template is="dom-if" if="{{!available}}">
                <button class="btn-critical" on-click="_checkUsername">Check Availability</button>
            </template>
            <template is="dom-if" if="{{available}}">
                <input type="password" class="text" placeholder="Password" id="password">
                <button class="btn-critical" on-click="_createAccount">Create Account</button>
            </template>
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
    setTimeout(()=>{
        this.updateStyles({'--opacity': 1});
    }, 1);
    if(event === 'join'){
        this._join();
    } else {
        this._logIn();
    }
}


_createAccount(){
    this.$.ecc.makeKeyPair()
    .then((object) => {
        console.log(object)
    })
    .catch((err) => {
        console.log(Error(err));
    })
}

_hide(){
    this.updateStyles({'--opacity': 0});
    setTimeout(()=>{
        this.updateStyles({'--display-none-block': 'none'});
    }, 200);
}

_clickCard(event){
    event.stopPropagation();
}

_checkUsername(){
    var username = this.shadowRoot.querySelector("#username").value
    this.$.api.usernameIsUnique(username)
    .then((object) => {
        if(object.response === true){
            this.available = true;
            this.error = 'text'
        } else {
            this.available = false;
            this.error = 'text error'
        }
    })
    .catch((err) => {
        console.log(Error(err));
    })
}

static get properties() {
    return {
        join: {
            type: Boolean,
        },
        test: {
            type: String,
            value: "test555",
        },
        available: {
            type: Boolean,
            value: false,
        },
        error: {
            type: String,
            value: 'text'
        }
    };
}

} customElements.define('component-overlay', ComponentOverlay);
