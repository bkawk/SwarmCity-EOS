/* eslint-disable */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.eosjs_ecc=f()}})(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(global){'use strict';function compare(a,b){if(a===b){return 0}
var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break}}
if(x<y){return-1}
if(y<x){return 1}
return 0}
function isBuffer(b){if(global.Buffer&&typeof global.Buffer.isBuffer==='function'){return global.Buffer.isBuffer(b)}
return!!(b!=null&&b._isBuffer)}
var util=require('util/');var hasOwn=Object.prototype.hasOwnProperty;var pSlice=Array.prototype.slice;var functionsHaveNames=(function(){return function foo(){}.name==='foo'}());function pToString(obj){return Object.prototype.toString.call(obj)}
function isView(arrbuf){if(isBuffer(arrbuf)){return!1}
if(typeof global.ArrayBuffer!=='function'){return!1}
if(typeof ArrayBuffer.isView==='function'){return ArrayBuffer.isView(arrbuf)}
if(!arrbuf){return!1}
if(arrbuf instanceof DataView){return!0}
if(arrbuf.buffer&&arrbuf.buffer instanceof ArrayBuffer){return!0}
return!1}
var assert=module.exports=ok;var regex=/\s*function\s+([^\(\s]*)\s*/;function getName(func){if(!util.isFunction(func)){return}
if(functionsHaveNames){return func.name}
var str=func.toString();var match=str.match(regex);return match&&match[1]}
assert.AssertionError=function AssertionError(options){this.name='AssertionError';this.actual=options.actual;this.expected=options.expected;this.operator=options.operator;if(options.message){this.message=options.message;this.generatedMessage=!1}else{this.message=getMessage(this);this.generatedMessage=!0}
var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace){Error.captureStackTrace(this,stackStartFunction)}else{var err=new Error();if(err.stack){var out=err.stack;var fn_name=getName(stackStartFunction);var idx=out.indexOf('\n'+fn_name);if(idx>=0){var next_line=out.indexOf('\n',idx+1);out=out.substring(next_line+1)}
this.stack=out}}};util.inherits(assert.AssertionError,Error);function truncate(s,n){if(typeof s==='string'){return s.length<n?s:s.slice(0,n)}else{return s}}
function inspect(something){if(functionsHaveNames||!util.isFunction(something)){return util.inspect(something)}
var rawname=getName(something);var name=rawname?': '+rawname:'';return'[Function'+name+']'}
function getMessage(self){return truncate(inspect(self.actual),128)+' '+self.operator+' '+truncate(inspect(self.expected),128)}
function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction})}
assert.fail=fail;function ok(value,message){if(!value)fail(value,!0,message,'==',assert.ok)}
assert.ok=ok;assert.equal=function equal(actual,expected,message){if(actual!=expected)fail(actual,expected,message,'==',assert.equal)};assert.notEqual=function notEqual(actual,expected,message){if(actual==expected){fail(actual,expected,message,'!=',assert.notEqual)}};assert.deepEqual=function deepEqual(actual,expected,message){if(!_deepEqual(actual,expected,!1)){fail(actual,expected,message,'deepEqual',assert.deepEqual)}};assert.deepStrictEqual=function deepStrictEqual(actual,expected,message){if(!_deepEqual(actual,expected,!0)){fail(actual,expected,message,'deepStrictEqual',assert.deepStrictEqual)}};function _deepEqual(actual,expected,strict,memos){if(actual===expected){return!0}else if(isBuffer(actual)&&isBuffer(expected)){return compare(actual,expected)===0}else if(util.isDate(actual)&&util.isDate(expected)){return actual.getTime()===expected.getTime()}else if(util.isRegExp(actual)&&util.isRegExp(expected)){return actual.source===expected.source&&actual.global===expected.global&&actual.multiline===expected.multiline&&actual.lastIndex===expected.lastIndex&&actual.ignoreCase===expected.ignoreCase}else if((actual===null||typeof actual!=='object')&&(expected===null||typeof expected!=='object')){return strict?actual===expected:actual==expected}else if(isView(actual)&&isView(expected)&&pToString(actual)===pToString(expected)&&!(actual instanceof Float32Array||actual instanceof Float64Array)){return compare(new Uint8Array(actual.buffer),new Uint8Array(expected.buffer))===0}else if(isBuffer(actual)!==isBuffer(expected)){return!1}else{memos=memos||{actual:[],expected:[]};var actualIndex=memos.actual.indexOf(actual);if(actualIndex!==-1){if(actualIndex===memos.expected.indexOf(expected)){return!0}}
memos.actual.push(actual);memos.expected.push(expected);return objEquiv(actual,expected,strict,memos)}}
function isArguments(object){return Object.prototype.toString.call(object)=='[object Arguments]'}
function objEquiv(a,b,strict,actualVisitedObjects){if(a===null||a===undefined||b===null||b===undefined)
return!1;if(util.isPrimitive(a)||util.isPrimitive(b))
return a===b;if(strict&&Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))
return!1;var aIsArgs=isArguments(a);var bIsArgs=isArguments(b);if((aIsArgs&&!bIsArgs)||(!aIsArgs&&bIsArgs))
return!1;if(aIsArgs){a=pSlice.call(a);b=pSlice.call(b);return _deepEqual(a,b,strict)}
var ka=objectKeys(a);var kb=objectKeys(b);var key,i;if(ka.length!==kb.length)
return!1;ka.sort();kb.sort();for(i=ka.length-1;i>=0;i--){if(ka[i]!==kb[i])
return!1}
for(i=ka.length-1;i>=0;i--){key=ka[i];if(!_deepEqual(a[key],b[key],strict,actualVisitedObjects))
return!1}
return!0}
assert.notDeepEqual=function notDeepEqual(actual,expected,message){if(_deepEqual(actual,expected,!1)){fail(actual,expected,message,'notDeepEqual',assert.notDeepEqual)}};assert.notDeepStrictEqual=notDeepStrictEqual;function notDeepStrictEqual(actual,expected,message){if(_deepEqual(actual,expected,!0)){fail(actual,expected,message,'notDeepStrictEqual',notDeepStrictEqual)}}
assert.strictEqual=function strictEqual(actual,expected,message){if(actual!==expected){fail(actual,expected,message,'===',assert.strictEqual)}};assert.notStrictEqual=function notStrictEqual(actual,expected,message){if(actual===expected){fail(actual,expected,message,'!==',assert.notStrictEqual)}};function expectedException(actual,expected){if(!actual||!expected){return!1}
if(Object.prototype.toString.call(expected)=='[object RegExp]'){return expected.test(actual)}
try{if(actual instanceof expected){return!0}}catch(e){}
if(Error.isPrototypeOf(expected)){return!1}
return expected.call({},actual)===!0}
function _tryBlock(block){var error;try{block()}catch(e){error=e}
return error}
function _throws(shouldThrow,block,expected,message){var actual;if(typeof block!=='function'){throw new TypeError('"block" argument must be a function')}
if(typeof expected==='string'){message=expected;expected=null}
actual=_tryBlock(block);message=(expected&&expected.name?' ('+expected.name+').':'.')+(message?' '+message:'.');if(shouldThrow&&!actual){fail(actual,expected,'Missing expected exception'+message)}
var userProvidedMessage=typeof message==='string';var isUnwantedException=!shouldThrow&&util.isError(actual);var isUnexpectedException=!shouldThrow&&actual&&!expected;if((isUnwantedException&&userProvidedMessage&&expectedException(actual,expected))||isUnexpectedException){fail(actual,expected,'Got unwanted exception'+message)}
if((shouldThrow&&actual&&expected&&!expectedException(actual,expected))||(!shouldThrow&&actual)){throw actual}}
assert.throws=function(block,error,message){_throws(!0,block,error,message)};assert.doesNotThrow=function(block,error,message){_throws(!1,block,error,message)};assert.ifError=function(err){if(err)throw err};var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){if(hasOwn.call(obj,key))keys.push(key)}
return keys}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"util/":82}],2:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
module.exports=function base(ALPHABET){var ALPHABET_MAP={}
var BASE=ALPHABET.length
var LEADER=ALPHABET.charAt(0)
for(var z=0;z<ALPHABET.length;z++){var x=ALPHABET.charAt(z)
if(ALPHABET_MAP[x]!==undefined)throw new TypeError(x+' is ambiguous')
ALPHABET_MAP[x]=z}
function encode(source){if(source.length===0)return''
var digits=[0]
for(var i=0;i<source.length;++i){for(var j=0,carry=source[i];j<digits.length;++j){carry+=digits[j]<<8
digits[j]=carry%BASE
carry=(carry/BASE)|0}
while(carry>0){digits.push(carry%BASE)
carry=(carry/BASE)|0}}
var string=''
for(var k=0;source[k]===0&&k<source.length-1;++k)string+=ALPHABET[0]
for(var q=digits.length-1;q>=0;--q)string+=ALPHABET[digits[q]]
return string}
function decodeUnsafe(string){if(string.length===0)return Buffer.allocUnsafe(0)
var bytes=[0]
for(var i=0;i<string.length;i++){var value=ALPHABET_MAP[string[i]]
if(value===undefined)return
for(var j=0,carry=value;j<bytes.length;++j){carry+=bytes[j]*BASE
bytes[j]=carry&0xff
carry>>=8}
while(carry>0){bytes.push(carry&0xff)
carry>>=8}}
for(var k=0;string[k]===LEADER&&k<string.length-1;++k){bytes.push(0)}
return Buffer.from(bytes.reverse())}
function decode(string){var buffer=decodeUnsafe(string)
if(buffer)return buffer
throw new Error('Non-base'+BASE+' character')}
return{encode:encode,decodeUnsafe:decodeUnsafe,decode:decode}}},{"safe-buffer":68}],3:[function(require,module,exports){'use strict'
exports.byteLength=byteLength
exports.toByteArray=toByteArray
exports.fromByteArray=fromByteArray
var lookup=[]
var revLookup=[]
var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array
var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i]
revLookup[code.charCodeAt(i)]=i}
revLookup['-'.charCodeAt(0)]=62
revLookup['_'.charCodeAt(0)]=63
function placeHoldersCount(b64){var len=b64.length
if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4')}
return b64[len-2]==='='?2:b64[len-1]==='='?1:0}
function byteLength(b64){return(b64.length*3/4)-placeHoldersCount(b64)}
function toByteArray(b64){var i,l,tmp,placeHolders,arr
var len=b64.length
placeHolders=placeHoldersCount(b64)
arr=new Arr((len*3/4)-placeHolders)
l=placeHolders>0?len-4:len
var L=0
for(i=0;i<l;i+=4){tmp=(revLookup[b64.charCodeAt(i)]<<18)|(revLookup[b64.charCodeAt(i+1)]<<12)|(revLookup[b64.charCodeAt(i+2)]<<6)|revLookup[b64.charCodeAt(i+3)]
arr[L++]=(tmp>>16)&0xFF
arr[L++]=(tmp>>8)&0xFF
arr[L++]=tmp&0xFF}
if(placeHolders===2){tmp=(revLookup[b64.charCodeAt(i)]<<2)|(revLookup[b64.charCodeAt(i+1)]>>4)
arr[L++]=tmp&0xFF}else if(placeHolders===1){tmp=(revLookup[b64.charCodeAt(i)]<<10)|(revLookup[b64.charCodeAt(i+1)]<<4)|(revLookup[b64.charCodeAt(i+2)]>>2)
arr[L++]=(tmp>>8)&0xFF
arr[L++]=tmp&0xFF}
return arr}
function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F]}
function encodeChunk(uint8,start,end){var tmp
var output=[]
for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+(uint8[i+2])
output.push(tripletToBase64(tmp))}
return output.join('')}
function fromByteArray(uint8){var tmp
var len=uint8.length
var extraBytes=len%3
var output=''
var parts=[]
var maxChunkLength=16383
for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,(i+maxChunkLength)>len2?len2:(i+maxChunkLength)))}
if(extraBytes===1){tmp=uint8[len-1]
output+=lookup[tmp>>2]
output+=lookup[(tmp<<4)&0x3F]
output+='=='}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+(uint8[len-1])
output+=lookup[tmp>>10]
output+=lookup[(tmp>>4)&0x3F]
output+=lookup[(tmp<<2)&0x3F]
output+='='}
parts.push(output)
return parts.join('')}},{}],4:[function(require,module,exports){function BigInteger(a,b,c){if(!(this instanceof BigInteger))
return new BigInteger(a,b,c)
if(a!=null){if("number"==typeof a)this.fromNumber(a,b,c)
else if(b==null&&"string"!=typeof a)this.fromString(a,256)
else this.fromString(a,b)}}
var proto=BigInteger.prototype
proto.__bigi=require('../package.json').version
BigInteger.isBigInteger=function(obj,check_ver){return obj&&obj.__bigi&&(!check_ver||obj.__bigi===proto.__bigi)}
var dbits
function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c
c=Math.floor(v/0x4000000)
w[j++]=v&0x3ffffff}
return c}
function am2(i,x,w,j,c,n){var xl=x&0x7fff,xh=x>>15
while(--n>=0){var l=this[i]&0x7fff
var h=this[i++]>>15
var m=xh*l+h*xl
l=xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff)
c=(l>>>30)+(m>>>15)+xh*h+(c>>>30)
w[j++]=l&0x3fffffff}
return c}
function am3(i,x,w,j,c,n){var xl=x&0x3fff,xh=x>>14
while(--n>=0){var l=this[i]&0x3fff
var h=this[i++]>>14
var m=xh*l+h*xl
l=xl*l+((m&0x3fff)<<14)+w[j]+c
c=(l>>28)+(m>>14)+xh*h
w[j++]=l&0xfffffff}
return c}
BigInteger.prototype.am=am1
dbits=26
BigInteger.prototype.DB=dbits
BigInteger.prototype.DM=((1<<dbits)-1)
var DV=BigInteger.prototype.DV=(1<<dbits)
var BI_FP=52
BigInteger.prototype.FV=Math.pow(2,BI_FP)
BigInteger.prototype.F1=BI_FP-dbits
BigInteger.prototype.F2=2*dbits-BI_FP
var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz"
var BI_RC=new Array()
var rr,vv
rr="0".charCodeAt(0)
for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv
rr="a".charCodeAt(0)
for(vv=10;vv<36;++vv)BI_RC[rr++]=vv
rr="A".charCodeAt(0)
for(vv=10;vv<36;++vv)BI_RC[rr++]=vv
function int2char(n){return BI_RM.charAt(n)}
function intAt(s,i){var c=BI_RC[s.charCodeAt(i)]
return(c==null)?-1:c}
function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i]
r.t=this.t
r.s=this.s}
function bnpFromInt(x){this.t=1
this.s=(x<0)?-1:0
if(x>0)this[0]=x
else if(x<-1)this[0]=x+DV
else this.t=0}
function nbv(i){var r=new BigInteger()
r.fromInt(i)
return r}
function bnpFromString(s,b){var self=this
var k
if(b==16)k=4
else if(b==8)k=3
else if(b==256)k=8;else if(b==2)k=1
else if(b==32)k=5
else if(b==4)k=2
else{self.fromRadix(s,b)
return}
self.t=0
self.s=0
var i=s.length,mi=!1,sh=0
while(--i>=0){var x=(k==8)?s[i]&0xff:intAt(s,i)
if(x<0){if(s.charAt(i)=="-")mi=!0
continue}
mi=!1
if(sh==0)
self[self.t++]=x
else if(sh+k>self.DB){self[self.t-1]|=(x&((1<<(self.DB-sh))-1))<<sh
self[self.t++]=(x>>(self.DB-sh))}else self[self.t-1]|=x<<sh
sh+=k
if(sh>=self.DB)sh-=self.DB}
if(k==8&&(s[0]&0x80)!=0){self.s=-1
if(sh>0)self[self.t-1]|=((1<<(self.DB-sh))-1)<<sh}
self.clamp()
if(mi)BigInteger.ZERO.subTo(self,self)}
function bnpClamp(){var c=this.s&this.DM
while(this.t>0&&this[this.t-1]==c)--this.t}
function bnToString(b){var self=this
if(self.s<0)return"-"+self.negate().toString(b)
var k
if(b==16)k=4
else if(b==8)k=3
else if(b==2)k=1
else if(b==32)k=5
else if(b==4)k=2
else return self.toRadix(b)
var km=(1<<k)-1,d,m=!1,r="",i=self.t
var p=self.DB-(i*self.DB)%k
if(i-->0){if(p<self.DB&&(d=self[i]>>p)>0){m=!0
r=int2char(d)}
while(i>=0){if(p<k){d=(self[i]&((1<<p)-1))<<(k-p)
d|=self[--i]>>(p+=self.DB-k)}else{d=(self[i]>>(p-=k))&km
if(p<=0){p+=self.DB
--i}}
if(d>0)m=!0
if(m)r+=int2char(d)}}
return m?r:"0"}
function bnNegate(){var r=new BigInteger()
BigInteger.ZERO.subTo(this,r)
return r}
function bnAbs(){return(this.s<0)?this.negate():this}
function bnCompareTo(a){var r=this.s-a.s
if(r!=0)return r
var i=this.t
r=i-a.t
if(r!=0)return(this.s<0)?-r:r
while(--i>=0)
if((r=this[i]-a[i])!=0)return r
return 0}
function nbits(x){var r=1,t
if((t=x>>>16)!=0){x=t
r+=16}
if((t=x>>8)!=0){x=t
r+=8}
if((t=x>>4)!=0){x=t
r+=4}
if((t=x>>2)!=0){x=t
r+=2}
if((t=x>>1)!=0){x=t
r+=1}
return r}
function bnBitLength(){if(this.t<=0)return 0
return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM))}
function bnByteLength(){return this.bitLength()>>3}
function bnpDLShiftTo(n,r){var i
for(i=this.t-1;i>=0;--i)r[i+n]=this[i]
for(i=n-1;i>=0;--i)r[i]=0
r.t=this.t+n
r.s=this.s}
function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i]
r.t=Math.max(this.t-n,0)
r.s=this.s}
function bnpLShiftTo(n,r){var self=this
var bs=n%self.DB
var cbs=self.DB-bs
var bm=(1<<cbs)-1
var ds=Math.floor(n/self.DB),c=(self.s<<bs)&self.DM,i
for(i=self.t-1;i>=0;--i){r[i+ds+1]=(self[i]>>cbs)|c
c=(self[i]&bm)<<bs}
for(i=ds-1;i>=0;--i)r[i]=0
r[ds]=c
r.t=self.t+ds+1
r.s=self.s
r.clamp()}
function bnpRShiftTo(n,r){var self=this
r.s=self.s
var ds=Math.floor(n/self.DB)
if(ds>=self.t){r.t=0
return}
var bs=n%self.DB
var cbs=self.DB-bs
var bm=(1<<bs)-1
r[0]=self[ds]>>bs
for(var i=ds+1;i<self.t;++i){r[i-ds-1]|=(self[i]&bm)<<cbs
r[i-ds]=self[i]>>bs}
if(bs>0)r[self.t-ds-1]|=(self.s&bm)<<cbs
r.t=self.t-ds
r.clamp()}
function bnpSubTo(a,r){var self=this
var i=0,c=0,m=Math.min(a.t,self.t)
while(i<m){c+=self[i]-a[i]
r[i++]=c&self.DM
c>>=self.DB}
if(a.t<self.t){c-=a.s
while(i<self.t){c+=self[i]
r[i++]=c&self.DM
c>>=self.DB}
c+=self.s}else{c+=self.s
while(i<a.t){c-=a[i]
r[i++]=c&self.DM
c>>=self.DB}
c-=a.s}
r.s=(c<0)?-1:0
if(c<-1)r[i++]=self.DV+c
else if(c>0)r[i++]=c
r.t=i
r.clamp()}
function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs()
var i=x.t
r.t=i+y.t
while(--i>=0)r[i]=0
for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t)
r.s=0
r.clamp()
if(this.s!=a.s)BigInteger.ZERO.subTo(r,r)}
function bnpSquareTo(r){var x=this.abs()
var i=r.t=2*x.t
while(--i>=0)r[i]=0
for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1)
if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV
r[i+x.t+1]=1}}
if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)
r.s=0
r.clamp()}
function bnpDivRemTo(m,q,r){var self=this
var pm=m.abs()
if(pm.t<=0)return
var pt=self.abs()
if(pt.t<pm.t){if(q!=null)q.fromInt(0)
if(r!=null)self.copyTo(r)
return}
if(r==null)r=new BigInteger()
var y=new BigInteger(),ts=self.s,ms=m.s
var nsh=self.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y)
pt.lShiftTo(nsh,r)}else{pm.copyTo(y)
pt.copyTo(r)}
var ys=y.t
var y0=y[ys-1]
if(y0==0)return
var yt=y0*(1<<self.F1)+((ys>1)?y[ys-2]>>self.F2:0)
var d1=self.FV/yt,d2=(1<<self.F1)/yt,e=1<<self.F2
var i=r.t,j=i-ys,t=(q==null)?new BigInteger():q
y.dlShiftTo(j,t)
if(r.compareTo(t)>=0){r[r.t++]=1
r.subTo(t,r)}
BigInteger.ONE.dlShiftTo(ys,t)
t.subTo(y,y);while(y.t<ys)y[y.t++]=0
while(--j>=0){var qd=(r[--i]==y0)?self.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2)
if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t)
r.subTo(t,r)
while(r[i]<--qd)r.subTo(t,r)}}
if(q!=null){r.drShiftTo(ys,q)
if(ts!=ms)BigInteger.ZERO.subTo(q,q)}
r.t=ys
r.clamp()
if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r)}
function bnMod(a){var r=new BigInteger()
this.abs().divRemTo(a,null,r)
if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r)
return r}
function Classic(m){this.m=m}
function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m)
else return x}
function cRevert(x){return x}
function cReduce(x){x.divRemTo(this.m,null,x)}
function cMulTo(x,y,r){x.multiplyTo(y,r)
this.reduce(r)}
function cSqrTo(x,r){x.squareTo(r)
this.reduce(r)}
Classic.prototype.convert=cConvert
Classic.prototype.revert=cRevert
Classic.prototype.reduce=cReduce
Classic.prototype.mulTo=cMulTo
Classic.prototype.sqrTo=cSqrTo
function bnpInvDigit(){if(this.t<1)return 0
var x=this[0]
if((x&1)==0)return 0
var y=x&3;y=(y*(2-(x&0xf)*y))&0xf;y=(y*(2-(x&0xff)*y))&0xff;y=(y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;y=(y*(2-x*y%this.DV))%this.DV;return(y>0)?this.DV-y:-y}
function Montgomery(m){this.m=m
this.mp=m.invDigit()
this.mpl=this.mp&0x7fff
this.mph=this.mp>>15
this.um=(1<<(m.DB-15))-1
this.mt2=2*m.t}
function montConvert(x){var r=new BigInteger()
x.abs().dlShiftTo(this.m.t,r)
r.divRemTo(this.m,null,r)
if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r)
return r}
function montRevert(x){var r=new BigInteger()
x.copyTo(r)
this.reduce(r)
return r}
function montReduce(x){while(x.t<=this.mt2)
x[x.t++]=0
for(var i=0;i<this.m.t;++i){var j=x[i]&0x7fff
var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM
j=i+this.m.t
x[j]+=this.m.am(0,u0,x,i,0,this.m.t)
while(x[j]>=x.DV){x[j]-=x.DV
x[++j]++}}
x.clamp()
x.drShiftTo(this.m.t,x)
if(x.compareTo(this.m)>=0)x.subTo(this.m,x)}
function montSqrTo(x,r){x.squareTo(r)
this.reduce(r)}
function montMulTo(x,y,r){x.multiplyTo(y,r)
this.reduce(r)}
Montgomery.prototype.convert=montConvert
Montgomery.prototype.revert=montRevert
Montgomery.prototype.reduce=montReduce
Montgomery.prototype.mulTo=montMulTo
Montgomery.prototype.sqrTo=montSqrTo
function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0}
function bnpExp(e,z){if(e>0xffffffff||e<1)return BigInteger.ONE
var r=new BigInteger(),r2=new BigInteger(),g=z.convert(this),i=nbits(e)-1
g.copyTo(r)
while(--i>=0){z.sqrTo(r,r2)
if((e&(1<<i))>0)z.mulTo(r2,g,r)
else{var t=r
r=r2
r2=t}}
return z.revert(r)}
function bnModPowInt(e,m){var z
if(e<256||m.isEven())z=new Classic(m)
else z=new Montgomery(m)
return this.exp(e,z)}
proto.copyTo=bnpCopyTo
proto.fromInt=bnpFromInt
proto.fromString=bnpFromString
proto.clamp=bnpClamp
proto.dlShiftTo=bnpDLShiftTo
proto.drShiftTo=bnpDRShiftTo
proto.lShiftTo=bnpLShiftTo
proto.rShiftTo=bnpRShiftTo
proto.subTo=bnpSubTo
proto.multiplyTo=bnpMultiplyTo
proto.squareTo=bnpSquareTo
proto.divRemTo=bnpDivRemTo
proto.invDigit=bnpInvDigit
proto.isEven=bnpIsEven
proto.exp=bnpExp
proto.toString=bnToString
proto.negate=bnNegate
proto.abs=bnAbs
proto.compareTo=bnCompareTo
proto.bitLength=bnBitLength
proto.byteLength=bnByteLength
proto.mod=bnMod
proto.modPowInt=bnModPowInt
function bnClone(){var r=new BigInteger()
this.copyTo(r)
return r}
function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV
else if(this.t==0)return-1}else if(this.t==1)return this[0]
else if(this.t==0)return 0
return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]}
function bnByteValue(){return(this.t==0)?this.s:(this[0]<<24)>>24}
function bnShortValue(){return(this.t==0)?this.s:(this[0]<<16)>>16}
function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))}
function bnSigNum(){if(this.s<0)return-1
else if(this.t<=0||(this.t==1&&this[0]<=0))return 0
else return 1}
function bnpToRadix(b){if(b==null)b=10
if(this.signum()==0||b<2||b>36)return"0"
var cs=this.chunkSize(b)
var a=Math.pow(b,cs)
var d=nbv(a),y=new BigInteger(),z=new BigInteger(),r=""
this.divRemTo(d,y,z)
while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r
y.divRemTo(d,y,z)}
return z.intValue().toString(b)+r}
function bnpFromRadix(s,b){var self=this
self.fromInt(0)
if(b==null)b=10
var cs=self.chunkSize(b)
var d=Math.pow(b,cs),mi=!1,j=0,w=0
for(var i=0;i<s.length;++i){var x=intAt(s,i)
if(x<0){if(s.charAt(i)=="-"&&self.signum()==0)mi=!0
continue}
w=b*w+x
if(++j>=cs){self.dMultiply(d)
self.dAddOffset(w,0)
j=0
w=0}}
if(j>0){self.dMultiply(Math.pow(b,j))
self.dAddOffset(w,0)}
if(mi)BigInteger.ZERO.subTo(self,self)}
function bnpFromNumber(a,b,c){var self=this
if("number"==typeof b){if(a<2)self.fromInt(1)
else{self.fromNumber(a,c)
if(!self.testBit(a-1))
self.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,self)
if(self.isEven())self.dAddOffset(1,0);while(!self.isProbablePrime(b)){self.dAddOffset(2,0)
if(self.bitLength()>a)self.subTo(BigInteger.ONE.shiftLeft(a-1),self)}}}else{var x=new Array(),t=a&7
x.length=(a>>3)+1
b.nextBytes(x)
if(t>0)x[0]&=((1<<t)-1)
else x[0]=0
self.fromString(x,256)}}
function bnToByteArray(){var self=this
var i=self.t,r=new Array()
r[0]=self.s
var p=self.DB-(i*self.DB)%8,d,k=0
if(i-->0){if(p<self.DB&&(d=self[i]>>p)!=(self.s&self.DM)>>p)
r[k++]=d|(self.s<<(self.DB-p))
while(i>=0){if(p<8){d=(self[i]&((1<<p)-1))<<(8-p)
d|=self[--i]>>(p+=self.DB-8)}else{d=(self[i]>>(p-=8))&0xff
if(p<=0){p+=self.DB
--i}}
if((d&0x80)!=0)d|=-256
if(k===0&&(self.s&0x80)!=(d&0x80))++k
if(k>0||d!=self.s)r[k++]=d}}
return r}
function bnEquals(a){return(this.compareTo(a)==0)}
function bnMin(a){return(this.compareTo(a)<0)?this:a}
function bnMax(a){return(this.compareTo(a)>0)?this:a}
function bnpBitwiseTo(a,op,r){var self=this
var i,f,m=Math.min(a.t,self.t)
for(i=0;i<m;++i)r[i]=op(self[i],a[i])
if(a.t<self.t){f=a.s&self.DM
for(i=m;i<self.t;++i)r[i]=op(self[i],f)
r.t=self.t}else{f=self.s&self.DM
for(i=m;i<a.t;++i)r[i]=op(f,a[i])
r.t=a.t}
r.s=op(self.s,a.s)
r.clamp()}
function op_and(x,y){return x&y}
function bnAnd(a){var r=new BigInteger()
this.bitwiseTo(a,op_and,r)
return r}
function op_or(x,y){return x|y}
function bnOr(a){var r=new BigInteger()
this.bitwiseTo(a,op_or,r)
return r}
function op_xor(x,y){return x^y}
function bnXor(a){var r=new BigInteger()
this.bitwiseTo(a,op_xor,r)
return r}
function op_andnot(x,y){return x&~y}
function bnAndNot(a){var r=new BigInteger()
this.bitwiseTo(a,op_andnot,r)
return r}
function bnNot(){var r=new BigInteger()
for(var i=0;i<this.t;++i)r[i]=this.DM&~this[i]
r.t=this.t
r.s=~this.s
return r}
function bnShiftLeft(n){var r=new BigInteger()
if(n<0)this.rShiftTo(-n,r)
else this.lShiftTo(n,r)
return r}
function bnShiftRight(n){var r=new BigInteger()
if(n<0)this.lShiftTo(-n,r)
else this.rShiftTo(n,r)
return r}
function lbit(x){if(x==0)return-1
var r=0
if((x&0xffff)==0){x>>=16
r+=16}
if((x&0xff)==0){x>>=8
r+=8}
if((x&0xf)==0){x>>=4
r+=4}
if((x&3)==0){x>>=2
r+=2}
if((x&1)==0)++r
return r}
function bnGetLowestSetBit(){for(var i=0;i<this.t;++i)
if(this[i]!=0)return i*this.DB+lbit(this[i])
if(this.s<0)return this.t*this.DB
return-1}
function cbit(x){var r=0
while(x!=0){x&=x-1
++r}
return r}
function bnBitCount(){var r=0,x=this.s&this.DM
for(var i=0;i<this.t;++i)r+=cbit(this[i]^x)
return r}
function bnTestBit(n){var j=Math.floor(n/this.DB)
if(j>=this.t)return(this.s!=0)
return((this[j]&(1<<(n%this.DB)))!=0)}
function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n)
this.bitwiseTo(r,op,r)
return r}
function bnSetBit(n){return this.changeBit(n,op_or)}
function bnClearBit(n){return this.changeBit(n,op_andnot)}
function bnFlipBit(n){return this.changeBit(n,op_xor)}
function bnpAddTo(a,r){var self=this
var i=0,c=0,m=Math.min(a.t,self.t)
while(i<m){c+=self[i]+a[i]
r[i++]=c&self.DM
c>>=self.DB}
if(a.t<self.t){c+=a.s
while(i<self.t){c+=self[i]
r[i++]=c&self.DM
c>>=self.DB}
c+=self.s}else{c+=self.s
while(i<a.t){c+=a[i]
r[i++]=c&self.DM
c>>=self.DB}
c+=a.s}
r.s=(c<0)?-1:0
if(c>0)r[i++]=c
else if(c<-1)r[i++]=self.DV+c
r.t=i
r.clamp()}
function bnAdd(a){var r=new BigInteger()
this.addTo(a,r)
return r}
function bnSubtract(a){var r=new BigInteger()
this.subTo(a,r)
return r}
function bnMultiply(a){var r=new BigInteger()
this.multiplyTo(a,r)
return r}
function bnSquare(){var r=new BigInteger()
this.squareTo(r)
return r}
function bnDivide(a){var r=new BigInteger()
this.divRemTo(a,r,null)
return r}
function bnRemainder(a){var r=new BigInteger()
this.divRemTo(a,null,r)
return r}
function bnDivideAndRemainder(a){var q=new BigInteger(),r=new BigInteger()
this.divRemTo(a,q,r)
return new Array(q,r)}
function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t)
++this.t
this.clamp()}
function bnpDAddOffset(n,w){if(n==0)return
while(this.t<=w)this[this.t++]=0
this[w]+=n
while(this[w]>=this.DV){this[w]-=this.DV
if(++w>=this.t)this[this.t++]=0
++this[w]}}
function NullExp(){}
function nNop(x){return x}
function nMulTo(x,y,r){x.multiplyTo(y,r)}
function nSqrTo(x,r){x.squareTo(r)}
NullExp.prototype.convert=nNop
NullExp.prototype.revert=nNop
NullExp.prototype.mulTo=nMulTo
NullExp.prototype.sqrTo=nSqrTo
function bnPow(e){return this.exp(e,new NullExp())}
function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n)
r.s=0;r.t=i
while(i>0)r[--i]=0
var j
for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t)
for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i)
r.clamp()}
function bnpMultiplyUpperTo(a,n,r){--n
var i=r.t=this.t+a.t-n
r.s=0;while(--i>=0)r[i]=0
for(i=Math.max(n-this.t,0);i<a.t;++i)
r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n)
r.clamp()
r.drShiftTo(1,r)}
function Barrett(m){this.r2=new BigInteger()
this.q3=new BigInteger()
BigInteger.ONE.dlShiftTo(2*m.t,this.r2)
this.mu=this.r2.divide(m)
this.m=m}
function barrettConvert(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m)
else if(x.compareTo(this.m)<0)return x
else{var r=new BigInteger()
x.copyTo(r)
this.reduce(r)
return r}}
function barrettRevert(x){return x}
function barrettReduce(x){var self=this
x.drShiftTo(self.m.t-1,self.r2)
if(x.t>self.m.t+1){x.t=self.m.t+1
x.clamp()}
self.mu.multiplyUpperTo(self.r2,self.m.t+1,self.q3)
self.m.multiplyLowerTo(self.q3,self.m.t+1,self.r2)
while(x.compareTo(self.r2)<0)x.dAddOffset(1,self.m.t+1)
x.subTo(self.r2,x)
while(x.compareTo(self.m)>=0)x.subTo(self.m,x)}
function barrettSqrTo(x,r){x.squareTo(r)
this.reduce(r)}
function barrettMulTo(x,y,r){x.multiplyTo(y,r)
this.reduce(r)}
Barrett.prototype.convert=barrettConvert
Barrett.prototype.revert=barrettRevert
Barrett.prototype.reduce=barrettReduce
Barrett.prototype.mulTo=barrettMulTo
Barrett.prototype.sqrTo=barrettSqrTo
function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z
if(i<=0)return r
else if(i<18)k=1
else if(i<48)k=3
else if(i<144)k=4
else if(i<768)k=5
else k=6
if(i<8)
z=new Classic(m)
else if(m.isEven())
z=new Barrett(m)
else z=new Montgomery(m)
var g=new Array(),n=3,k1=k-1,km=(1<<k)-1
g[1]=z.convert(this)
if(k>1){var g2=new BigInteger()
z.sqrTo(g[1],g2)
while(n<=km){g[n]=new BigInteger()
z.mulTo(g2,g[n-2],g[n])
n+=2}}
var j=e.t-1,w,is1=!0,r2=new BigInteger(),t
i=nbits(e[j])-1
while(j>=0){if(i>=k1)w=(e[j]>>(i-k1))&km
else{w=(e[j]&((1<<(i+1))-1))<<(k1-i)
if(j>0)w|=e[j-1]>>(this.DB+i-k1)}
n=k
while((w&1)==0){w>>=1
--n}
if((i-=n)<0){i+=this.DB
--j}
if(is1){g[w].copyTo(r)
is1=!1}else{while(n>1){z.sqrTo(r,r2)
z.sqrTo(r2,r)
n-=2}
if(n>0)z.sqrTo(r,r2)
else{t=r
r=r2
r2=t}
z.mulTo(r2,g[w],r)}
while(j>=0&&(e[j]&(1<<i))==0){z.sqrTo(r,r2)
t=r
r=r2
r2=t
if(--i<0){i=this.DB-1
--j}}}
return z.revert(r)}
function bnGCD(a){var x=(this.s<0)?this.negate():this.clone()
var y=(a.s<0)?a.negate():a.clone()
if(x.compareTo(y)<0){var t=x
x=y
y=t}
var i=x.getLowestSetBit(),g=y.getLowestSetBit()
if(g<0)return x
if(i<g)g=i
if(g>0){x.rShiftTo(g,x)
y.rShiftTo(g,y)}
while(x.signum()>0){if((i=x.getLowestSetBit())>0)x.rShiftTo(i,x)
if((i=y.getLowestSetBit())>0)y.rShiftTo(i,y)
if(x.compareTo(y)>=0){x.subTo(y,x)
x.rShiftTo(1,x)}else{y.subTo(x,y)
y.rShiftTo(1,y)}}
if(g>0)y.lShiftTo(g,y)
return y}
function bnpModInt(n){if(n<=0)return 0
var d=this.DV%n,r=(this.s<0)?n-1:0
if(this.t>0)
if(d==0)r=this[0]%n
else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n
return r}
function bnModInverse(m){var ac=m.isEven()
if(this.signum()===0)throw new Error('division by zero')
if((this.isEven()&&ac)||m.signum()==0)return BigInteger.ZERO
var u=m.clone(),v=this.clone()
var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1)
while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u)
if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a)
b.subTo(m,b)}
a.rShiftTo(1,a)}else if(!b.isEven())b.subTo(m,b)
b.rShiftTo(1,b)}
while(v.isEven()){v.rShiftTo(1,v)
if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c)
d.subTo(m,d)}
c.rShiftTo(1,c)}else if(!d.isEven())d.subTo(m,d)
d.rShiftTo(1,d)}
if(u.compareTo(v)>=0){u.subTo(v,u)
if(ac)a.subTo(c,a)
b.subTo(d,b)}else{v.subTo(u,v)
if(ac)c.subTo(a,c)
d.subTo(b,d)}}
if(v.compareTo(BigInteger.ONE)!=0)return BigInteger.ZERO
while(d.compareTo(m)>=0)d.subTo(m,d)
while(d.signum()<0)d.addTo(m,d)
return d}
var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997]
var lplim=(1<<26)/lowprimes[lowprimes.length-1]
function bnIsProbablePrime(t){var i,x=this.abs()
if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)
if(x[0]==lowprimes[i])return!0
return!1}
if(x.isEven())return!1
i=1
while(i<lowprimes.length){var m=lowprimes[i],j=i+1
while(j<lowprimes.length&&m<lplim)m*=lowprimes[j++]
m=x.modInt(m)
while(i<j)if(m%lowprimes[i++]==0)return!1}
return x.millerRabin(t)}
function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE)
var k=n1.getLowestSetBit()
if(k<=0)return!1
var r=n1.shiftRight(k)
t=(t+1)>>1
if(t>lowprimes.length)t=lowprimes.length
var a=new BigInteger(null)
var j,bases=[]
for(var i=0;i<t;++i){for(;;){j=lowprimes[Math.floor(Math.random()*lowprimes.length)]
if(bases.indexOf(j)==-1)break}
bases.push(j)
a.fromInt(j)
var y=a.modPow(r,this)
if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1
while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this)
if(y.compareTo(BigInteger.ONE)==0)return!1}
if(y.compareTo(n1)!=0)return!1}}
return!0}
proto.chunkSize=bnpChunkSize
proto.toRadix=bnpToRadix
proto.fromRadix=bnpFromRadix
proto.fromNumber=bnpFromNumber
proto.bitwiseTo=bnpBitwiseTo
proto.changeBit=bnpChangeBit
proto.addTo=bnpAddTo
proto.dMultiply=bnpDMultiply
proto.dAddOffset=bnpDAddOffset
proto.multiplyLowerTo=bnpMultiplyLowerTo
proto.multiplyUpperTo=bnpMultiplyUpperTo
proto.modInt=bnpModInt
proto.millerRabin=bnpMillerRabin
proto.clone=bnClone
proto.intValue=bnIntValue
proto.byteValue=bnByteValue
proto.shortValue=bnShortValue
proto.signum=bnSigNum
proto.toByteArray=bnToByteArray
proto.equals=bnEquals
proto.min=bnMin
proto.max=bnMax
proto.and=bnAnd
proto.or=bnOr
proto.xor=bnXor
proto.andNot=bnAndNot
proto.not=bnNot
proto.shiftLeft=bnShiftLeft
proto.shiftRight=bnShiftRight
proto.getLowestSetBit=bnGetLowestSetBit
proto.bitCount=bnBitCount
proto.testBit=bnTestBit
proto.setBit=bnSetBit
proto.clearBit=bnClearBit
proto.flipBit=bnFlipBit
proto.add=bnAdd
proto.subtract=bnSubtract
proto.multiply=bnMultiply
proto.divide=bnDivide
proto.remainder=bnRemainder
proto.divideAndRemainder=bnDivideAndRemainder
proto.modPow=bnModPow
proto.modInverse=bnModInverse
proto.pow=bnPow
proto.gcd=bnGCD
proto.isProbablePrime=bnIsProbablePrime
proto.square=bnSquare
BigInteger.ZERO=nbv(0)
BigInteger.ONE=nbv(1)
BigInteger.valueOf=nbv
module.exports=BigInteger},{"../package.json":7}],5:[function(require,module,exports){(function(Buffer){var assert=require('assert')
var BigInteger=require('./bigi')
BigInteger.fromByteArrayUnsigned=function(byteArray){if(byteArray[0]&0x80){return new BigInteger([0].concat(byteArray))}
return new BigInteger(byteArray)}
BigInteger.prototype.toByteArrayUnsigned=function(){var byteArray=this.toByteArray()
return byteArray[0]===0?byteArray.slice(1):byteArray}
BigInteger.fromDERInteger=function(byteArray){return new BigInteger(byteArray)}
BigInteger.prototype.toDERInteger=BigInteger.prototype.toByteArray
BigInteger.fromBuffer=function(buffer){if(buffer[0]&0x80){var byteArray=Array.prototype.slice.call(buffer)
return new BigInteger([0].concat(byteArray))}
return new BigInteger(buffer)}
BigInteger.fromHex=function(hex){if(hex==='')return BigInteger.ZERO
assert.equal(hex,hex.match(/^[A-Fa-f0-9]+/),'Invalid hex string')
assert.equal(hex.length%2,0,'Incomplete hex')
return new BigInteger(hex,16)}
BigInteger.prototype.toBuffer=function(size){var byteArray=this.toByteArrayUnsigned()
var zeros=[]
var padding=size-byteArray.length
while(zeros.length<padding)zeros.push(0)
return new Buffer(zeros.concat(byteArray))}
BigInteger.prototype.toHex=function(size){return this.toBuffer(size).toString('hex')}}).call(this,require("buffer").Buffer)},{"./bigi":4,"assert":1,"buffer":27}],6:[function(require,module,exports){var BigInteger=require('./bigi')
require('./convert')
module.exports=BigInteger},{"./bigi":4,"./convert":5}],7:[function(require,module,exports){module.exports={"_args":[["bigi@1.4.2","/Users/bkawk/Documents/eusscc/eosjs-ecc"]],"_from":"bigi@1.4.2","_id":"bigi@1.4.2","_inBundle":!1,"_integrity":"sha1-nGZalfiLiwj8Bc/XMfVhhZ1yWCU=","_location":"/bigi","_phantomChildren":{},"_requested":{"type":"version","registry":!0,"raw":"bigi@1.4.2","name":"bigi","escapedName":"bigi","rawSpec":"1.4.2","saveSpec":null,"fetchSpec":"1.4.2"},"_requiredBy":["/","/ecurve"],"_resolved":"https://registry.npmjs.org/bigi/-/bigi-1.4.2.tgz","_spec":"1.4.2","_where":"/Users/bkawk/Documents/eusscc/eosjs-ecc","bugs":{"url":"https://github.com/cryptocoinjs/bigi/issues"},"dependencies":{},"description":"Big integers.","devDependencies":{"coveralls":"^2.11.2","istanbul":"^0.3.5","jshint":"^2.5.1","mocha":"^2.1.0","mochify":"^2.1.0"},"homepage":"https://github.com/cryptocoinjs/bigi#readme","keywords":["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],"main":"./lib/index.js","name":"bigi","repository":{"url":"git+https://github.com/cryptocoinjs/bigi.git","type":"git"},"scripts":{"browser-test":"mochify --wd -R spec","coverage":"istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js","coveralls":"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info","jshint":"jshint --config jshint.json lib/*.js ; true","test":"_mocha -- test/*.js","unit":"mocha"},"testling":{"files":"test/*.js","harness":"mocha","browsers":["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"]},"version":"1.4.2"}},{}],8:[function(require,module,exports){},{}],9:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
function asUInt32Array(buf){if(!Buffer.isBuffer(buf))buf=Buffer.from(buf)
var len=(buf.length/4)|0
var out=new Array(len)
for(var i=0;i<len;i++){out[i]=buf.readUInt32BE(i*4)}
return out}
function scrubVec(v){for(var i=0;i<v.length;v++){v[i]=0}}
function cryptBlock(M,keySchedule,SUB_MIX,SBOX,nRounds){var SUB_MIX0=SUB_MIX[0]
var SUB_MIX1=SUB_MIX[1]
var SUB_MIX2=SUB_MIX[2]
var SUB_MIX3=SUB_MIX[3]
var s0=M[0]^keySchedule[0]
var s1=M[1]^keySchedule[1]
var s2=M[2]^keySchedule[2]
var s3=M[3]^keySchedule[3]
var t0,t1,t2,t3
var ksRow=4
for(var round=1;round<nRounds;round++){t0=SUB_MIX0[s0>>>24]^SUB_MIX1[(s1>>>16)&0xff]^SUB_MIX2[(s2>>>8)&0xff]^SUB_MIX3[s3&0xff]^keySchedule[ksRow++]
t1=SUB_MIX0[s1>>>24]^SUB_MIX1[(s2>>>16)&0xff]^SUB_MIX2[(s3>>>8)&0xff]^SUB_MIX3[s0&0xff]^keySchedule[ksRow++]
t2=SUB_MIX0[s2>>>24]^SUB_MIX1[(s3>>>16)&0xff]^SUB_MIX2[(s0>>>8)&0xff]^SUB_MIX3[s1&0xff]^keySchedule[ksRow++]
t3=SUB_MIX0[s3>>>24]^SUB_MIX1[(s0>>>16)&0xff]^SUB_MIX2[(s1>>>8)&0xff]^SUB_MIX3[s2&0xff]^keySchedule[ksRow++]
s0=t0
s1=t1
s2=t2
s3=t3}
t0=((SBOX[s0>>>24]<<24)|(SBOX[(s1>>>16)&0xff]<<16)|(SBOX[(s2>>>8)&0xff]<<8)|SBOX[s3&0xff])^keySchedule[ksRow++]
t1=((SBOX[s1>>>24]<<24)|(SBOX[(s2>>>16)&0xff]<<16)|(SBOX[(s3>>>8)&0xff]<<8)|SBOX[s0&0xff])^keySchedule[ksRow++]
t2=((SBOX[s2>>>24]<<24)|(SBOX[(s3>>>16)&0xff]<<16)|(SBOX[(s0>>>8)&0xff]<<8)|SBOX[s1&0xff])^keySchedule[ksRow++]
t3=((SBOX[s3>>>24]<<24)|(SBOX[(s0>>>16)&0xff]<<16)|(SBOX[(s1>>>8)&0xff]<<8)|SBOX[s2&0xff])^keySchedule[ksRow++]
t0=t0>>>0
t1=t1>>>0
t2=t2>>>0
t3=t3>>>0
return[t0,t1,t2,t3]}
var RCON=[0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1b,0x36]
var G=(function(){var d=new Array(256)
for(var j=0;j<256;j++){if(j<128){d[j]=j<<1}else{d[j]=(j<<1)^0x11b}}
var SBOX=[]
var INV_SBOX=[]
var SUB_MIX=[[],[],[],[]]
var INV_SUB_MIX=[[],[],[],[]]
var x=0
var xi=0
for(var i=0;i<256;++i){var sx=xi^(xi<<1)^(xi<<2)^(xi<<3)^(xi<<4)
sx=(sx>>>8)^(sx&0xff)^0x63
SBOX[x]=sx
INV_SBOX[sx]=x
var x2=d[x]
var x4=d[x2]
var x8=d[x4]
var t=(d[sx]*0x101)^(sx*0x1010100)
SUB_MIX[0][x]=(t<<24)|(t>>>8)
SUB_MIX[1][x]=(t<<16)|(t>>>16)
SUB_MIX[2][x]=(t<<8)|(t>>>24)
SUB_MIX[3][x]=t
t=(x8*0x1010101)^(x4*0x10001)^(x2*0x101)^(x*0x1010100)
INV_SUB_MIX[0][sx]=(t<<24)|(t>>>8)
INV_SUB_MIX[1][sx]=(t<<16)|(t>>>16)
INV_SUB_MIX[2][sx]=(t<<8)|(t>>>24)
INV_SUB_MIX[3][sx]=t
if(x===0){x=xi=1}else{x=x2^d[d[d[x8^x2]]]
xi^=d[d[xi]]}}
return{SBOX:SBOX,INV_SBOX:INV_SBOX,SUB_MIX:SUB_MIX,INV_SUB_MIX:INV_SUB_MIX}})()
function AES(key){this._key=asUInt32Array(key)
this._reset()}
AES.blockSize=4*4
AES.keySize=256/8
AES.prototype.blockSize=AES.blockSize
AES.prototype.keySize=AES.keySize
AES.prototype._reset=function(){var keyWords=this._key
var keySize=keyWords.length
var nRounds=keySize+6
var ksRows=(nRounds+1)*4
var keySchedule=[]
for(var k=0;k<keySize;k++){keySchedule[k]=keyWords[k]}
for(k=keySize;k<ksRows;k++){var t=keySchedule[k-1]
if(k%keySize===0){t=(t<<8)|(t>>>24)
t=(G.SBOX[t>>>24]<<24)|(G.SBOX[(t>>>16)&0xff]<<16)|(G.SBOX[(t>>>8)&0xff]<<8)|(G.SBOX[t&0xff])
t^=RCON[(k/keySize)|0]<<24}else if(keySize>6&&k%keySize===4){t=(G.SBOX[t>>>24]<<24)|(G.SBOX[(t>>>16)&0xff]<<16)|(G.SBOX[(t>>>8)&0xff]<<8)|(G.SBOX[t&0xff])}
keySchedule[k]=keySchedule[k-keySize]^t}
var invKeySchedule=[]
for(var ik=0;ik<ksRows;ik++){var ksR=ksRows-ik
var tt=keySchedule[ksR-(ik%4?0:4)]
if(ik<4||ksR<=4){invKeySchedule[ik]=tt}else{invKeySchedule[ik]=G.INV_SUB_MIX[0][G.SBOX[tt>>>24]]^G.INV_SUB_MIX[1][G.SBOX[(tt>>>16)&0xff]]^G.INV_SUB_MIX[2][G.SBOX[(tt>>>8)&0xff]]^G.INV_SUB_MIX[3][G.SBOX[tt&0xff]]}}
this._nRounds=nRounds
this._keySchedule=keySchedule
this._invKeySchedule=invKeySchedule}
AES.prototype.encryptBlockRaw=function(M){M=asUInt32Array(M)
return cryptBlock(M,this._keySchedule,G.SUB_MIX,G.SBOX,this._nRounds)}
AES.prototype.encryptBlock=function(M){var out=this.encryptBlockRaw(M)
var buf=Buffer.allocUnsafe(16)
buf.writeUInt32BE(out[0],0)
buf.writeUInt32BE(out[1],4)
buf.writeUInt32BE(out[2],8)
buf.writeUInt32BE(out[3],12)
return buf}
AES.prototype.decryptBlock=function(M){M=asUInt32Array(M)
var m1=M[1]
M[1]=M[3]
M[3]=m1
var out=cryptBlock(M,this._invKeySchedule,G.INV_SUB_MIX,G.INV_SBOX,this._nRounds)
var buf=Buffer.allocUnsafe(16)
buf.writeUInt32BE(out[0],0)
buf.writeUInt32BE(out[3],4)
buf.writeUInt32BE(out[2],8)
buf.writeUInt32BE(out[1],12)
return buf}
AES.prototype.scrub=function(){scrubVec(this._keySchedule)
scrubVec(this._invKeySchedule)
scrubVec(this._key)}
module.exports.AES=AES},{"safe-buffer":68}],10:[function(require,module,exports){var aes=require('./aes')
var Buffer=require('safe-buffer').Buffer
var Transform=require('cipher-base')
var inherits=require('inherits')
var GHASH=require('./ghash')
var xor=require('buffer-xor')
function xorTest(a,b){var out=0
if(a.length!==b.length)out++
var len=Math.min(a.length,b.length)
for(var i=0;i<len;++i){out+=(a[i]^b[i])}
return out}
function StreamCipher(mode,key,iv,decrypt){Transform.call(this)
this._finID=Buffer.concat([iv,Buffer.from([0,0,0,1])])
iv=Buffer.concat([iv,Buffer.from([0,0,0,2])])
this._cipher=new aes.AES(key)
this._prev=Buffer.from(iv)
this._cache=Buffer.allocUnsafe(0)
this._secCache=Buffer.allocUnsafe(0)
this._decrypt=decrypt
this._alen=0
this._len=0
this._mode=mode
var h=Buffer.alloc(4,0)
this._ghash=new GHASH(this._cipher.encryptBlock(h))
this._authTag=null
this._called=!1}
inherits(StreamCipher,Transform)
StreamCipher.prototype._update=function(chunk){if(!this._called&&this._alen){var rump=16-(this._alen%16)
if(rump<16){rump=Buffer.alloc(rump,0)
this._ghash.update(rump)}}
this._called=!0
var out=this._mode.encrypt(this,chunk)
if(this._decrypt){this._ghash.update(chunk)}else{this._ghash.update(out)}
this._len+=chunk.length
return out}
StreamCipher.prototype._final=function(){if(this._decrypt&&!this._authTag)throw new Error('Unsupported state or unable to authenticate data')
var tag=xor(this._ghash.final(this._alen*8,this._len*8),this._cipher.encryptBlock(this._finID))
if(this._decrypt&&xorTest(tag,this._authTag))throw new Error('Unsupported state or unable to authenticate data')
this._authTag=tag
this._cipher.scrub()}
StreamCipher.prototype.getAuthTag=function getAuthTag(){if(this._decrypt||!Buffer.isBuffer(this._authTag))throw new Error('Attempting to get auth tag in unsupported state')
return this._authTag}
StreamCipher.prototype.setAuthTag=function setAuthTag(tag){if(!this._decrypt)throw new Error('Attempting to set auth tag in unsupported state')
this._authTag=tag}
StreamCipher.prototype.setAAD=function setAAD(buf){if(this._called)throw new Error('Attempting to set AAD in unsupported state')
this._ghash.update(buf)
this._alen+=buf.length}
module.exports=StreamCipher},{"./aes":9,"./ghash":14,"buffer-xor":26,"cipher-base":29,"inherits":45,"safe-buffer":68}],11:[function(require,module,exports){var ciphers=require('./encrypter')
var deciphers=require('./decrypter')
var modes=require('./modes/list.json')
function getCiphers(){return Object.keys(modes)}
exports.createCipher=exports.Cipher=ciphers.createCipher
exports.createCipheriv=exports.Cipheriv=ciphers.createCipheriv
exports.createDecipher=exports.Decipher=deciphers.createDecipher
exports.createDecipheriv=exports.Decipheriv=deciphers.createDecipheriv
exports.listCiphers=exports.getCiphers=getCiphers},{"./decrypter":12,"./encrypter":13,"./modes/list.json":22}],12:[function(require,module,exports){var AuthCipher=require('./authCipher')
var Buffer=require('safe-buffer').Buffer
var MODES=require('./modes')
var StreamCipher=require('./streamCipher')
var Transform=require('cipher-base')
var aes=require('./aes')
var ebtk=require('evp_bytestokey')
var inherits=require('inherits')
function Decipher(mode,key,iv){Transform.call(this)
this._cache=new Splitter()
this._last=void 0
this._cipher=new aes.AES(key)
this._prev=Buffer.from(iv)
this._mode=mode
this._autopadding=!0}
inherits(Decipher,Transform)
Decipher.prototype._update=function(data){this._cache.add(data)
var chunk
var thing
var out=[]
while((chunk=this._cache.get(this._autopadding))){thing=this._mode.decrypt(this,chunk)
out.push(thing)}
return Buffer.concat(out)}
Decipher.prototype._final=function(){var chunk=this._cache.flush()
if(this._autopadding){return unpad(this._mode.decrypt(this,chunk))}else if(chunk){throw new Error('data not multiple of block length')}}
Decipher.prototype.setAutoPadding=function(setTo){this._autopadding=!!setTo
return this}
function Splitter(){this.cache=Buffer.allocUnsafe(0)}
Splitter.prototype.add=function(data){this.cache=Buffer.concat([this.cache,data])}
Splitter.prototype.get=function(autoPadding){var out
if(autoPadding){if(this.cache.length>16){out=this.cache.slice(0,16)
this.cache=this.cache.slice(16)
return out}}else{if(this.cache.length>=16){out=this.cache.slice(0,16)
this.cache=this.cache.slice(16)
return out}}
return null}
Splitter.prototype.flush=function(){if(this.cache.length)return this.cache}
function unpad(last){var padded=last[15]
var i=-1
while(++i<padded){if(last[(i+(16-padded))]!==padded){throw new Error('unable to decrypt data')}}
if(padded===16)return
return last.slice(0,16-padded)}
function createDecipheriv(suite,password,iv){var config=MODES[suite.toLowerCase()]
if(!config)throw new TypeError('invalid suite type')
if(typeof iv==='string')iv=Buffer.from(iv)
if(iv.length!==config.iv)throw new TypeError('invalid iv length '+iv.length)
if(typeof password==='string')password=Buffer.from(password)
if(password.length!==config.key/8)throw new TypeError('invalid key length '+password.length)
if(config.type==='stream'){return new StreamCipher(config.module,password,iv,!0)}else if(config.type==='auth'){return new AuthCipher(config.module,password,iv,!0)}
return new Decipher(config.module,password,iv)}
function createDecipher(suite,password){var config=MODES[suite.toLowerCase()]
if(!config)throw new TypeError('invalid suite type')
var keys=ebtk(password,!1,config.key,config.iv)
return createDecipheriv(suite,keys.key,keys.iv)}
exports.createDecipher=createDecipher
exports.createDecipheriv=createDecipheriv},{"./aes":9,"./authCipher":10,"./modes":21,"./streamCipher":24,"cipher-base":29,"evp_bytestokey":42,"inherits":45,"safe-buffer":68}],13:[function(require,module,exports){var MODES=require('./modes')
var AuthCipher=require('./authCipher')
var Buffer=require('safe-buffer').Buffer
var StreamCipher=require('./streamCipher')
var Transform=require('cipher-base')
var aes=require('./aes')
var ebtk=require('evp_bytestokey')
var inherits=require('inherits')
function Cipher(mode,key,iv){Transform.call(this)
this._cache=new Splitter()
this._cipher=new aes.AES(key)
this._prev=Buffer.from(iv)
this._mode=mode
this._autopadding=!0}
inherits(Cipher,Transform)
Cipher.prototype._update=function(data){this._cache.add(data)
var chunk
var thing
var out=[]
while((chunk=this._cache.get())){thing=this._mode.encrypt(this,chunk)
out.push(thing)}
return Buffer.concat(out)}
var PADDING=Buffer.alloc(16,0x10)
Cipher.prototype._final=function(){var chunk=this._cache.flush()
if(this._autopadding){chunk=this._mode.encrypt(this,chunk)
this._cipher.scrub()
return chunk}
if(!chunk.equals(PADDING)){this._cipher.scrub()
throw new Error('data not multiple of block length')}}
Cipher.prototype.setAutoPadding=function(setTo){this._autopadding=!!setTo
return this}
function Splitter(){this.cache=Buffer.allocUnsafe(0)}
Splitter.prototype.add=function(data){this.cache=Buffer.concat([this.cache,data])}
Splitter.prototype.get=function(){if(this.cache.length>15){var out=this.cache.slice(0,16)
this.cache=this.cache.slice(16)
return out}
return null}
Splitter.prototype.flush=function(){var len=16-this.cache.length
var padBuff=Buffer.allocUnsafe(len)
var i=-1
while(++i<len){padBuff.writeUInt8(len,i)}
return Buffer.concat([this.cache,padBuff])}
function createCipheriv(suite,password,iv){var config=MODES[suite.toLowerCase()]
if(!config)throw new TypeError('invalid suite type')
if(typeof password==='string')password=Buffer.from(password)
if(password.length!==config.key/8)throw new TypeError('invalid key length '+password.length)
if(typeof iv==='string')iv=Buffer.from(iv)
if(iv.length!==config.iv)throw new TypeError('invalid iv length '+iv.length)
if(config.type==='stream'){return new StreamCipher(config.module,password,iv)}else if(config.type==='auth'){return new AuthCipher(config.module,password,iv)}
return new Cipher(config.module,password,iv)}
function createCipher(suite,password){var config=MODES[suite.toLowerCase()]
if(!config)throw new TypeError('invalid suite type')
var keys=ebtk(password,!1,config.key,config.iv)
return createCipheriv(suite,keys.key,keys.iv)}
exports.createCipheriv=createCipheriv
exports.createCipher=createCipher},{"./aes":9,"./authCipher":10,"./modes":21,"./streamCipher":24,"cipher-base":29,"evp_bytestokey":42,"inherits":45,"safe-buffer":68}],14:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
var ZEROES=Buffer.alloc(16,0)
function toArray(buf){return[buf.readUInt32BE(0),buf.readUInt32BE(4),buf.readUInt32BE(8),buf.readUInt32BE(12)]}
function fromArray(out){var buf=Buffer.allocUnsafe(16)
buf.writeUInt32BE(out[0]>>>0,0)
buf.writeUInt32BE(out[1]>>>0,4)
buf.writeUInt32BE(out[2]>>>0,8)
buf.writeUInt32BE(out[3]>>>0,12)
return buf}
function GHASH(key){this.h=key
this.state=Buffer.alloc(16,0)
this.cache=Buffer.allocUnsafe(0)}
GHASH.prototype.ghash=function(block){var i=-1
while(++i<block.length){this.state[i]^=block[i]}
this._multiply()}
GHASH.prototype._multiply=function(){var Vi=toArray(this.h)
var Zi=[0,0,0,0]
var j,xi,lsbVi
var i=-1
while(++i<128){xi=(this.state[~~(i/8)]&(1<<(7-(i%8))))!==0
if(xi){Zi[0]^=Vi[0]
Zi[1]^=Vi[1]
Zi[2]^=Vi[2]
Zi[3]^=Vi[3]}
lsbVi=(Vi[3]&1)!==0
for(j=3;j>0;j--){Vi[j]=(Vi[j]>>>1)|((Vi[j-1]&1)<<31)}
Vi[0]=Vi[0]>>>1
if(lsbVi){Vi[0]=Vi[0]^(0xe1<<24)}}
this.state=fromArray(Zi)}
GHASH.prototype.update=function(buf){this.cache=Buffer.concat([this.cache,buf])
var chunk
while(this.cache.length>=16){chunk=this.cache.slice(0,16)
this.cache=this.cache.slice(16)
this.ghash(chunk)}}
GHASH.prototype.final=function(abl,bl){if(this.cache.length){this.ghash(Buffer.concat([this.cache,ZEROES],16))}
this.ghash(fromArray([0,abl,0,bl]))
return this.state}
module.exports=GHASH},{"safe-buffer":68}],15:[function(require,module,exports){var xor=require('buffer-xor')
exports.encrypt=function(self,block){var data=xor(block,self._prev)
self._prev=self._cipher.encryptBlock(data)
return self._prev}
exports.decrypt=function(self,block){var pad=self._prev
self._prev=block
var out=self._cipher.decryptBlock(block)
return xor(out,pad)}},{"buffer-xor":26}],16:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
var xor=require('buffer-xor')
function encryptStart(self,data,decrypt){var len=data.length
var out=xor(data,self._cache)
self._cache=self._cache.slice(len)
self._prev=Buffer.concat([self._prev,decrypt?data:out])
return out}
exports.encrypt=function(self,data,decrypt){var out=Buffer.allocUnsafe(0)
var len
while(data.length){if(self._cache.length===0){self._cache=self._cipher.encryptBlock(self._prev)
self._prev=Buffer.allocUnsafe(0)}
if(self._cache.length<=data.length){len=self._cache.length
out=Buffer.concat([out,encryptStart(self,data.slice(0,len),decrypt)])
data=data.slice(len)}else{out=Buffer.concat([out,encryptStart(self,data,decrypt)])
break}}
return out}},{"buffer-xor":26,"safe-buffer":68}],17:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
function encryptByte(self,byteParam,decrypt){var pad
var i=-1
var len=8
var out=0
var bit,value
while(++i<len){pad=self._cipher.encryptBlock(self._prev)
bit=(byteParam&(1<<(7-i)))?0x80:0
value=pad[0]^bit
out+=((value&0x80)>>(i%8))
self._prev=shiftIn(self._prev,decrypt?bit:value)}
return out}
function shiftIn(buffer,value){var len=buffer.length
var i=-1
var out=Buffer.allocUnsafe(buffer.length)
buffer=Buffer.concat([buffer,Buffer.from([value])])
while(++i<len){out[i]=buffer[i]<<1|buffer[i+1]>>(7)}
return out}
exports.encrypt=function(self,chunk,decrypt){var len=chunk.length
var out=Buffer.allocUnsafe(len)
var i=-1
while(++i<len){out[i]=encryptByte(self,chunk[i],decrypt)}
return out}},{"safe-buffer":68}],18:[function(require,module,exports){(function(Buffer){function encryptByte(self,byteParam,decrypt){var pad=self._cipher.encryptBlock(self._prev)
var out=pad[0]^byteParam
self._prev=Buffer.concat([self._prev.slice(1),Buffer.from([decrypt?byteParam:out])])
return out}
exports.encrypt=function(self,chunk,decrypt){var len=chunk.length
var out=Buffer.allocUnsafe(len)
var i=-1
while(++i<len){out[i]=encryptByte(self,chunk[i],decrypt)}
return out}}).call(this,require("buffer").Buffer)},{"buffer":27}],19:[function(require,module,exports){(function(Buffer){var xor=require('buffer-xor')
function incr32(iv){var len=iv.length
var item
while(len--){item=iv.readUInt8(len)
if(item===255){iv.writeUInt8(0,len)}else{item++
iv.writeUInt8(item,len)
break}}}
function getBlock(self){var out=self._cipher.encryptBlockRaw(self._prev)
incr32(self._prev)
return out}
var blockSize=16
exports.encrypt=function(self,chunk){var chunkNum=Math.ceil(chunk.length/blockSize)
var start=self._cache.length
self._cache=Buffer.concat([self._cache,Buffer.allocUnsafe(chunkNum*blockSize)])
for(var i=0;i<chunkNum;i++){var out=getBlock(self)
var offset=start+i*blockSize
self._cache.writeUInt32BE(out[0],offset+0)
self._cache.writeUInt32BE(out[1],offset+4)
self._cache.writeUInt32BE(out[2],offset+8)
self._cache.writeUInt32BE(out[3],offset+12)}
var pad=self._cache.slice(0,chunk.length)
self._cache=self._cache.slice(chunk.length)
return xor(chunk,pad)}}).call(this,require("buffer").Buffer)},{"buffer":27,"buffer-xor":26}],20:[function(require,module,exports){exports.encrypt=function(self,block){return self._cipher.encryptBlock(block)}
exports.decrypt=function(self,block){return self._cipher.decryptBlock(block)}},{}],21:[function(require,module,exports){var modeModules={ECB:require('./ecb'),CBC:require('./cbc'),CFB:require('./cfb'),CFB8:require('./cfb8'),CFB1:require('./cfb1'),OFB:require('./ofb'),CTR:require('./ctr'),GCM:require('./ctr')}
var modes=require('./list.json')
for(var key in modes){modes[key].module=modeModules[modes[key].mode]}
module.exports=modes},{"./cbc":15,"./cfb":16,"./cfb1":17,"./cfb8":18,"./ctr":19,"./ecb":20,"./list.json":22,"./ofb":23}],22:[function(require,module,exports){module.exports={"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}},{}],23:[function(require,module,exports){(function(Buffer){var xor=require('buffer-xor')
function getBlock(self){self._prev=self._cipher.encryptBlock(self._prev)
return self._prev}
exports.encrypt=function(self,chunk){while(self._cache.length<chunk.length){self._cache=Buffer.concat([self._cache,getBlock(self)])}
var pad=self._cache.slice(0,chunk.length)
self._cache=self._cache.slice(chunk.length)
return xor(chunk,pad)}}).call(this,require("buffer").Buffer)},{"buffer":27,"buffer-xor":26}],24:[function(require,module,exports){var aes=require('./aes')
var Buffer=require('safe-buffer').Buffer
var Transform=require('cipher-base')
var inherits=require('inherits')
function StreamCipher(mode,key,iv,decrypt){Transform.call(this)
this._cipher=new aes.AES(key)
this._prev=Buffer.from(iv)
this._cache=Buffer.allocUnsafe(0)
this._secCache=Buffer.allocUnsafe(0)
this._decrypt=decrypt
this._mode=mode}
inherits(StreamCipher,Transform)
StreamCipher.prototype._update=function(chunk){return this._mode.encrypt(this,chunk,this._decrypt)}
StreamCipher.prototype._final=function(){this._cipher.scrub()}
module.exports=StreamCipher},{"./aes":9,"cipher-base":29,"inherits":45,"safe-buffer":68}],25:[function(require,module,exports){var basex=require('base-x')
var ALPHABET='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
module.exports=basex(ALPHABET)},{"base-x":2}],26:[function(require,module,exports){(function(Buffer){module.exports=function xor(a,b){var length=Math.min(a.length,b.length)
var buffer=new Buffer(length)
for(var i=0;i<length;++i){buffer[i]=a[i]^b[i]}
return buffer}}).call(this,require("buffer").Buffer)},{"buffer":27}],27:[function(require,module,exports){'use strict'
var base64=require('base64-js')
var ieee754=require('ieee754')
exports.Buffer=Buffer
exports.SlowBuffer=SlowBuffer
exports.INSPECT_MAX_BYTES=50
var K_MAX_LENGTH=0x7fffffff
exports.kMaxLength=K_MAX_LENGTH
Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport()
if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=='undefined'&&typeof console.error==='function'){console.error('This browser lacks typed array (Uint8Array) support which is required by '+'`buffer` v5.x. Use `buffer` v4.x if you require old browser support.')}
function typedArraySupport(){try{var arr=new Uint8Array(1)
arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}}
return arr.foo()===42}catch(e){return!1}}
function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError('Invalid typed array length')}
var buf=new Uint8Array(length)
buf.__proto__=Buffer.prototype
return buf}
function Buffer(arg,encodingOrOffset,length){if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new Error('If encoding is specified then the first argument must be a string')}
return allocUnsafe(arg)}
return from(arg,encodingOrOffset,length)}
if(typeof Symbol!=='undefined'&&Symbol.species&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})}
Buffer.poolSize=8192
function from(value,encodingOrOffset,length){if(typeof value==='number'){throw new TypeError('"value" argument must not be a number')}
if(isArrayBuffer(value)){return fromArrayBuffer(value,encodingOrOffset,length)}
if(typeof value==='string'){return fromString(value,encodingOrOffset)}
return fromObject(value)}
Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)}
Buffer.prototype.__proto__=Uint8Array.prototype
Buffer.__proto__=Uint8Array
function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be a number')}else if(size<0){throw new RangeError('"size" argument must not be negative')}}
function alloc(size,fill,encoding){assertSize(size)
if(size<=0){return createBuffer(size)}
if(fill!==undefined){return typeof encoding==='string'?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill)}
return createBuffer(size)}
Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding)}
function allocUnsafe(size){assertSize(size)
return createBuffer(size<0?0:checked(size)|0)}
Buffer.allocUnsafe=function(size){return allocUnsafe(size)}
Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)}
function fromString(string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8'}
if(!Buffer.isEncoding(encoding)){throw new TypeError('"encoding" must be a valid string encoding')}
var length=byteLength(string,encoding)|0
var buf=createBuffer(length)
var actual=buf.write(string,encoding)
if(actual!==length){buf=buf.slice(0,actual)}
return buf}
function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0
var buf=createBuffer(length)
for(var i=0;i<length;i+=1){buf[i]=array[i]&255}
return buf}
function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('\'offset\' is out of bounds')}
if(array.byteLength<byteOffset+(length||0)){throw new RangeError('\'length\' is out of bounds')}
var buf
if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array)}else if(length===undefined){buf=new Uint8Array(array,byteOffset)}else{buf=new Uint8Array(array,byteOffset,length)}
buf.__proto__=Buffer.prototype
return buf}
function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0
var buf=createBuffer(len)
if(buf.length===0){return buf}
obj.copy(buf,0,0,len)
return buf}
if(obj){if(isArrayBufferView(obj)||'length' in obj){if(typeof obj.length!=='number'||numberIsNaN(obj.length)){return createBuffer(0)}
return fromArrayLike(obj)}
if(obj.type==='Buffer'&&Array.isArray(obj.data)){return fromArrayLike(obj.data)}}
throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')}
function checked(length){if(length>=K_MAX_LENGTH){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+K_MAX_LENGTH.toString(16)+' bytes')}
return length|0}
function SlowBuffer(length){if(+length!=length){length=0}
return Buffer.alloc(+length)}
Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===!0}
Buffer.compare=function compare(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('Arguments must be Buffers')}
if(a===b)return 0
var x=a.length
var y=b.length
for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i]
y=b[i]
break}}
if(x<y)return-1
if(y<x)return 1
return 0}
Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'latin1':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':return!0
default:return!1}}
Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers')}
if(list.length===0){return Buffer.alloc(0)}
var i
if(length===undefined){length=0
for(i=0;i<list.length;++i){length+=list[i].length}}
var buffer=Buffer.allocUnsafe(length)
var pos=0
for(i=0;i<list.length;++i){var buf=list[i]
if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers')}
buf.copy(buffer,pos)
pos+=buf.length}
return buffer}
function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length}
if(isArrayBufferView(string)||isArrayBuffer(string)){return string.byteLength}
if(typeof string!=='string'){string=''+string}
var len=string.length
if(len===0)return 0
var loweredCase=!1
for(;;){switch(encoding){case 'ascii':case 'latin1':case 'binary':return len
case 'utf8':case 'utf-8':case undefined:return utf8ToBytes(string).length
case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':return len*2
case 'hex':return len>>>1
case 'base64':return base64ToBytes(string).length
default:if(loweredCase)return utf8ToBytes(string).length
encoding=(''+encoding).toLowerCase()
loweredCase=!0}}}
Buffer.byteLength=byteLength
function slowToString(encoding,start,end){var loweredCase=!1
if(start===undefined||start<0){start=0}
if(start>this.length){return''}
if(end===undefined||end>this.length){end=this.length}
if(end<=0){return''}
end>>>=0
start>>>=0
if(end<=start){return''}
if(!encoding)encoding='utf8'
while(!0){switch(encoding){case 'hex':return hexSlice(this,start,end)
case 'utf8':case 'utf-8':return utf8Slice(this,start,end)
case 'ascii':return asciiSlice(this,start,end)
case 'latin1':case 'binary':return latin1Slice(this,start,end)
case 'base64':return base64Slice(this,start,end)
case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':return utf16leSlice(this,start,end)
default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding)
encoding=(encoding+'').toLowerCase()
loweredCase=!0}}}
Buffer.prototype._isBuffer=!0
function swap(b,n,m){var i=b[n]
b[n]=b[m]
b[m]=i}
Buffer.prototype.swap16=function swap16(){var len=this.length
if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits')}
for(var i=0;i<len;i+=2){swap(this,i,i+1)}
return this}
Buffer.prototype.swap32=function swap32(){var len=this.length
if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits')}
for(var i=0;i<len;i+=4){swap(this,i,i+3)
swap(this,i+1,i+2)}
return this}
Buffer.prototype.swap64=function swap64(){var len=this.length
if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits')}
for(var i=0;i<len;i+=8){swap(this,i,i+7)
swap(this,i+1,i+6)
swap(this,i+2,i+5)
swap(this,i+3,i+4)}
return this}
Buffer.prototype.toString=function toString(){var length=this.length
if(length===0)return''
if(arguments.length===0)return utf8Slice(this,0,length)
return slowToString.apply(this,arguments)}
Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer')
if(this===b)return!0
return Buffer.compare(this,b)===0}
Buffer.prototype.inspect=function inspect(){var str=''
var max=exports.INSPECT_MAX_BYTES
if(this.length>0){str=this.toString('hex',0,max).match(/.{2}/g).join(' ')
if(this.length>max)str+=' ... '}
return'<Buffer '+str+'>'}
Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target)){throw new TypeError('Argument must be a Buffer')}
if(start===undefined){start=0}
if(end===undefined){end=target?target.length:0}
if(thisStart===undefined){thisStart=0}
if(thisEnd===undefined){thisEnd=this.length}
if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index')}
if(thisStart>=thisEnd&&start>=end){return 0}
if(thisStart>=thisEnd){return-1}
if(start>=end){return 1}
start>>>=0
end>>>=0
thisStart>>>=0
thisEnd>>>=0
if(this===target)return 0
var x=thisEnd-thisStart
var y=end-start
var len=Math.min(x,y)
var thisCopy=this.slice(thisStart,thisEnd)
var targetCopy=target.slice(start,end)
for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i]
y=targetCopy[i]
break}}
if(x<y)return-1
if(y<x)return 1
return 0}
function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(buffer.length===0)return-1
if(typeof byteOffset==='string'){encoding=byteOffset
byteOffset=0}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff}else if(byteOffset<-0x80000000){byteOffset=-0x80000000}
byteOffset=+byteOffset
if(numberIsNaN(byteOffset)){byteOffset=dir?0:(buffer.length-1)}
if(byteOffset<0)byteOffset=buffer.length+byteOffset
if(byteOffset>=buffer.length){if(dir)return-1
else byteOffset=buffer.length-1}else if(byteOffset<0){if(dir)byteOffset=0
else return-1}
if(typeof val==='string'){val=Buffer.from(val,encoding)}
if(Buffer.isBuffer(val)){if(val.length===0){return-1}
return arrayIndexOf(buffer,val,byteOffset,encoding,dir)}else if(typeof val==='number'){val=val&0xFF
if(typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset)}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset)}}
return arrayIndexOf(buffer,[val],byteOffset,encoding,dir)}
throw new TypeError('val must be string, number or Buffer')}
function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1
var arrLength=arr.length
var valLength=val.length
if(encoding!==undefined){encoding=String(encoding).toLowerCase()
if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1}
indexSize=2
arrLength/=2
valLength/=2
byteOffset/=2}}
function read(buf,i){if(indexSize===1){return buf[i]}else{return buf.readUInt16BE(i*indexSize)}}
var i
if(dir){var foundIndex=-1
for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i
if(i-foundIndex+1===valLength)return foundIndex*indexSize}else{if(foundIndex!==-1)i-=i-foundIndex
foundIndex=-1}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength
for(i=byteOffset;i>=0;i--){var found=!0
for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=!1
break}}
if(found)return i}}
return-1}
Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1}
Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!0)}
Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!1)}
function hexWrite(buf,string,offset,length){offset=Number(offset)||0
var remaining=buf.length-offset
if(!length){length=remaining}else{length=Number(length)
if(length>remaining){length=remaining}}
var strLen=string.length
if(strLen%2!==0)throw new TypeError('Invalid hex string')
if(length>strLen/2){length=strLen/2}
for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16)
if(numberIsNaN(parsed))return i
buf[offset+i]=parsed}
return i}
function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}
function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}
function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}
function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}
function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}
Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding='utf8'
length=this.length
offset=0}else if(length===undefined&&typeof offset==='string'){encoding=offset
length=this.length
offset=0}else if(isFinite(offset)){offset=offset>>>0
if(isFinite(length)){length=length>>>0
if(encoding===undefined)encoding='utf8'}else{encoding=length
length=undefined}}else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')}
var remaining=this.length-offset
if(length===undefined||length>remaining)length=remaining
if((string.length>0&&(length<0||offset<0))||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds')}
if(!encoding)encoding='utf8'
var loweredCase=!1
for(;;){switch(encoding){case 'hex':return hexWrite(this,string,offset,length)
case 'utf8':case 'utf-8':return utf8Write(this,string,offset,length)
case 'ascii':return asciiWrite(this,string,offset,length)
case 'latin1':case 'binary':return latin1Write(this,string,offset,length)
case 'base64':return base64Write(this,string,offset,length)
case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':return ucs2Write(this,string,offset,length)
default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding)
encoding=(''+encoding).toLowerCase()
loweredCase=!0}}}
Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)}}
function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else{return base64.fromByteArray(buf.slice(start,end))}}
function utf8Slice(buf,start,end){end=Math.min(buf.length,end)
var res=[]
var i=start
while(i<end){var firstByte=buf[i]
var codePoint=null
var bytesPerSequence=(firstByte>0xEF)?4:(firstByte>0xDF)?3:(firstByte>0xBF)?2:1
if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint
switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte}
break
case 2:secondByte=buf[i+1]
if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|(secondByte&0x3F)
if(tempCodePoint>0x7F){codePoint=tempCodePoint}}
break
case 3:secondByte=buf[i+1]
thirdByte=buf[i+2]
if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|(thirdByte&0x3F)
if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint}}
break
case 4:secondByte=buf[i+1]
thirdByte=buf[i+2]
fourthByte=buf[i+3]
if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|(fourthByte&0x3F)
if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint}}}}
if(codePoint===null){codePoint=0xFFFD
bytesPerSequence=1}else if(codePoint>0xFFFF){codePoint-=0x10000
res.push(codePoint>>>10&0x3FF|0xD800)
codePoint=0xDC00|codePoint&0x3FF}
res.push(codePoint)
i+=bytesPerSequence}
return decodeCodePointsArray(res)}
var MAX_ARGUMENTS_LENGTH=0x1000
function decodeCodePointsArray(codePoints){var len=codePoints.length
if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}
var res=''
var i=0
while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH))}
return res}
function asciiSlice(buf,start,end){var ret=''
end=Math.min(buf.length,end)
for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F)}
return ret}
function latin1Slice(buf,start,end){var ret=''
end=Math.min(buf.length,end)
for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i])}
return ret}
function hexSlice(buf,start,end){var len=buf.length
if(!start||start<0)start=0
if(!end||end<0||end>len)end=len
var out=''
for(var i=start;i<end;++i){out+=toHex(buf[i])}
return out}
function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end)
var res=''
for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+(bytes[i+1]*256))}
return res}
Buffer.prototype.slice=function slice(start,end){var len=this.length
start=~~start
end=end===undefined?len:~~end
if(start<0){start+=len
if(start<0)start=0}else if(start>len){start=len}
if(end<0){end+=len
if(end<0)end=0}else if(end>len){end=len}
if(end<start)end=start
var newBuf=this.subarray(start,end)
newBuf.__proto__=Buffer.prototype
return newBuf}
function checkOffset(offset,ext,length){if((offset%1)!==0||offset<0)throw new RangeError('offset is not uint')
if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length')}
Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert)checkOffset(offset,byteLength,this.length)
var val=this[offset]
var mul=1
var i=0
while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul}
return val}
Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert){checkOffset(offset,byteLength,this.length)}
var val=this[offset+ --byteLength]
var mul=1
while(byteLength>0&&(mul*=0x100)){val+=this[offset+ --byteLength]*mul}
return val}
Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,1,this.length)
return this[offset]}
Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,2,this.length)
return this[offset]|(this[offset+1]<<8)}
Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,2,this.length)
return(this[offset]<<8)|this[offset+1]}
Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return((this[offset])|(this[offset+1]<<8)|(this[offset+2]<<16))+(this[offset+3]*0x1000000)}
Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return(this[offset]*0x1000000)+((this[offset+1]<<16)|(this[offset+2]<<8)|this[offset+3])}
Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert)checkOffset(offset,byteLength,this.length)
var val=this[offset]
var mul=1
var i=0
while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul}
mul*=0x80
if(val>=mul)val-=Math.pow(2,8*byteLength)
return val}
Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert)checkOffset(offset,byteLength,this.length)
var i=byteLength
var mul=1
var val=this[offset+ --i]
while(i>0&&(mul*=0x100)){val+=this[offset+ --i]*mul}
mul*=0x80
if(val>=mul)val-=Math.pow(2,8*byteLength)
return val}
Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,1,this.length)
if(!(this[offset]&0x80))return(this[offset])
return((0xff-this[offset]+1)*-1)}
Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,2,this.length)
var val=this[offset]|(this[offset+1]<<8)
return(val&0x8000)?val|0xFFFF0000:val}
Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,2,this.length)
var val=this[offset+1]|(this[offset]<<8)
return(val&0x8000)?val|0xFFFF0000:val}
Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return(this[offset])|(this[offset+1]<<8)|(this[offset+2]<<16)|(this[offset+3]<<24)}
Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return(this[offset]<<24)|(this[offset+1]<<16)|(this[offset+2]<<8)|(this[offset+3])}
Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return ieee754.read(this,offset,!0,23,4)}
Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,4,this.length)
return ieee754.read(this,offset,!1,23,4)}
Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,8,this.length)
return ieee754.read(this,offset,!0,52,8)}
Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0
if(!noAssert)checkOffset(offset,8,this.length)
return ieee754.read(this,offset,!1,52,8)}
function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance')
if(value>max||value<min)throw new RangeError('"value" argument is out of bounds')
if(offset+ext>buf.length)throw new RangeError('Index out of range')}
Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value
offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1
checkInt(this,value,offset,byteLength,maxBytes,0)}
var mul=1
var i=0
this[offset]=value&0xFF
while(++i<byteLength&&(mul*=0x100)){this[offset+i]=(value/mul)&0xFF}
return offset+byteLength}
Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value
offset=offset>>>0
byteLength=byteLength>>>0
if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1
checkInt(this,value,offset,byteLength,maxBytes,0)}
var i=byteLength-1
var mul=1
this[offset+i]=value&0xFF
while(--i>=0&&(mul*=0x100)){this[offset+i]=(value/mul)&0xFF}
return offset+byteLength}
Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,1,0xff,0)
this[offset]=(value&0xff)
return offset+1}
Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,2,0xffff,0)
this[offset]=(value&0xff)
this[offset+1]=(value>>>8)
return offset+2}
Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,2,0xffff,0)
this[offset]=(value>>>8)
this[offset+1]=(value&0xff)
return offset+2}
Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0)
this[offset+3]=(value>>>24)
this[offset+2]=(value>>>16)
this[offset+1]=(value>>>8)
this[offset]=(value&0xff)
return offset+4}
Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0)
this[offset]=(value>>>24)
this[offset+1]=(value>>>16)
this[offset+2]=(value>>>8)
this[offset+3]=(value&0xff)
return offset+4}
Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value
offset=offset>>>0
if(!noAssert){var limit=Math.pow(2,(8*byteLength)-1)
checkInt(this,value,offset,byteLength,limit-1,-limit)}
var i=0
var mul=1
var sub=0
this[offset]=value&0xFF
while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1}
this[offset+i]=((value/mul)>>0)-sub&0xFF}
return offset+byteLength}
Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value
offset=offset>>>0
if(!noAssert){var limit=Math.pow(2,(8*byteLength)-1)
checkInt(this,value,offset,byteLength,limit-1,-limit)}
var i=byteLength-1
var mul=1
var sub=0
this[offset+i]=value&0xFF
while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1}
this[offset+i]=((value/mul)>>0)-sub&0xFF}
return offset+byteLength}
Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80)
if(value<0)value=0xff+value+1
this[offset]=(value&0xff)
return offset+1}
Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000)
this[offset]=(value&0xff)
this[offset+1]=(value>>>8)
return offset+2}
Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000)
this[offset]=(value>>>8)
this[offset+1]=(value&0xff)
return offset+2}
Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000)
this[offset]=(value&0xff)
this[offset+1]=(value>>>8)
this[offset+2]=(value>>>16)
this[offset+3]=(value>>>24)
return offset+4}
Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value
offset=offset>>>0
if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000)
if(value<0)value=0xffffffff+value+1
this[offset]=(value>>>24)
this[offset+1]=(value>>>16)
this[offset+2]=(value>>>8)
this[offset+3]=(value&0xff)
return offset+4}
function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range')
if(offset<0)throw new RangeError('Index out of range')}
function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value
offset=offset>>>0
if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38)}
ieee754.write(buf,value,offset,littleEndian,23,4)
return offset+4}
Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,!0,noAssert)}
Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,!1,noAssert)}
function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value
offset=offset>>>0
if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308)}
ieee754.write(buf,value,offset,littleEndian,52,8)
return offset+8}
Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,!0,noAssert)}
Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,!1,noAssert)}
Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!start)start=0
if(!end&&end!==0)end=this.length
if(targetStart>=target.length)targetStart=target.length
if(!targetStart)targetStart=0
if(end>0&&end<start)end=start
if(end===start)return 0
if(target.length===0||this.length===0)return 0
if(targetStart<0){throw new RangeError('targetStart out of bounds')}
if(start<0||start>=this.length)throw new RangeError('sourceStart out of bounds')
if(end<0)throw new RangeError('sourceEnd out of bounds')
if(end>this.length)end=this.length
if(target.length-targetStart<end-start){end=target.length-targetStart+start}
var len=end-start
var i
if(this===target&&start<targetStart&&targetStart<end){for(i=len-1;i>=0;--i){target[i+targetStart]=this[i+start]}}else if(len<1000){for(i=0;i<len;++i){target[i+targetStart]=this[i+start]}}else{Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart)}
return len}
Buffer.prototype.fill=function fill(val,start,end,encoding){if(typeof val==='string'){if(typeof start==='string'){encoding=start
start=0
end=this.length}else if(typeof end==='string'){encoding=end
end=this.length}
if(val.length===1){var code=val.charCodeAt(0)
if(code<256){val=code}}
if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string')}
if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding)}}else if(typeof val==='number'){val=val&255}
if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index')}
if(end<=start){return this}
start=start>>>0
end=end===undefined?this.length:end>>>0
if(!val)val=0
var i
if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val}}else{var bytes=Buffer.isBuffer(val)?val:new Buffer(val,encoding)
var len=bytes.length
for(i=0;i<end-start;++i){this[i+start]=bytes[i%len]}}
return this}
var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g
function base64clean(str){str=str.trim().replace(INVALID_BASE64_RE,'')
if(str.length<2)return''
while(str.length%4!==0){str=str+'='}
return str}
function toHex(n){if(n<16)return'0'+n.toString(16)
return n.toString(16)}
function utf8ToBytes(string,units){units=units||Infinity
var codePoint
var length=string.length
var leadSurrogate=null
var bytes=[]
for(var i=0;i<length;++i){codePoint=string.charCodeAt(i)
if(codePoint>0xD7FF&&codePoint<0xE000){if(!leadSurrogate){if(codePoint>0xDBFF){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD)
continue}else if(i+1===length){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD)
continue}
leadSurrogate=codePoint
continue}
if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD)
leadSurrogate=codePoint
continue}
codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000}else if(leadSurrogate){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD)}
leadSurrogate=null
if(codePoint<0x80){if((units-=1)<0)break
bytes.push(codePoint)}else if(codePoint<0x800){if((units-=2)<0)break
bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80)}else if(codePoint<0x10000){if((units-=3)<0)break
bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80)}else if(codePoint<0x110000){if((units-=4)<0)break
bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80)}else{throw new Error('Invalid code point')}}
return bytes}
function asciiToBytes(str){var byteArray=[]
for(var i=0;i<str.length;++i){byteArray.push(str.charCodeAt(i)&0xFF)}
return byteArray}
function utf16leToBytes(str,units){var c,hi,lo
var byteArray=[]
for(var i=0;i<str.length;++i){if((units-=2)<0)break
c=str.charCodeAt(i)
hi=c>>8
lo=c%256
byteArray.push(lo)
byteArray.push(hi)}
return byteArray}
function base64ToBytes(str){return base64.toByteArray(base64clean(str))}
function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if((i+offset>=dst.length)||(i>=src.length))break
dst[i+offset]=src[i]}
return i}
function isArrayBuffer(obj){return obj instanceof ArrayBuffer||(obj!=null&&obj.constructor!=null&&obj.constructor.name==='ArrayBuffer'&&typeof obj.byteLength==='number')}
function isArrayBufferView(obj){return(typeof ArrayBuffer.isView==='function')&&ArrayBuffer.isView(obj)}
function numberIsNaN(obj){return obj!==obj}},{"base64-js":3,"ieee754":44}],28:[function(require,module,exports){(function(global,factory){if(typeof define==='function'&&define.amd)
define(["long"],factory);else if(typeof require==='function'&&typeof module==="object"&&module&&module.exports)
module.exports=(function(){var Long;try{Long=require("long")}catch(e){}
return factory(Long)})();else(global.dcodeIO=global.dcodeIO||{})["ByteBuffer"]=factory(global.dcodeIO.Long)})(this,function(Long){"use strict";var ByteBuffer=function(capacity,littleEndian,noAssert){if(typeof capacity==='undefined')
capacity=ByteBuffer.DEFAULT_CAPACITY;if(typeof littleEndian==='undefined')
littleEndian=ByteBuffer.DEFAULT_ENDIAN;if(typeof noAssert==='undefined')
noAssert=ByteBuffer.DEFAULT_NOASSERT;if(!noAssert){capacity=capacity|0;if(capacity<0)
throw RangeError("Illegal capacity");littleEndian=!!littleEndian;noAssert=!!noAssert}
this.buffer=capacity===0?EMPTY_BUFFER:new ArrayBuffer(capacity);this.view=capacity===0?null:new Uint8Array(this.buffer);this.offset=0;this.markedOffset=-1;this.limit=capacity;this.littleEndian=littleEndian;this.noAssert=noAssert};ByteBuffer.VERSION="5.0.1";ByteBuffer.LITTLE_ENDIAN=!0;ByteBuffer.BIG_ENDIAN=!1;ByteBuffer.DEFAULT_CAPACITY=16;ByteBuffer.DEFAULT_ENDIAN=ByteBuffer.BIG_ENDIAN;ByteBuffer.DEFAULT_NOASSERT=!1;ByteBuffer.Long=Long||null;var ByteBufferPrototype=ByteBuffer.prototype;ByteBufferPrototype.__isByteBuffer__;Object.defineProperty(ByteBufferPrototype,"__isByteBuffer__",{value:!0,enumerable:!1,configurable:!1});var EMPTY_BUFFER=new ArrayBuffer(0);var stringFromCharCode=String.fromCharCode;function stringSource(s){var i=0;return function(){return i<s.length?s.charCodeAt(i++):null}}
function stringDestination(){var cs=[],ps=[];return function(){if(arguments.length===0)
return ps.join('')+stringFromCharCode.apply(String,cs);if(cs.length+arguments.length>1024)
ps.push(stringFromCharCode.apply(String,cs)),cs.length=0;Array.prototype.push.apply(cs,arguments)}}
ByteBuffer.accessor=function(){return Uint8Array};ByteBuffer.allocate=function(capacity,littleEndian,noAssert){return new ByteBuffer(capacity,littleEndian,noAssert)};ByteBuffer.concat=function(buffers,encoding,littleEndian,noAssert){if(typeof encoding==='boolean'||typeof encoding!=='string'){noAssert=littleEndian;littleEndian=encoding;encoding=undefined}
var capacity=0;for(var i=0,k=buffers.length,length;i<k;++i){if(!ByteBuffer.isByteBuffer(buffers[i]))
buffers[i]=ByteBuffer.wrap(buffers[i],encoding);length=buffers[i].limit-buffers[i].offset;if(length>0)capacity+=length}
if(capacity===0)
return new ByteBuffer(0,littleEndian,noAssert);var bb=new ByteBuffer(capacity,littleEndian,noAssert),bi;i=0;while(i<k){bi=buffers[i++];length=bi.limit-bi.offset;if(length<=0)continue;bb.view.set(bi.view.subarray(bi.offset,bi.limit),bb.offset);bb.offset+=length}
bb.limit=bb.offset;bb.offset=0;return bb};ByteBuffer.isByteBuffer=function(bb){return(bb&&bb.__isByteBuffer__)===!0};ByteBuffer.type=function(){return ArrayBuffer};ByteBuffer.wrap=function(buffer,encoding,littleEndian,noAssert){if(typeof encoding!=='string'){noAssert=littleEndian;littleEndian=encoding;encoding=undefined}
if(typeof buffer==='string'){if(typeof encoding==='undefined')
encoding="utf8";switch(encoding){case "base64":return ByteBuffer.fromBase64(buffer,littleEndian);case "hex":return ByteBuffer.fromHex(buffer,littleEndian);case "binary":return ByteBuffer.fromBinary(buffer,littleEndian);case "utf8":return ByteBuffer.fromUTF8(buffer,littleEndian);case "debug":return ByteBuffer.fromDebug(buffer,littleEndian);default:throw Error("Unsupported encoding: "+encoding)}}
if(buffer===null||typeof buffer!=='object')
throw TypeError("Illegal buffer");var bb;if(ByteBuffer.isByteBuffer(buffer)){bb=ByteBufferPrototype.clone.call(buffer);bb.markedOffset=-1;return bb}
if(buffer instanceof Uint8Array){bb=new ByteBuffer(0,littleEndian,noAssert);if(buffer.length>0){bb.buffer=buffer.buffer;bb.offset=buffer.byteOffset;bb.limit=buffer.byteOffset+buffer.byteLength;bb.view=new Uint8Array(buffer.buffer)}}else if(buffer instanceof ArrayBuffer){bb=new ByteBuffer(0,littleEndian,noAssert);if(buffer.byteLength>0){bb.buffer=buffer;bb.offset=0;bb.limit=buffer.byteLength;bb.view=buffer.byteLength>0?new Uint8Array(buffer):null}}else if(Object.prototype.toString.call(buffer)==="[object Array]"){bb=new ByteBuffer(buffer.length,littleEndian,noAssert);bb.limit=buffer.length;for(var i=0;i<buffer.length;++i)
bb.view[i]=buffer[i]}else throw TypeError("Illegal buffer");return bb};ByteBufferPrototype.writeBitSet=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(!(value instanceof Array))
throw TypeError("Illegal BitSet: Not an array");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var start=offset,bits=value.length,bytes=(bits>>3),bit=0,k;offset+=this.writeVarint32(bits,offset);while(bytes--){k=(!!value[bit++]&1)|((!!value[bit++]&1)<<1)|((!!value[bit++]&1)<<2)|((!!value[bit++]&1)<<3)|((!!value[bit++]&1)<<4)|((!!value[bit++]&1)<<5)|((!!value[bit++]&1)<<6)|((!!value[bit++]&1)<<7);this.writeByte(k,offset++)}
if(bit<bits){var m=0;k=0;while(bit<bits)k=k|((!!value[bit++]&1)<<(m++));this.writeByte(k,offset++)}
if(relative){this.offset=offset;return this}
return offset-start}
ByteBufferPrototype.readBitSet=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;var ret=this.readVarint32(offset),bits=ret.value,bytes=(bits>>3),bit=0,value=[],k;offset+=ret.length;while(bytes--){k=this.readByte(offset++);value[bit++]=!!(k&0x01);value[bit++]=!!(k&0x02);value[bit++]=!!(k&0x04);value[bit++]=!!(k&0x08);value[bit++]=!!(k&0x10);value[bit++]=!!(k&0x20);value[bit++]=!!(k&0x40);value[bit++]=!!(k&0x80)}
if(bit<bits){var m=0;k=this.readByte(offset++);while(bit<bits)value[bit++]=!!((k>>(m++))&1);}
if(relative){this.offset=offset}
return value}
ByteBufferPrototype.readBytes=function(length,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+length>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength)}
var slice=this.slice(offset,offset+length);if(relative)this.offset+=length;return slice};ByteBufferPrototype.writeBytes=ByteBufferPrototype.append;ByteBufferPrototype.writeInt8=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=1;var capacity0=this.buffer.byteLength;if(offset>capacity0)
this.resize((capacity0*=2)>offset?capacity0:offset);offset-=1;this.view[offset]=value;if(relative)this.offset+=1;return this};ByteBufferPrototype.writeByte=ByteBufferPrototype.writeInt8;ByteBufferPrototype.readInt8=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var value=this.view[offset];if((value&0x80)===0x80)value=-(0xFF-value+1);if(relative)this.offset+=1;return value};ByteBufferPrototype.readByte=ByteBufferPrototype.readInt8;ByteBufferPrototype.writeUint8=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=1;var capacity1=this.buffer.byteLength;if(offset>capacity1)
this.resize((capacity1*=2)>offset?capacity1:offset);offset-=1;this.view[offset]=value;if(relative)this.offset+=1;return this};ByteBufferPrototype.writeUInt8=ByteBufferPrototype.writeUint8;ByteBufferPrototype.readUint8=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var value=this.view[offset];if(relative)this.offset+=1;return value};ByteBufferPrototype.readUInt8=ByteBufferPrototype.readUint8;ByteBufferPrototype.writeInt16=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=2;var capacity2=this.buffer.byteLength;if(offset>capacity2)
this.resize((capacity2*=2)>offset?capacity2:offset);offset-=2;if(this.littleEndian){this.view[offset+1]=(value&0xFF00)>>>8;this.view[offset]=value&0x00FF}else{this.view[offset]=(value&0xFF00)>>>8;this.view[offset+1]=value&0x00FF}
if(relative)this.offset+=2;return this};ByteBufferPrototype.writeShort=ByteBufferPrototype.writeInt16;ByteBufferPrototype.readInt16=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+2>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength)}
var value=0;if(this.littleEndian){value=this.view[offset];value|=this.view[offset+1]<<8}else{value=this.view[offset]<<8;value|=this.view[offset+1]}
if((value&0x8000)===0x8000)value=-(0xFFFF-value+1);if(relative)this.offset+=2;return value};ByteBufferPrototype.readShort=ByteBufferPrototype.readInt16;ByteBufferPrototype.writeUint16=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=2;var capacity3=this.buffer.byteLength;if(offset>capacity3)
this.resize((capacity3*=2)>offset?capacity3:offset);offset-=2;if(this.littleEndian){this.view[offset+1]=(value&0xFF00)>>>8;this.view[offset]=value&0x00FF}else{this.view[offset]=(value&0xFF00)>>>8;this.view[offset+1]=value&0x00FF}
if(relative)this.offset+=2;return this};ByteBufferPrototype.writeUInt16=ByteBufferPrototype.writeUint16;ByteBufferPrototype.readUint16=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+2>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength)}
var value=0;if(this.littleEndian){value=this.view[offset];value|=this.view[offset+1]<<8}else{value=this.view[offset]<<8;value|=this.view[offset+1]}
if(relative)this.offset+=2;return value};ByteBufferPrototype.readUInt16=ByteBufferPrototype.readUint16;ByteBufferPrototype.writeInt32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=4;var capacity4=this.buffer.byteLength;if(offset>capacity4)
this.resize((capacity4*=2)>offset?capacity4:offset);offset-=4;if(this.littleEndian){this.view[offset+3]=(value>>>24)&0xFF;this.view[offset+2]=(value>>>16)&0xFF;this.view[offset+1]=(value>>>8)&0xFF;this.view[offset]=value&0xFF}else{this.view[offset]=(value>>>24)&0xFF;this.view[offset+1]=(value>>>16)&0xFF;this.view[offset+2]=(value>>>8)&0xFF;this.view[offset+3]=value&0xFF}
if(relative)this.offset+=4;return this};ByteBufferPrototype.writeInt=ByteBufferPrototype.writeInt32;ByteBufferPrototype.readInt32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength)}
var value=0;if(this.littleEndian){value=this.view[offset+2]<<16;value|=this.view[offset+1]<<8;value|=this.view[offset];value+=this.view[offset+3]<<24>>>0}else{value=this.view[offset+1]<<16;value|=this.view[offset+2]<<8;value|=this.view[offset+3];value+=this.view[offset]<<24>>>0}
value|=0;if(relative)this.offset+=4;return value};ByteBufferPrototype.readInt=ByteBufferPrototype.readInt32;ByteBufferPrototype.writeUint32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=4;var capacity5=this.buffer.byteLength;if(offset>capacity5)
this.resize((capacity5*=2)>offset?capacity5:offset);offset-=4;if(this.littleEndian){this.view[offset+3]=(value>>>24)&0xFF;this.view[offset+2]=(value>>>16)&0xFF;this.view[offset+1]=(value>>>8)&0xFF;this.view[offset]=value&0xFF}else{this.view[offset]=(value>>>24)&0xFF;this.view[offset+1]=(value>>>16)&0xFF;this.view[offset+2]=(value>>>8)&0xFF;this.view[offset+3]=value&0xFF}
if(relative)this.offset+=4;return this};ByteBufferPrototype.writeUInt32=ByteBufferPrototype.writeUint32;ByteBufferPrototype.readUint32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength)}
var value=0;if(this.littleEndian){value=this.view[offset+2]<<16;value|=this.view[offset+1]<<8;value|=this.view[offset];value+=this.view[offset+3]<<24>>>0}else{value=this.view[offset+1]<<16;value|=this.view[offset+2]<<8;value|=this.view[offset+3];value+=this.view[offset]<<24>>>0}
if(relative)this.offset+=4;return value};ByteBufferPrototype.readUInt32=ByteBufferPrototype.readUint32;if(Long){ByteBufferPrototype.writeInt64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);offset+=8;var capacity6=this.buffer.byteLength;if(offset>capacity6)
this.resize((capacity6*=2)>offset?capacity6:offset);offset-=8;var lo=value.low,hi=value.high;if(this.littleEndian){this.view[offset+3]=(lo>>>24)&0xFF;this.view[offset+2]=(lo>>>16)&0xFF;this.view[offset+1]=(lo>>>8)&0xFF;this.view[offset]=lo&0xFF;offset+=4;this.view[offset+3]=(hi>>>24)&0xFF;this.view[offset+2]=(hi>>>16)&0xFF;this.view[offset+1]=(hi>>>8)&0xFF;this.view[offset]=hi&0xFF}else{this.view[offset]=(hi>>>24)&0xFF;this.view[offset+1]=(hi>>>16)&0xFF;this.view[offset+2]=(hi>>>8)&0xFF;this.view[offset+3]=hi&0xFF;offset+=4;this.view[offset]=(lo>>>24)&0xFF;this.view[offset+1]=(lo>>>16)&0xFF;this.view[offset+2]=(lo>>>8)&0xFF;this.view[offset+3]=lo&0xFF}
if(relative)this.offset+=8;return this};ByteBufferPrototype.writeLong=ByteBufferPrototype.writeInt64;ByteBufferPrototype.readInt64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength)}
var lo=0,hi=0;if(this.littleEndian){lo=this.view[offset+2]<<16;lo|=this.view[offset+1]<<8;lo|=this.view[offset];lo+=this.view[offset+3]<<24>>>0;offset+=4;hi=this.view[offset+2]<<16;hi|=this.view[offset+1]<<8;hi|=this.view[offset];hi+=this.view[offset+3]<<24>>>0}else{hi=this.view[offset+1]<<16;hi|=this.view[offset+2]<<8;hi|=this.view[offset+3];hi+=this.view[offset]<<24>>>0;offset+=4;lo=this.view[offset+1]<<16;lo|=this.view[offset+2]<<8;lo|=this.view[offset+3];lo+=this.view[offset]<<24>>>0}
var value=new Long(lo,hi,!1);if(relative)this.offset+=8;return value};ByteBufferPrototype.readLong=ByteBufferPrototype.readInt64;ByteBufferPrototype.writeUint64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);offset+=8;var capacity7=this.buffer.byteLength;if(offset>capacity7)
this.resize((capacity7*=2)>offset?capacity7:offset);offset-=8;var lo=value.low,hi=value.high;if(this.littleEndian){this.view[offset+3]=(lo>>>24)&0xFF;this.view[offset+2]=(lo>>>16)&0xFF;this.view[offset+1]=(lo>>>8)&0xFF;this.view[offset]=lo&0xFF;offset+=4;this.view[offset+3]=(hi>>>24)&0xFF;this.view[offset+2]=(hi>>>16)&0xFF;this.view[offset+1]=(hi>>>8)&0xFF;this.view[offset]=hi&0xFF}else{this.view[offset]=(hi>>>24)&0xFF;this.view[offset+1]=(hi>>>16)&0xFF;this.view[offset+2]=(hi>>>8)&0xFF;this.view[offset+3]=hi&0xFF;offset+=4;this.view[offset]=(lo>>>24)&0xFF;this.view[offset+1]=(lo>>>16)&0xFF;this.view[offset+2]=(lo>>>8)&0xFF;this.view[offset+3]=lo&0xFF}
if(relative)this.offset+=8;return this};ByteBufferPrototype.writeUInt64=ByteBufferPrototype.writeUint64;ByteBufferPrototype.readUint64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength)}
var lo=0,hi=0;if(this.littleEndian){lo=this.view[offset+2]<<16;lo|=this.view[offset+1]<<8;lo|=this.view[offset];lo+=this.view[offset+3]<<24>>>0;offset+=4;hi=this.view[offset+2]<<16;hi|=this.view[offset+1]<<8;hi|=this.view[offset];hi+=this.view[offset+3]<<24>>>0}else{hi=this.view[offset+1]<<16;hi|=this.view[offset+2]<<8;hi|=this.view[offset+3];hi+=this.view[offset]<<24>>>0;offset+=4;lo=this.view[offset+1]<<16;lo|=this.view[offset+2]<<8;lo|=this.view[offset+3];lo+=this.view[offset]<<24>>>0}
var value=new Long(lo,hi,!0);if(relative)this.offset+=8;return value};ByteBufferPrototype.readUInt64=ByteBufferPrototype.readUint64}
function ieee754_read(buffer,offset,isLE,mLen,nBytes){var e,m,eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,nBits=-7,i=isLE?(nBytes-1):0,d=isLE?-1:1,s=buffer[offset+i];i+=d;e=s&((1<<(-nBits))-1);s>>=(-nBits);nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}
m=e&((1<<(-nBits))-1);e>>=(-nBits);nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}
if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:((s?-1:1)*Infinity)}else{m=m+Math.pow(2,mLen);e=e-eBias}
return(s?-1:1)*m*Math.pow(2,e-mLen)}
function ieee754_write(buffer,value,offset,isLE,mLen,nBytes){var e,m,c,eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,rt=(mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0),i=isLE?0:(nBytes-1),d=isLE?1:-1,s=value<0||(value===0&&1/value<0)?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2}
if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}
if(value*c>=2){e++;c/=2}
if(e+eBias>=eMax){m=0;e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0}}
for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}
e=(e<<mLen)|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}
buffer[offset+i-d]|=s*128}
ByteBufferPrototype.writeFloat32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number')
throw TypeError("Illegal value: "+value+" (not a number)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=4;var capacity8=this.buffer.byteLength;if(offset>capacity8)
this.resize((capacity8*=2)>offset?capacity8:offset);offset-=4;ieee754_write(this.view,value,offset,this.littleEndian,23,4);if(relative)this.offset+=4;return this};ByteBufferPrototype.writeFloat=ByteBufferPrototype.writeFloat32;ByteBufferPrototype.readFloat32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength)}
var value=ieee754_read(this.view,offset,this.littleEndian,23,4);if(relative)this.offset+=4;return value};ByteBufferPrototype.readFloat=ByteBufferPrototype.readFloat32;ByteBufferPrototype.writeFloat64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number')
throw TypeError("Illegal value: "+value+" (not a number)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
offset+=8;var capacity9=this.buffer.byteLength;if(offset>capacity9)
this.resize((capacity9*=2)>offset?capacity9:offset);offset-=8;ieee754_write(this.view,value,offset,this.littleEndian,52,8);if(relative)this.offset+=8;return this};ByteBufferPrototype.writeDouble=ByteBufferPrototype.writeFloat64;ByteBufferPrototype.readFloat64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength)}
var value=ieee754_read(this.view,offset,this.littleEndian,52,8);if(relative)this.offset+=8;return value};ByteBufferPrototype.readDouble=ByteBufferPrototype.readFloat64;ByteBuffer.MAX_VARINT32_BYTES=5;ByteBuffer.calculateVarint32=function(value){value=value>>>0;if(value<1<<7)return 1;else if(value<1<<14)return 2;else if(value<1<<21)return 3;else if(value<1<<28)return 4;else return 5};ByteBuffer.zigZagEncode32=function(n){return(((n|=0)<<1)^(n>>31))>>>0};ByteBuffer.zigZagDecode32=function(n){return((n>>>1)^-(n&1))|0};ByteBufferPrototype.writeVarint32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var size=ByteBuffer.calculateVarint32(value),b;offset+=size;var capacity10=this.buffer.byteLength;if(offset>capacity10)
this.resize((capacity10*=2)>offset?capacity10:offset);offset-=size;value>>>=0;while(value>=0x80){b=(value&0x7f)|0x80;this.view[offset++]=b;value>>>=7}
this.view[offset++]=value;if(relative){this.offset=offset;return this}
return size};ByteBufferPrototype.writeVarint32ZigZag=function(value,offset){return this.writeVarint32(ByteBuffer.zigZagEncode32(value),offset)};ByteBufferPrototype.readVarint32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var c=0,value=0>>>0,b;do{if(!this.noAssert&&offset>this.limit){var err=Error("Truncated");err.truncated=!0;throw err}
b=this.view[offset++];if(c<5)
value|=(b&0x7f)<<(7*c);++c}while((b&0x80)!==0);value|=0;if(relative){this.offset=offset;return value}
return{"value":value,"length":c}};ByteBufferPrototype.readVarint32ZigZag=function(offset){var val=this.readVarint32(offset);if(typeof val==='object')
val.value=ByteBuffer.zigZagDecode32(val.value);else val=ByteBuffer.zigZagDecode32(val);return val};if(Long){ByteBuffer.MAX_VARINT64_BYTES=10;ByteBuffer.calculateVarint64=function(value){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);var part0=value.toInt()>>>0,part1=value.shiftRightUnsigned(28).toInt()>>>0,part2=value.shiftRightUnsigned(56).toInt()>>>0;if(part2==0){if(part1==0){if(part0<1<<14)
return part0<1<<7?1:2;else return part0<1<<21?3:4}else{if(part1<1<<14)
return part1<1<<7?5:6;else return part1<1<<21?7:8}}else return part2<1<<7?9:10};ByteBuffer.zigZagEncode64=function(value){if(typeof value==='number')
value=Long.fromNumber(value,!1);else if(typeof value==='string')
value=Long.fromString(value,!1);else if(value.unsigned!==!1)value=value.toSigned();return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned()};ByteBuffer.zigZagDecode64=function(value){if(typeof value==='number')
value=Long.fromNumber(value,!1);else if(typeof value==='string')
value=Long.fromString(value,!1);else if(value.unsigned!==!1)value=value.toSigned();return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned()};ByteBufferPrototype.writeVarint64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
if(typeof value==='number')
value=Long.fromNumber(value,!1);else if(typeof value==='string')
value=Long.fromString(value,!1);else if(value.unsigned!==!1)value=value.toSigned();var size=ByteBuffer.calculateVarint64(value),part0=value.toInt()>>>0,part1=value.shiftRightUnsigned(28).toInt()>>>0,part2=value.shiftRightUnsigned(56).toInt()>>>0;offset+=size;var capacity11=this.buffer.byteLength;if(offset>capacity11)
this.resize((capacity11*=2)>offset?capacity11:offset);offset-=size;switch(size){case 10:this.view[offset+9]=(part2>>>7)&0x01;case 9:this.view[offset+8]=size!==9?(part2)|0x80:(part2)&0x7F;case 8:this.view[offset+7]=size!==8?(part1>>>21)|0x80:(part1>>>21)&0x7F;case 7:this.view[offset+6]=size!==7?(part1>>>14)|0x80:(part1>>>14)&0x7F;case 6:this.view[offset+5]=size!==6?(part1>>>7)|0x80:(part1>>>7)&0x7F;case 5:this.view[offset+4]=size!==5?(part1)|0x80:(part1)&0x7F;case 4:this.view[offset+3]=size!==4?(part0>>>21)|0x80:(part0>>>21)&0x7F;case 3:this.view[offset+2]=size!==3?(part0>>>14)|0x80:(part0>>>14)&0x7F;case 2:this.view[offset+1]=size!==2?(part0>>>7)|0x80:(part0>>>7)&0x7F;case 1:this.view[offset]=size!==1?(part0)|0x80:(part0)&0x7F}
if(relative){this.offset+=size;return this}else{return size}};ByteBufferPrototype.writeVarint64ZigZag=function(value,offset){return this.writeVarint64(ByteBuffer.zigZagEncode64(value),offset)};ByteBufferPrototype.readVarint64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var start=offset,part0=0,part1=0,part2=0,b=0;b=this.view[offset++];part0=(b&0x7F);if(b&0x80){b=this.view[offset++];part0|=(b&0x7F)<<7;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part0|=(b&0x7F)<<14;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part0|=(b&0x7F)<<21;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part1=(b&0x7F);if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part1|=(b&0x7F)<<7;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part1|=(b&0x7F)<<14;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part1|=(b&0x7F)<<21;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part2=(b&0x7F);if((b&0x80)||(this.noAssert&&typeof b==='undefined')){b=this.view[offset++];part2|=(b&0x7F)<<7;if((b&0x80)||(this.noAssert&&typeof b==='undefined')){throw Error("Buffer overrun")}}}}}}}}}}
var value=Long.fromBits(part0|(part1<<28),(part1>>>4)|(part2)<<24,!1);if(relative){this.offset=offset;return value}else{return{'value':value,'length':offset-start}}};ByteBufferPrototype.readVarint64ZigZag=function(offset){var val=this.readVarint64(offset);if(val&&val.value instanceof Long)
val.value=ByteBuffer.zigZagDecode64(val.value);else val=ByteBuffer.zigZagDecode64(val);return val}}
ByteBufferPrototype.writeCString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;var i,k=str.length;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");for(i=0;i<k;++i){if(str.charCodeAt(i)===0)
throw RangeError("Illegal str: Contains NULL-characters")}
if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
k=utfx.calculateUTF16asUTF8(stringSource(str))[1];offset+=k+1;var capacity12=this.buffer.byteLength;if(offset>capacity12)
this.resize((capacity12*=2)>offset?capacity12:offset);offset-=k+1;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view[offset++]=b}.bind(this));this.view[offset++]=0;if(relative){this.offset=offset;return this}
return k};ByteBufferPrototype.readCString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var start=offset,temp;var sd,b=-1;utfx.decodeUTF8toUTF16(function(){if(b===0)return null;if(offset>=this.limit)
throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);b=this.view[offset++];return b===0?null:b}.bind(this),sd=stringDestination(),!0);if(relative){this.offset=offset;return sd()}else{return{"string":sd(),"length":offset-start}}};ByteBufferPrototype.writeIString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var start=offset,k;k=utfx.calculateUTF16asUTF8(stringSource(str),this.noAssert)[1];offset+=4+k;var capacity13=this.buffer.byteLength;if(offset>capacity13)
this.resize((capacity13*=2)>offset?capacity13:offset);offset-=4+k;if(this.littleEndian){this.view[offset+3]=(k>>>24)&0xFF;this.view[offset+2]=(k>>>16)&0xFF;this.view[offset+1]=(k>>>8)&0xFF;this.view[offset]=k&0xFF}else{this.view[offset]=(k>>>24)&0xFF;this.view[offset+1]=(k>>>16)&0xFF;this.view[offset+2]=(k>>>8)&0xFF;this.view[offset+3]=k&0xFF}
offset+=4;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view[offset++]=b}.bind(this));if(offset!==start+4+k)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));if(relative){this.offset=offset;return this}
return offset-start};ByteBufferPrototype.readIString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength)}
var start=offset;var len=this.readUint32(offset);var str=this.readUTF8String(len,ByteBuffer.METRICS_BYTES,offset+=4);offset+=str.length;if(relative){this.offset=offset;return str.string}else{return{'string':str.string,'length':offset-start}}};ByteBuffer.METRICS_CHARS='c';ByteBuffer.METRICS_BYTES='b';ByteBufferPrototype.writeUTF8String=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var k;var start=offset;k=utfx.calculateUTF16asUTF8(stringSource(str))[1];offset+=k;var capacity14=this.buffer.byteLength;if(offset>capacity14)
this.resize((capacity14*=2)>offset?capacity14:offset);offset-=k;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view[offset++]=b}.bind(this));if(relative){this.offset=offset;return this}
return offset-start};ByteBufferPrototype.writeString=ByteBufferPrototype.writeUTF8String;ByteBuffer.calculateUTF8Chars=function(str){return utfx.calculateUTF16asUTF8(stringSource(str))[0]};ByteBuffer.calculateUTF8Bytes=function(str){return utfx.calculateUTF16asUTF8(stringSource(str))[1]};ByteBuffer.calculateString=ByteBuffer.calculateUTF8Bytes;ByteBufferPrototype.readUTF8String=function(length,metrics,offset){if(typeof metrics==='number'){offset=metrics;metrics=undefined}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(typeof metrics==='undefined')metrics=ByteBuffer.METRICS_CHARS;if(!this.noAssert){if(typeof length!=='number'||length%1!==0)
throw TypeError("Illegal length: "+length+" (not an integer)");length|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var i=0,start=offset,sd;if(metrics===ByteBuffer.METRICS_CHARS){sd=stringDestination();utfx.decodeUTF8(function(){return i<length&&offset<this.limit?this.view[offset++]:null}.bind(this),function(cp){++i;utfx.UTF8toUTF16(cp,sd)});if(i!==length)
throw RangeError("Illegal range: Truncated data, "+i+" == "+length);if(relative){this.offset=offset;return sd()}else{return{"string":sd(),"length":offset-start}}}else if(metrics===ByteBuffer.METRICS_BYTES){if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+length>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength)}
var k=offset+length;utfx.decodeUTF8toUTF16(function(){return offset<k?this.view[offset++]:null}.bind(this),sd=stringDestination(),this.noAssert);if(offset!==k)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);if(relative){this.offset=offset;return sd()}else{return{'string':sd(),'length':offset-start}}}else throw TypeError("Unsupported metrics: "+metrics)};ByteBufferPrototype.readString=ByteBufferPrototype.readUTF8String;ByteBufferPrototype.writeVString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
var start=offset,k,l;k=utfx.calculateUTF16asUTF8(stringSource(str),this.noAssert)[1];l=ByteBuffer.calculateVarint32(k);offset+=l+k;var capacity15=this.buffer.byteLength;if(offset>capacity15)
this.resize((capacity15*=2)>offset?capacity15:offset);offset-=l+k;offset+=this.writeVarint32(k,offset);utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view[offset++]=b}.bind(this));if(offset!==start+k+l)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));if(relative){this.offset=offset;return this}
return offset-start};ByteBufferPrototype.readVString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength)}
var start=offset;var len=this.readVarint32(offset);var str=this.readUTF8String(len.value,ByteBuffer.METRICS_BYTES,offset+=len.length);offset+=str.length;if(relative){this.offset=offset;return str.string}else{return{'string':str.string,'length':offset-start}}};ByteBufferPrototype.append=function(source,encoding,offset){if(typeof encoding==='number'||typeof encoding!=='string'){offset=encoding;encoding=undefined}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
if(!(source instanceof ByteBuffer))
source=ByteBuffer.wrap(source,encoding);var length=source.limit-source.offset;if(length<=0)return this;offset+=length;var capacity16=this.buffer.byteLength;if(offset>capacity16)
this.resize((capacity16*=2)>offset?capacity16:offset);offset-=length;this.view.set(source.view.subarray(source.offset,source.limit),offset);source.offset+=length;if(relative)this.offset+=length;return this};ByteBufferPrototype.appendTo=function(target,offset){target.append(this,offset);return this};ByteBufferPrototype.assert=function(assert){this.noAssert=!assert;return this};ByteBufferPrototype.capacity=function(){return this.buffer.byteLength};ByteBufferPrototype.clear=function(){this.offset=0;this.limit=this.buffer.byteLength;this.markedOffset=-1;return this};ByteBufferPrototype.clone=function(copy){var bb=new ByteBuffer(0,this.littleEndian,this.noAssert);if(copy){bb.buffer=new ArrayBuffer(this.buffer.byteLength);bb.view=new Uint8Array(bb.buffer)}else{bb.buffer=this.buffer;bb.view=this.view}
bb.offset=this.offset;bb.markedOffset=this.markedOffset;bb.limit=this.limit;return bb};ByteBufferPrototype.compact=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
if(begin===0&&end===this.buffer.byteLength)
return this;var len=end-begin;if(len===0){this.buffer=EMPTY_BUFFER;this.view=null;if(this.markedOffset>=0)this.markedOffset-=begin;this.offset=0;this.limit=0;return this}
var buffer=new ArrayBuffer(len);var view=new Uint8Array(buffer);view.set(this.view.subarray(begin,end));this.buffer=buffer;this.view=view;if(this.markedOffset>=0)this.markedOffset-=begin;this.offset=0;this.limit=len;return this};ByteBufferPrototype.copy=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
if(begin===end)
return new ByteBuffer(0,this.littleEndian,this.noAssert);var capacity=end-begin,bb=new ByteBuffer(capacity,this.littleEndian,this.noAssert);bb.offset=0;bb.limit=capacity;if(bb.markedOffset>=0)bb.markedOffset-=begin;this.copyTo(bb,0,begin,end);return bb};ByteBufferPrototype.copyTo=function(target,targetOffset,sourceOffset,sourceLimit){var relative,targetRelative;if(!this.noAssert){if(!ByteBuffer.isByteBuffer(target))
throw TypeError("Illegal target: Not a ByteBuffer")}
targetOffset=(targetRelative=typeof targetOffset==='undefined')?target.offset:targetOffset|0;sourceOffset=(relative=typeof sourceOffset==='undefined')?this.offset:sourceOffset|0;sourceLimit=typeof sourceLimit==='undefined'?this.limit:sourceLimit|0;if(targetOffset<0||targetOffset>target.buffer.byteLength)
throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);if(sourceOffset<0||sourceLimit>this.buffer.byteLength)
throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);var len=sourceLimit-sourceOffset;if(len===0)
return target;target.ensureCapacity(targetOffset+len);target.view.set(this.view.subarray(sourceOffset,sourceLimit),targetOffset);if(relative)this.offset+=len;if(targetRelative)target.offset+=len;return this};ByteBufferPrototype.ensureCapacity=function(capacity){var current=this.buffer.byteLength;if(current<capacity)
return this.resize((current*=2)>capacity?current:capacity);return this};ByteBufferPrototype.fill=function(value,begin,end){var relative=typeof begin==='undefined';if(relative)begin=this.offset;if(typeof value==='string'&&value.length>0)
value=value.charCodeAt(0);if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
if(begin>=end)
return this;while(begin<end)this.view[begin++]=value;if(relative)this.offset=begin;return this};ByteBufferPrototype.flip=function(){this.limit=this.offset;this.offset=0;return this};ByteBufferPrototype.mark=function(offset){offset=typeof offset==='undefined'?this.offset:offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
this.markedOffset=offset;return this};ByteBufferPrototype.order=function(littleEndian){if(!this.noAssert){if(typeof littleEndian!=='boolean')
throw TypeError("Illegal littleEndian: Not a boolean")}
this.littleEndian=!!littleEndian;return this};ByteBufferPrototype.LE=function(littleEndian){this.littleEndian=typeof littleEndian!=='undefined'?!!littleEndian:!0;return this};ByteBufferPrototype.BE=function(bigEndian){this.littleEndian=typeof bigEndian!=='undefined'?!bigEndian:!1;return this};ByteBufferPrototype.prepend=function(source,encoding,offset){if(typeof encoding==='number'||typeof encoding!=='string'){offset=encoding;encoding=undefined}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength)}
if(!(source instanceof ByteBuffer))
source=ByteBuffer.wrap(source,encoding);var len=source.limit-source.offset;if(len<=0)return this;var diff=len-offset;if(diff>0){var buffer=new ArrayBuffer(this.buffer.byteLength+diff);var view=new Uint8Array(buffer);view.set(this.view.subarray(offset,this.buffer.byteLength),len);this.buffer=buffer;this.view=view;this.offset+=diff;if(this.markedOffset>=0)this.markedOffset+=diff;this.limit+=diff;offset+=diff}else{var arrayView=new Uint8Array(this.buffer)}
this.view.set(source.view.subarray(source.offset,source.limit),offset-len);source.offset=source.limit;if(relative)
this.offset-=len;return this};ByteBufferPrototype.prependTo=function(target,offset){target.prepend(this,offset);return this};ByteBufferPrototype.printDebug=function(out){if(typeof out!=='function')out=console.log.bind(console);out(this.toString()+"\n"+"-------------------------------------------------------------------\n"+this.toDebug(!0))};ByteBufferPrototype.remaining=function(){return this.limit-this.offset};ByteBufferPrototype.reset=function(){if(this.markedOffset>=0){this.offset=this.markedOffset;this.markedOffset=-1}else{this.offset=0}
return this};ByteBufferPrototype.resize=function(capacity){if(!this.noAssert){if(typeof capacity!=='number'||capacity%1!==0)
throw TypeError("Illegal capacity: "+capacity+" (not an integer)");capacity|=0;if(capacity<0)
throw RangeError("Illegal capacity: 0 <= "+capacity)}
if(this.buffer.byteLength<capacity){var buffer=new ArrayBuffer(capacity);var view=new Uint8Array(buffer);view.set(this.view);this.buffer=buffer;this.view=view}
return this};ByteBufferPrototype.reverse=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
if(begin===end)
return this;Array.prototype.reverse.call(this.view.subarray(begin,end));return this};ByteBufferPrototype.skip=function(length){if(!this.noAssert){if(typeof length!=='number'||length%1!==0)
throw TypeError("Illegal length: "+length+" (not an integer)");length|=0}
var offset=this.offset+length;if(!this.noAssert){if(offset<0||offset>this.buffer.byteLength)
throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength)}
this.offset=offset;return this};ByteBufferPrototype.slice=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
var bb=this.clone();bb.offset=begin;bb.limit=end;return bb};ByteBufferPrototype.toBuffer=function(forceCopy){var offset=this.offset,limit=this.limit;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: Not an integer");offset>>>=0;if(typeof limit!=='number'||limit%1!==0)
throw TypeError("Illegal limit: Not an integer");limit>>>=0;if(offset<0||offset>limit||limit>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength)}
if(!forceCopy&&offset===0&&limit===this.buffer.byteLength)
return this.buffer;if(offset===limit)
return EMPTY_BUFFER;var buffer=new ArrayBuffer(limit-offset);new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset,limit),0);return buffer};ByteBufferPrototype.toArrayBuffer=ByteBufferPrototype.toBuffer;ByteBufferPrototype.toString=function(encoding,begin,end){if(typeof encoding==='undefined')
return"ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";if(typeof encoding==='number')
encoding="utf8",begin=encoding,end=begin;switch(encoding){case "utf8":return this.toUTF8(begin,end);case "base64":return this.toBase64(begin,end);case "hex":return this.toHex(begin,end);case "binary":return this.toBinary(begin,end);case "debug":return this.toDebug();case "columns":return this.toColumns();default:throw Error("Unsupported encoding: "+encoding)}};var lxiv=function(){"use strict";var lxiv={};var aout=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47];var ain=[];for(var i=0,k=aout.length;i<k;++i)
ain[aout[i]]=i;lxiv.encode=function(src,dst){var b,t;while((b=src())!==null){dst(aout[(b>>2)&0x3f]);t=(b&0x3)<<4;if((b=src())!==null){t|=(b>>4)&0xf;dst(aout[(t|((b>>4)&0xf))&0x3f]);t=(b&0xf)<<2;if((b=src())!==null)
dst(aout[(t|((b>>6)&0x3))&0x3f]),dst(aout[b&0x3f]);else dst(aout[t&0x3f]),dst(61)}else dst(aout[t&0x3f]),dst(61),dst(61)}};lxiv.decode=function(src,dst){var c,t1,t2;function fail(c){throw Error("Illegal character code: "+c)}
while((c=src())!==null){t1=ain[c];if(typeof t1==='undefined')fail(c);if((c=src())!==null){t2=ain[c];if(typeof t2==='undefined')fail(c);dst((t1<<2)>>>0|(t2&0x30)>>4);if((c=src())!==null){t1=ain[c];if(typeof t1==='undefined')
if(c===61)break;else fail(c);dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);if((c=src())!==null){t2=ain[c];if(typeof t2==='undefined')
if(c===61)break;else fail(c);dst(((t1&0x3)<<6)>>>0|t2)}}}}};lxiv.test=function(str){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str)};return lxiv}();ByteBufferPrototype.toBase64=function(begin,end){if(typeof begin==='undefined')
begin=this.offset;if(typeof end==='undefined')
end=this.limit;begin=begin|0;end=end|0;if(begin<0||end>this.capacity||begin>end)
throw RangeError("begin, end");var sd;lxiv.encode(function(){return begin<end?this.view[begin++]:null}.bind(this),sd=stringDestination());return sd()};ByteBuffer.fromBase64=function(str,littleEndian){if(typeof str!=='string')
throw TypeError("str");var bb=new ByteBuffer(str.length/4*3,littleEndian),i=0;lxiv.decode(stringSource(str),function(b){bb.view[i++]=b});bb.limit=i;return bb};ByteBuffer.btoa=function(str){return ByteBuffer.fromBinary(str).toBase64()};ByteBuffer.atob=function(b64){return ByteBuffer.fromBase64(b64).toBinary()};ByteBufferPrototype.toBinary=function(begin,end){if(typeof begin==='undefined')
begin=this.offset;if(typeof end==='undefined')
end=this.limit;begin|=0;end|=0;if(begin<0||end>this.capacity()||begin>end)
throw RangeError("begin, end");if(begin===end)
return"";var chars=[],parts=[];while(begin<end){chars.push(this.view[begin++]);if(chars.length>=1024)
parts.push(String.fromCharCode.apply(String,chars)),chars=[]}
return parts.join('')+String.fromCharCode.apply(String,chars)};ByteBuffer.fromBinary=function(str,littleEndian){if(typeof str!=='string')
throw TypeError("str");var i=0,k=str.length,charCode,bb=new ByteBuffer(k,littleEndian);while(i<k){charCode=str.charCodeAt(i);if(charCode>0xff)
throw RangeError("illegal char code: "+charCode);bb.view[i++]=charCode}
bb.limit=k;return bb};ByteBufferPrototype.toDebug=function(columns){var i=-1,k=this.buffer.byteLength,b,hex="",asc="",out="";while(i<k){if(i!==-1){b=this.view[i];if(b<0x10)hex+="0"+b.toString(16).toUpperCase();else hex+=b.toString(16).toUpperCase();if(columns)
asc+=b>32&&b<127?String.fromCharCode(b):'.'}
++i;if(columns){if(i>0&&i%16===0&&i!==k){while(hex.length<3*16+3)hex+=" ";out+=hex+asc+"\n";hex=asc=""}}
if(i===this.offset&&i===this.limit)
hex+=i===this.markedOffset?"!":"|";else if(i===this.offset)
hex+=i===this.markedOffset?"[":"<";else if(i===this.limit)
hex+=i===this.markedOffset?"]":">";else hex+=i===this.markedOffset?"'":(columns||(i!==0&&i!==k)?" ":"")}
if(columns&&hex!==" "){while(hex.length<3*16+3)
hex+=" ";out+=hex+asc+"\n"}
return columns?out:hex};ByteBuffer.fromDebug=function(str,littleEndian,noAssert){var k=str.length,bb=new ByteBuffer(((k+1)/3)|0,littleEndian,noAssert);var i=0,j=0,ch,b,rs=!1,ho=!1,hm=!1,hl=!1,fail=!1;while(i<k){switch(ch=str.charAt(i++)){case '!':if(!noAssert){if(ho||hm||hl){fail=!0;break}
ho=hm=hl=!0}
bb.offset=bb.markedOffset=bb.limit=j;rs=!1;break;case '|':if(!noAssert){if(ho||hl){fail=!0;break}
ho=hl=!0}
bb.offset=bb.limit=j;rs=!1;break;case '[':if(!noAssert){if(ho||hm){fail=!0;break}
ho=hm=!0}
bb.offset=bb.markedOffset=j;rs=!1;break;case '<':if(!noAssert){if(ho){fail=!0;break}
ho=!0}
bb.offset=j;rs=!1;break;case ']':if(!noAssert){if(hl||hm){fail=!0;break}
hl=hm=!0}
bb.limit=bb.markedOffset=j;rs=!1;break;case '>':if(!noAssert){if(hl){fail=!0;break}
hl=!0}
bb.limit=j;rs=!1;break;case "'":if(!noAssert){if(hm){fail=!0;break}
hm=!0}
bb.markedOffset=j;rs=!1;break;case ' ':rs=!1;break;default:if(!noAssert){if(rs){fail=!0;break}}
b=parseInt(ch+str.charAt(i++),16);if(!noAssert){if(isNaN(b)||b<0||b>255)
throw TypeError("Illegal str: Not a debug encoded string")}
bb.view[j++]=b;rs=!0}
if(fail)
throw TypeError("Illegal str: Invalid symbol at "+i)}
if(!noAssert){if(!ho||!hl)
throw TypeError("Illegal str: Missing offset or limit");if(j<bb.buffer.byteLength)
throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k)}
return bb};ByteBufferPrototype.toHex=function(begin,end){begin=typeof begin==='undefined'?this.offset:begin;end=typeof end==='undefined'?this.limit:end;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
var out=new Array(end-begin),b;while(begin<end){b=this.view[begin++];if(b<0x10)
out.push("0",b.toString(16));else out.push(b.toString(16))}
return out.join('')};ByteBuffer.fromHex=function(str,littleEndian,noAssert){if(!noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(str.length%2!==0)
throw TypeError("Illegal str: Length not a multiple of 2")}
var k=str.length,bb=new ByteBuffer((k/2)|0,littleEndian),b;for(var i=0,j=0;i<k;i+=2){b=parseInt(str.substring(i,i+2),16);if(!noAssert)
if(!isFinite(b)||b<0||b>255)
throw TypeError("Illegal str: Contains non-hex characters");bb.view[j++]=b}
bb.limit=j;return bb};var utfx=function(){"use strict";var utfx={};utfx.MAX_CODEPOINT=0x10FFFF;utfx.encodeUTF8=function(src,dst){var cp=null;if(typeof src==='number')
cp=src,src=function(){return null};while(cp!==null||(cp=src())!==null){if(cp<0x80)
dst(cp&0x7F);else if(cp<0x800)
dst(((cp>>6)&0x1F)|0xC0),dst((cp&0x3F)|0x80);else if(cp<0x10000)
dst(((cp>>12)&0x0F)|0xE0),dst(((cp>>6)&0x3F)|0x80),dst((cp&0x3F)|0x80);else dst(((cp>>18)&0x07)|0xF0),dst(((cp>>12)&0x3F)|0x80),dst(((cp>>6)&0x3F)|0x80),dst((cp&0x3F)|0x80);cp=null}};utfx.decodeUTF8=function(src,dst){var a,b,c,d,fail=function(b){b=b.slice(0,b.indexOf(null));var err=Error(b.toString());err.name="TruncatedError";err.bytes=b;throw err};while((a=src())!==null){if((a&0x80)===0)
dst(a);else if((a&0xE0)===0xC0)((b=src())===null)&&fail([a,b]),dst(((a&0x1F)<<6)|(b&0x3F));else if((a&0xF0)===0xE0)((b=src())===null||(c=src())===null)&&fail([a,b,c]),dst(((a&0x0F)<<12)|((b&0x3F)<<6)|(c&0x3F));else if((a&0xF8)===0xF0)((b=src())===null||(c=src())===null||(d=src())===null)&&fail([a,b,c,d]),dst(((a&0x07)<<18)|((b&0x3F)<<12)|((c&0x3F)<<6)|(d&0x3F));else throw RangeError("Illegal starting byte: "+a)}};utfx.UTF16toUTF8=function(src,dst){var c1,c2=null;while(!0){if((c1=c2!==null?c2:src())===null)
break;if(c1>=0xD800&&c1<=0xDFFF){if((c2=src())!==null){if(c2>=0xDC00&&c2<=0xDFFF){dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);c2=null;continue}}}
dst(c1)}
if(c2!==null)dst(c2)};utfx.UTF8toUTF16=function(src,dst){var cp=null;if(typeof src==='number')
cp=src,src=function(){return null};while(cp!==null||(cp=src())!==null){if(cp<=0xFFFF)
dst(cp);else cp-=0x10000,dst((cp>>10)+0xD800),dst((cp%0x400)+0xDC00);cp=null}};utfx.encodeUTF16toUTF8=function(src,dst){utfx.UTF16toUTF8(src,function(cp){utfx.encodeUTF8(cp,dst)})};utfx.decodeUTF8toUTF16=function(src,dst){utfx.decodeUTF8(src,function(cp){utfx.UTF8toUTF16(cp,dst)})};utfx.calculateCodePoint=function(cp){return(cp<0x80)?1:(cp<0x800)?2:(cp<0x10000)?3:4};utfx.calculateUTF8=function(src){var cp,l=0;while((cp=src())!==null)
l+=(cp<0x80)?1:(cp<0x800)?2:(cp<0x10000)?3:4;return l};utfx.calculateUTF16asUTF8=function(src){var n=0,l=0;utfx.UTF16toUTF8(src,function(cp){++n;l+=(cp<0x80)?1:(cp<0x800)?2:(cp<0x10000)?3:4});return[n,l]};return utfx}();ByteBufferPrototype.toUTF8=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength)}
var sd;try{utfx.decodeUTF8toUTF16(function(){return begin<end?this.view[begin++]:null}.bind(this),sd=stringDestination())}catch(e){if(begin!==end)
throw RangeError("Illegal range: Truncated data, "+begin+" != "+end)}
return sd()};ByteBuffer.fromUTF8=function(str,littleEndian,noAssert){if(!noAssert)
if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");var bb=new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str),!0)[1],littleEndian,noAssert),i=0;utfx.encodeUTF16toUTF8(stringSource(str),function(b){bb.view[i++]=b});bb.limit=i;return bb};return ByteBuffer})},{"long":48}],29:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
var Transform=require('stream').Transform
var StringDecoder=require('string_decoder').StringDecoder
var inherits=require('inherits')
function CipherBase(hashMode){Transform.call(this)
this.hashMode=typeof hashMode==='string'
if(this.hashMode){this[hashMode]=this._finalOrDigest}else{this.final=this._finalOrDigest}
if(this._final){this.__final=this._final
this._final=null}
this._decoder=null
this._encoding=null}
inherits(CipherBase,Transform)
CipherBase.prototype.update=function(data,inputEnc,outputEnc){if(typeof data==='string'){data=Buffer.from(data,inputEnc)}
var outData=this._update(data)
if(this.hashMode)return this
if(outputEnc){outData=this._toString(outData,outputEnc)}
return outData}
CipherBase.prototype.setAutoPadding=function(){}
CipherBase.prototype.getAuthTag=function(){throw new Error('trying to get auth tag in unsupported state')}
CipherBase.prototype.setAuthTag=function(){throw new Error('trying to set auth tag in unsupported state')}
CipherBase.prototype.setAAD=function(){throw new Error('trying to set aad in unsupported state')}
CipherBase.prototype._transform=function(data,_,next){var err
try{if(this.hashMode){this._update(data)}else{this.push(this._update(data))}}catch(e){err=e}finally{next(err)}}
CipherBase.prototype._flush=function(done){var err
try{this.push(this.__final())}catch(e){err=e}
done(err)}
CipherBase.prototype._finalOrDigest=function(outputEnc){var outData=this.__final()||Buffer.alloc(0)
if(outputEnc){outData=this._toString(outData,outputEnc,!0)}
return outData}
CipherBase.prototype._toString=function(value,enc,fin){if(!this._decoder){this._decoder=new StringDecoder(enc)
this._encoding=enc}
if(this._encoding!==enc)throw new Error('can\'t switch encodings')
var out=this._decoder.write(value)
if(fin){out+=this._decoder.end()}
return out}
module.exports=CipherBase},{"inherits":45,"safe-buffer":68,"stream":77,"string_decoder":78}],30:[function(require,module,exports){(function(Buffer){function isArray(arg){if(Array.isArray){return Array.isArray(arg)}
return objectToString(arg)==='[object Array]'}
exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean'}
exports.isBoolean=isBoolean;function isNull(arg){return arg===null}
exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}
exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number'}
exports.isNumber=isNumber;function isString(arg){return typeof arg==='string'}
exports.isString=isString;function isSymbol(arg){return typeof arg==='symbol'}
exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}
exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==='[object RegExp]'}
exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==='object'&&arg!==null}
exports.isObject=isObject;function isDate(d){return objectToString(d)==='[object Date]'}
exports.isDate=isDate;function isError(e){return(objectToString(e)==='[object Error]'||e instanceof Error)}
exports.isError=isError;function isFunction(arg){return typeof arg==='function'}
exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||typeof arg==='symbol'||typeof arg==='undefined'}
exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o)}}).call(this,{"isBuffer":require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":46}],31:[function(require,module,exports){(function(Buffer){'use strict'
var inherits=require('inherits')
var md5=require('./md5')
var RIPEMD160=require('ripemd160')
var sha=require('sha.js')
var Base=require('cipher-base')
function HashNoConstructor(hash){Base.call(this,'digest')
this._hash=hash
this.buffers=[]}
inherits(HashNoConstructor,Base)
HashNoConstructor.prototype._update=function(data){this.buffers.push(data)}
HashNoConstructor.prototype._final=function(){var buf=Buffer.concat(this.buffers)
var r=this._hash(buf)
this.buffers=null
return r}
function Hash(hash){Base.call(this,'digest')
this._hash=hash}
inherits(Hash,Base)
Hash.prototype._update=function(data){this._hash.update(data)}
Hash.prototype._final=function(){return this._hash.digest()}
module.exports=function createHash(alg){alg=alg.toLowerCase()
if(alg==='md5')return new HashNoConstructor(md5)
if(alg==='rmd160'||alg==='ripemd160')return new Hash(new RIPEMD160())
return new Hash(sha(alg))}}).call(this,require("buffer").Buffer)},{"./md5":33,"buffer":27,"cipher-base":29,"inherits":45,"ripemd160":67,"sha.js":70}],32:[function(require,module,exports){(function(Buffer){'use strict'
var intSize=4
var zeroBuffer=new Buffer(intSize)
zeroBuffer.fill(0)
var charSize=8
var hashSize=16
function toArray(buf){if((buf.length%intSize)!==0){var len=buf.length+(intSize-(buf.length%intSize))
buf=Buffer.concat([buf,zeroBuffer],len)}
var arr=new Array(buf.length>>>2)
for(var i=0,j=0;i<buf.length;i+=intSize,j++){arr[j]=buf.readInt32LE(i)}
return arr}
module.exports=function hash(buf,fn){var arr=fn(toArray(buf),buf.length*charSize)
buf=new Buffer(hashSize)
for(var i=0;i<arr.length;i++){buf.writeInt32LE(arr[i],i<<2,!0)}
return buf}}).call(this,require("buffer").Buffer)},{"buffer":27}],33:[function(require,module,exports){'use strict'
var makeHash=require('./make-hash')
function core_md5(x,len){x[len>>5]|=0x80<<((len)%32)
x[(((len+64)>>>9)<<4)+14]=len
var a=1732584193
var b=-271733879
var c=-1732584194
var d=271733878
for(var i=0;i<x.length;i+=16){var olda=a
var oldb=b
var oldc=c
var oldd=d
a=md5_ff(a,b,c,d,x[i+0],7,-680876936)
d=md5_ff(d,a,b,c,x[i+1],12,-389564586)
c=md5_ff(c,d,a,b,x[i+2],17,606105819)
b=md5_ff(b,c,d,a,x[i+3],22,-1044525330)
a=md5_ff(a,b,c,d,x[i+4],7,-176418897)
d=md5_ff(d,a,b,c,x[i+5],12,1200080426)
c=md5_ff(c,d,a,b,x[i+6],17,-1473231341)
b=md5_ff(b,c,d,a,x[i+7],22,-45705983)
a=md5_ff(a,b,c,d,x[i+8],7,1770035416)
d=md5_ff(d,a,b,c,x[i+9],12,-1958414417)
c=md5_ff(c,d,a,b,x[i+10],17,-42063)
b=md5_ff(b,c,d,a,x[i+11],22,-1990404162)
a=md5_ff(a,b,c,d,x[i+12],7,1804603682)
d=md5_ff(d,a,b,c,x[i+13],12,-40341101)
c=md5_ff(c,d,a,b,x[i+14],17,-1502002290)
b=md5_ff(b,c,d,a,x[i+15],22,1236535329)
a=md5_gg(a,b,c,d,x[i+1],5,-165796510)
d=md5_gg(d,a,b,c,x[i+6],9,-1069501632)
c=md5_gg(c,d,a,b,x[i+11],14,643717713)
b=md5_gg(b,c,d,a,x[i+0],20,-373897302)
a=md5_gg(a,b,c,d,x[i+5],5,-701558691)
d=md5_gg(d,a,b,c,x[i+10],9,38016083)
c=md5_gg(c,d,a,b,x[i+15],14,-660478335)
b=md5_gg(b,c,d,a,x[i+4],20,-405537848)
a=md5_gg(a,b,c,d,x[i+9],5,568446438)
d=md5_gg(d,a,b,c,x[i+14],9,-1019803690)
c=md5_gg(c,d,a,b,x[i+3],14,-187363961)
b=md5_gg(b,c,d,a,x[i+8],20,1163531501)
a=md5_gg(a,b,c,d,x[i+13],5,-1444681467)
d=md5_gg(d,a,b,c,x[i+2],9,-51403784)
c=md5_gg(c,d,a,b,x[i+7],14,1735328473)
b=md5_gg(b,c,d,a,x[i+12],20,-1926607734)
a=md5_hh(a,b,c,d,x[i+5],4,-378558)
d=md5_hh(d,a,b,c,x[i+8],11,-2022574463)
c=md5_hh(c,d,a,b,x[i+11],16,1839030562)
b=md5_hh(b,c,d,a,x[i+14],23,-35309556)
a=md5_hh(a,b,c,d,x[i+1],4,-1530992060)
d=md5_hh(d,a,b,c,x[i+4],11,1272893353)
c=md5_hh(c,d,a,b,x[i+7],16,-155497632)
b=md5_hh(b,c,d,a,x[i+10],23,-1094730640)
a=md5_hh(a,b,c,d,x[i+13],4,681279174)
d=md5_hh(d,a,b,c,x[i+0],11,-358537222)
c=md5_hh(c,d,a,b,x[i+3],16,-722521979)
b=md5_hh(b,c,d,a,x[i+6],23,76029189)
a=md5_hh(a,b,c,d,x[i+9],4,-640364487)
d=md5_hh(d,a,b,c,x[i+12],11,-421815835)
c=md5_hh(c,d,a,b,x[i+15],16,530742520)
b=md5_hh(b,c,d,a,x[i+2],23,-995338651)
a=md5_ii(a,b,c,d,x[i+0],6,-198630844)
d=md5_ii(d,a,b,c,x[i+7],10,1126891415)
c=md5_ii(c,d,a,b,x[i+14],15,-1416354905)
b=md5_ii(b,c,d,a,x[i+5],21,-57434055)
a=md5_ii(a,b,c,d,x[i+12],6,1700485571)
d=md5_ii(d,a,b,c,x[i+3],10,-1894986606)
c=md5_ii(c,d,a,b,x[i+10],15,-1051523)
b=md5_ii(b,c,d,a,x[i+1],21,-2054922799)
a=md5_ii(a,b,c,d,x[i+8],6,1873313359)
d=md5_ii(d,a,b,c,x[i+15],10,-30611744)
c=md5_ii(c,d,a,b,x[i+6],15,-1560198380)
b=md5_ii(b,c,d,a,x[i+13],21,1309151649)
a=md5_ii(a,b,c,d,x[i+4],6,-145523070)
d=md5_ii(d,a,b,c,x[i+11],10,-1120210379)
c=md5_ii(c,d,a,b,x[i+2],15,718787259)
b=md5_ii(b,c,d,a,x[i+9],21,-343485551)
a=safe_add(a,olda)
b=safe_add(b,oldb)
c=safe_add(c,oldc)
d=safe_add(d,oldd)}
return[a,b,c,d]}
function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}
function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)}
function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)}
function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}
function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)}
function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF)
var msw=(x>>16)+(y>>16)+(lsw>>16)
return(msw<<16)|(lsw&0xFFFF)}
function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}
module.exports=function md5(buf){return makeHash(buf,core_md5)}},{"./make-hash":32}],34:[function(require,module,exports){'use strict'
var inherits=require('inherits')
var Legacy=require('./legacy')
var Base=require('cipher-base')
var Buffer=require('safe-buffer').Buffer
var md5=require('create-hash/md5')
var RIPEMD160=require('ripemd160')
var sha=require('sha.js')
var ZEROS=Buffer.alloc(128)
function Hmac(alg,key){Base.call(this,'digest')
if(typeof key==='string'){key=Buffer.from(key)}
var blocksize=(alg==='sha512'||alg==='sha384')?128:64
this._alg=alg
this._key=key
if(key.length>blocksize){var hash=alg==='rmd160'?new RIPEMD160():sha(alg)
key=hash.update(key).digest()}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize)}
var ipad=this._ipad=Buffer.allocUnsafe(blocksize)
var opad=this._opad=Buffer.allocUnsafe(blocksize)
for(var i=0;i<blocksize;i++){ipad[i]=key[i]^0x36
opad[i]=key[i]^0x5C}
this._hash=alg==='rmd160'?new RIPEMD160():sha(alg)
this._hash.update(ipad)}
inherits(Hmac,Base)
Hmac.prototype._update=function(data){this._hash.update(data)}
Hmac.prototype._final=function(){var h=this._hash.digest()
var hash=this._alg==='rmd160'?new RIPEMD160():sha(this._alg)
return hash.update(this._opad).update(h).digest()}
module.exports=function createHmac(alg,key){alg=alg.toLowerCase()
if(alg==='rmd160'||alg==='ripemd160'){return new Hmac('rmd160',key)}
if(alg==='md5'){return new Legacy(md5,key)}
return new Hmac(alg,key)}},{"./legacy":35,"cipher-base":29,"create-hash/md5":33,"inherits":45,"ripemd160":67,"safe-buffer":68,"sha.js":70}],35:[function(require,module,exports){'use strict'
var inherits=require('inherits')
var Buffer=require('safe-buffer').Buffer
var Base=require('cipher-base')
var ZEROS=Buffer.alloc(128)
var blocksize=64
function Hmac(alg,key){Base.call(this,'digest')
if(typeof key==='string'){key=Buffer.from(key)}
this._alg=alg
this._key=key
if(key.length>blocksize){key=alg(key)}else if(key.length<blocksize){key=Buffer.concat([key,ZEROS],blocksize)}
var ipad=this._ipad=Buffer.allocUnsafe(blocksize)
var opad=this._opad=Buffer.allocUnsafe(blocksize)
for(var i=0;i<blocksize;i++){ipad[i]=key[i]^0x36
opad[i]=key[i]^0x5C}
this._hash=[ipad]}
inherits(Hmac,Base)
Hmac.prototype._update=function(data){this._hash.push(data)}
Hmac.prototype._final=function(){var h=this._alg(Buffer.concat(this._hash))
return this._alg(Buffer.concat([this._opad,h]))}
module.exports=Hmac},{"cipher-base":29,"inherits":45,"safe-buffer":68}],36:[function(require,module,exports){var assert=require('assert')
var BigInteger=require('bigi')
var Point=require('./point')
function Curve(p,a,b,Gx,Gy,n,h){this.p=p
this.a=a
this.b=b
this.G=Point.fromAffine(this,Gx,Gy)
this.n=n
this.h=h
this.infinity=new Point(this,null,null,BigInteger.ZERO)
this.pOverFour=p.add(BigInteger.ONE).shiftRight(2)
this.pLength=Math.floor((this.p.bitLength()+7)/8)}
Curve.prototype.pointFromX=function(isOdd,x){var alpha=x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p)
var beta=alpha.modPow(this.pOverFour,this.p)
var y=beta
if(beta.isEven()^!isOdd){y=this.p.subtract(y)}
return Point.fromAffine(this,x,y)}
Curve.prototype.isInfinity=function(Q){if(Q===this.infinity)return!0
return Q.z.signum()===0&&Q.y.signum()!==0}
Curve.prototype.isOnCurve=function(Q){if(this.isInfinity(Q))return!0
var x=Q.affineX
var y=Q.affineY
var a=this.a
var b=this.b
var p=this.p
if(x.signum()<0||x.compareTo(p)>=0)return!1
if(y.signum()<0||y.compareTo(p)>=0)return!1
var lhs=y.square().mod(p)
var rhs=x.pow(3).add(a.multiply(x)).add(b).mod(p)
return lhs.equals(rhs)}
Curve.prototype.validate=function(Q){assert(!this.isInfinity(Q),'Point is at infinity')
assert(this.isOnCurve(Q),'Point is not on the curve')
var nQ=Q.multiply(this.n)
assert(this.isInfinity(nQ),'Point is not a scalar multiple of G')
return!0}
module.exports=Curve},{"./point":40,"assert":1,"bigi":6}],37:[function(require,module,exports){module.exports={"secp128r1":{"p":"fffffffdffffffffffffffffffffffff","a":"fffffffdfffffffffffffffffffffffc","b":"e87579c11079f43dd824993c2cee5ed3","n":"fffffffe0000000075a30d1b9038a115","h":"01","Gx":"161ff7528b899b2d0c28607ca52c5b86","Gy":"cf5ac8395bafeb13c02da292dded7a83"},"secp160k1":{"p":"fffffffffffffffffffffffffffffffeffffac73","a":"00","b":"07","n":"0100000000000000000001b8fa16dfab9aca16b6b3","h":"01","Gx":"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb","Gy":"938cf935318fdced6bc28286531733c3f03c4fee"},"secp160r1":{"p":"ffffffffffffffffffffffffffffffff7fffffff","a":"ffffffffffffffffffffffffffffffff7ffffffc","b":"1c97befc54bd7a8b65acf89f81d4d4adc565fa45","n":"0100000000000000000001f4c8f927aed3ca752257","h":"01","Gx":"4a96b5688ef573284664698968c38bb913cbfc82","Gy":"23a628553168947d59dcc912042351377ac5fb32"},"secp192k1":{"p":"fffffffffffffffffffffffffffffffffffffffeffffee37","a":"00","b":"03","n":"fffffffffffffffffffffffe26f2fc170f69466a74defd8d","h":"01","Gx":"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","Gy":"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},"secp192r1":{"p":"fffffffffffffffffffffffffffffffeffffffffffffffff","a":"fffffffffffffffffffffffffffffffefffffffffffffffc","b":"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","n":"ffffffffffffffffffffffff99def836146bc9b1b4d22831","h":"01","Gx":"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","Gy":"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},"secp256k1":{"p":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f","a":"00","b":"07","n":"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","h":"01","Gx":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","Gy":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},"secp256r1":{"p":"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff","a":"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc","b":"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","n":"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551","h":"01","Gx":"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","Gy":"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}},{}],38:[function(require,module,exports){var Point=require('./point')
var Curve=require('./curve')
var getCurveByName=require('./names')
module.exports={Curve:Curve,Point:Point,getCurveByName:getCurveByName}},{"./curve":36,"./names":39,"./point":40}],39:[function(require,module,exports){var BigInteger=require('bigi')
var curves=require('./curves.json')
var Curve=require('./curve')
function getCurveByName(name){var curve=curves[name]
if(!curve)return null
var p=new BigInteger(curve.p,16)
var a=new BigInteger(curve.a,16)
var b=new BigInteger(curve.b,16)
var n=new BigInteger(curve.n,16)
var h=new BigInteger(curve.h,16)
var Gx=new BigInteger(curve.Gx,16)
var Gy=new BigInteger(curve.Gy,16)
return new Curve(p,a,b,Gx,Gy,n,h)}
module.exports=getCurveByName},{"./curve":36,"./curves.json":37,"bigi":6}],40:[function(require,module,exports){(function(Buffer){var assert=require('assert')
var BigInteger=require('bigi')
var THREE=BigInteger.valueOf(3)
function Point(curve,x,y,z){assert.notStrictEqual(z,undefined,'Missing Z coordinate')
this.curve=curve
this.x=x
this.y=y
this.z=z
this._zInv=null
this.compressed=!0}
Object.defineProperty(Point.prototype,'zInv',{get:function(){if(this._zInv===null){this._zInv=this.z.modInverse(this.curve.p)}
return this._zInv}})
Object.defineProperty(Point.prototype,'affineX',{get:function(){return this.x.multiply(this.zInv).mod(this.curve.p)}})
Object.defineProperty(Point.prototype,'affineY',{get:function(){return this.y.multiply(this.zInv).mod(this.curve.p)}})
Point.fromAffine=function(curve,x,y){return new Point(curve,x,y,BigInteger.ONE)}
Point.prototype.equals=function(other){if(other===this)return!0
if(this.curve.isInfinity(this))return this.curve.isInfinity(other)
if(this.curve.isInfinity(other))return this.curve.isInfinity(this)
var u=other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p)
if(u.signum()!==0)return!1
var v=other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p)
return v.signum()===0}
Point.prototype.negate=function(){var y=this.curve.p.subtract(this.y)
return new Point(this.curve,this.x,y,this.z)}
Point.prototype.add=function(b){if(this.curve.isInfinity(this))return b
if(this.curve.isInfinity(b))return this
var x1=this.x
var y1=this.y
var x2=b.x
var y2=b.y
var u=y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p)
var v=x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p)
if(v.signum()===0){if(u.signum()===0){return this.twice()}
return this.curve.infinity}
var v2=v.square()
var v3=v2.multiply(v)
var x1v2=x1.multiply(v2)
var zu2=u.square().multiply(this.z)
var x3=zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p)
var y3=x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p)
var z3=v3.multiply(this.z).multiply(b.z).mod(this.curve.p)
return new Point(this.curve,x3,y3,z3)}
Point.prototype.twice=function(){if(this.curve.isInfinity(this))return this
if(this.y.signum()===0)return this.curve.infinity
var x1=this.x
var y1=this.y
var y1z1=y1.multiply(this.z).mod(this.curve.p)
var y1sqz1=y1z1.multiply(y1).mod(this.curve.p)
var a=this.curve.a
var w=x1.square().multiply(THREE)
if(a.signum()!==0){w=w.add(this.z.square().multiply(a))}
w=w.mod(this.curve.p)
var x3=w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p)
var y3=w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p)
var z3=y1z1.pow(3).shiftLeft(3).mod(this.curve.p)
return new Point(this.curve,x3,y3,z3)}
Point.prototype.multiply=function(k){if(this.curve.isInfinity(this))return this
if(k.signum()===0)return this.curve.infinity
var e=k
var h=e.multiply(THREE)
var neg=this.negate()
var R=this
for(var i=h.bitLength()-2;i>0;--i){var hBit=h.testBit(i)
var eBit=e.testBit(i)
R=R.twice()
if(hBit!==eBit){R=R.add(hBit?this:neg)}}
return R}
Point.prototype.multiplyTwo=function(j,x,k){var i=Math.max(j.bitLength(),k.bitLength())-1
var R=this.curve.infinity
var both=this.add(x)
while(i>=0){var jBit=j.testBit(i)
var kBit=k.testBit(i)
R=R.twice()
if(jBit){if(kBit){R=R.add(both)}else{R=R.add(this)}}else if(kBit){R=R.add(x)}
--i}
return R}
Point.prototype.getEncoded=function(compressed){if(compressed==null)compressed=this.compressed
if(this.curve.isInfinity(this))return new Buffer('00','hex')
var x=this.affineX
var y=this.affineY
var byteLength=this.curve.pLength
var buffer
if(compressed){buffer=new Buffer(1+byteLength)
buffer.writeUInt8(y.isEven()?0x02:0x03,0)}else{buffer=new Buffer(1+byteLength+byteLength)
buffer.writeUInt8(0x04,0)
y.toBuffer(byteLength).copy(buffer,1+byteLength)}
x.toBuffer(byteLength).copy(buffer,1)
return buffer}
Point.decodeFrom=function(curve,buffer){var type=buffer.readUInt8(0)
var compressed=(type!==4)
var byteLength=Math.floor((curve.p.bitLength()+7)/8)
var x=BigInteger.fromBuffer(buffer.slice(1,1+byteLength))
var Q
if(compressed){assert.equal(buffer.length,byteLength+1,'Invalid sequence length')
assert(type===0x02||type===0x03,'Invalid sequence tag')
var isOdd=(type===0x03)
Q=curve.pointFromX(isOdd,x)}else{assert.equal(buffer.length,1+byteLength+byteLength,'Invalid sequence length')
var y=BigInteger.fromBuffer(buffer.slice(1+byteLength))
Q=Point.fromAffine(curve,x,y)}
Q.compressed=compressed
return Q}
Point.prototype.toString=function(){if(this.curve.isInfinity(this))return'(INFINITY)'
return'('+this.affineX.toString()+','+this.affineY.toString()+')'}
module.exports=Point}).call(this,require("buffer").Buffer)},{"assert":1,"bigi":6,"buffer":27}],41:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}
module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))
throw TypeError('n must be a positive number');this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)
this._events={};if(type==='error'){if(!this._events.error||(isObject(this._events.error)&&!this._events.error.length)){er=arguments[1];if(er instanceof Error){throw er}else{var err=new Error('Uncaught, unspecified "error" event. ('+er+')');err.context=er;throw err}}}
handler=this._events[type];if(isUndefined(handler))
return!1;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)
listeners[i].apply(this,args);}
return!0};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))
throw TypeError('listener must be a function');if(!this._events)
this._events={};if(this._events.newListener)
this.emit('newListener',type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])
this._events[type]=listener;else if(isObject(this._events[type]))
this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}
if(m&&m>0&&this._events[type].length>m){this._events[type].warned=!0;console.error('(node) warning: possible EventEmitter memory '+'leak detected. %d listeners added. '+'Use emitter.setMaxListeners() to increase limit.',this._events[type].length);if(typeof console.trace==='function'){console.trace()}}}
return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))
throw TypeError('listener must be a function');var fired=!1;function g(){this.removeListener(type,g);if(!fired){fired=!0;listener.apply(this,arguments)}}
g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))
throw TypeError('listener must be a function');if(!this._events||!this._events[type])
return this;list=this._events[type];length=list.length;position=-1;if(list===listener||(isFunction(list.listener)&&list.listener===listener)){delete this._events[type];if(this._events.removeListener)
this.emit('removeListener',type,listener)}else if(isObject(list)){for(i=length;i-->0;){if(list[i]===listener||(list[i].listener&&list[i].listener===listener)){position=i;break}}
if(position<0)
return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}
if(this._events.removeListener)
this.emit('removeListener',type,listener)}
return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)
return this;if(!this._events.removeListener){if(arguments.length===0)
this._events={};else if(this._events[type])
delete this._events[type];return this}
if(arguments.length===0){for(key in this._events){if(key==='removeListener')continue;this.removeAllListeners(key)}
this.removeAllListeners('removeListener');this._events={};return this}
listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)
this.removeListener(type,listeners[listeners.length-1]);}
delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])
ret=[];else if(isFunction(this._events[type]))
ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))
return 1;else if(evlistener)
return evlistener.length}
return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==='function'}
function isNumber(arg){return typeof arg==='number'}
function isObject(arg){return typeof arg==='object'&&arg!==null}
function isUndefined(arg){return arg===void 0}},{}],42:[function(require,module,exports){var Buffer=require('safe-buffer').Buffer
var MD5=require('md5.js')
function EVP_BytesToKey(password,salt,keyBits,ivLen){if(!Buffer.isBuffer(password))password=Buffer.from(password,'binary')
if(salt){if(!Buffer.isBuffer(salt))salt=Buffer.from(salt,'binary')
if(salt.length!==8)throw new RangeError('salt should be Buffer with 8 byte length')}
var keyLen=keyBits/8
var key=Buffer.alloc(keyLen)
var iv=Buffer.alloc(ivLen||0)
var tmp=Buffer.alloc(0)
while(keyLen>0||ivLen>0){var hash=new MD5()
hash.update(tmp)
hash.update(password)
if(salt)hash.update(salt)
tmp=hash.digest()
var used=0
if(keyLen>0){var keyStart=key.length-keyLen
used=Math.min(keyLen,tmp.length)
tmp.copy(key,keyStart,0,used)
keyLen-=used}
if(used<tmp.length&&ivLen>0){var ivStart=iv.length-ivLen
var length=Math.min(ivLen,tmp.length-used)
tmp.copy(iv,ivStart,used,used+length)
ivLen-=length}}
tmp.fill(0)
return{key:key,iv:iv}}
module.exports=EVP_BytesToKey},{"md5.js":49,"safe-buffer":68}],43:[function(require,module,exports){(function(Buffer){'use strict'
var Transform=require('stream').Transform
var inherits=require('inherits')
function HashBase(blockSize){Transform.call(this)
this._block=new Buffer(blockSize)
this._blockSize=blockSize
this._blockOffset=0
this._length=[0,0,0,0]
this._finalized=!1}
inherits(HashBase,Transform)
HashBase.prototype._transform=function(chunk,encoding,callback){var error=null
try{if(encoding!=='buffer')chunk=new Buffer(chunk,encoding)
this.update(chunk)}catch(err){error=err}
callback(error)}
HashBase.prototype._flush=function(callback){var error=null
try{this.push(this._digest())}catch(err){error=err}
callback(error)}
HashBase.prototype.update=function(data,encoding){if(!Buffer.isBuffer(data)&&typeof data!=='string')throw new TypeError('Data must be a string or a buffer')
if(this._finalized)throw new Error('Digest already called')
if(!Buffer.isBuffer(data))data=new Buffer(data,encoding||'binary')
var block=this._block
var offset=0
while(this._blockOffset+data.length-offset>=this._blockSize){for(var i=this._blockOffset;i<this._blockSize;)block[i++]=data[offset++]
this._update()
this._blockOffset=0}
while(offset<data.length)block[this._blockOffset++]=data[offset++]
for(var j=0,carry=data.length*8;carry>0;++j){this._length[j]+=carry
carry=(this._length[j]/0x0100000000)|0
if(carry>0)this._length[j]-=0x0100000000*carry}
return this}
HashBase.prototype._update=function(data){throw new Error('_update is not implemented')}
HashBase.prototype.digest=function(encoding){if(this._finalized)throw new Error('Digest already called')
this._finalized=!0
var digest=this._digest()
if(encoding!==undefined)digest=digest.toString(encoding)
return digest}
HashBase.prototype._digest=function(){throw new Error('_digest is not implemented')}
module.exports=HashBase}).call(this,require("buffer").Buffer)},{"buffer":27,"inherits":45,"stream":77}],44:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m
var eLen=nBytes*8-mLen-1
var eMax=(1<<eLen)-1
var eBias=eMax>>1
var nBits=-7
var i=isLE?(nBytes-1):0
var d=isLE?-1:1
var s=buffer[offset+i]
i+=d
e=s&((1<<(-nBits))-1)
s>>=(-nBits)
nBits+=eLen
for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}
m=e&((1<<(-nBits))-1)
e>>=(-nBits)
nBits+=mLen
for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}
if(e===0){e=1-eBias}else if(e===eMax){return m?NaN:((s?-1:1)*Infinity)}else{m=m+Math.pow(2,mLen)
e=e-eBias}
return(s?-1:1)*m*Math.pow(2,e-mLen)}
exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c
var eLen=nBytes*8-mLen-1
var eMax=(1<<eLen)-1
var eBias=eMax>>1
var rt=(mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0)
var i=isLE?0:(nBytes-1)
var d=isLE?1:-1
var s=value<0||(value===0&&1/value<0)?1:0
value=Math.abs(value)
if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0
e=eMax}else{e=Math.floor(Math.log(value)/Math.LN2)
if(value*(c=Math.pow(2,-e))<1){e--
c*=2}
if(e+eBias>=1){value+=rt/c}else{value+=rt*Math.pow(2,1-eBias)}
if(value*c>=2){e++
c/=2}
if(e+eBias>=eMax){m=0
e=eMax}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen)
e=e+eBias}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen)
e=0}}
for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}
e=(e<<mLen)|m
eLen+=mLen
for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}
buffer[offset+i-d]|=s*128}},{}],45:[function(require,module,exports){if(typeof Object.create==='function'){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor
ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor
var TempCtor=function(){}
TempCtor.prototype=superCtor.prototype
ctor.prototype=new TempCtor()
ctor.prototype.constructor=ctor}}},{}],46:[function(require,module,exports){module.exports=function(obj){return obj!=null&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer)}
function isBuffer(obj){return!!obj.constructor&&typeof obj.constructor.isBuffer==='function'&&obj.constructor.isBuffer(obj)}
function isSlowBuffer(obj){return typeof obj.readFloatLE==='function'&&typeof obj.slice==='function'&&isBuffer(obj.slice(0,0))}},{}],47:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]'}},{}],48:[function(require,module,exports){(function(global,factory){if(typeof define==='function'&&define.amd)
define([],factory);else if(typeof require==='function'&&typeof module==="object"&&module&&module.exports)
module.exports=factory();else(global.dcodeIO=global.dcodeIO||{})["Long"]=factory()})(this,function(){"use strict";function Long(low,high,unsigned){this.low=low|0;this.high=high|0;this.unsigned=!!unsigned}
Long.prototype.__isLong__;Object.defineProperty(Long.prototype,"__isLong__",{value:!0,enumerable:!1,configurable:!1});function isLong(obj){return(obj&&obj.__isLong__)===!0}
Long.isLong=isLong;var INT_CACHE={};var UINT_CACHE={};function fromInt(value,unsigned){var obj,cachedObj,cache;if(unsigned){value>>>=0;if(cache=(0<=value&&value<256)){cachedObj=UINT_CACHE[value];if(cachedObj)
return cachedObj}
obj=fromBits(value,(value|0)<0?-1:0,!0);if(cache)
UINT_CACHE[value]=obj;return obj}else{value|=0;if(cache=(-128<=value&&value<128)){cachedObj=INT_CACHE[value];if(cachedObj)
return cachedObj}
obj=fromBits(value,value<0?-1:0,!1);if(cache)
INT_CACHE[value]=obj;return obj}}
Long.fromInt=fromInt;function fromNumber(value,unsigned){if(isNaN(value)||!isFinite(value))
return unsigned?UZERO:ZERO;if(unsigned){if(value<0)
return UZERO;if(value>=TWO_PWR_64_DBL)
return MAX_UNSIGNED_VALUE}else{if(value<=-TWO_PWR_63_DBL)
return MIN_VALUE;if(value+1>=TWO_PWR_63_DBL)
return MAX_VALUE}
if(value<0)
return fromNumber(-value,unsigned).neg();return fromBits((value%TWO_PWR_32_DBL)|0,(value/TWO_PWR_32_DBL)|0,unsigned)}
Long.fromNumber=fromNumber;function fromBits(lowBits,highBits,unsigned){return new Long(lowBits,highBits,unsigned)}
Long.fromBits=fromBits;var pow_dbl=Math.pow;function fromString(str,unsigned,radix){if(str.length===0)
throw Error('empty string');if(str==="NaN"||str==="Infinity"||str==="+Infinity"||str==="-Infinity")
return ZERO;if(typeof unsigned==='number'){radix=unsigned,unsigned=!1}else{unsigned=!!unsigned}
radix=radix||10;if(radix<2||36<radix)
throw RangeError('radix');var p;if((p=str.indexOf('-'))>0)
throw Error('interior hyphen');else if(p===0){return fromString(str.substring(1),unsigned,radix).neg()}
var radixToPower=fromNumber(pow_dbl(radix,8));var result=ZERO;for(var i=0;i<str.length;i+=8){var size=Math.min(8,str.length-i),value=parseInt(str.substring(i,i+size),radix);if(size<8){var power=fromNumber(pow_dbl(radix,size));result=result.mul(power).add(fromNumber(value))}else{result=result.mul(radixToPower);result=result.add(fromNumber(value))}}
result.unsigned=unsigned;return result}
Long.fromString=fromString;function fromValue(val){if(val instanceof Long)
return val;if(typeof val==='number')
return fromNumber(val);if(typeof val==='string')
return fromString(val);return fromBits(val.low,val.high,val.unsigned)}
Long.fromValue=fromValue;var TWO_PWR_16_DBL=1<<16;var TWO_PWR_24_DBL=1<<24;var TWO_PWR_32_DBL=TWO_PWR_16_DBL*TWO_PWR_16_DBL;var TWO_PWR_64_DBL=TWO_PWR_32_DBL*TWO_PWR_32_DBL;var TWO_PWR_63_DBL=TWO_PWR_64_DBL/2;var TWO_PWR_24=fromInt(TWO_PWR_24_DBL);var ZERO=fromInt(0);Long.ZERO=ZERO;var UZERO=fromInt(0,!0);Long.UZERO=UZERO;var ONE=fromInt(1);Long.ONE=ONE;var UONE=fromInt(1,!0);Long.UONE=UONE;var NEG_ONE=fromInt(-1);Long.NEG_ONE=NEG_ONE;var MAX_VALUE=fromBits(0xFFFFFFFF|0,0x7FFFFFFF|0,!1);Long.MAX_VALUE=MAX_VALUE;var MAX_UNSIGNED_VALUE=fromBits(0xFFFFFFFF|0,0xFFFFFFFF|0,!0);Long.MAX_UNSIGNED_VALUE=MAX_UNSIGNED_VALUE;var MIN_VALUE=fromBits(0,0x80000000|0,!1);Long.MIN_VALUE=MIN_VALUE;var LongPrototype=Long.prototype;LongPrototype.toInt=function toInt(){return this.unsigned?this.low>>>0:this.low};LongPrototype.toNumber=function toNumber(){if(this.unsigned)
return((this.high>>>0)*TWO_PWR_32_DBL)+(this.low>>>0);return this.high*TWO_PWR_32_DBL+(this.low>>>0)};LongPrototype.toString=function toString(radix){radix=radix||10;if(radix<2||36<radix)
throw RangeError('radix');if(this.isZero())
return'0';if(this.isNegative()){if(this.eq(MIN_VALUE)){var radixLong=fromNumber(radix),div=this.div(radixLong),rem1=div.mul(radixLong).sub(this);return div.toString(radix)+rem1.toInt().toString(radix)}else return'-'+this.neg().toString(radix)}
var radixToPower=fromNumber(pow_dbl(radix,6),this.unsigned),rem=this;var result='';while(!0){var remDiv=rem.div(radixToPower),intval=rem.sub(remDiv.mul(radixToPower)).toInt()>>>0,digits=intval.toString(radix);rem=remDiv;if(rem.isZero())
return digits+result;else{while(digits.length<6)
digits='0'+digits;result=''+digits+result}}};LongPrototype.getHighBits=function getHighBits(){return this.high};LongPrototype.getHighBitsUnsigned=function getHighBitsUnsigned(){return this.high>>>0};LongPrototype.getLowBits=function getLowBits(){return this.low};LongPrototype.getLowBitsUnsigned=function getLowBitsUnsigned(){return this.low>>>0};LongPrototype.getNumBitsAbs=function getNumBitsAbs(){if(this.isNegative())
return this.eq(MIN_VALUE)?64:this.neg().getNumBitsAbs();var val=this.high!=0?this.high:this.low;for(var bit=31;bit>0;bit--)
if((val&(1<<bit))!=0)
break;return this.high!=0?bit+33:bit+1};LongPrototype.isZero=function isZero(){return this.high===0&&this.low===0};LongPrototype.isNegative=function isNegative(){return!this.unsigned&&this.high<0};LongPrototype.isPositive=function isPositive(){return this.unsigned||this.high>=0};LongPrototype.isOdd=function isOdd(){return(this.low&1)===1};LongPrototype.isEven=function isEven(){return(this.low&1)===0};LongPrototype.equals=function equals(other){if(!isLong(other))
other=fromValue(other);if(this.unsigned!==other.unsigned&&(this.high>>>31)===1&&(other.high>>>31)===1)
return!1;return this.high===other.high&&this.low===other.low};LongPrototype.eq=LongPrototype.equals;LongPrototype.notEquals=function notEquals(other){return!this.eq(other)};LongPrototype.neq=LongPrototype.notEquals;LongPrototype.lessThan=function lessThan(other){return this.comp(other)<0};LongPrototype.lt=LongPrototype.lessThan;LongPrototype.lessThanOrEqual=function lessThanOrEqual(other){return this.comp(other)<=0};LongPrototype.lte=LongPrototype.lessThanOrEqual;LongPrototype.greaterThan=function greaterThan(other){return this.comp(other)>0};LongPrototype.gt=LongPrototype.greaterThan;LongPrototype.greaterThanOrEqual=function greaterThanOrEqual(other){return this.comp(other)>=0};LongPrototype.gte=LongPrototype.greaterThanOrEqual;LongPrototype.compare=function compare(other){if(!isLong(other))
other=fromValue(other);if(this.eq(other))
return 0;var thisNeg=this.isNegative(),otherNeg=other.isNegative();if(thisNeg&&!otherNeg)
return-1;if(!thisNeg&&otherNeg)
return 1;if(!this.unsigned)
return this.sub(other).isNegative()?-1:1;return(other.high>>>0)>(this.high>>>0)||(other.high===this.high&&(other.low>>>0)>(this.low>>>0))?-1:1};LongPrototype.comp=LongPrototype.compare;LongPrototype.negate=function negate(){if(!this.unsigned&&this.eq(MIN_VALUE))
return MIN_VALUE;return this.not().add(ONE)};LongPrototype.neg=LongPrototype.negate;LongPrototype.add=function add(addend){if(!isLong(addend))
addend=fromValue(addend);var a48=this.high>>>16;var a32=this.high&0xFFFF;var a16=this.low>>>16;var a00=this.low&0xFFFF;var b48=addend.high>>>16;var b32=addend.high&0xFFFF;var b16=addend.low>>>16;var b00=addend.low&0xFFFF;var c48=0,c32=0,c16=0,c00=0;c00+=a00+b00;c16+=c00>>>16;c00&=0xFFFF;c16+=a16+b16;c32+=c16>>>16;c16&=0xFFFF;c32+=a32+b32;c48+=c32>>>16;c32&=0xFFFF;c48+=a48+b48;c48&=0xFFFF;return fromBits((c16<<16)|c00,(c48<<16)|c32,this.unsigned)};LongPrototype.subtract=function subtract(subtrahend){if(!isLong(subtrahend))
subtrahend=fromValue(subtrahend);return this.add(subtrahend.neg())};LongPrototype.sub=LongPrototype.subtract;LongPrototype.multiply=function multiply(multiplier){if(this.isZero())
return ZERO;if(!isLong(multiplier))
multiplier=fromValue(multiplier);if(multiplier.isZero())
return ZERO;if(this.eq(MIN_VALUE))
return multiplier.isOdd()?MIN_VALUE:ZERO;if(multiplier.eq(MIN_VALUE))
return this.isOdd()?MIN_VALUE:ZERO;if(this.isNegative()){if(multiplier.isNegative())
return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg()}else if(multiplier.isNegative())
return this.mul(multiplier.neg()).neg();if(this.lt(TWO_PWR_24)&&multiplier.lt(TWO_PWR_24))
return fromNumber(this.toNumber()*multiplier.toNumber(),this.unsigned);var a48=this.high>>>16;var a32=this.high&0xFFFF;var a16=this.low>>>16;var a00=this.low&0xFFFF;var b48=multiplier.high>>>16;var b32=multiplier.high&0xFFFF;var b16=multiplier.low>>>16;var b00=multiplier.low&0xFFFF;var c48=0,c32=0,c16=0,c00=0;c00+=a00*b00;c16+=c00>>>16;c00&=0xFFFF;c16+=a16*b00;c32+=c16>>>16;c16&=0xFFFF;c16+=a00*b16;c32+=c16>>>16;c16&=0xFFFF;c32+=a32*b00;c48+=c32>>>16;c32&=0xFFFF;c32+=a16*b16;c48+=c32>>>16;c32&=0xFFFF;c32+=a00*b32;c48+=c32>>>16;c32&=0xFFFF;c48+=a48*b00+a32*b16+a16*b32+a00*b48;c48&=0xFFFF;return fromBits((c16<<16)|c00,(c48<<16)|c32,this.unsigned)};LongPrototype.mul=LongPrototype.multiply;LongPrototype.divide=function divide(divisor){if(!isLong(divisor))
divisor=fromValue(divisor);if(divisor.isZero())
throw Error('division by zero');if(this.isZero())
return this.unsigned?UZERO:ZERO;var approx,rem,res;if(!this.unsigned){if(this.eq(MIN_VALUE)){if(divisor.eq(ONE)||divisor.eq(NEG_ONE))
return MIN_VALUE;else if(divisor.eq(MIN_VALUE))
return ONE;else{var halfThis=this.shr(1);approx=halfThis.div(divisor).shl(1);if(approx.eq(ZERO)){return divisor.isNegative()?ONE:NEG_ONE}else{rem=this.sub(divisor.mul(approx));res=approx.add(rem.div(divisor));return res}}}else if(divisor.eq(MIN_VALUE))
return this.unsigned?UZERO:ZERO;if(this.isNegative()){if(divisor.isNegative())
return this.neg().div(divisor.neg());return this.neg().div(divisor).neg()}else if(divisor.isNegative())
return this.div(divisor.neg()).neg();res=ZERO}else{if(!divisor.unsigned)
divisor=divisor.toUnsigned();if(divisor.gt(this))
return UZERO;if(divisor.gt(this.shru(1)))
return UONE;res=UZERO}
rem=this;while(rem.gte(divisor)){approx=Math.max(1,Math.floor(rem.toNumber()/divisor.toNumber()));var log2=Math.ceil(Math.log(approx)/Math.LN2),delta=(log2<=48)?1:pow_dbl(2,log2-48),approxRes=fromNumber(approx),approxRem=approxRes.mul(divisor);while(approxRem.isNegative()||approxRem.gt(rem)){approx-=delta;approxRes=fromNumber(approx,this.unsigned);approxRem=approxRes.mul(divisor)}
if(approxRes.isZero())
approxRes=ONE;res=res.add(approxRes);rem=rem.sub(approxRem)}
return res};LongPrototype.div=LongPrototype.divide;LongPrototype.modulo=function modulo(divisor){if(!isLong(divisor))
divisor=fromValue(divisor);return this.sub(this.div(divisor).mul(divisor))};LongPrototype.mod=LongPrototype.modulo;LongPrototype.not=function not(){return fromBits(~this.low,~this.high,this.unsigned)};LongPrototype.and=function and(other){if(!isLong(other))
other=fromValue(other);return fromBits(this.low&other.low,this.high&other.high,this.unsigned)};LongPrototype.or=function or(other){if(!isLong(other))
other=fromValue(other);return fromBits(this.low|other.low,this.high|other.high,this.unsigned)};LongPrototype.xor=function xor(other){if(!isLong(other))
other=fromValue(other);return fromBits(this.low^other.low,this.high^other.high,this.unsigned)};LongPrototype.shiftLeft=function shiftLeft(numBits){if(isLong(numBits))
numBits=numBits.toInt();if((numBits&=63)===0)
return this;else if(numBits<32)
return fromBits(this.low<<numBits,(this.high<<numBits)|(this.low>>>(32-numBits)),this.unsigned);else return fromBits(0,this.low<<(numBits-32),this.unsigned)};LongPrototype.shl=LongPrototype.shiftLeft;LongPrototype.shiftRight=function shiftRight(numBits){if(isLong(numBits))
numBits=numBits.toInt();if((numBits&=63)===0)
return this;else if(numBits<32)
return fromBits((this.low>>>numBits)|(this.high<<(32-numBits)),this.high>>numBits,this.unsigned);else return fromBits(this.high>>(numBits-32),this.high>=0?0:-1,this.unsigned)};LongPrototype.shr=LongPrototype.shiftRight;LongPrototype.shiftRightUnsigned=function shiftRightUnsigned(numBits){if(isLong(numBits))
numBits=numBits.toInt();numBits&=63;if(numBits===0)
return this;else{var high=this.high;if(numBits<32){var low=this.low;return fromBits((low>>>numBits)|(high<<(32-numBits)),high>>>numBits,this.unsigned)}else if(numBits===32)
return fromBits(high,0,this.unsigned);else return fromBits(high>>>(numBits-32),0,this.unsigned)}};LongPrototype.shru=LongPrototype.shiftRightUnsigned;LongPrototype.toSigned=function toSigned(){if(!this.unsigned)
return this;return fromBits(this.low,this.high,!1)};LongPrototype.toUnsigned=function toUnsigned(){if(this.unsigned)
return this;return fromBits(this.low,this.high,!0)};LongPrototype.toBytes=function(le){return le?this.toBytesLE():this.toBytesBE()}
LongPrototype.toBytesLE=function(){var hi=this.high,lo=this.low;return[lo&0xff,(lo>>>8)&0xff,(lo>>>16)&0xff,(lo>>>24)&0xff,hi&0xff,(hi>>>8)&0xff,(hi>>>16)&0xff,(hi>>>24)&0xff]}
LongPrototype.toBytesBE=function(){var hi=this.high,lo=this.low;return[(hi>>>24)&0xff,(hi>>>16)&0xff,(hi>>>8)&0xff,hi&0xff,(lo>>>24)&0xff,(lo>>>16)&0xff,(lo>>>8)&0xff,lo&0xff]}
return Long})},{}],49:[function(require,module,exports){(function(Buffer){'use strict'
var inherits=require('inherits')
var HashBase=require('hash-base')
var ARRAY16=new Array(16)
function MD5(){HashBase.call(this,64)
this._a=0x67452301
this._b=0xefcdab89
this._c=0x98badcfe
this._d=0x10325476}
inherits(MD5,HashBase)
MD5.prototype._update=function(){var M=ARRAY16
for(var i=0;i<16;++i)M[i]=this._block.readInt32LE(i*4)
var a=this._a
var b=this._b
var c=this._c
var d=this._d
a=fnF(a,b,c,d,M[0],0xd76aa478,7)
d=fnF(d,a,b,c,M[1],0xe8c7b756,12)
c=fnF(c,d,a,b,M[2],0x242070db,17)
b=fnF(b,c,d,a,M[3],0xc1bdceee,22)
a=fnF(a,b,c,d,M[4],0xf57c0faf,7)
d=fnF(d,a,b,c,M[5],0x4787c62a,12)
c=fnF(c,d,a,b,M[6],0xa8304613,17)
b=fnF(b,c,d,a,M[7],0xfd469501,22)
a=fnF(a,b,c,d,M[8],0x698098d8,7)
d=fnF(d,a,b,c,M[9],0x8b44f7af,12)
c=fnF(c,d,a,b,M[10],0xffff5bb1,17)
b=fnF(b,c,d,a,M[11],0x895cd7be,22)
a=fnF(a,b,c,d,M[12],0x6b901122,7)
d=fnF(d,a,b,c,M[13],0xfd987193,12)
c=fnF(c,d,a,b,M[14],0xa679438e,17)
b=fnF(b,c,d,a,M[15],0x49b40821,22)
a=fnG(a,b,c,d,M[1],0xf61e2562,5)
d=fnG(d,a,b,c,M[6],0xc040b340,9)
c=fnG(c,d,a,b,M[11],0x265e5a51,14)
b=fnG(b,c,d,a,M[0],0xe9b6c7aa,20)
a=fnG(a,b,c,d,M[5],0xd62f105d,5)
d=fnG(d,a,b,c,M[10],0x02441453,9)
c=fnG(c,d,a,b,M[15],0xd8a1e681,14)
b=fnG(b,c,d,a,M[4],0xe7d3fbc8,20)
a=fnG(a,b,c,d,M[9],0x21e1cde6,5)
d=fnG(d,a,b,c,M[14],0xc33707d6,9)
c=fnG(c,d,a,b,M[3],0xf4d50d87,14)
b=fnG(b,c,d,a,M[8],0x455a14ed,20)
a=fnG(a,b,c,d,M[13],0xa9e3e905,5)
d=fnG(d,a,b,c,M[2],0xfcefa3f8,9)
c=fnG(c,d,a,b,M[7],0x676f02d9,14)
b=fnG(b,c,d,a,M[12],0x8d2a4c8a,20)
a=fnH(a,b,c,d,M[5],0xfffa3942,4)
d=fnH(d,a,b,c,M[8],0x8771f681,11)
c=fnH(c,d,a,b,M[11],0x6d9d6122,16)
b=fnH(b,c,d,a,M[14],0xfde5380c,23)
a=fnH(a,b,c,d,M[1],0xa4beea44,4)
d=fnH(d,a,b,c,M[4],0x4bdecfa9,11)
c=fnH(c,d,a,b,M[7],0xf6bb4b60,16)
b=fnH(b,c,d,a,M[10],0xbebfbc70,23)
a=fnH(a,b,c,d,M[13],0x289b7ec6,4)
d=fnH(d,a,b,c,M[0],0xeaa127fa,11)
c=fnH(c,d,a,b,M[3],0xd4ef3085,16)
b=fnH(b,c,d,a,M[6],0x04881d05,23)
a=fnH(a,b,c,d,M[9],0xd9d4d039,4)
d=fnH(d,a,b,c,M[12],0xe6db99e5,11)
c=fnH(c,d,a,b,M[15],0x1fa27cf8,16)
b=fnH(b,c,d,a,M[2],0xc4ac5665,23)
a=fnI(a,b,c,d,M[0],0xf4292244,6)
d=fnI(d,a,b,c,M[7],0x432aff97,10)
c=fnI(c,d,a,b,M[14],0xab9423a7,15)
b=fnI(b,c,d,a,M[5],0xfc93a039,21)
a=fnI(a,b,c,d,M[12],0x655b59c3,6)
d=fnI(d,a,b,c,M[3],0x8f0ccc92,10)
c=fnI(c,d,a,b,M[10],0xffeff47d,15)
b=fnI(b,c,d,a,M[1],0x85845dd1,21)
a=fnI(a,b,c,d,M[8],0x6fa87e4f,6)
d=fnI(d,a,b,c,M[15],0xfe2ce6e0,10)
c=fnI(c,d,a,b,M[6],0xa3014314,15)
b=fnI(b,c,d,a,M[13],0x4e0811a1,21)
a=fnI(a,b,c,d,M[4],0xf7537e82,6)
d=fnI(d,a,b,c,M[11],0xbd3af235,10)
c=fnI(c,d,a,b,M[2],0x2ad7d2bb,15)
b=fnI(b,c,d,a,M[9],0xeb86d391,21)
this._a=(this._a+a)|0
this._b=(this._b+b)|0
this._c=(this._c+c)|0
this._d=(this._d+d)|0}
MD5.prototype._digest=function(){this._block[this._blockOffset++]=0x80
if(this._blockOffset>56){this._block.fill(0,this._blockOffset,64)
this._update()
this._blockOffset=0}
this._block.fill(0,this._blockOffset,56)
this._block.writeUInt32LE(this._length[0],56)
this._block.writeUInt32LE(this._length[1],60)
this._update()
var buffer=new Buffer(16)
buffer.writeInt32LE(this._a,0)
buffer.writeInt32LE(this._b,4)
buffer.writeInt32LE(this._c,8)
buffer.writeInt32LE(this._d,12)
return buffer}
function rotl(x,n){return(x<<n)|(x>>>(32-n))}
function fnF(a,b,c,d,m,k,s){return(rotl((a+((b&c)|((~b)&d))+m+k)|0,s)+b)|0}
function fnG(a,b,c,d,m,k,s){return(rotl((a+((b&d)|(c&(~d)))+m+k)|0,s)+b)|0}
function fnH(a,b,c,d,m,k,s){return(rotl((a+(b^c^d)+m+k)|0,s)+b)|0}
function fnI(a,b,c,d,m,k,s){return(rotl((a+((c^(b|(~d))))+m+k)|0,s)+b)|0}
module.exports=MD5}).call(this,require("buffer").Buffer)},{"buffer":27,"hash-base":50,"inherits":45}],50:[function(require,module,exports){'use strict'
var Buffer=require('safe-buffer').Buffer
var Transform=require('stream').Transform
var inherits=require('inherits')
function throwIfNotStringOrBuffer(val,prefix){if(!Buffer.isBuffer(val)&&typeof val!=='string'){throw new TypeError(prefix+' must be a string or a buffer')}}
function HashBase(blockSize){Transform.call(this)
this._block=Buffer.allocUnsafe(blockSize)
this._blockSize=blockSize
this._blockOffset=0
this._length=[0,0,0,0]
this._finalized=!1}
inherits(HashBase,Transform)
HashBase.prototype._transform=function(chunk,encoding,callback){var error=null
try{this.update(chunk,encoding)}catch(err){error=err}
callback(error)}
HashBase.prototype._flush=function(callback){var error=null
try{this.push(this.digest())}catch(err){error=err}
callback(error)}
HashBase.prototype.update=function(data,encoding){throwIfNotStringOrBuffer(data,'Data')
if(this._finalized)throw new Error('Digest already called')
if(!Buffer.isBuffer(data))data=Buffer.from(data,encoding)
var block=this._block
var offset=0
while(this._blockOffset+data.length-offset>=this._blockSize){for(var i=this._blockOffset;i<this._blockSize;)block[i++]=data[offset++]
this._update()
this._blockOffset=0}
while(offset<data.length)block[this._blockOffset++]=data[offset++]
for(var j=0,carry=data.length*8;carry>0;++j){this._length[j]+=carry
carry=(this._length[j]/0x0100000000)|0
if(carry>0)this._length[j]-=0x0100000000*carry}
return this}
HashBase.prototype._update=function(){throw new Error('_update is not implemented')}
HashBase.prototype.digest=function(encoding){if(this._finalized)throw new Error('Digest already called')
this._finalized=!0
var digest=this._digest()
if(encoding!==undefined)digest=digest.toString(encoding)
this._block.fill(0)
this._blockOffset=0
for(var i=0;i<4;++i)this._length[i]=0
return digest}
HashBase.prototype._digest=function(){throw new Error('_digest is not implemented')}
module.exports=HashBase},{"inherits":45,"safe-buffer":68,"stream":77}],51:[function(require,module,exports){(function(process){'use strict';if(!process.version||process.version.indexOf('v0.')===0||process.version.indexOf('v1.')===0&&process.version.indexOf('v1.8.')!==0){module.exports=nextTick}else{module.exports=process.nextTick}
function nextTick(fn,arg1,arg2,arg3){if(typeof fn!=='function'){throw new TypeError('"callback" argument must be a function')}
var len=arguments.length;var args,i;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function afterTickOne(){fn.call(null,arg1)});case 3:return process.nextTick(function afterTickTwo(){fn.call(null,arg1,arg2)});case 4:return process.nextTick(function afterTickThree(){fn.call(null,arg1,arg2,arg3)});default:args=new Array(len-1);i=0;while(i<args.length){args[i++]=arguments[i]}
return process.nextTick(function afterTick(){fn.apply(null,args)})}}}).call(this,require('_process'))},{"_process":52}],52:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined')}
function defaultClearTimeout(){throw new Error('clearTimeout has not been defined')}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}
try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}}())
function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}
try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}
function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}
try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}
var queue=[];var draining=!1;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}
draining=!1;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}
if(queue.length){drainQueue()}}
function drainQueue(){if(draining){return}
var timeout=runTimeout(cleanUpNextTick);draining=!0;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}
queueIndex=-1;len=queue.length}
currentQueue=null;draining=!1;runClearTimeout(timeout)}
process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}
Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title='browser';process.browser=!0;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]}
process.binding=function(name){throw new Error('process.binding is not supported')};process.cwd=function(){return'/'};process.chdir=function(dir){throw new Error('process.chdir is not supported')};process.umask=function(){return 0}},{}],53:[function(require,module,exports){(function(process,global){'use strict'
function oldBrowser(){throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')}
var Buffer=require('safe-buffer').Buffer
var crypto=global.crypto||global.msCrypto
if(crypto&&crypto.getRandomValues){module.exports=randomBytes}else{module.exports=oldBrowser}
function randomBytes(size,cb){if(size>65536)throw new Error('requested too many random bytes')
var rawBytes=new global.Uint8Array(size)
if(size>0){crypto.getRandomValues(rawBytes)}
var bytes=Buffer.from(rawBytes.buffer)
if(typeof cb==='function'){return process.nextTick(function(){cb(null,bytes)})}
return bytes}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"_process":52,"safe-buffer":68}],54:[function(require,module,exports){module.exports=require('./lib/_stream_duplex.js')},{"./lib/_stream_duplex.js":55}],55:[function(require,module,exports){'use strict';var processNextTick=require('process-nextick-args');var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){keys.push(key)}return keys};module.exports=Duplex;var util=require('core-util-is');util.inherits=require('inherits');var Readable=require('./_stream_readable');var Writable=require('./_stream_writable');util.inherits(Duplex,Readable);var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method]}
function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===!1)this.readable=!1;if(options&&options.writable===!1)this.writable=!1;this.allowHalfOpen=!0;if(options&&options.allowHalfOpen===!1)this.allowHalfOpen=!1;this.once('end',onend)}
function onend(){if(this.allowHalfOpen||this._writableState.ended)return;processNextTick(onEndNT,this)}
function onEndNT(self){self.end()}
Object.defineProperty(Duplex.prototype,'destroyed',{get:function(){if(this._readableState===undefined||this._writableState===undefined){return!1}
return this._readableState.destroyed&&this._writableState.destroyed},set:function(value){if(this._readableState===undefined||this._writableState===undefined){return}
this._readableState.destroyed=value;this._writableState.destroyed=value}});Duplex.prototype._destroy=function(err,cb){this.push(null);this.end();processNextTick(cb,err)};function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}},{"./_stream_readable":57,"./_stream_writable":59,"core-util-is":30,"inherits":45,"process-nextick-args":51}],56:[function(require,module,exports){'use strict';module.exports=PassThrough;var Transform=require('./_stream_transform');var util=require('core-util-is');util.inherits=require('inherits');util.inherits(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options)}
PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},{"./_stream_transform":58,"core-util-is":30,"inherits":45}],57:[function(require,module,exports){(function(process,global){'use strict';var processNextTick=require('process-nextick-args');module.exports=Readable;var isArray=require('isarray');var Duplex;Readable.ReadableState=ReadableState;var EE=require('events').EventEmitter;var EElistenerCount=function(emitter,type){return emitter.listeners(type).length};var Stream=require('./internal/streams/stream');var Buffer=require('safe-buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk)}
function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array}
var util=require('core-util-is');util.inherits=require('inherits');var debugUtil=require('util');var debug=void 0;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream')}else{debug=function(){}}
var BufferList=require('./internal/streams/BufferList');var destroyImpl=require('./internal/streams/destroy');var StringDecoder;util.inherits(Readable,Stream);var kProxyEvents=['error','close','destroy','pause','resume'];function prependListener(emitter,event,fn){if(typeof emitter.prependListener==='function'){return emitter.prependListener(event,fn)}else{if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]]}}
function ReadableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=Math.floor(this.highWaterMark);this.buffer=new BufferList();this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=!1;this.endEmitted=!1;this.reading=!1;this.sync=!0;this.needReadable=!1;this.emittedReadable=!1;this.readableListening=!1;this.resumeScheduled=!1;this.destroyed=!1;this.defaultEncoding=options.defaultEncoding||'utf8';this.awaitDrain=0;this.readingMore=!1;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding}}
function Readable(options){Duplex=Duplex||require('./_stream_duplex');if(!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this);this.readable=!0;if(options){if(typeof options.read==='function')this._read=options.read;if(typeof options.destroy==='function')this._destroy=options.destroy}
Stream.call(this)}
Object.defineProperty(Readable.prototype,'destroyed',{get:function(){if(this._readableState===undefined){return!1}
return this._readableState.destroyed},set:function(value){if(!this._readableState){return}
this._readableState.destroyed=value}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){this.push(null);cb(err)};Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding=''}
skipChunkCheck=!0}}else{skipChunkCheck=!0}
return readableAddChunk(this,chunk,encoding,!1,skipChunkCheck)};Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,!0,!1)};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){var state=stream._readableState;if(chunk===null){state.reading=!1;onEofChunk(stream,state)}else{var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){stream.emit('error',er)}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=='string'&&!state.objectMode&&Object.getPrototypeOf(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk)}
if(addToFront){if(state.endEmitted)stream.emit('error',new Error('stream.unshift() after end event'));else addChunk(stream,state,chunk,!0)}else if(state.ended){stream.emit('error',new Error('stream.push() after EOF'))}else{state.reading=!1;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,!1);else maybeReadMore(stream,state)}else{addChunk(stream,state,chunk,!1)}}}else if(!addToFront){state.reading=!1}}
return needMoreData(state)}
function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){stream.emit('data',chunk);stream.read(0)}else{state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream)}
maybeReadMore(stream,state)}
function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk')}
return er}
function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0)}
Readable.prototype.isPaused=function(){return this._readableState.flowing===!1};Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this};var MAX_HWM=0x800000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM}else{n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++}
return n}
function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length}
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;if(!state.ended){state.needReadable=!0;return 0}
return state.length}
Readable.prototype.read=function(n){debug('read',n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=!1;if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null}
n=howMuchToRead(n,state);if(n===0&&state.ended){if(state.length===0)endReadable(this);return null}
var doRead=state.needReadable;debug('need readable',doRead);if(state.length===0||state.length-n<state.highWaterMark){doRead=!0;debug('length less than watermark',doRead)}
if(state.ended||state.reading){doRead=!1;debug('reading or ended',doRead)}else if(doRead){debug('do read');state.reading=!0;state.sync=!0;if(state.length===0)state.needReadable=!0;this._read(state.highWaterMark);state.sync=!1;if(!state.reading)n=howMuchToRead(nOrig,state)}
var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=!0;n=0}else{state.length-=n}
if(state.length===0){if(!state.ended)state.needReadable=!0;if(nOrig!==n&&state.ended)endReadable(this)}
if(ret!==null)this.emit('data',ret);return ret};function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length}}
state.ended=!0;emitReadable(stream)}
function emitReadable(stream){var state=stream._readableState;state.needReadable=!1;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=!0;if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream)}}
function emitReadable_(stream){debug('emit readable');stream.emit('readable');flow(stream)}
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=!0;processNextTick(maybeReadMore_,stream,state)}}
function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug('maybeReadMore read 0');stream.read(0);if(len===state.length)
break;else len=state.length}
state.readingMore=!1}
Readable.prototype._read=function(n){this.emit('error',new Error('_read() is not implemented'))};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break}
state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==!1)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)processNextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable,unpipeInfo){debug('onunpipe');if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===!1){unpipeInfo.hasUnpiped=!0;cleanup()}}}
function onend(){debug('onend');dest.end()}
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=!1;function cleanup(){debug('cleanup');dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',unpipe);src.removeListener('data',ondata);cleanedUp=!0;if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain()}
var increasedAwaitDrain=!1;src.on('data',ondata);function ondata(chunk){debug('ondata');increasedAwaitDrain=!1;var ret=dest.write(chunk);if(!1===ret&&!increasedAwaitDrain){if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',src._readableState.awaitDrain);src._readableState.awaitDrain++;increasedAwaitDrain=!0}
src.pause()}}
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)dest.emit('error',er)}
prependListener(dest,'error',onerror);function onclose(){dest.removeListener('finish',onfinish);unpipe()}
dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe()}
dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest)}
dest.emit('pipe',src);if(!state.flowing){debug('pipe resume');src.resume()}
return dest};function pipeOnDrain(src){return function(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=!0;flow(src)}}}
Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:!1};if(state.pipesCount===0)return this;if(state.pipesCount===1){if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;state.pipes=null;state.pipesCount=0;state.flowing=!1;if(dest)dest.emit('unpipe',this,unpipeInfo);return this}
if(!dest){var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=!1;for(var i=0;i<len;i++){dests[i].emit('unpipe',this,unpipeInfo)}return this}
var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this,unpipeInfo);return this};Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if(ev==='data'){if(this._readableState.flowing!==!1)this.resume()}else if(ev==='readable'){var state=this._readableState;if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=!0;state.emittedReadable=!1;if(!state.reading){processNextTick(nReadingNextTick,this)}else if(state.length){emitReadable(this)}}}
return res};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0)}
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');state.flowing=!0;resume(this,state)}
return this};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=!0;processNextTick(resume_,stream,state)}}
function resume_(stream,state){if(!state.reading){debug('resume read 0');stream.read(0)}
state.resumeScheduled=!1;state.awaitDrain=0;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0)}
Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(!1!==this._readableState.flowing){debug('pause');this._readableState.flowing=!1;this.emit('pause')}
return this};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);while(state.flowing&&stream.read()!==null){}}
Readable.prototype.wrap=function(stream){var state=this._readableState;var paused=!1;var self=this;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)self.push(chunk)}
self.push(null)});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=self.push(chunk);if(!ret){paused=!0;stream.pause()}});for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i)}}
for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],self.emit.bind(self,kProxyEvents[n]))}
self._read=function(n){debug('wrapped _read',n);if(paused){paused=!1;stream.resume()}};return self};Readable._fromList=fromList;function fromList(n,state){if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.head.data;else ret=state.buffer.concat(state.length);state.buffer.clear()}else{ret=fromListPartial(n,state.buffer,state.decoder)}
return ret}
function fromListPartial(n,list,hasStrings){var ret;if(n<list.head.data.length){ret=list.head.data.slice(0,n);list.head.data=list.head.data.slice(n)}else if(n===list.head.data.length){ret=list.shift()}else{ret=hasStrings?copyFromBufferString(n,list):copyFromBuffer(n,list)}
return ret}
function copyFromBufferString(n,list){var p=list.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null}else{list.head=p;p.data=str.slice(nb)}
break}
++c}
list.length-=c;return ret}
function copyFromBuffer(n,list){var ret=Buffer.allocUnsafe(n);var p=list.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null}else{list.head=p;p.data=buf.slice(nb)}
break}
++c}
list.length-=c;return ret}
function endReadable(stream){var state=stream._readableState;if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!state.endEmitted){state.ended=!0;processNextTick(endReadableNT,state,stream)}}
function endReadableNT(state,stream){if(!state.endEmitted&&state.length===0){state.endEmitted=!0;stream.readable=!1;stream.emit('end')}}
function forEach(xs,f){for(var i=0,l=xs.length;i<l;i++){f(xs[i],i)}}
function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i}
return-1}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./_stream_duplex":55,"./internal/streams/BufferList":60,"./internal/streams/destroy":61,"./internal/streams/stream":62,"_process":52,"core-util-is":30,"events":41,"inherits":45,"isarray":47,"process-nextick-args":51,"safe-buffer":68,"string_decoder/":78,"util":8}],58:[function(require,module,exports){'use strict';module.exports=Transform;var Duplex=require('./_stream_duplex');var util=require('core-util-is');util.inherits=require('inherits');util.inherits(Transform,Duplex);function TransformState(stream){this.afterTransform=function(er,data){return afterTransform(stream,er,data)};this.needTransform=!1;this.transforming=!1;this.writecb=null;this.writechunk=null;this.writeencoding=null}
function afterTransform(stream,er,data){var ts=stream._transformState;ts.transforming=!1;var cb=ts.writecb;if(!cb){return stream.emit('error',new Error('write callback called multiple times'))}
ts.writechunk=null;ts.writecb=null;if(data!==null&&data!==undefined)stream.push(data);cb(er);var rs=stream._readableState;rs.reading=!1;if(rs.needReadable||rs.length<rs.highWaterMark){stream._read(rs.highWaterMark)}}
function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState=new TransformState(this);var stream=this;this._readableState.needReadable=!0;this._readableState.sync=!1;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush}
this.once('prefinish',function(){if(typeof this._flush==='function')this._flush(function(er,data){done(stream,er,data)});else done(stream)})}
Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=!1;return Duplex.prototype.push.call(this,chunk,encoding)};Transform.prototype._transform=function(chunk,encoding,cb){throw new Error('_transform() is not implemented')};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark)}};Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=!0;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform)}else{ts.needTransform=!0}};Transform.prototype._destroy=function(err,cb){var _this=this;Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);_this.emit('close')})};function done(stream,er,data){if(er)return stream.emit('error',er);if(data!==null&&data!==undefined)stream.push(data);var ws=stream._writableState;var ts=stream._transformState;if(ws.length)throw new Error('Calling transform done when ws.length != 0');if(ts.transforming)throw new Error('Calling transform done when still transforming');return stream.push(null)}},{"./_stream_duplex":55,"core-util-is":30,"inherits":45}],59:[function(require,module,exports){(function(process,global){'use strict';var processNextTick=require('process-nextick-args');module.exports=Writable;function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null}
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state)}}
var asyncWrite=!process.browser&&['v0.10','v0.9.'].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;var Duplex;Writable.WritableState=WritableState;var util=require('core-util-is');util.inherits=require('inherits');var internalUtil={deprecate:require('util-deprecate')};var Stream=require('./internal/streams/stream');var Buffer=require('safe-buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk)}
function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array}
var destroyImpl=require('./internal/streams/destroy');util.inherits(Writable,Stream);function nop(){}
function WritableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};this.objectMode=!!options.objectMode;if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;var hwm=options.highWaterMark;var defaultHwm=this.objectMode?16:16*1024;this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;this.highWaterMark=Math.floor(this.highWaterMark);this.finalCalled=!1;this.needDrain=!1;this.ending=!1;this.ended=!1;this.finished=!1;this.destroyed=!1;var noDecode=options.decodeStrings===!1;this.decodeStrings=!noDecode;this.defaultEncoding=options.defaultEncoding||'utf8';this.length=0;this.writing=!1;this.corked=0;this.sync=!0;this.bufferProcessing=!1;this.onwrite=function(er){onwrite(stream,er)};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=!1;this.errorEmitted=!1;this.bufferedRequestCount=0;this.corkedRequestsFree=new CorkedRequest(this)}
WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next}
return out};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function(){return this.getBuffer()},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.','DEP0003')})}catch(_){}})();var realHasInstance;if(typeof Symbol==='function'&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==='function'){realHasInstance=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function(object){if(realHasInstance.call(this,object))return!0;return object&&object._writableState instanceof WritableState}})}else{realHasInstance=function(object){return object instanceof this}}
function Writable(options){Duplex=Duplex||require('./_stream_duplex');if(!realHasInstance.call(Writable,this)&&!(this instanceof Duplex)){return new Writable(options)}
this._writableState=new WritableState(options,this);this.writable=!0;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;if(typeof options.destroy==='function')this._destroy=options.destroy;if(typeof options.final==='function')this._final=options.final}
Stream.call(this)}
Writable.prototype.pipe=function(){this.emit('error',new Error('Cannot pipe, not readable'))};function writeAfterEnd(stream,cb){var er=new Error('write after end');stream.emit('error',er);processNextTick(cb,er)}
function validChunk(stream,state,chunk,cb){var valid=!0;var er=!1;if(chunk===null){er=new TypeError('May not write null values to stream')}else if(typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk')}
if(er){stream.emit('error',er);processNextTick(cb,er);valid=!1}
return valid}
Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=!1;var isBuf=_isUint8Array(chunk)&&!state.objectMode;if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk)}
if(typeof encoding==='function'){cb=encoding;encoding=null}
if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb)}
return ret};Writable.prototype.cork=function(){var state=this._writableState;state.corked++};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state)}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new TypeError('Unknown encoding: '+encoding);this._writableState.defaultEncoding=encoding;return this};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==!1&&typeof chunk==='string'){chunk=Buffer.from(chunk,encoding)}
return chunk}
function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=!0;encoding='buffer';chunk=newChunk}}
var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;if(!ret)state.needDrain=!0;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest}else{state.bufferedRequest=state.lastBufferedRequest}
state.bufferedRequestCount+=1}else{doWrite(stream,state,!1,len,chunk,encoding,cb)}
return ret}
function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=!0;state.sync=!0;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=!1}
function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){processNextTick(cb,er);processNextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=!0;stream.emit('error',er)}else{cb(er);stream._writableState.errorEmitted=!0;stream.emit('error',er);finishMaybe(stream,state)}}
function onwriteStateUpdate(state){state.writing=!1;state.writecb=null;state.length-=state.writelen;state.writelen=0}
function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state)}
if(sync){asyncWrite(afterWrite,stream,state,finished,cb)}else{afterWrite(stream,state,finished,cb)}}}
function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state)}
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=!1;stream.emit('drain')}}
function clearBuffer(stream,state){state.bufferProcessing=!0;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=!0;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=!1;entry=entry.next;count+=1}
buffer.allBuffers=allBuffers;doWrite(stream,state,!0,state.length,buffer,'',holder.finish);state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null}else{state.corkedRequestsFree=new CorkedRequest(state)}}else{while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,!1,len,chunk,encoding,cb);entry=entry.next;if(state.writing){break}}
if(entry===null)state.lastBufferedRequest=null}
state.bufferedRequestCount=0;state.bufferedRequest=entry;state.bufferProcessing=!1}
Writable.prototype._write=function(chunk,encoding,cb){cb(new Error('_write() is not implemented'))};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null}else if(typeof encoding==='function'){cb=encoding;encoding=null}
if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);if(state.corked){state.corked=1;this.uncork()}
if(!state.ending&&!state.finished)endWritable(this,state,cb)};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing}
function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){stream.emit('error',err)}
state.prefinished=!0;stream.emit('prefinish');finishMaybe(stream,state)})}
function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==='function'){state.pendingcb++;state.finalCalled=!0;processNextTick(callFinal,stream,state)}else{state.prefinished=!0;stream.emit('prefinish')}}}
function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=!0;stream.emit('finish')}}
return need}
function endWritable(stream,state,cb){state.ending=!0;finishMaybe(stream,state);if(cb){if(state.finished)processNextTick(cb);else stream.once('finish',cb)}
state.ended=!0;stream.writable=!1}
function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next}
if(state.corkedRequestsFree){state.corkedRequestsFree.next=corkReq}else{state.corkedRequestsFree=corkReq}}
Object.defineProperty(Writable.prototype,'destroyed',{get:function(){if(this._writableState===undefined){return!1}
return this._writableState.destroyed},set:function(value){if(!this._writableState){return}
this._writableState.destroyed=value}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){this.end();cb(err)}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./_stream_duplex":55,"./internal/streams/destroy":61,"./internal/streams/stream":62,"_process":52,"core-util-is":30,"inherits":45,"process-nextick-args":51,"safe-buffer":68,"util-deprecate":79}],60:[function(require,module,exports){'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}
var Buffer=require('safe-buffer').Buffer;function copyBuffer(src,target,offset){src.copy(target,offset)}
module.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0}
BufferList.prototype.push=function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length};BufferList.prototype.unshift=function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length};BufferList.prototype.shift=function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret};BufferList.prototype.clear=function clear(){this.head=this.tail=null;this.length=0};BufferList.prototype.join=function join(s){if(this.length===0)return'';var p=this.head;var ret=''+p.data;while(p=p.next){ret+=s+p.data}return ret};BufferList.prototype.concat=function concat(n){if(this.length===0)return Buffer.alloc(0);if(this.length===1)return this.head.data;var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next}
return ret};return BufferList}()},{"safe-buffer":68}],61:[function(require,module,exports){'use strict';var processNextTick=require('process-nextick-args');function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err)}else if(err&&(!this._writableState||!this._writableState.errorEmitted)){processNextTick(emitErrorNT,this,err)}
return}
if(this._readableState){this._readableState.destroyed=!0}
if(this._writableState){this._writableState.destroyed=!0}
this._destroy(err||null,function(err){if(!cb&&err){processNextTick(emitErrorNT,_this,err);if(_this._writableState){_this._writableState.errorEmitted=!0}}else if(cb){cb(err)}})}
function undestroy(){if(this._readableState){this._readableState.destroyed=!1;this._readableState.reading=!1;this._readableState.ended=!1;this._readableState.endEmitted=!1}
if(this._writableState){this._writableState.destroyed=!1;this._writableState.ended=!1;this._writableState.ending=!1;this._writableState.finished=!1;this._writableState.errorEmitted=!1}}
function emitErrorNT(self,err){self.emit('error',err)}
module.exports={destroy:destroy,undestroy:undestroy}},{"process-nextick-args":51}],62:[function(require,module,exports){module.exports=require('events').EventEmitter},{"events":41}],63:[function(require,module,exports){module.exports=require('./readable').PassThrough},{"./readable":64}],64:[function(require,module,exports){exports=module.exports=require('./lib/_stream_readable.js');exports.Stream=exports;exports.Readable=exports;exports.Writable=require('./lib/_stream_writable.js');exports.Duplex=require('./lib/_stream_duplex.js');exports.Transform=require('./lib/_stream_transform.js');exports.PassThrough=require('./lib/_stream_passthrough.js')},{"./lib/_stream_duplex.js":55,"./lib/_stream_passthrough.js":56,"./lib/_stream_readable.js":57,"./lib/_stream_transform.js":58,"./lib/_stream_writable.js":59}],65:[function(require,module,exports){module.exports=require('./readable').Transform},{"./readable":64}],66:[function(require,module,exports){module.exports=require('./lib/_stream_writable.js')},{"./lib/_stream_writable.js":59}],67:[function(require,module,exports){(function(Buffer){'use strict'
var inherits=require('inherits')
var HashBase=require('hash-base')
function RIPEMD160(){HashBase.call(this,64)
this._a=0x67452301
this._b=0xefcdab89
this._c=0x98badcfe
this._d=0x10325476
this._e=0xc3d2e1f0}
inherits(RIPEMD160,HashBase)
RIPEMD160.prototype._update=function(){var m=new Array(16)
for(var i=0;i<16;++i)m[i]=this._block.readInt32LE(i*4)
var al=this._a
var bl=this._b
var cl=this._c
var dl=this._d
var el=this._e
al=fn1(al,bl,cl,dl,el,m[0],0x00000000,11);cl=rotl(cl,10)
el=fn1(el,al,bl,cl,dl,m[1],0x00000000,14);bl=rotl(bl,10)
dl=fn1(dl,el,al,bl,cl,m[2],0x00000000,15);al=rotl(al,10)
cl=fn1(cl,dl,el,al,bl,m[3],0x00000000,12);el=rotl(el,10)
bl=fn1(bl,cl,dl,el,al,m[4],0x00000000,5);dl=rotl(dl,10)
al=fn1(al,bl,cl,dl,el,m[5],0x00000000,8);cl=rotl(cl,10)
el=fn1(el,al,bl,cl,dl,m[6],0x00000000,7);bl=rotl(bl,10)
dl=fn1(dl,el,al,bl,cl,m[7],0x00000000,9);al=rotl(al,10)
cl=fn1(cl,dl,el,al,bl,m[8],0x00000000,11);el=rotl(el,10)
bl=fn1(bl,cl,dl,el,al,m[9],0x00000000,13);dl=rotl(dl,10)
al=fn1(al,bl,cl,dl,el,m[10],0x00000000,14);cl=rotl(cl,10)
el=fn1(el,al,bl,cl,dl,m[11],0x00000000,15);bl=rotl(bl,10)
dl=fn1(dl,el,al,bl,cl,m[12],0x00000000,6);al=rotl(al,10)
cl=fn1(cl,dl,el,al,bl,m[13],0x00000000,7);el=rotl(el,10)
bl=fn1(bl,cl,dl,el,al,m[14],0x00000000,9);dl=rotl(dl,10)
al=fn1(al,bl,cl,dl,el,m[15],0x00000000,8);cl=rotl(cl,10)
el=fn2(el,al,bl,cl,dl,m[7],0x5a827999,7);bl=rotl(bl,10)
dl=fn2(dl,el,al,bl,cl,m[4],0x5a827999,6);al=rotl(al,10)
cl=fn2(cl,dl,el,al,bl,m[13],0x5a827999,8);el=rotl(el,10)
bl=fn2(bl,cl,dl,el,al,m[1],0x5a827999,13);dl=rotl(dl,10)
al=fn2(al,bl,cl,dl,el,m[10],0x5a827999,11);cl=rotl(cl,10)
el=fn2(el,al,bl,cl,dl,m[6],0x5a827999,9);bl=rotl(bl,10)
dl=fn2(dl,el,al,bl,cl,m[15],0x5a827999,7);al=rotl(al,10)
cl=fn2(cl,dl,el,al,bl,m[3],0x5a827999,15);el=rotl(el,10)
bl=fn2(bl,cl,dl,el,al,m[12],0x5a827999,7);dl=rotl(dl,10)
al=fn2(al,bl,cl,dl,el,m[0],0x5a827999,12);cl=rotl(cl,10)
el=fn2(el,al,bl,cl,dl,m[9],0x5a827999,15);bl=rotl(bl,10)
dl=fn2(dl,el,al,bl,cl,m[5],0x5a827999,9);al=rotl(al,10)
cl=fn2(cl,dl,el,al,bl,m[2],0x5a827999,11);el=rotl(el,10)
bl=fn2(bl,cl,dl,el,al,m[14],0x5a827999,7);dl=rotl(dl,10)
al=fn2(al,bl,cl,dl,el,m[11],0x5a827999,13);cl=rotl(cl,10)
el=fn2(el,al,bl,cl,dl,m[8],0x5a827999,12);bl=rotl(bl,10)
dl=fn3(dl,el,al,bl,cl,m[3],0x6ed9eba1,11);al=rotl(al,10)
cl=fn3(cl,dl,el,al,bl,m[10],0x6ed9eba1,13);el=rotl(el,10)
bl=fn3(bl,cl,dl,el,al,m[14],0x6ed9eba1,6);dl=rotl(dl,10)
al=fn3(al,bl,cl,dl,el,m[4],0x6ed9eba1,7);cl=rotl(cl,10)
el=fn3(el,al,bl,cl,dl,m[9],0x6ed9eba1,14);bl=rotl(bl,10)
dl=fn3(dl,el,al,bl,cl,m[15],0x6ed9eba1,9);al=rotl(al,10)
cl=fn3(cl,dl,el,al,bl,m[8],0x6ed9eba1,13);el=rotl(el,10)
bl=fn3(bl,cl,dl,el,al,m[1],0x6ed9eba1,15);dl=rotl(dl,10)
al=fn3(al,bl,cl,dl,el,m[2],0x6ed9eba1,14);cl=rotl(cl,10)
el=fn3(el,al,bl,cl,dl,m[7],0x6ed9eba1,8);bl=rotl(bl,10)
dl=fn3(dl,el,al,bl,cl,m[0],0x6ed9eba1,13);al=rotl(al,10)
cl=fn3(cl,dl,el,al,bl,m[6],0x6ed9eba1,6);el=rotl(el,10)
bl=fn3(bl,cl,dl,el,al,m[13],0x6ed9eba1,5);dl=rotl(dl,10)
al=fn3(al,bl,cl,dl,el,m[11],0x6ed9eba1,12);cl=rotl(cl,10)
el=fn3(el,al,bl,cl,dl,m[5],0x6ed9eba1,7);bl=rotl(bl,10)
dl=fn3(dl,el,al,bl,cl,m[12],0x6ed9eba1,5);al=rotl(al,10)
cl=fn4(cl,dl,el,al,bl,m[1],0x8f1bbcdc,11);el=rotl(el,10)
bl=fn4(bl,cl,dl,el,al,m[9],0x8f1bbcdc,12);dl=rotl(dl,10)
al=fn4(al,bl,cl,dl,el,m[11],0x8f1bbcdc,14);cl=rotl(cl,10)
el=fn4(el,al,bl,cl,dl,m[10],0x8f1bbcdc,15);bl=rotl(bl,10)
dl=fn4(dl,el,al,bl,cl,m[0],0x8f1bbcdc,14);al=rotl(al,10)
cl=fn4(cl,dl,el,al,bl,m[8],0x8f1bbcdc,15);el=rotl(el,10)
bl=fn4(bl,cl,dl,el,al,m[12],0x8f1bbcdc,9);dl=rotl(dl,10)
al=fn4(al,bl,cl,dl,el,m[4],0x8f1bbcdc,8);cl=rotl(cl,10)
el=fn4(el,al,bl,cl,dl,m[13],0x8f1bbcdc,9);bl=rotl(bl,10)
dl=fn4(dl,el,al,bl,cl,m[3],0x8f1bbcdc,14);al=rotl(al,10)
cl=fn4(cl,dl,el,al,bl,m[7],0x8f1bbcdc,5);el=rotl(el,10)
bl=fn4(bl,cl,dl,el,al,m[15],0x8f1bbcdc,6);dl=rotl(dl,10)
al=fn4(al,bl,cl,dl,el,m[14],0x8f1bbcdc,8);cl=rotl(cl,10)
el=fn4(el,al,bl,cl,dl,m[5],0x8f1bbcdc,6);bl=rotl(bl,10)
dl=fn4(dl,el,al,bl,cl,m[6],0x8f1bbcdc,5);al=rotl(al,10)
cl=fn4(cl,dl,el,al,bl,m[2],0x8f1bbcdc,12);el=rotl(el,10)
bl=fn5(bl,cl,dl,el,al,m[4],0xa953fd4e,9);dl=rotl(dl,10)
al=fn5(al,bl,cl,dl,el,m[0],0xa953fd4e,15);cl=rotl(cl,10)
el=fn5(el,al,bl,cl,dl,m[5],0xa953fd4e,5);bl=rotl(bl,10)
dl=fn5(dl,el,al,bl,cl,m[9],0xa953fd4e,11);al=rotl(al,10)
cl=fn5(cl,dl,el,al,bl,m[7],0xa953fd4e,6);el=rotl(el,10)
bl=fn5(bl,cl,dl,el,al,m[12],0xa953fd4e,8);dl=rotl(dl,10)
al=fn5(al,bl,cl,dl,el,m[2],0xa953fd4e,13);cl=rotl(cl,10)
el=fn5(el,al,bl,cl,dl,m[10],0xa953fd4e,12);bl=rotl(bl,10)
dl=fn5(dl,el,al,bl,cl,m[14],0xa953fd4e,5);al=rotl(al,10)
cl=fn5(cl,dl,el,al,bl,m[1],0xa953fd4e,12);el=rotl(el,10)
bl=fn5(bl,cl,dl,el,al,m[3],0xa953fd4e,13);dl=rotl(dl,10)
al=fn5(al,bl,cl,dl,el,m[8],0xa953fd4e,14);cl=rotl(cl,10)
el=fn5(el,al,bl,cl,dl,m[11],0xa953fd4e,11);bl=rotl(bl,10)
dl=fn5(dl,el,al,bl,cl,m[6],0xa953fd4e,8);al=rotl(al,10)
cl=fn5(cl,dl,el,al,bl,m[15],0xa953fd4e,5);el=rotl(el,10)
bl=fn5(bl,cl,dl,el,al,m[13],0xa953fd4e,6);dl=rotl(dl,10)
var ar=this._a
var br=this._b
var cr=this._c
var dr=this._d
var er=this._e
ar=fn5(ar,br,cr,dr,er,m[5],0x50a28be6,8);cr=rotl(cr,10)
er=fn5(er,ar,br,cr,dr,m[14],0x50a28be6,9);br=rotl(br,10)
dr=fn5(dr,er,ar,br,cr,m[7],0x50a28be6,9);ar=rotl(ar,10)
cr=fn5(cr,dr,er,ar,br,m[0],0x50a28be6,11);er=rotl(er,10)
br=fn5(br,cr,dr,er,ar,m[9],0x50a28be6,13);dr=rotl(dr,10)
ar=fn5(ar,br,cr,dr,er,m[2],0x50a28be6,15);cr=rotl(cr,10)
er=fn5(er,ar,br,cr,dr,m[11],0x50a28be6,15);br=rotl(br,10)
dr=fn5(dr,er,ar,br,cr,m[4],0x50a28be6,5);ar=rotl(ar,10)
cr=fn5(cr,dr,er,ar,br,m[13],0x50a28be6,7);er=rotl(er,10)
br=fn5(br,cr,dr,er,ar,m[6],0x50a28be6,7);dr=rotl(dr,10)
ar=fn5(ar,br,cr,dr,er,m[15],0x50a28be6,8);cr=rotl(cr,10)
er=fn5(er,ar,br,cr,dr,m[8],0x50a28be6,11);br=rotl(br,10)
dr=fn5(dr,er,ar,br,cr,m[1],0x50a28be6,14);ar=rotl(ar,10)
cr=fn5(cr,dr,er,ar,br,m[10],0x50a28be6,14);er=rotl(er,10)
br=fn5(br,cr,dr,er,ar,m[3],0x50a28be6,12);dr=rotl(dr,10)
ar=fn5(ar,br,cr,dr,er,m[12],0x50a28be6,6);cr=rotl(cr,10)
er=fn4(er,ar,br,cr,dr,m[6],0x5c4dd124,9);br=rotl(br,10)
dr=fn4(dr,er,ar,br,cr,m[11],0x5c4dd124,13);ar=rotl(ar,10)
cr=fn4(cr,dr,er,ar,br,m[3],0x5c4dd124,15);er=rotl(er,10)
br=fn4(br,cr,dr,er,ar,m[7],0x5c4dd124,7);dr=rotl(dr,10)
ar=fn4(ar,br,cr,dr,er,m[0],0x5c4dd124,12);cr=rotl(cr,10)
er=fn4(er,ar,br,cr,dr,m[13],0x5c4dd124,8);br=rotl(br,10)
dr=fn4(dr,er,ar,br,cr,m[5],0x5c4dd124,9);ar=rotl(ar,10)
cr=fn4(cr,dr,er,ar,br,m[10],0x5c4dd124,11);er=rotl(er,10)
br=fn4(br,cr,dr,er,ar,m[14],0x5c4dd124,7);dr=rotl(dr,10)
ar=fn4(ar,br,cr,dr,er,m[15],0x5c4dd124,7);cr=rotl(cr,10)
er=fn4(er,ar,br,cr,dr,m[8],0x5c4dd124,12);br=rotl(br,10)
dr=fn4(dr,er,ar,br,cr,m[12],0x5c4dd124,7);ar=rotl(ar,10)
cr=fn4(cr,dr,er,ar,br,m[4],0x5c4dd124,6);er=rotl(er,10)
br=fn4(br,cr,dr,er,ar,m[9],0x5c4dd124,15);dr=rotl(dr,10)
ar=fn4(ar,br,cr,dr,er,m[1],0x5c4dd124,13);cr=rotl(cr,10)
er=fn4(er,ar,br,cr,dr,m[2],0x5c4dd124,11);br=rotl(br,10)
dr=fn3(dr,er,ar,br,cr,m[15],0x6d703ef3,9);ar=rotl(ar,10)
cr=fn3(cr,dr,er,ar,br,m[5],0x6d703ef3,7);er=rotl(er,10)
br=fn3(br,cr,dr,er,ar,m[1],0x6d703ef3,15);dr=rotl(dr,10)
ar=fn3(ar,br,cr,dr,er,m[3],0x6d703ef3,11);cr=rotl(cr,10)
er=fn3(er,ar,br,cr,dr,m[7],0x6d703ef3,8);br=rotl(br,10)
dr=fn3(dr,er,ar,br,cr,m[14],0x6d703ef3,6);ar=rotl(ar,10)
cr=fn3(cr,dr,er,ar,br,m[6],0x6d703ef3,6);er=rotl(er,10)
br=fn3(br,cr,dr,er,ar,m[9],0x6d703ef3,14);dr=rotl(dr,10)
ar=fn3(ar,br,cr,dr,er,m[11],0x6d703ef3,12);cr=rotl(cr,10)
er=fn3(er,ar,br,cr,dr,m[8],0x6d703ef3,13);br=rotl(br,10)
dr=fn3(dr,er,ar,br,cr,m[12],0x6d703ef3,5);ar=rotl(ar,10)
cr=fn3(cr,dr,er,ar,br,m[2],0x6d703ef3,14);er=rotl(er,10)
br=fn3(br,cr,dr,er,ar,m[10],0x6d703ef3,13);dr=rotl(dr,10)
ar=fn3(ar,br,cr,dr,er,m[0],0x6d703ef3,13);cr=rotl(cr,10)
er=fn3(er,ar,br,cr,dr,m[4],0x6d703ef3,7);br=rotl(br,10)
dr=fn3(dr,er,ar,br,cr,m[13],0x6d703ef3,5);ar=rotl(ar,10)
cr=fn2(cr,dr,er,ar,br,m[8],0x7a6d76e9,15);er=rotl(er,10)
br=fn2(br,cr,dr,er,ar,m[6],0x7a6d76e9,5);dr=rotl(dr,10)
ar=fn2(ar,br,cr,dr,er,m[4],0x7a6d76e9,8);cr=rotl(cr,10)
er=fn2(er,ar,br,cr,dr,m[1],0x7a6d76e9,11);br=rotl(br,10)
dr=fn2(dr,er,ar,br,cr,m[3],0x7a6d76e9,14);ar=rotl(ar,10)
cr=fn2(cr,dr,er,ar,br,m[11],0x7a6d76e9,14);er=rotl(er,10)
br=fn2(br,cr,dr,er,ar,m[15],0x7a6d76e9,6);dr=rotl(dr,10)
ar=fn2(ar,br,cr,dr,er,m[0],0x7a6d76e9,14);cr=rotl(cr,10)
er=fn2(er,ar,br,cr,dr,m[5],0x7a6d76e9,6);br=rotl(br,10)
dr=fn2(dr,er,ar,br,cr,m[12],0x7a6d76e9,9);ar=rotl(ar,10)
cr=fn2(cr,dr,er,ar,br,m[2],0x7a6d76e9,12);er=rotl(er,10)
br=fn2(br,cr,dr,er,ar,m[13],0x7a6d76e9,9);dr=rotl(dr,10)
ar=fn2(ar,br,cr,dr,er,m[9],0x7a6d76e9,12);cr=rotl(cr,10)
er=fn2(er,ar,br,cr,dr,m[7],0x7a6d76e9,5);br=rotl(br,10)
dr=fn2(dr,er,ar,br,cr,m[10],0x7a6d76e9,15);ar=rotl(ar,10)
cr=fn2(cr,dr,er,ar,br,m[14],0x7a6d76e9,8);er=rotl(er,10)
br=fn1(br,cr,dr,er,ar,m[12],0x00000000,8);dr=rotl(dr,10)
ar=fn1(ar,br,cr,dr,er,m[15],0x00000000,5);cr=rotl(cr,10)
er=fn1(er,ar,br,cr,dr,m[10],0x00000000,12);br=rotl(br,10)
dr=fn1(dr,er,ar,br,cr,m[4],0x00000000,9);ar=rotl(ar,10)
cr=fn1(cr,dr,er,ar,br,m[1],0x00000000,12);er=rotl(er,10)
br=fn1(br,cr,dr,er,ar,m[5],0x00000000,5);dr=rotl(dr,10)
ar=fn1(ar,br,cr,dr,er,m[8],0x00000000,14);cr=rotl(cr,10)
er=fn1(er,ar,br,cr,dr,m[7],0x00000000,6);br=rotl(br,10)
dr=fn1(dr,er,ar,br,cr,m[6],0x00000000,8);ar=rotl(ar,10)
cr=fn1(cr,dr,er,ar,br,m[2],0x00000000,13);er=rotl(er,10)
br=fn1(br,cr,dr,er,ar,m[13],0x00000000,6);dr=rotl(dr,10)
ar=fn1(ar,br,cr,dr,er,m[14],0x00000000,5);cr=rotl(cr,10)
er=fn1(er,ar,br,cr,dr,m[0],0x00000000,15);br=rotl(br,10)
dr=fn1(dr,er,ar,br,cr,m[3],0x00000000,13);ar=rotl(ar,10)
cr=fn1(cr,dr,er,ar,br,m[9],0x00000000,11);er=rotl(er,10)
br=fn1(br,cr,dr,er,ar,m[11],0x00000000,11);dr=rotl(dr,10)
var t=(this._b+cl+dr)|0
this._b=(this._c+dl+er)|0
this._c=(this._d+el+ar)|0
this._d=(this._e+al+br)|0
this._e=(this._a+bl+cr)|0
this._a=t}
RIPEMD160.prototype._digest=function(){this._block[this._blockOffset++]=0x80
if(this._blockOffset>56){this._block.fill(0,this._blockOffset,64)
this._update()
this._blockOffset=0}
this._block.fill(0,this._blockOffset,56)
this._block.writeUInt32LE(this._length[0],56)
this._block.writeUInt32LE(this._length[1],60)
this._update()
var buffer=new Buffer(20)
buffer.writeInt32LE(this._a,0)
buffer.writeInt32LE(this._b,4)
buffer.writeInt32LE(this._c,8)
buffer.writeInt32LE(this._d,12)
buffer.writeInt32LE(this._e,16)
return buffer}
function rotl(x,n){return(x<<n)|(x>>>(32-n))}
function fn1(a,b,c,d,e,m,k,s){return(rotl((a+(b^c^d)+m+k)|0,s)+e)|0}
function fn2(a,b,c,d,e,m,k,s){return(rotl((a+((b&c)|((~b)&d))+m+k)|0,s)+e)|0}
function fn3(a,b,c,d,e,m,k,s){return(rotl((a+((b|(~c))^d)+m+k)|0,s)+e)|0}
function fn4(a,b,c,d,e,m,k,s){return(rotl((a+((b&d)|(c&(~d)))+m+k)|0,s)+e)|0}
function fn5(a,b,c,d,e,m,k,s){return(rotl((a+(b^(c|(~d)))+m+k)|0,s)+e)|0}
module.exports=RIPEMD160}).call(this,require("buffer").Buffer)},{"buffer":27,"hash-base":43,"inherits":45}],68:[function(require,module,exports){var buffer=require('buffer')
var Buffer=buffer.Buffer
function copyProps(src,dst){for(var key in src){dst[key]=src[key]}}
if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer}else{copyProps(buffer,exports)
exports.Buffer=SafeBuffer}
function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length)}
copyProps(Buffer,SafeBuffer)
SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==='number'){throw new TypeError('Argument must not be a number')}
return Buffer(arg,encodingOrOffset,length)}
SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=='number'){throw new TypeError('Argument must be a number')}
var buf=Buffer(size)
if(fill!==undefined){if(typeof encoding==='string'){buf.fill(fill,encoding)}else{buf.fill(fill)}}else{buf.fill(0)}
return buf}
SafeBuffer.allocUnsafe=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number')}
return Buffer(size)}
SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number')}
return buffer.SlowBuffer(size)}},{"buffer":27}],69:[function(require,module,exports){(function(Buffer){function Hash(blockSize,finalSize){this._block=new Buffer(blockSize)
this._finalSize=finalSize
this._blockSize=blockSize
this._len=0
this._s=0}
Hash.prototype.update=function(data,enc){if(typeof data==='string'){enc=enc||'utf8'
data=new Buffer(data,enc)}
var l=this._len+=data.length
var s=this._s||0
var f=0
var buffer=this._block
while(s<l){var t=Math.min(data.length,f+this._blockSize-(s%this._blockSize))
var ch=(t-f)
for(var i=0;i<ch;i++){buffer[(s%this._blockSize)+i]=data[i+f]}
s+=ch
f+=ch
if((s%this._blockSize)===0){this._update(buffer)}}
this._s=s
return this}
Hash.prototype.digest=function(enc){var l=this._len*8
this._block[this._len%this._blockSize]=0x80
this._block.fill(0,this._len%this._blockSize+1)
if(l%(this._blockSize*8)>=this._finalSize*8){this._update(this._block)
this._block.fill(0)}
this._block.writeInt32BE(l,this._blockSize-4)
var hash=this._update(this._block)||this._hash()
return enc?hash.toString(enc):hash}
Hash.prototype._update=function(){throw new Error('_update must be implemented by subclass')}
module.exports=Hash}).call(this,require("buffer").Buffer)},{"buffer":27}],70:[function(require,module,exports){var exports=module.exports=function SHA(algorithm){algorithm=algorithm.toLowerCase()
var Algorithm=exports[algorithm]
if(!Algorithm)throw new Error(algorithm+' is not supported (we accept pull requests)')
return new Algorithm()}
exports.sha=require('./sha')
exports.sha1=require('./sha1')
exports.sha224=require('./sha224')
exports.sha256=require('./sha256')
exports.sha384=require('./sha384')
exports.sha512=require('./sha512')},{"./sha":71,"./sha1":72,"./sha224":73,"./sha256":74,"./sha384":75,"./sha512":76}],71:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var Hash=require('./hash')
var K=[0x5a827999,0x6ed9eba1,0x8f1bbcdc|0,0xca62c1d6|0]
var W=new Array(80)
function Sha(){this.init()
this._w=W
Hash.call(this,64,56)}
inherits(Sha,Hash)
Sha.prototype.init=function(){this._a=0x67452301
this._b=0xefcdab89
this._c=0x98badcfe
this._d=0x10325476
this._e=0xc3d2e1f0
return this}
function rotl5(num){return(num<<5)|(num>>>27)}
function rotl30(num){return(num<<30)|(num>>>2)}
function ft(s,b,c,d){if(s===0)return(b&c)|((~b)&d)
if(s===2)return(b&c)|(b&d)|(c&d)
return b^c^d}
Sha.prototype._update=function(M){var W=this._w
var a=this._a|0
var b=this._b|0
var c=this._c|0
var d=this._d|0
var e=this._e|0
for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4)
for(;i<80;++i)W[i]=W[i-3]^W[i-8]^W[i-14]^W[i-16]
for(var j=0;j<80;++j){var s=~~(j/20)
var t=(rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s])|0
e=d
d=c
c=rotl30(b)
b=a
a=t}
this._a=(a+this._a)|0
this._b=(b+this._b)|0
this._c=(c+this._c)|0
this._d=(d+this._d)|0
this._e=(e+this._e)|0}
Sha.prototype._hash=function(){var H=new Buffer(20)
H.writeInt32BE(this._a|0,0)
H.writeInt32BE(this._b|0,4)
H.writeInt32BE(this._c|0,8)
H.writeInt32BE(this._d|0,12)
H.writeInt32BE(this._e|0,16)
return H}
module.exports=Sha}).call(this,require("buffer").Buffer)},{"./hash":69,"buffer":27,"inherits":45}],72:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var Hash=require('./hash')
var K=[0x5a827999,0x6ed9eba1,0x8f1bbcdc|0,0xca62c1d6|0]
var W=new Array(80)
function Sha1(){this.init()
this._w=W
Hash.call(this,64,56)}
inherits(Sha1,Hash)
Sha1.prototype.init=function(){this._a=0x67452301
this._b=0xefcdab89
this._c=0x98badcfe
this._d=0x10325476
this._e=0xc3d2e1f0
return this}
function rotl1(num){return(num<<1)|(num>>>31)}
function rotl5(num){return(num<<5)|(num>>>27)}
function rotl30(num){return(num<<30)|(num>>>2)}
function ft(s,b,c,d){if(s===0)return(b&c)|((~b)&d)
if(s===2)return(b&c)|(b&d)|(c&d)
return b^c^d}
Sha1.prototype._update=function(M){var W=this._w
var a=this._a|0
var b=this._b|0
var c=this._c|0
var d=this._d|0
var e=this._e|0
for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4)
for(;i<80;++i)W[i]=rotl1(W[i-3]^W[i-8]^W[i-14]^W[i-16])
for(var j=0;j<80;++j){var s=~~(j/20)
var t=(rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s])|0
e=d
d=c
c=rotl30(b)
b=a
a=t}
this._a=(a+this._a)|0
this._b=(b+this._b)|0
this._c=(c+this._c)|0
this._d=(d+this._d)|0
this._e=(e+this._e)|0}
Sha1.prototype._hash=function(){var H=new Buffer(20)
H.writeInt32BE(this._a|0,0)
H.writeInt32BE(this._b|0,4)
H.writeInt32BE(this._c|0,8)
H.writeInt32BE(this._d|0,12)
H.writeInt32BE(this._e|0,16)
return H}
module.exports=Sha1}).call(this,require("buffer").Buffer)},{"./hash":69,"buffer":27,"inherits":45}],73:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var Sha256=require('./sha256')
var Hash=require('./hash')
var W=new Array(64)
function Sha224(){this.init()
this._w=W
Hash.call(this,64,56)}
inherits(Sha224,Sha256)
Sha224.prototype.init=function(){this._a=0xc1059ed8
this._b=0x367cd507
this._c=0x3070dd17
this._d=0xf70e5939
this._e=0xffc00b31
this._f=0x68581511
this._g=0x64f98fa7
this._h=0xbefa4fa4
return this}
Sha224.prototype._hash=function(){var H=new Buffer(28)
H.writeInt32BE(this._a,0)
H.writeInt32BE(this._b,4)
H.writeInt32BE(this._c,8)
H.writeInt32BE(this._d,12)
H.writeInt32BE(this._e,16)
H.writeInt32BE(this._f,20)
H.writeInt32BE(this._g,24)
return H}
module.exports=Sha224}).call(this,require("buffer").Buffer)},{"./hash":69,"./sha256":74,"buffer":27,"inherits":45}],74:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var Hash=require('./hash')
var K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2]
var W=new Array(64)
function Sha256(){this.init()
this._w=W
Hash.call(this,64,56)}
inherits(Sha256,Hash)
Sha256.prototype.init=function(){this._a=0x6a09e667
this._b=0xbb67ae85
this._c=0x3c6ef372
this._d=0xa54ff53a
this._e=0x510e527f
this._f=0x9b05688c
this._g=0x1f83d9ab
this._h=0x5be0cd19
return this}
function ch(x,y,z){return z^(x&(y^z))}
function maj(x,y,z){return(x&y)|(z&(x|y))}
function sigma0(x){return(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10)}
function sigma1(x){return(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7)}
function gamma0(x){return(x>>>7|x<<25)^(x>>>18|x<<14)^(x>>>3)}
function gamma1(x){return(x>>>17|x<<15)^(x>>>19|x<<13)^(x>>>10)}
Sha256.prototype._update=function(M){var W=this._w
var a=this._a|0
var b=this._b|0
var c=this._c|0
var d=this._d|0
var e=this._e|0
var f=this._f|0
var g=this._g|0
var h=this._h|0
for(var i=0;i<16;++i)W[i]=M.readInt32BE(i*4)
for(;i<64;++i)W[i]=(gamma1(W[i-2])+W[i-7]+gamma0(W[i-15])+W[i-16])|0
for(var j=0;j<64;++j){var T1=(h+sigma1(e)+ch(e,f,g)+K[j]+W[j])|0
var T2=(sigma0(a)+maj(a,b,c))|0
h=g
g=f
f=e
e=(d+T1)|0
d=c
c=b
b=a
a=(T1+T2)|0}
this._a=(a+this._a)|0
this._b=(b+this._b)|0
this._c=(c+this._c)|0
this._d=(d+this._d)|0
this._e=(e+this._e)|0
this._f=(f+this._f)|0
this._g=(g+this._g)|0
this._h=(h+this._h)|0}
Sha256.prototype._hash=function(){var H=new Buffer(32)
H.writeInt32BE(this._a,0)
H.writeInt32BE(this._b,4)
H.writeInt32BE(this._c,8)
H.writeInt32BE(this._d,12)
H.writeInt32BE(this._e,16)
H.writeInt32BE(this._f,20)
H.writeInt32BE(this._g,24)
H.writeInt32BE(this._h,28)
return H}
module.exports=Sha256}).call(this,require("buffer").Buffer)},{"./hash":69,"buffer":27,"inherits":45}],75:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var SHA512=require('./sha512')
var Hash=require('./hash')
var W=new Array(160)
function Sha384(){this.init()
this._w=W
Hash.call(this,128,112)}
inherits(Sha384,SHA512)
Sha384.prototype.init=function(){this._ah=0xcbbb9d5d
this._bh=0x629a292a
this._ch=0x9159015a
this._dh=0x152fecd8
this._eh=0x67332667
this._fh=0x8eb44a87
this._gh=0xdb0c2e0d
this._hh=0x47b5481d
this._al=0xc1059ed8
this._bl=0x367cd507
this._cl=0x3070dd17
this._dl=0xf70e5939
this._el=0xffc00b31
this._fl=0x68581511
this._gl=0x64f98fa7
this._hl=0xbefa4fa4
return this}
Sha384.prototype._hash=function(){var H=new Buffer(48)
function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset)
H.writeInt32BE(l,offset+4)}
writeInt64BE(this._ah,this._al,0)
writeInt64BE(this._bh,this._bl,8)
writeInt64BE(this._ch,this._cl,16)
writeInt64BE(this._dh,this._dl,24)
writeInt64BE(this._eh,this._el,32)
writeInt64BE(this._fh,this._fl,40)
return H}
module.exports=Sha384}).call(this,require("buffer").Buffer)},{"./hash":69,"./sha512":76,"buffer":27,"inherits":45}],76:[function(require,module,exports){(function(Buffer){var inherits=require('inherits')
var Hash=require('./hash')
var K=[0x428a2f98,0xd728ae22,0x71374491,0x23ef65cd,0xb5c0fbcf,0xec4d3b2f,0xe9b5dba5,0x8189dbbc,0x3956c25b,0xf348b538,0x59f111f1,0xb605d019,0x923f82a4,0xaf194f9b,0xab1c5ed5,0xda6d8118,0xd807aa98,0xa3030242,0x12835b01,0x45706fbe,0x243185be,0x4ee4b28c,0x550c7dc3,0xd5ffb4e2,0x72be5d74,0xf27b896f,0x80deb1fe,0x3b1696b1,0x9bdc06a7,0x25c71235,0xc19bf174,0xcf692694,0xe49b69c1,0x9ef14ad2,0xefbe4786,0x384f25e3,0x0fc19dc6,0x8b8cd5b5,0x240ca1cc,0x77ac9c65,0x2de92c6f,0x592b0275,0x4a7484aa,0x6ea6e483,0x5cb0a9dc,0xbd41fbd4,0x76f988da,0x831153b5,0x983e5152,0xee66dfab,0xa831c66d,0x2db43210,0xb00327c8,0x98fb213f,0xbf597fc7,0xbeef0ee4,0xc6e00bf3,0x3da88fc2,0xd5a79147,0x930aa725,0x06ca6351,0xe003826f,0x14292967,0x0a0e6e70,0x27b70a85,0x46d22ffc,0x2e1b2138,0x5c26c926,0x4d2c6dfc,0x5ac42aed,0x53380d13,0x9d95b3df,0x650a7354,0x8baf63de,0x766a0abb,0x3c77b2a8,0x81c2c92e,0x47edaee6,0x92722c85,0x1482353b,0xa2bfe8a1,0x4cf10364,0xa81a664b,0xbc423001,0xc24b8b70,0xd0f89791,0xc76c51a3,0x0654be30,0xd192e819,0xd6ef5218,0xd6990624,0x5565a910,0xf40e3585,0x5771202a,0x106aa070,0x32bbd1b8,0x19a4c116,0xb8d2d0c8,0x1e376c08,0x5141ab53,0x2748774c,0xdf8eeb99,0x34b0bcb5,0xe19b48a8,0x391c0cb3,0xc5c95a63,0x4ed8aa4a,0xe3418acb,0x5b9cca4f,0x7763e373,0x682e6ff3,0xd6b2b8a3,0x748f82ee,0x5defb2fc,0x78a5636f,0x43172f60,0x84c87814,0xa1f0ab72,0x8cc70208,0x1a6439ec,0x90befffa,0x23631e28,0xa4506ceb,0xde82bde9,0xbef9a3f7,0xb2c67915,0xc67178f2,0xe372532b,0xca273ece,0xea26619c,0xd186b8c7,0x21c0c207,0xeada7dd6,0xcde0eb1e,0xf57d4f7f,0xee6ed178,0x06f067aa,0x72176fba,0x0a637dc5,0xa2c898a6,0x113f9804,0xbef90dae,0x1b710b35,0x131c471b,0x28db77f5,0x23047d84,0x32caab7b,0x40c72493,0x3c9ebe0a,0x15c9bebc,0x431d67c4,0x9c100d4c,0x4cc5d4be,0xcb3e42b6,0x597f299c,0xfc657e2a,0x5fcb6fab,0x3ad6faec,0x6c44198c,0x4a475817]
var W=new Array(160)
function Sha512(){this.init()
this._w=W
Hash.call(this,128,112)}
inherits(Sha512,Hash)
Sha512.prototype.init=function(){this._ah=0x6a09e667
this._bh=0xbb67ae85
this._ch=0x3c6ef372
this._dh=0xa54ff53a
this._eh=0x510e527f
this._fh=0x9b05688c
this._gh=0x1f83d9ab
this._hh=0x5be0cd19
this._al=0xf3bcc908
this._bl=0x84caa73b
this._cl=0xfe94f82b
this._dl=0x5f1d36f1
this._el=0xade682d1
this._fl=0x2b3e6c1f
this._gl=0xfb41bd6b
this._hl=0x137e2179
return this}
function Ch(x,y,z){return z^(x&(y^z))}
function maj(x,y,z){return(x&y)|(z&(x|y))}
function sigma0(x,xl){return(x>>>28|xl<<4)^(xl>>>2|x<<30)^(xl>>>7|x<<25)}
function sigma1(x,xl){return(x>>>14|xl<<18)^(x>>>18|xl<<14)^(xl>>>9|x<<23)}
function Gamma0(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7)}
function Gamma0l(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7|xl<<25)}
function Gamma1(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6)}
function Gamma1l(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6|xl<<26)}
function getCarry(a,b){return(a>>>0)<(b>>>0)?1:0}
Sha512.prototype._update=function(M){var W=this._w
var ah=this._ah|0
var bh=this._bh|0
var ch=this._ch|0
var dh=this._dh|0
var eh=this._eh|0
var fh=this._fh|0
var gh=this._gh|0
var hh=this._hh|0
var al=this._al|0
var bl=this._bl|0
var cl=this._cl|0
var dl=this._dl|0
var el=this._el|0
var fl=this._fl|0
var gl=this._gl|0
var hl=this._hl|0
for(var i=0;i<32;i+=2){W[i]=M.readInt32BE(i*4)
W[i+1]=M.readInt32BE(i*4+4)}
for(;i<160;i+=2){var xh=W[i-15*2]
var xl=W[i-15*2+1]
var gamma0=Gamma0(xh,xl)
var gamma0l=Gamma0l(xl,xh)
xh=W[i-2*2]
xl=W[i-2*2+1]
var gamma1=Gamma1(xh,xl)
var gamma1l=Gamma1l(xl,xh)
var Wi7h=W[i-7*2]
var Wi7l=W[i-7*2+1]
var Wi16h=W[i-16*2]
var Wi16l=W[i-16*2+1]
var Wil=(gamma0l+Wi7l)|0
var Wih=(gamma0+Wi7h+getCarry(Wil,gamma0l))|0
Wil=(Wil+gamma1l)|0
Wih=(Wih+gamma1+getCarry(Wil,gamma1l))|0
Wil=(Wil+Wi16l)|0
Wih=(Wih+Wi16h+getCarry(Wil,Wi16l))|0
W[i]=Wih
W[i+1]=Wil}
for(var j=0;j<160;j+=2){Wih=W[j]
Wil=W[j+1]
var majh=maj(ah,bh,ch)
var majl=maj(al,bl,cl)
var sigma0h=sigma0(ah,al)
var sigma0l=sigma0(al,ah)
var sigma1h=sigma1(eh,el)
var sigma1l=sigma1(el,eh)
var Kih=K[j]
var Kil=K[j+1]
var chh=Ch(eh,fh,gh)
var chl=Ch(el,fl,gl)
var t1l=(hl+sigma1l)|0
var t1h=(hh+sigma1h+getCarry(t1l,hl))|0
t1l=(t1l+chl)|0
t1h=(t1h+chh+getCarry(t1l,chl))|0
t1l=(t1l+Kil)|0
t1h=(t1h+Kih+getCarry(t1l,Kil))|0
t1l=(t1l+Wil)|0
t1h=(t1h+Wih+getCarry(t1l,Wil))|0
var t2l=(sigma0l+majl)|0
var t2h=(sigma0h+majh+getCarry(t2l,sigma0l))|0
hh=gh
hl=gl
gh=fh
gl=fl
fh=eh
fl=el
el=(dl+t1l)|0
eh=(dh+t1h+getCarry(el,dl))|0
dh=ch
dl=cl
ch=bh
cl=bl
bh=ah
bl=al
al=(t1l+t2l)|0
ah=(t1h+t2h+getCarry(al,t1l))|0}
this._al=(this._al+al)|0
this._bl=(this._bl+bl)|0
this._cl=(this._cl+cl)|0
this._dl=(this._dl+dl)|0
this._el=(this._el+el)|0
this._fl=(this._fl+fl)|0
this._gl=(this._gl+gl)|0
this._hl=(this._hl+hl)|0
this._ah=(this._ah+ah+getCarry(this._al,al))|0
this._bh=(this._bh+bh+getCarry(this._bl,bl))|0
this._ch=(this._ch+ch+getCarry(this._cl,cl))|0
this._dh=(this._dh+dh+getCarry(this._dl,dl))|0
this._eh=(this._eh+eh+getCarry(this._el,el))|0
this._fh=(this._fh+fh+getCarry(this._fl,fl))|0
this._gh=(this._gh+gh+getCarry(this._gl,gl))|0
this._hh=(this._hh+hh+getCarry(this._hl,hl))|0}
Sha512.prototype._hash=function(){var H=new Buffer(64)
function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset)
H.writeInt32BE(l,offset+4)}
writeInt64BE(this._ah,this._al,0)
writeInt64BE(this._bh,this._bl,8)
writeInt64BE(this._ch,this._cl,16)
writeInt64BE(this._dh,this._dl,24)
writeInt64BE(this._eh,this._el,32)
writeInt64BE(this._fh,this._fl,40)
writeInt64BE(this._gh,this._gl,48)
writeInt64BE(this._hh,this._hl,56)
return H}
module.exports=Sha512}).call(this,require("buffer").Buffer)},{"./hash":69,"buffer":27,"inherits":45}],77:[function(require,module,exports){module.exports=Stream;var EE=require('events').EventEmitter;var inherits=require('inherits');inherits(Stream,EE);Stream.Readable=require('readable-stream/readable.js');Stream.Writable=require('readable-stream/writable.js');Stream.Duplex=require('readable-stream/duplex.js');Stream.Transform=require('readable-stream/transform.js');Stream.PassThrough=require('readable-stream/passthrough.js');Stream.Stream=Stream;function Stream(){EE.call(this)}
Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(!1===dest.write(chunk)&&source.pause){source.pause()}}}
source.on('data',ondata);function ondrain(){if(source.readable&&source.resume){source.resume()}}
dest.on('drain',ondrain);if(!dest._isStdio&&(!options||options.end!==!1)){source.on('end',onend);source.on('close',onclose)}
var didOnEnd=!1;function onend(){if(didOnEnd)return;didOnEnd=!0;dest.end()}
function onclose(){if(didOnEnd)return;didOnEnd=!0;if(typeof dest.destroy==='function')dest.destroy()}
function onerror(er){cleanup();if(EE.listenerCount(this,'error')===0){throw er}}
source.on('error',onerror);dest.on('error',onerror);function cleanup(){source.removeListener('data',ondata);dest.removeListener('drain',ondrain);source.removeListener('end',onend);source.removeListener('close',onclose);source.removeListener('error',onerror);dest.removeListener('error',onerror);source.removeListener('end',cleanup);source.removeListener('close',cleanup);dest.removeListener('close',cleanup)}
source.on('end',cleanup);source.on('close',cleanup);dest.on('close',cleanup);dest.emit('pipe',source);return dest}},{"events":41,"inherits":45,"readable-stream/duplex.js":54,"readable-stream/passthrough.js":63,"readable-stream/readable.js":64,"readable-stream/transform.js":65,"readable-stream/writable.js":66}],78:[function(require,module,exports){'use strict';var Buffer=require('safe-buffer').Buffer;var isEncoding=Buffer.isEncoding||function(encoding){encoding=''+encoding;switch(encoding&&encoding.toLowerCase()){case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':return!0;default:return!1}};function _normalizeEncoding(enc){if(!enc)return'utf8';var retried;while(!0){switch(enc){case 'utf8':case 'utf-8':return'utf8';case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':return'utf16le';case 'latin1':case 'binary':return'latin1';case 'base64':case 'ascii':case 'hex':return enc;default:if(retried)return;enc=(''+enc).toLowerCase();retried=!0}}};function normalizeEncoding(enc){var nenc=_normalizeEncoding(enc);if(typeof nenc!=='string'&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error('Unknown encoding: '+enc);return nenc||enc}
exports.StringDecoder=StringDecoder;function StringDecoder(encoding){this.encoding=normalizeEncoding(encoding);var nb;switch(this.encoding){case 'utf16le':this.text=utf16Text;this.end=utf16End;nb=4;break;case 'utf8':this.fillLast=utf8FillLast;nb=4;break;case 'base64':this.text=base64Text;this.end=base64End;nb=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return}
this.lastNeed=0;this.lastTotal=0;this.lastChar=Buffer.allocUnsafe(nb)}
StringDecoder.prototype.write=function(buf){if(buf.length===0)return'';var r;var i;if(this.lastNeed){r=this.fillLast(buf);if(r===undefined)return'';i=this.lastNeed;this.lastNeed=0}else{i=0}
if(i<buf.length)return r?r+this.text(buf,i):this.text(buf,i);return r||''};StringDecoder.prototype.end=utf8End;StringDecoder.prototype.text=utf8Text;StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length){buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}
buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length);this.lastNeed-=buf.length};function utf8CheckByte(byte){if(byte<=0x7F)return 0;else if(byte>>5===0x06)return 2;else if(byte>>4===0x0E)return 3;else if(byte>>3===0x1E)return 4;return-1}
function utf8CheckIncomplete(self,buf,i){var j=buf.length-1;if(j<i)return 0;var nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-1;return nb}
if(--j<i)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-2;return nb}
if(--j<i)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0){if(nb===2)nb=0;else self.lastNeed=nb-3}
return nb}
return 0}
function utf8CheckExtraBytes(self,buf,p){if((buf[0]&0xC0)!==0x80){self.lastNeed=0;return'\ufffd'.repeat(p)}
if(self.lastNeed>1&&buf.length>1){if((buf[1]&0xC0)!==0x80){self.lastNeed=1;return'\ufffd'.repeat(p+1)}
if(self.lastNeed>2&&buf.length>2){if((buf[2]&0xC0)!==0x80){self.lastNeed=2;return'\ufffd'.repeat(p+2)}}}}
function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,buf,p);if(r!==undefined)return r;if(this.lastNeed<=buf.length){buf.copy(this.lastChar,p,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}
buf.copy(this.lastChar,p,0,buf.length);this.lastNeed-=buf.length}
function utf8Text(buf,i){var total=utf8CheckIncomplete(this,buf,i);if(!this.lastNeed)return buf.toString('utf8',i);this.lastTotal=total;var end=buf.length-(total-this.lastNeed);buf.copy(this.lastChar,0,end);return buf.toString('utf8',i,end)}
function utf8End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+'\ufffd'.repeat(this.lastTotal-this.lastNeed);return r}
function utf16Text(buf,i){if((buf.length-i)%2===0){var r=buf.toString('utf16le',i);if(r){var c=r.charCodeAt(r.length-1);if(c>=0xD800&&c<=0xDBFF){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];return r.slice(0,-1)}}
return r}
this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=buf[buf.length-1];return buf.toString('utf16le',i,buf.length-1)}
function utf16End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed){var end=this.lastTotal-this.lastNeed;return r+this.lastChar.toString('utf16le',0,end)}
return r}
function base64Text(buf,i){var n=(buf.length-i)%3;if(n===0)return buf.toString('base64',i);this.lastNeed=3-n;this.lastTotal=3;if(n===1){this.lastChar[0]=buf[buf.length-1]}else{this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1]}
return buf.toString('base64',i,buf.length-n)}
function base64End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+this.lastChar.toString('base64',0,3-this.lastNeed);return r}
function simpleWrite(buf){return buf.toString(this.encoding)}
function simpleEnd(buf){return buf&&buf.length?this.write(buf):''}},{"safe-buffer":68}],79:[function(require,module,exports){(function(global){module.exports=deprecate;function deprecate(fn,msg){if(config('noDeprecation')){return fn}
var warned=!1;function deprecated(){if(!warned){if(config('throwDeprecation')){throw new Error(msg)}else if(config('traceDeprecation')){console.trace(msg)}else{console.warn(msg)}
warned=!0}
return fn.apply(this,arguments)}
return deprecated}
function config(name){try{if(!global.localStorage)return!1}catch(_){return!1}
var val=global.localStorage[name];if(null==val)return!1;return String(val).toLowerCase()==='true'}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],80:[function(require,module,exports){arguments[4][45][0].apply(exports,arguments)},{"dup":45}],81:[function(require,module,exports){module.exports=function isBuffer(arg){return arg&&typeof arg==='object'&&typeof arg.copy==='function'&&typeof arg.fill==='function'&&typeof arg.readUInt8==='function'}},{}],82:[function(require,module,exports){(function(process,global){var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]))}
return objects.join(' ')}
var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==='%%')return'%';if(i>=len)return x;switch(x){case '%s':return String(args[i++]);case '%d':return Number(args[i++]);case '%j':try{return JSON.stringify(args[i++])}catch(_){return'[Circular]'}
default:return x}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=' '+x}else{str+=' '+inspect(x)}}
return str};exports.deprecate=function(fn,msg){if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments)}}
if(process.noDeprecation===!0){return fn}
var warned=!1;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg)}else if(process.traceDeprecation){console.trace(msg)}else{console.error(msg)}
warned=!0}
return fn.apply(this,arguments)}
return deprecated};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))
debugEnviron=process.env.NODE_DEBUG||'';set=set.toUpperCase();if(!debugs[set]){if(new RegExp('\\b'+set+'\\b','i').test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error('%s %d: %s',set,pid,msg)}}else{debugs[set]=function(){}}}
return debugs[set]};function inspect(obj,opts){var ctx={seen:[],stylize:stylizeNoColor};if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){ctx.showHidden=opts}else if(opts){exports._extend(ctx,opts)}
if(isUndefined(ctx.showHidden))ctx.showHidden=!1;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=!1;if(isUndefined(ctx.customInspect))ctx.customInspect=!0;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth)}
exports.inspect=inspect;inspect.colors={'bold':[1,22],'italic':[3,23],'underline':[4,24],'inverse':[7,27],'white':[37,39],'grey':[90,39],'black':[30,39],'blue':[34,39],'cyan':[36,39],'green':[32,39],'magenta':[35,39],'red':[31,39],'yellow':[33,39]};inspect.styles={'special':'cyan','number':'yellow','boolean':'yellow','undefined':'grey','null':'bold','string':'green','date':'magenta','regexp':'red'};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return'\u001b['+inspect.colors[style][0]+'m'+str+'\u001b['+inspect.colors[style][1]+'m'}else{return str}}
function stylizeNoColor(str,styleType){return str}
function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=!0});return hash}
function formatValue(ctx,value,recurseTimes){if(ctx.customInspect&&value&&isFunction(value.inspect)&&value.inspect!==exports.inspect&&!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes)}
return ret}
var primitive=formatPrimitive(ctx,value);if(primitive){return primitive}
var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value)}
if(isError(value)&&(keys.indexOf('message')>=0||keys.indexOf('description')>=0)){return formatError(value)}
if(keys.length===0){if(isFunction(value)){var name=value.name?': '+value.name:'';return ctx.stylize('[Function'+name+']','special')}
if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp')}
if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),'date')}
if(isError(value)){return formatError(value)}}
var base='',array=!1,braces=['{','}'];if(isArray(value)){array=!0;braces=['[',']']}
if(isFunction(value)){var n=value.name?': '+value.name:'';base=' [Function'+n+']'}
if(isRegExp(value)){base=' '+RegExp.prototype.toString.call(value)}
if(isDate(value)){base=' '+Date.prototype.toUTCString.call(value)}
if(isError(value)){base=' '+formatError(value)}
if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1]}
if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),'regexp')}else{return ctx.stylize('[Object]','special')}}
ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys)}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)})}
ctx.seen.pop();return reduceToSingleString(output,base,braces)}
function formatPrimitive(ctx,value){if(isUndefined(value))
return ctx.stylize('undefined','undefined');if(isString(value)){var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').replace(/'/g,"\\'").replace(/\\"/g,'"')+'\'';return ctx.stylize(simple,'string')}
if(isNumber(value))
return ctx.stylize(''+value,'number');if(isBoolean(value))
return ctx.stylize(''+value,'boolean');if(isNull(value))
return ctx.stylize('null','null')}
function formatError(value){return'['+Error.prototype.toString.call(value)+']'}
function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),!0))}else{output.push('')}}
keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,!0))}});return output}
function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize('[Getter/Setter]','special')}else{str=ctx.stylize('[Getter]','special')}}else{if(desc.set){str=ctx.stylize('[Setter]','special')}}
if(!hasOwnProperty(visibleKeys,key)){name='['+key+']'}
if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null)}else{str=formatValue(ctx,desc.value,recurseTimes-1)}
if(str.indexOf('\n')>-1){if(array){str=str.split('\n').map(function(line){return'  '+line}).join('\n').substr(2)}else{str='\n'+str.split('\n').map(function(line){return'   '+line}).join('\n')}}}else{str=ctx.stylize('[Circular]','special')}}
if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str}
name=JSON.stringify(''+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,'name')}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,'string')}}
return name+': '+str}
function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf('\n')>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1},0);if(length>60){return braces[0]+(base===''?'':base+'\n ')+' '+output.join(',\n  ')+' '+braces[1]}
return braces[0]+base+' '+output.join(', ')+' '+braces[1]}
function isArray(ar){return Array.isArray(ar)}
exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean'}
exports.isBoolean=isBoolean;function isNull(arg){return arg===null}
exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}
exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number'}
exports.isNumber=isNumber;function isString(arg){return typeof arg==='string'}
exports.isString=isString;function isSymbol(arg){return typeof arg==='symbol'}
exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}
exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==='[object RegExp]'}
exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==='object'&&arg!==null}
exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==='[object Date]'}
exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==='[object Error]'||e instanceof Error)}
exports.isError=isError;function isFunction(arg){return typeof arg==='function'}
exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||typeof arg==='symbol'||typeof arg==='undefined'}
exports.isPrimitive=isPrimitive;exports.isBuffer=require('./support/isBuffer');function objectToString(o){return Object.prototype.toString.call(o)}
function pad(n){return n<10?'0'+n.toString(10):n.toString(10)}
var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];function timestamp(){var d=new Date();var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(':');return[d.getDate(),months[d.getMonth()],time].join(' ')}
exports.log=function(){console.log('%s - %s',timestamp(),exports.format.apply(exports,arguments))};exports.inherits=require('inherits');exports._extend=function(origin,add){if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]]}
return origin};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./support/isBuffer":81,"_process":52,"inherits":80}],83:[function(require,module,exports){(function(Buffer){const randomBytes=require('randombytes')
const ByteBuffer=require('bytebuffer')
const crypto=require('browserify-aes')
const assert=require('assert')
const PublicKey=require('./key_public')
const PrivateKey=require('./key_private')
const hash=require('./hash')
const Long=ByteBuffer.Long;module.exports={encrypt,decrypt}
function encrypt(private_key,public_key,message,nonce=uniqueNonce()){return crypt(private_key,public_key,nonce,message)}
function decrypt(private_key,public_key,nonce,message,checksum){return crypt(private_key,public_key,nonce,message,checksum).message}
function crypt(private_key,public_key,nonce,message,checksum){private_key=PrivateKey(private_key)
if(!private_key)
throw new TypeError('private_key is required')
public_key=PublicKey(public_key)
if(!public_key)
throw new TypeError('public_key is required')
nonce=toLongObj(nonce)
if(!nonce)
throw new TypeError('nonce is required')
if(!Buffer.isBuffer(message)){if(typeof message!=='string')
throw new TypeError('message should be buffer or string')
message=new Buffer(message,'binary')}
if(checksum&&typeof checksum!=='number')
throw new TypeError('checksum should be a number')
const S=private_key.getSharedSecret(public_key);let ebuf=new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY,ByteBuffer.LITTLE_ENDIAN)
ebuf.writeUint64(nonce)
ebuf.append(S.toString('binary'),'binary')
ebuf=new Buffer(ebuf.copy(0,ebuf.offset).toBinary(),'binary')
const encryption_key=hash.sha512(ebuf)
const iv=encryption_key.slice(32,48)
const key=encryption_key.slice(0,32)
let check=hash.sha256(encryption_key)
check=check.slice(0,4)
const cbuf=ByteBuffer.fromBinary(check.toString('binary'),ByteBuffer.DEFAULT_CAPACITY,ByteBuffer.LITTLE_ENDIAN)
check=cbuf.readUint32()
if(checksum){if(check!==checksum)
throw new Error('Invalid key')
message=cryptoJsDecrypt(message,key,iv)}else{message=cryptoJsEncrypt(message,key,iv)}
return{nonce,message,checksum:check}}
function cryptoJsDecrypt(message,key,iv){assert(message,"Missing cipher text")
message=toBinaryBuffer(message)
const decipher=crypto.createDecipheriv('aes-256-cbc',key,iv)
message=Buffer.concat([decipher.update(message),decipher.final()])
return message}
function cryptoJsEncrypt(message,key,iv){assert(message,"Missing plain text")
message=toBinaryBuffer(message)
const cipher=crypto.createCipheriv('aes-256-cbc',key,iv)
message=Buffer.concat([cipher.update(message),cipher.final()])
return message}
function uniqueNonce(){if(unique_nonce_entropy===null){const b=new Uint8Array(randomBytes(2))
unique_nonce_entropy=parseInt(b[0]<<8|b[1],10)}
let long=Long.fromNumber(Date.now())
const entropy=++unique_nonce_entropy%0xFFFF
long=long.shiftLeft(16).or(Long.fromNumber(entropy));return long.toString()}
let unique_nonce_entropy=null
const toLongObj=o=>(o?Long.isLong(o)?o:Long.fromString(o):o)
const toBinaryBuffer=o=>(o?Buffer.isBuffer(o)?o:new Buffer(o,'binary'):o)}).call(this,require("buffer").Buffer)},{"./hash":90,"./key_private":92,"./key_public":93,"assert":1,"browserify-aes":11,"buffer":27,"bytebuffer":28,"randombytes":53}],84:[function(require,module,exports){const Aes=require("./aes")
const PrivateKey=require("./key_private")
const PublicKey=require("./key_public")
const Signature=require("./signature")
const key_utils=require("./key_utils")
const config=require('./config')
const hash=require("./hash")
const ecc={initialize:PrivateKey.initialize,unsafeRandomKey:()=>(PrivateKey.unsafeRandomKey().then(key=>key.toString())),randomKey:(cpuEntropyBits)=>(PrivateKey.randomKey(cpuEntropyBits).then(key=>key.toString())),seedPrivate:seed=>PrivateKey.fromSeed(seed).toString(),privateToPublic:wif=>PrivateKey(wif).toPublic().toString(),isValidPublic:(pubkey)=>PublicKey.isValid(pubkey),isValidPrivate:(wif)=>PrivateKey.isValid(wif),sign:(data,privateKey,hashData=!0)=>Signature[hashData?'sign':'signHash'](data,privateKey).toHex(),verify:(signature,data,pubkey,hashData=!0)=>{signature=Signature.from(signature)
const verify=signature[hashData?'verify':'verifyHash']
return verify(data,pubkey)},recover:(signature,data,hashData=!0)=>{signature=Signature.from(signature)
const recover=signature[hashData?'recover':'recoverHash']
return recover(data).toString()},sha256:(data,encoding='hex')=>hash.sha256(data,encoding)}
module.exports=ecc},{"./aes":83,"./config":86,"./hash":90,"./key_private":92,"./key_public":93,"./key_utils":94,"./signature":96}],85:[function(require,module,exports){const Aes=require("./aes")
const PrivateKey=require("./key_private")
const PublicKey=require("./key_public")
const Signature=require("./signature")
const key_utils=require("./key_utils")
const config=require('./config')
module.exports={Aes,PrivateKey,PublicKey,Signature,key_utils,config}},{"./aes":83,"./config":86,"./key_private":92,"./key_public":93,"./key_utils":94,"./signature":96}],86:[function(require,module,exports){module.exports={address_prefix:'EOS'}},{}],87:[function(require,module,exports){(function(Buffer){var assert=require('assert')
var crypto=require('./hash')
var enforceType=require('./enforce_types')
var BigInteger=require('bigi')
var ECSignature=require('./ecsignature')
function deterministicGenerateK(curve,hash,d,checkSig,nonce){enforceType('Buffer',hash)
enforceType(BigInteger,d)
if(nonce){hash=crypto.sha256(Buffer.concat([hash,new Buffer(nonce)]))}
assert.equal(hash.length,32,'Hash must be 256 bit')
var x=d.toBuffer(32)
var k=new Buffer(32)
var v=new Buffer(32)
v.fill(1)
k.fill(0)
k=crypto.HmacSHA256(Buffer.concat([v,new Buffer([0]),x,hash]),k)
v=crypto.HmacSHA256(v,k)
k=crypto.HmacSHA256(Buffer.concat([v,new Buffer([1]),x,hash]),k)
v=crypto.HmacSHA256(v,k)
v=crypto.HmacSHA256(v,k)
var T=BigInteger.fromBuffer(v)
while((T.signum()<=0)||(T.compareTo(curve.n)>=0)||!checkSig(T)){k=crypto.HmacSHA256(Buffer.concat([v,new Buffer([0])]),k)
v=crypto.HmacSHA256(v,k)
v=crypto.HmacSHA256(v,k)
T=BigInteger.fromBuffer(v)}
return T}
function sign(curve,hash,d,nonce){var e=BigInteger.fromBuffer(hash)
var n=curve.n
var G=curve.G
var r,s
var k=deterministicGenerateK(curve,hash,d,function(k){var Q=G.multiply(k)
if(curve.isInfinity(Q))return!1
r=Q.affineX.mod(n)
if(r.signum()===0)return!1
s=k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n)
if(s.signum()===0)return!1
return!0},nonce)
var N_OVER_TWO=n.shiftRight(1)
if(s.compareTo(N_OVER_TWO)>0){s=n.subtract(s)}
return ECSignature(r,s)}
function verifyRaw(curve,e,signature,Q){var n=curve.n
var G=curve.G
var r=signature.r
var s=signature.s
if(r.signum()<=0||r.compareTo(n)>=0)return!1
if(s.signum()<=0||s.compareTo(n)>=0)return!1
var c=s.modInverse(n)
var u1=e.multiply(c).mod(n)
var u2=r.multiply(c).mod(n)
var R=G.multiplyTwo(u1,Q,u2)
if(curve.isInfinity(R))return!1
var xR=R.affineX
var v=xR.mod(n)
return v.equals(r)}
function verify(curve,hash,signature,Q){var e=BigInteger.fromBuffer(hash)
return verifyRaw(curve,e,signature,Q)}
function recoverPubKey(curve,e,signature,i){assert.strictEqual(i&3,i,'Recovery param is more than two bits')
var n=curve.n
var G=curve.G
var r=signature.r
var s=signature.s
assert(r.signum()>0&&r.compareTo(n)<0,'Invalid r value')
assert(s.signum()>0&&s.compareTo(n)<0,'Invalid s value')
var isYOdd=i&1
var isSecondKey=i>>1
var x=isSecondKey?r.add(n):r
var R=curve.pointFromX(isYOdd,x)
var nR=R.multiply(n)
assert(curve.isInfinity(nR),'nR is not a valid curve point')
var eNeg=e.negate().mod(n)
var rInv=r.modInverse(n)
var Q=R.multiplyTwo(s,G,eNeg).multiply(rInv)
curve.validate(Q)
return Q}
function calcPubKeyRecoveryParam(curve,e,signature,Q){for(var i=0;i<4;i++){var Qprime=recoverPubKey(curve,e,signature,i)
if(Qprime.equals(Q)){return i}}
throw new Error('Unable to find valid recovery factor')}
module.exports={calcPubKeyRecoveryParam:calcPubKeyRecoveryParam,deterministicGenerateK:deterministicGenerateK,recoverPubKey:recoverPubKey,sign:sign,verify:verify,verifyRaw:verifyRaw}}).call(this,require("buffer").Buffer)},{"./ecsignature":88,"./enforce_types":89,"./hash":90,"assert":1,"bigi":6,"buffer":27}],88:[function(require,module,exports){(function(Buffer){var assert=require('assert')
var enforceType=require('./enforce_types')
var BigInteger=require('bigi')
function ECSignature(r,s){enforceType(BigInteger,r)
enforceType(BigInteger,s)
function toCompact(i,compressed){if(compressed)i+=4
i+=27
var buffer=new Buffer(65)
buffer.writeUInt8(i,0)
r.toBuffer(32).copy(buffer,1)
s.toBuffer(32).copy(buffer,33)
return buffer}
function toDER(){var rBa=r.toDERInteger()
var sBa=s.toDERInteger()
var sequence=[]
sequence.push(0x02,rBa.length)
sequence=sequence.concat(rBa)
sequence.push(0x02,sBa.length)
sequence=sequence.concat(sBa)
sequence.unshift(0x30,sequence.length)
return new Buffer(sequence)}
function toScriptSignature(hashType){var hashTypeBuffer=new Buffer(1)
hashTypeBuffer.writeUInt8(hashType,0)
return Buffer.concat([toDER(),hashTypeBuffer])}
return{r,s,toCompact,toDER,toScriptSignature}}
ECSignature.parseCompact=function(buffer){assert.equal(buffer.length,65,'Invalid signature length')
var i=buffer.readUInt8(0)-27
assert.equal(i,i&7,'Invalid signature parameter')
var compressed=!!(i&4)
i=i&3
var r=BigInteger.fromBuffer(buffer.slice(1,33))
var s=BigInteger.fromBuffer(buffer.slice(33))
return{compressed:compressed,i:i,signature:ECSignature(r,s)}}
ECSignature.fromDER=function(buffer){assert.equal(buffer.readUInt8(0),0x30,'Not a DER sequence')
assert.equal(buffer.readUInt8(1),buffer.length-2,'Invalid sequence length')
assert.equal(buffer.readUInt8(2),0x02,'Expected a DER integer')
var rLen=buffer.readUInt8(3)
assert(rLen>0,'R length is zero')
var offset=4+rLen
assert.equal(buffer.readUInt8(offset),0x02,'Expected a DER integer (2)')
var sLen=buffer.readUInt8(offset+1)
assert(sLen>0,'S length is zero')
var rB=buffer.slice(4,offset)
var sB=buffer.slice(offset+2)
offset+=2+sLen
if(rLen>1&&rB.readUInt8(0)===0x00){assert(rB.readUInt8(1)&0x80,'R value excessively padded')}
if(sLen>1&&sB.readUInt8(0)===0x00){assert(sB.readUInt8(1)&0x80,'S value excessively padded')}
assert.equal(offset,buffer.length,'Invalid DER encoding')
var r=BigInteger.fromDERInteger(rB)
var s=BigInteger.fromDERInteger(sB)
assert(r.signum()>=0,'R value is negative')
assert(s.signum()>=0,'S value is negative')
return ECSignature(r,s)}
ECSignature.parseScriptSignature=function(buffer){var hashType=buffer.readUInt8(buffer.length-1)
var hashTypeMod=hashType&~0x80
assert(hashTypeMod>0x00&&hashTypeMod<0x04,'Invalid hashType')
return{signature:ECSignature.fromDER(buffer.slice(0,-1)),hashType:hashType}}
module.exports=ECSignature}).call(this,require("buffer").Buffer)},{"./enforce_types":89,"assert":1,"bigi":6,"buffer":27}],89:[function(require,module,exports){(function(Buffer){module.exports=function enforce(type,value){switch(type){case 'Array':{if(Array.isArray(value))return
break}
case 'Boolean':{if(typeof value==='boolean')return
break}
case 'Buffer':{if(Buffer.isBuffer(value))return
break}
case 'Number':{if(typeof value==='number')return
break}
case 'String':{if(typeof value==='string')return
break}
default:{if(getName(value.constructor)===getName(type))return}}
throw new TypeError('Expected '+(getName(type)||type)+', got '+value)}
function getName(fn){var match=fn.toString().match(/function (.*?)\(/)
return match?match[1]:null}}).call(this,{"isBuffer":require("../node_modules/is-buffer/index.js")})},{"../node_modules/is-buffer/index.js":46}],90:[function(require,module,exports){const createHash=require('create-hash')
const createHmac=require('create-hmac')
function sha1(data,encoding){return createHash('sha1').update(data).digest(encoding)}
function sha256(data,encoding){return createHash('sha256').update(data).digest(encoding)}
function sha512(data,encoding){return createHash('sha512').update(data).digest(encoding)}
function HmacSHA256(buffer,secret){return createHmac('sha256',secret).update(buffer).digest()}
function ripemd160(data){return createHash('rmd160').update(data).digest()}
module.exports={sha1:sha1,sha256:sha256,sha512:sha512,HmacSHA256:HmacSHA256,ripemd160:ripemd160}},{"create-hash":31,"create-hmac":34}],91:[function(require,module,exports){const commonApi=require('./api_common')
const objectApi=require('./api_object')
const ecc=Object.assign({},commonApi,objectApi)
module.exports=ecc},{"./api_common":84,"./api_object":85}],92:[function(require,module,exports){(function(Buffer){const ecurve=require('ecurve');const Point=ecurve.Point;const secp256k1=ecurve.getCurveByName('secp256k1');const BigInteger=require('bigi');const base58=require('bs58');const assert=require('assert');const hash=require('./hash');const PublicKey=require('./key_public');const keyUtils=require('./key_utils');const createHash=require('create-hash')
const promiseAsync=require('./promise-async')
const G=secp256k1.G
const n=secp256k1.n
module.exports=PrivateKey;function PrivateKey(d){if(typeof d==='string'){return PrivateKey.fromWif(d)}else if(Buffer.isBuffer(d)){return PrivateKey.fromBuffer(d)}else if(typeof d==='object'&&BigInteger.isBigInteger(d.d)){return PrivateKey(d.d)}
if(!BigInteger.isBigInteger(d)){throw new TypeError('Invalid private key')}
function toWif(){var private_key=toBuffer();private_key=Buffer.concat([new Buffer([0x80]),private_key]);var checksum=hash.sha256(private_key);checksum=hash.sha256(checksum);checksum=checksum.slice(0,4);var private_wif=Buffer.concat([private_key,checksum]);return base58.encode(private_wif)}
let public_key;function toPublic(){if(public_key){return public_key}
const Q=secp256k1.G.multiply(d);return public_key=PublicKey.fromPoint(Q)}
function toBuffer(){return d.toBuffer(32)}
function getSharedSecret(public_key){public_key=PublicKey(public_key)
let KB=public_key.toUncompressed().toBuffer()
let KBP=Point.fromAffine(secp256k1,BigInteger.fromBuffer(KB.slice(1,33)),BigInteger.fromBuffer(KB.slice(33,65)))
let r=toBuffer()
let P=KBP.multiply(BigInteger.fromBuffer(r))
let S=P.affineX.toBuffer({size:32})
return hash.sha512(S)}
function getChildKey(name){const index=createHash('sha256').update(toBuffer()).update(name).digest()
return PrivateKey(index)}
function toHex(){return toBuffer().toString('hex')}
return{d,toWif,toPublic,toBuffer,toString:toWif,getSharedSecret,getChildKey}}
PrivateKey.fromHex=function(hex){return PrivateKey.fromBuffer(new Buffer(hex,'hex'))}
PrivateKey.fromBuffer=function(buf){if(!Buffer.isBuffer(buf)){throw new Error("Expecting parameter to be a Buffer type")}
if(32!==buf.length){console.log(`WARN: Expecting 32 bytes, instead got ${buf.length}, stack trace:`,new Error().stack)}
if(buf.length===0){throw new Error("Empty buffer")}
return PrivateKey(BigInteger.fromBuffer(buf))}
PrivateKey.fromSeed=function(seed){if(!(typeof seed==='string')){throw new Error('seed must be of type string')}
return PrivateKey.fromBuffer(hash.sha256(seed))}
PrivateKey.isWif=function(text){try{PrivateKey.fromWif(text)
return!0}catch(e){return!1}}
PrivateKey.isValid=function(key){try{PrivateKey(key)
return!0}catch(e){return!1}}
PrivateKey.fromWif=function(_private_wif){var private_wif=new Buffer(base58.decode(_private_wif));var version=private_wif.readUInt8(0);assert.equal(0x80,version,`Expected version ${0x80}, instead got ${version}`);var private_key=private_wif.slice(0,-4);var checksum=private_wif.slice(-4);var new_checksum=hash.sha256(private_key);new_checksum=hash.sha256(new_checksum);new_checksum=new_checksum.slice(0,4);if(checksum.toString()!==new_checksum.toString())
throw new Error('Invalid WIF key (checksum miss-match), '+`${checksum.toString('hex')} != ${new_checksum.toString('hex')}`)
private_key=private_key.slice(1);return PrivateKey.fromBuffer(private_key)}
PrivateKey.randomKey=function(cpuEntropyBits=0){return PrivateKey.initialize().then(()=>(PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({cpuEntropyBits}))))}
PrivateKey.unsafeRandomKey=function(){return PrivateKey.initialize().then(()=>(PrivateKey.fromBuffer(keyUtils.random32ByteBuffer({safe:!1}))))}
let initialized=!1,unitTested=!1
function initialize(){if(initialized){return}
unitTest()
keyUtils.addEntropy(...keyUtils.cpuEntropy())
assert(keyUtils.entropyCount()>=128,'insufficient entropy')
initialized=!0}
PrivateKey.initialize=promiseAsync(initialize)
function unitTest(){const privateKey=PrivateKey(hash.sha256(''))
const wif=privateKey.toWif()
assert.equal(wif,'5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss','wif comparison test failed on a known private key')
const pubkey=privateKey.toPublic().toString()
assert.equal(pubkey,'EOS859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM','pubkey string comparison test failed on a known public key')
doesNotThrow(()=>PrivateKey.fromWif(wif),'converting known wif from string')
doesNotThrow(()=>PublicKey.fromString(pubkey),'converting known public key from string')
unitTested=!0}
const doesNotThrow=(cb,msg)=>{try{cb()}catch(error){error.message=`${msg} ==> ${error.message}`
throw error}}}).call(this,require("buffer").Buffer)},{"./hash":90,"./key_public":93,"./key_utils":94,"./promise-async":95,"assert":1,"bigi":6,"bs58":25,"buffer":27,"create-hash":31,"ecurve":38}],93:[function(require,module,exports){(function(Buffer){const BigInteger=require('bigi');const ecurve=require('ecurve');const secp256k1=ecurve.getCurveByName('secp256k1');const base58=require('bs58');const hash=require('./hash');const config=require('./config');const assert=require('assert');var G=secp256k1.G
var n=secp256k1.n
module.exports=PublicKey
function PublicKey(Q){if(typeof Q==='string'){const publicKey=PublicKey.fromString(Q)
assert(publicKey!=null,'Invalid public key')
return publicKey}else if(Buffer.isBuffer(Q)){return PublicKey.fromBuffer(Q)}else if(typeof Q==='object'&&Q.Q){return PublicKey(Q.Q)}
if(typeof Q!=='object'||typeof Q.compressed!=='boolean'){throw new TypeError('Invalid public key')}
function toBuffer(compressed=Q.compressed){return Q.getEncoded(compressed)}
let pubdata
function toString(address_prefix=config.address_prefix){if(pubdata){return address_prefix+pubdata}
const pub_buf=toBuffer();const checksum=hash.ripemd160(pub_buf);const addy=Buffer.concat([pub_buf,checksum.slice(0,4)]);pubdata=base58.encode(addy)
return address_prefix+pubdata}
function toUncompressed(){var buf=Q.getEncoded(!1);var point=ecurve.Point.decodeFrom(secp256k1,buf);return PublicKey.fromPoint(point)}
function child(offset){console.error('Deprecated warning: PublicKey.child')
assert(Buffer.isBuffer(offset),"Buffer required: offset")
assert.equal(offset.length,32,"offset length")
offset=Buffer.concat([toBuffer(),offset])
offset=hash.sha256(offset)
let c=BigInteger.fromBuffer(offset)
if(c.compareTo(n)>=0)
throw new Error("Child offset went out of bounds, try again")
let cG=G.multiply(c)
let Qprime=Q.add(cG)
if(secp256k1.isInfinity(Qprime))
throw new Error("Child offset derived to an invalid key, try again")
return PublicKey.fromPoint(Qprime)}
function toHex(){return toBuffer().toString('hex')}
return{Q,toString,toUncompressed,toBuffer,child,toHex}}
PublicKey.isValid=function(text){try{PublicKey(text)
return!0}catch(e){return!1}}
PublicKey.fromBinary=function(bin){return PublicKey.fromBuffer(new Buffer(bin,'binary'))}
PublicKey.fromBuffer=function(buffer){return PublicKey(ecurve.Point.decodeFrom(secp256k1,buffer))}
PublicKey.fromPoint=function(point){return PublicKey(point)}
PublicKey.fromString=function(public_key,address_prefix=config.address_prefix){try{return PublicKey.fromStringOrThrow(public_key,address_prefix)}catch(e){return null}}
PublicKey.fromStringOrThrow=function(public_key,address_prefix=config.address_prefix){var prefix=public_key.slice(0,address_prefix.length);assert.equal(address_prefix,prefix,`Expecting key to begin with ${address_prefix}, instead got ${prefix}`);public_key=public_key.slice(address_prefix.length);public_key=new Buffer(base58.decode(public_key),'binary');var checksum=public_key.slice(-4);public_key=public_key.slice(0,-4);var new_checksum=hash.ripemd160(public_key);new_checksum=new_checksum.slice(0,4);assert.deepEqual(checksum,new_checksum,'Checksum did not match, '+`${checksum.toString('hex')} != ${new_checksum.toString('hex')}`);return PublicKey.fromBuffer(public_key)}
PublicKey.fromHex=function(hex){return PublicKey.fromBuffer(new Buffer(hex,'hex'))}
PublicKey.fromStringHex=function(hex){return PublicKey.fromString(new Buffer(hex,'hex'))}}).call(this,require("buffer").Buffer)},{"./config":86,"./hash":90,"assert":1,"bigi":6,"bs58":25,"buffer":27,"ecurve":38}],94:[function(require,module,exports){(function(Buffer){const assert=require('assert')
const randomBytes=require('randombytes');const hash=require('./hash');module.exports={random32ByteBuffer,addEntropy,cpuEntropy,entropyCount:()=>entropyCount}
let entropyPos=0,entropyCount=0
const externalEntropyArray=randomBytes(101)
function random32ByteBuffer({cpuEntropyBits=0,safe=!0}={}){assert(typeof cpuEntropyBits,'number','cpuEntropyBits')
assert(typeof safe,'boolean','boolean')
if(safe){assert(entropyCount>=128,'Call initialize() to add entropy')}
const hash_array=[]
hash_array.push(randomBytes(32))
hash_array.push(Buffer.from(cpuEntropy(cpuEntropyBits)))
hash_array.push(externalEntropyArray)
hash_array.push(browserEntropy())
return hash.sha256(Buffer.concat(hash_array))}
function addEntropy(...ints){assert.equal(externalEntropyArray.length,101,'externalEntropyArray')
entropyCount+=ints.length
for(const i of ints){const pos=entropyPos++%101
const i2=externalEntropyArray[pos]+=i
if(i2>9007199254740991)
externalEntropyArray[pos]=0}}
function cpuEntropy(cpuEntropyBits=128){let collected=[]
let lastCount=null
let lowEntropySamples=0
while(collected.length<cpuEntropyBits){const count=floatingPointCount()
if(lastCount!=null){const delta=count-lastCount
if(Math.abs(delta)<1){lowEntropySamples++
continue}
const bits=Math.floor(log2(Math.abs(delta))+1)
if(bits<4){if(bits<2){lowEntropySamples++}
continue}
collected.push(delta)}
lastCount=count}
if(lowEntropySamples>10){const pct=Number(lowEntropySamples/cpuEntropyBits*100).toFixed(2)
console.warn(`WARN: ${pct}% low CPU entropy re-sampled`)}
return collected}
function floatingPointCount(){const workMinMs=7
const d=Date.now()
let i=0,x=0
while(Date.now()<d+workMinMs+1){x=Math.sin(Math.sqrt(Math.log(++i+x)))}
return i}
const log2=x=>Math.log(x)/Math.LN2
function browserEntropy(){let entropyStr=Array(randomBytes(101)).join()
try{entropyStr+=(new Date()).toString()+" "+window.screen.height+" "+window.screen.width+" "+window.screen.colorDepth+" "+" "+window.screen.availHeight+" "+window.screen.availWidth+" "+window.screen.pixelDepth+navigator.language+" "+window.location+" "+window.history.length;for(let i=0,mimeType;i<navigator.mimeTypes.length;i++){mimeType=navigator.mimeTypes[i];entropyStr+=mimeType.description+" "+mimeType.type+" "+mimeType.suffixes+" "}}catch(error){entropyStr+=hash.sha256((new Date()).toString())}
const b=new Buffer(entropyStr);entropyStr+=b.toString('binary')+" "+(new Date()).toString();let entropy=entropyStr;const start_t=Date.now();while(Date.now()-start_t<25)
entropy=hash.sha256(entropy);return entropy}}).call(this,require("buffer").Buffer)},{"./hash":90,"assert":1,"buffer":27,"randombytes":53}],95:[function(require,module,exports){module.exports=func=>((...args)=>(new Promise((resolve,reject)=>{setTimeout(()=>{try{resolve(func(...args))}catch(err){reject(err)}})})))},{}],96:[function(require,module,exports){(function(Buffer){var ecdsa=require('./ecdsa');var hash=require('./hash');var curve=require('ecurve').getCurveByName('secp256k1');var assert=require('assert');var BigInteger=require('bigi');var PublicKey=require('./key_public');var PrivateKey=require('./key_private');module.exports=Signature
function Signature(r,s,i){assert.equal(r!=null,!0,'Missing parameter');assert.equal(s!=null,!0,'Missing parameter');assert.equal(i!=null,!0,'Missing parameter');function verify(data,pubkey){if(typeof data==='string'){data=Buffer.from(data)}
assert(Buffer.isBuffer(data),'data is a required String or Buffer')
data=hash.sha256(data)
return verifyHash(data,pubkey)}
function verifyHash(dataSha256,pubkey){if(typeof dataSha256==='string'){dataSha256=Buffer.from(dataSha256,'hex')}
if(dataSha256.length!==32||!Buffer.isBuffer(dataSha256))
throw new Error("dataSha256: 32 byte buffer requred")
const publicKey=PublicKey(pubkey)
assert(publicKey,'pubkey required')
return ecdsa.verify(curve,dataSha256,{r:r,s:s},publicKey.Q)};function verifyHex(hex,pubkey){const buf=Buffer.from(hex,'hex');return verify(buf,pubkey)};function recover(data){if(typeof data==='string'){data=Buffer.from(data)}
assert(Buffer.isBuffer(data),'data is a required String or Buffer')
data=hash.sha256(data)
return recoverHash(data)};function recoverHash(dataSha256){if(typeof dataSha256==='string'){dataSha256=Buffer.from(dataSha256,'hex')}
if(dataSha256.length!==32||!Buffer.isBuffer(dataSha256)){throw new Error("dataSha256: 32 byte String or buffer requred")}
const e=BigInteger.fromBuffer(dataSha256);let i2=i
i2-=27;i2=i2&3;const Q=ecdsa.recoverPubKey(curve,e,{r,s,i},i2);return PublicKey.fromPoint(Q)};function toBuffer(){var buf;buf=new Buffer(65);buf.writeUInt8(i,0);r.toBuffer(32).copy(buf,1);s.toBuffer(32).copy(buf,33);return buf};function toHex(){return toBuffer().toString("hex")};return{r,s,i,toBuffer,verify,verifyHash,verifyHex,recover,recoverHash,toHex,verifyBuffer:verify,recoverPublicKey:recover,recoverPublicKeyFromBuffer:recoverHash,}}
Signature.sign=function(data,privateKey){if(typeof data==='string'){data=Buffer.from(data)}
assert(Buffer.isBuffer(data),'data is a required String or Buffer')
data=hash.sha256(data)
return Signature.signHash(data,privateKey)}
Signature.signHash=function(dataSha256,privateKey){if(typeof dataSha256==='string'){dataSha256=Buffer.from(dataSha256,'hex')}
if(dataSha256.length!==32||!Buffer.isBuffer(dataSha256))
throw new Error("dataSha256: 32 byte buffer requred")
privateKey=PrivateKey(privateKey)
assert(privateKey,'privateKey required')
var der,e,ecsignature,i,lenR,lenS,nonce;i=null;nonce=0;e=BigInteger.fromBuffer(dataSha256);while(!0){ecsignature=ecdsa.sign(curve,dataSha256,privateKey.d,nonce++);der=ecsignature.toDER();lenR=der[3];lenS=der[5+lenR];if(lenR===32&&lenS===32){i=ecdsa.calcPubKeyRecoveryParam(curve,e,ecsignature,privateKey.toPublic().Q);i+=4;i+=27;break}
if(nonce%10===0){console.log("WARN: "+nonce+" attempts to find canonical signature")}}
return Signature(ecsignature.r,ecsignature.s,i)};Signature.fromBuffer=function(buf){var i,r,s;assert(Buffer.isBuffer(buf),'Buffer is required')
assert.equal(buf.length,65,'Invalid signature length');i=buf.readUInt8(0);assert.equal(i-27,i-27&7,'Invalid signature parameter');r=BigInteger.fromBuffer(buf.slice(1,33));s=BigInteger.fromBuffer(buf.slice(33));return Signature(r,s,i)};Signature.fromHex=function(hex){return Signature.fromBuffer(Buffer.from(hex,"hex"))};Signature.from=o=>{const signature=o?(o.r&&o.s&&o.i)?o:typeof o==='string'?Signature.fromHex(o):Buffer.isBuffer(o)?Signature.fromBuffer(o):null:o
if(!signature){throw new TypeError('signature should be a hex string or buffer')}
return signature}}).call(this,require("buffer").Buffer)},{"./ecdsa":87,"./hash":90,"./key_private":92,"./key_public":93,"assert":1,"bigi":6,"buffer":27,"ecurve":38}]},{},[91])(91)})