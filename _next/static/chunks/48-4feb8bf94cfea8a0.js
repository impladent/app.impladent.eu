"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[48],{5034:function(A,n,r){r.d(n,{MP:function(){return o},up:function(){return s},He:function(){return a},yI:function(){return c}});var e=r(4051),t=r.n(e);function i(A,n,r,e,t,i,o){try{var s=A[i](o),a=s.value}catch(c){return void r(c)}s.done?n(a):Promise.resolve(a).then(e,t)}var o=function(A){return function(){var n;return fetch("".concat("https://api.impladent.eu","/schedule?date=").concat(A),{headers:{Authorization:"Bearer ".concat(null===(n=window.localStorage.getItem("impladent_access_token_v1"))||void 0===n?void 0:n.replaceAll('"',""))}}).then((function(A){return A.json()}))}},s=function(){var A;return fetch("".concat("https://api.impladent.eu","/leave/types"),{headers:{Authorization:"Bearer ".concat(null===(A=window.localStorage.getItem("impladent_access_token_v1"))||void 0===A?void 0:A.replaceAll('"',""))}}).then((function(A){return A.json()}))},a=function(A){var n,r=A.values;return fetch("".concat("https://api.impladent.eu","/leave"),{method:"POST",headers:{Authorization:"Bearer ".concat(null===(n=window.localStorage.getItem("impladent_access_token_v1"))||void 0===n?void 0:n.replaceAll('"',""))},body:JSON.stringify(r)}).then(function(){var A,n=(A=t().mark((function A(n){var r,e,i;return t().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(!(null===(r=n.headers.get("content-type"))||void 0===r?void 0:r.includes("application/json"))){A.next=8;break}return A.next=5,n.json();case 5:A.t0=A.sent,A.next=9;break;case 8:A.t0=null;case 9:if(e=A.t0,n.ok){A.next=13;break}return i=e&&e.message||n.status,A.abrupt("return",Promise.reject(i));case 13:case"end":return A.stop()}}),A)})),function(){var n=this,r=arguments;return new Promise((function(e,t){var o=A.apply(n,r);function s(A){i(o,e,t,s,a,"next",A)}function a(A){i(o,e,t,s,a,"throw",A)}s(void 0)}))});return function(A){return n.apply(this,arguments)}}())};function c(A,n){return A("Wyst\u0105pi\u0142 b\u0142\u0105d!",{variant:"error"})}},680:function(A,n,r){r.d(n,{L:function(){return F}});var e=r(4051),t=r.n(e),i=r(5893),o=r(326),s=r(5294),a=r(4178),c=r(2293),l=r(7357),u=r(3321),w=r(7948),h=r(4674),B=r(155),Q=r(5861),C=r(1163),M=r(7294),p=r(5800),f=r(9211),g=r(5619),d=r(4393),x=r(5398),E=r(8826),I=r(8462),j=r(6113),D=r(7594),v=r(9334),y=r(3300),m=r(3147);function G(A,n,r,e,t,i,o){try{var s=A[i](o),a=s.value}catch(c){return void r(c)}s.done?n(a):Promise.resolve(a).then(e,t)}function Y(A){return function(){var n=this,r=arguments;return new Promise((function(e,t){var i=A.apply(n,r);function o(A){G(i,e,t,o,s,"next",A)}function s(A){G(i,e,t,o,s,"throw",A)}o(void 0)}))}}function Z(A){var n=A.open,r=A.onClose,e=(0,C.useRouter)().push;return(0,i.jsxs)(E.ZP,{anchor:"left",open:n,onClose:r,children:[(0,i.jsx)(l.Z,{p:3,pt:5,textAlign:"center",children:(0,i.jsx)("img",{src:y.Z.src,alt:"logo",style:{width:200,height:50}})}),(0,i.jsx)(l.Z,{sx:{width:250},role:"presentation",onClick:r,onKeyDown:r,children:(0,i.jsxs)(I.Z,{children:[(0,i.jsxs)(j.Z,{children:[(0,i.jsx)(D.Z,{children:(0,i.jsx)(x.Z,{})}),(0,i.jsx)(v.Z,{primary:"Wizyty",onClick:Y(t().mark((function A(){return t().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,e("/");case 2:return A.abrupt("return",A.sent);case 3:case"end":return A.stop()}}),A)})))})]}),(0,i.jsxs)(j.Z,{children:[(0,i.jsx)(D.Z,{children:(0,i.jsx)(m.Z,{})}),(0,i.jsx)(v.Z,{primary:"Urlopy",onClick:Y(t().mark((function A(){return t().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,e("/urlopy");case 2:return A.abrupt("return",A.sent);case 3:case"end":return A.stop()}}),A)})))})]})]})})]})}function k(){return(0,i.jsx)(w.Z,{maxWidth:"sm",component:"main",sx:{height:"calc(100vh - 124px)",overflowX:"clip",overflowY:"scroll",marginTop:2},children:(0,i.jsxs)(l.Z,{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",children:[(0,i.jsx)(l.Z,{p:1,children:(0,i.jsx)("img",{alt:"loader",src:"data:image/gif;base64,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"})}),(0,i.jsx)(Q.Z,{variant:"caption",children:"wczytywanie danych..."})]})})}function L(A,n){(null==n||n>A.length)&&(n=A.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=A[r];return e}function H(A,n,r,e,t,i,o){try{var s=A[i](o),a=s.value}catch(c){return void r(c)}s.done?n(a):Promise.resolve(a).then(e,t)}function z(A,n){return function(A){if(Array.isArray(A))return A}(A)||function(A,n){var r=null==A?null:"undefined"!==typeof Symbol&&A[Symbol.iterator]||A["@@iterator"];if(null!=r){var e,t,i=[],o=!0,s=!1;try{for(r=r.call(A);!(o=(e=r.next()).done)&&(i.push(e.value),!n||i.length!==n);o=!0);}catch(a){s=!0,t=a}finally{try{o||null==r.return||r.return()}finally{if(s)throw t}}return i}}(A,n)||function(A,n){if(!A)return;if("string"===typeof A)return L(A,n);var r=Object.prototype.toString.call(A).slice(8,-1);"Object"===r&&A.constructor&&(r=A.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return L(A,n)}(A,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(A){var n,r=A.children,e=A.title,x=A.subtitle,E=A.isLoading,I=void 0!==E&&E,j=z((0,f.Z)(!1),2),D=j[0],v=j[1],y=(0,d.dQ)(),m=y.token,G=y.clearToken,Y=(0,C.useRouter)().push,L=(0,M.useState)(null),F=L[0],b=L[1];return(0,i.jsxs)(M.Fragment,{children:[(0,i.jsxs)(c.Z,{position:"static",children:[(0,i.jsxs)(B.Z,{children:[(0,i.jsx)(h.Z,{onClick:v,size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:(0,i.jsx)(o.Z,{})}),(0,i.jsx)(Q.Z,{variant:"h6",component:"div",sx:{flexGrow:1},children:e}),(0,i.jsx)(u.Z,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(A){return b(A.currentTarget)},color:"inherit",children:m.sub}),(0,i.jsx)(s.Z,{id:"menu-appbar",anchorEl:F,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(F),onClose:function(){return b(null)},children:(0,i.jsx)(a.Z,{onClick:(n=t().mark((function A(){return t().wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return G(),A.next=3,Y("/");case 3:case"end":return A.stop()}}),A)})),function(){var A=this,r=arguments;return new Promise((function(e,t){var i=n.apply(A,r);function o(A){H(i,e,t,o,s,"next",A)}function s(A){H(i,e,t,o,s,"throw",A)}o(void 0)}))}),children:"Wyloguj"})})]}),(0,i.jsx)(Z,{open:D,onClose:v})]}),(0,i.jsx)(p.ErrorBoundary,{FallbackComponent:U,children:I?(0,i.jsx)(k,{}):(0,i.jsxs)(w.Z,{maxWidth:"sm",component:"main",sx:{height:"calc(100vh - 124px)",overflowX:"clip",overflowY:"scroll",marginTop:2,position:"relative"},children:[x&&(0,i.jsx)(l.Z,{p:1,pb:3,children:(0,i.jsx)(Q.Z,{variant:"h5",children:x})}),r]})}),(0,i.jsx)(g.Z,{})]})}function U(){return(0,i.jsx)("p",{children:"error"})}}}]);