parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oNMX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=new AudioContext,t=e.createGain();t.connect(e.destination);var n=!1;exports.beep=function(r,a,c){if(!n){n=!0,t.gain.value=.01*r;var i=e.createOscillator();i.addEventListener("ended",function(){return n=!1}),i.connect(t),i.frequency.value=a,i.type="square",i.start(e.currentTime),i.stop(e.currentTime+.001*c)}};
},{}],"Xy9y":[function(require,module,exports) {
"use strict";var e=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var n=Array(e),o=0;for(r=0;r<t;r++)for(var u=arguments[r],s=0,i=u.length;s<i;s++,o++)n[o]=u[s];return n};Object.defineProperty(exports,"__esModule",{value:!0});var r={};exports.map=function(){return r},exports.add=function(e,t){r[e]=r[e]||{},r[e][t]=!0},exports.remove=function(e,t){delete r[e][t]},exports.exists=function(e,t){return e in r&&t in r[e]},exports.all=function(){return Object.keys(r).reduce(function(t,n){return e(t,Object.keys(r[n]).reduce(function(r,t){return e(r,[[n,t]])},[]))},[])};
},{}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__spreadArrays||function(){for(var e=0,r=0,a=arguments.length;r<a;r++)e+=arguments[r].length;var t=Array(e),n=0;for(r=0;r<a;r++)for(var o=arguments[r],i=0,l=o.length;i<l;i++,n++)t[n]=o[i];return t},r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r.default=e,r};Object.defineProperty(exports,"__esModule",{value:!0});var a=require("./sound"),t=r(require("./apples")),n=document.getElementById("game"),o=n.getContext("2d"),i=n.width,l=n.height,c=100,f=100,s=50,d=l/c,h=i/f,u={NORTH:0,SOUTH:1,EAST:2,WEST:3},T=u.SOUTH,v={X:0,Y:1},S=[[50,50],[50,51],[50,52],[50,53],[50,54],[50,55],[50,56],[50,57],[50,58],[50,59]],w=function(e){void 0===e&&(e=5);for(var r=0;r<e;r++)t.add(Math.floor(Math.random()*f),Math.floor(Math.random()*c))};w();var E=t.all(),p=!0,b=!1,O=performance.now(),g=0,m=0,U=function(){var r=performance.now(),n=r-O+g;if(O=r,n>s){0==E.length&&w();var o=S[S.length-1],i=e(o);switch(T){case u.NORTH:i[v.Y]=(i[v.Y]-1)%c;break;case u.SOUTH:i[v.Y]=(i[v.Y]+1)%c;break;case u.EAST:i[v.X]=(i[v.X]+1)%f;break;case u.WEST:i[v.X]=(i[v.X]-1)%f;break;default:throw new Error("invalid direction")}i[v.X]<0&&(i[v.X]=f),i[v.Y]<0&&(i[v.Y]=c);var l=i[0],d=i[1],h=!1;t.exists(l,d)?(t.remove(l,d),a.beep(50,1500,30),h=!0,s--,m++):S.find(function(e){return e[v.X]==l&&e[v.Y]==d})&&(b=!0,a.beep(90,200,100),a.beep(90,200,100),a.beep(90,200,100)),S=e(S.slice(h?0:1,S.length),[i]),g=n-s}else g=n},k=function(){o.fillStyle="#70806C",o.fillRect(0,0,i,l);for(var e=0;e<S.length;e++){var r=S[e],a=r[0],n=r[1];o.fillStyle="#10120F",o.fillRect(a*h+1,n*d+1,h-2,d-2)}E=t.all();for(e=0;e<E.length;e++){var c=E[e];a=c[0],n=c[1];o.beginPath(),o.fillStyle="#10120F",o.arc(a*h+h/2,n*d+d/2,h/2-1,0,2*Math.PI),o.fill()}o.font="50px arcade-classic";var f="Score: 000"+m,s=o.measureText(f);if(o.fillText(f,i-s.width-10,60),p){o.font="250px arcade-classic";var u=o.measureText("PAUSED");o.fillText("PAUSED",i/2-u.width/2,l/2)}if(b){o.font="240px arcade-classic";var T=o.measureText("YOU SUCK");o.fillText("YOU SUCK",i/2-T.width/2,l/2)}},A={UP:"ArrowUp",DOWN:"ArrowDown",LEFT:"ArrowLeft",RIGHT:"ArrowRight",ENTER:"Enter"},x=function(e){switch(e.key){case A.UP:T!=u.SOUTH&&(T=u.NORTH);break;case A.DOWN:T!=u.NORTH&&(T=u.SOUTH);break;case A.LEFT:T!=u.EAST&&(T=u.WEST);break;case A.RIGHT:T!=u.WEST&&(T=u.EAST);break;case A.ENTER:p||b?(p=!1,b=!1,O=performance.now()):p=!0,a.beep(50,1e3,50);break;default:console.log("unhandled keydown:",e.key)}};window.addEventListener("keydown",x);var y=function e(){k(),p||b||U(),requestAnimationFrame(e)};y();
},{"./sound":"oNMX","./apples":"Xy9y"}]},{},["QCba"], null)
//# sourceMappingURL=src.364c4acb.js.map