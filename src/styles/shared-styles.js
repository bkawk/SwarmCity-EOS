import '../../node_modules/@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>

    .card {
      margin: 24px;
      padding: 16px;
      color: #757575;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
      0 1px 5px 0 rgba(0, 0, 0, 0.12), 
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    .circle {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      color: #555;
      border-radius: 50%;
      background: #ddd;
      font-size: 30px;
      line-height: 64px;
    }

    h1 {
      margin: 16px 0;
      color: #4c505a;;
      font-size: 22px;
    }

    h2 {
      font-size: 22px;
      color: #4c505a;
      line-height: 26px;
      margin-top:0px
    }

    small {
      color: #4c505a;
      font-size: 15px;
      font-weight: normal;
      line-height: 20px;
      opacity: 0.7;
      display: block;
      padding-top: 13px;
    }

    input.text {
      padding: 8px;
      background: #F0F1F3;
      display: block;
      width: 100%;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.02);
      border: 1px solid;
      border-color: #C9CCD0 #CFD2D6 #CFD2D6;
      border-radius: 3px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      font-size: 14px;
      height: auto;
      margin-bottom:10px;
    }

    input:focus, select:focus, textarea:focus, button:focus {
      outline: none;
    }

    input.text:focus {
      background: #fff;
      border 1px solid #8bd2d0 !important;
      box-shadow: 0 0 0 2px rgba(133,176,212,0.4);
    }
    
    input.text.error {
      color: #db6265;
      border-color: #d2928c;
      box-shadow: 0 0 0 2px #f0d1ce;
  }

    button {
      cursor: pointer;
      vertical-align: middle;
      outline: none;
    }

    .btn-critical {
      display: block;
      width: 100%;
      font-weight: bold;
      padding: 0 12px;
      line-height: 36px;
      font-size: 14px;
      border: 1px solid;
      border-radius: 3px;
      color: #5A616F;
      text-shadow: 0 1px 0 #FFF;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
      border-color: #d1d3d6 #d2d3d5 #bdbec0;
      background: #F4F4F5;
      background: -webkit-linear-gradient(top,#FFF,#F6F7F8);
      background: -ms-linear-gradient(top,#FFFFFF,#f9f9f9);
      background: -moz-linear-gradient(top,#FFFFFF,#f9f9f9);
      background: -o-linear-gradient(top,#FFFFFF,#f9f9f9);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFF',
      endColorstr='#f9f9f9');
    }

    .btn-critical:hover {
      text-decoration: none;
      border-color: #CCCED2 #C7C8C9 #B6B7B9;
      background: rgb(255,255,255);
      background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(249,250,250,1) 100%);
      background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(249,250,250,1) 100%);
      background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(249,250,250,1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', 
      endColorstr='#f9fafa',GradientType=0 );
    }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer);
