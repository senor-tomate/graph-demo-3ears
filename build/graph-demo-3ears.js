!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define("graph-demo-3ears",["react","react-dom"],t):"object"==typeof exports?exports["graph-demo-3ears"]=t(require("react"),require("react-dom")):e["graph-demo-3ears"]=t(e.react,e["react-dom"])}(window,(function(e,t){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}([function(e,t,r){"use strict";var i=r(3),n=Object.prototype.toString;function o(e){return"[object Array]"===n.call(e)}function s(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function a(e){return"[object Function]"===n.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.call(null,e[n],n,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:l,isUndefined:s,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:a,isStream:function(e){return l(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:c,merge:function e(){var t={};function r(r,i){"object"==typeof t[i]&&"object"==typeof r?t[i]=e(t[i],r):t[i]=r}for(var i=0,n=arguments.length;i<n;i++)c(arguments[i],r);return t},deepMerge:function e(){var t={};function r(r,i){"object"==typeof t[i]&&"object"==typeof r?t[i]=e(t[i],r):t[i]="object"==typeof r?e({},r):r}for(var i=0,n=arguments.length;i<n;i++)c(arguments[i],r);return t},extend:function(e,t,r){return c(t,(function(t,n){e[n]=r&&"function"==typeof t?i(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(t,r){t.exports=e},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(r(1)),n=s(r(14)),o=s(r(32));function s(e){return e&&e.__esModule?e:{default:e}}class l extends i.default.Component{constructor(e){super(e),this.uid=e.user_id,this.wordRange=[],this.state={data:{},maxWordAmount:-1},this.calibrateSliders(),this.fetchData()}calibrateSliders(){const e={user_id:this.uid,"q[language_code]":"ru"};n.default.get("https://itl.3ears.com/api/learner_data/frequent_words/statistic",{params:e}).then(({data:e})=>{let t=0;for(let r in e)t+=e[r];this.setState({maxWordAmount:t})})}fetchData(){const e={user_id:this.uid,"q[language_code]":"ru","q[rank_gteq]":this.wordRange[0],"q[rank_lteq]":this.wordRange[1]};n.default.get("https://itl.3ears.com/api/learner_data/frequent_words/statistic",{params:e}).then(({data:e})=>{this.setState({data:e})})}parseData(e){let t={adj:null,noun:null,verb:null,pron:null,adjpron:null,prep:null,adv:null,ord:null,card:null,misc:null};const r={adj:"Adjectives",noun:"Nouns",verb:"Verbs",pron:"Pronouns",adjpron:"Adjective Pronouns",prep:"Prepositions",adv:"Adverbs",ord:"Ordinals",card:"Cardinals",misc:"Miscellaneous Words"};for(let i in e){let n="",o=!1;"u"==i.substring(0,1)&&(o=!0);let s=o?i.substr(1):i;n+=r[s],null==t[s]&&(t[s]={wordType:n,counts:[-1,-1]}),o?t[s].counts[1]=e[i]:t[s].counts[0]=e[i]}return t}scaleFunction(e){return Math.floor(this.state.maxWordAmount**Math.pow(e,1/2.25))}handleSliderChange(e){this.wordRange[0]=this.scaleFunction(e[0]),this.wordRange[1]=this.scaleFunction(e[1]),this.fetchData()}render(){return i.default.createElement(o.default,{data:this.parseData(this.state.data),onSliderChange:e=>this.handleSliderChange(e),scaleFunction:e=>this.scaleFunction(e)})}}t.default=l},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),i=0;i<r.length;i++)r[i]=arguments[i];return e.apply(t,r)}}},function(e,t,r){"use strict";var i=r(0);function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(i.isURLSearchParams(t))o=t.toString();else{var s=[];i.forEach(t,(function(e,t){null!=e&&(i.isArray(e)?t+="[]":e=[e],i.forEach(e,(function(e){i.isDate(e)?e=e.toISOString():i.isObject(e)&&(e=JSON.stringify(e)),s.push(n(t)+"="+n(e))})))})),o=s.join("&")}if(o){var l=e.indexOf("#");-1!==l&&(e=e.slice(0,l)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var i=r(0),n=r(21),o={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var l,a={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(l=r(7)),l),transformRequest:[function(e,t){return n(t,"Accept"),n(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],(function(e){a.headers[e]={}})),i.forEach(["post","put","patch"],(function(e){a.headers[e]=i.merge(o)})),e.exports=a}).call(this,r(20))},function(e,t,r){"use strict";var i=r(0),n=r(22),o=r(4),s=r(24),l=r(27),a=r(28),c=r(8);e.exports=function(e){return new Promise((function(t,u){var d=e.data,f=e.headers;i.isFormData(d)&&delete f["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",m=e.auth.password||"";f.Authorization="Basic "+btoa(p+":"+m)}var _=s(e.baseURL,e.url);if(h.open(e.method.toUpperCase(),o(_,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h.onreadystatechange=function(){if(h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in h?l(h.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:r,config:e,request:h};n(t,u,i),h=null}},h.onabort=function(){h&&(u(c("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){u(c("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),u(c(t,e,"ECONNABORTED",h)),h=null},i.isStandardBrowserEnv()){var g=r(29),y=(e.withCredentials||a(_))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;y&&(f[e.xsrfHeaderName]=y)}if("setRequestHeader"in h&&i.forEach(f,(function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete f[t]:h.setRequestHeader(t,e)})),i.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),u(e),h=null)})),void 0===d&&(d=null),h.send(d)}))}},function(e,t,r){"use strict";var i=r(23);e.exports=function(e,t,r,n,o){var s=new Error(e);return i(s,t,r,n,o)}},function(e,t,r){"use strict";var i=r(0);e.exports=function(e,t){t=t||{};var r={},n=["url","method","params","data"],o=["headers","auth","proxy"],s=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];i.forEach(n,(function(e){void 0!==t[e]&&(r[e]=t[e])})),i.forEach(o,(function(n){i.isObject(t[n])?r[n]=i.deepMerge(e[n],t[n]):void 0!==t[n]?r[n]=t[n]:i.isObject(e[n])?r[n]=i.deepMerge(e[n]):void 0!==e[n]&&(r[n]=e[n])})),i.forEach(s,(function(i){void 0!==t[i]?r[i]=t[i]:void 0!==e[i]&&(r[i]=e[i])}));var l=n.concat(o).concat(s),a=Object.keys(t).filter((function(e){return-1===l.indexOf(e)}));return i.forEach(a,(function(i){void 0!==t[i]?r[i]=t[i]:void 0!==e[i]&&(r[i]=e[i])})),r}},function(e,t,r){"use strict";function i(e){this.message=e}i.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},i.prototype.__CANCEL__=!0,e.exports=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrequentWordsPiePlot=void 0;var i=l(r(1)),n=r(12),o=l(r(13)),s=l(r(2));function l(e){return e&&e.__esModule?e:{default:e}}(0,n.render)(i.default.createElement(o.default,null),document.getElementById("container")),t.default=o.default,t.FrequentWordsPiePlot=s.default},function(e,r){e.exports=t},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return i.default.createElement(n.default,{user_id:6487})};var i=o(r(1)),n=o(r(2));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){e.exports=r(15)},function(e,t,r){"use strict";var i=r(0),n=r(3),o=r(16),s=r(9);function l(e){var t=new o(e),r=n(o.prototype.request,t);return i.extend(r,o.prototype,t),i.extend(r,t),r}var a=l(r(6));a.Axios=o,a.create=function(e){return l(s(a.defaults,e))},a.Cancel=r(10),a.CancelToken=r(30),a.isCancel=r(5),a.all=function(e){return Promise.all(e)},a.spread=r(31),e.exports=a,e.exports.default=a},function(e,t,r){"use strict";var i=r(0),n=r(4),o=r(17),s=r(18),l=r(9);function a(e){this.defaults=e,this.interceptors={request:new o,response:new o}}a.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=l(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[s,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},a.prototype.getUri=function(e){return e=l(this.defaults,e),n(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},i.forEach(["delete","get","head","options"],(function(e){a.prototype[e]=function(t,r){return this.request(i.merge(r||{},{method:e,url:t}))}})),i.forEach(["post","put","patch"],(function(e){a.prototype[e]=function(t,r,n){return this.request(i.merge(n||{},{method:e,url:t,data:r}))}})),e.exports=a},function(e,t,r){"use strict";var i=r(0);function n(){this.handlers=[]}n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){i.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=n},function(e,t,r){"use strict";var i=r(0),n=r(19),o=r(5),s=r(6);function l(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return l(e),e.headers=e.headers||{},e.data=n(e.data,e.headers,e.transformRequest),e.headers=i.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),i.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return l(e),t.data=n(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(l(e),t&&t.response&&(t.response.data=n(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,r){"use strict";var i=r(0);e.exports=function(e,t,r){return i.forEach(r,(function(r){e=r(e,t)})),e}},function(e,t){var r,i,n=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function l(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var a,c=[],u=!1,d=-1;function f(){u&&a&&(u=!1,a.length?c=a.concat(c):d=-1,c.length&&h())}function h(){if(!u){var e=l(f);u=!0;for(var t=c.length;t;){for(a=c,c=[];++d<t;)a&&a[d].run();d=-1,t=c.length}a=null,u=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||u||l(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=m,n.addListener=m,n.once=m,n.off=m,n.removeListener=m,n.removeAllListeners=m,n.emit=m,n.prependListener=m,n.prependOnceListener=m,n.listeners=function(e){return[]},n.binding=function(e){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},function(e,t,r){"use strict";var i=r(0);e.exports=function(e,t){i.forEach(e,(function(r,i){i!==t&&i.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[i])}))}},function(e,t,r){"use strict";var i=r(8);e.exports=function(e,t,r){var n=r.config.validateStatus;!n||n(r.status)?e(r):t(i("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,i,n){return e.config=t,r&&(e.code=r),e.request=i,e.response=n,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var i=r(25),n=r(26);e.exports=function(e,t){return e&&!i(t)?n(e,t):t}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var i=r(0),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,s={};return e?(i.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=i.trim(e.substr(0,o)).toLowerCase(),r=i.trim(e.substr(o+1)),t){if(s[t]&&n.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([r]):s[t]?s[t]+", "+r:r}})),s):s}},function(e,t,r){"use strict";var i=r(0);e.exports=i.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var i=e;return t&&(r.setAttribute("href",i),i=r.href),r.setAttribute("href",i),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=i.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var i=r(0);e.exports=i.isStandardBrowserEnv()?{write:function(e,t,r,n,o,s){var l=[];l.push(e+"="+encodeURIComponent(t)),i.isNumber(r)&&l.push("expires="+new Date(r).toGMTString()),i.isString(n)&&l.push("path="+n),i.isString(o)&&l.push("domain="+o),!0===s&&l.push("secure"),document.cookie=l.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var i=r(10);function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new i(e),t(r.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n((function(t){e=t})),cancel:e}},e.exports=n},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,n=r(1),o=(i=n)&&i.__esModule?i:{default:i};const s=u(210/360,1,.7),l=u(280/360,1,.7);class a extends o.default.Component{constructor(e){super(e),this.state={show:{}},this.slider_left_position=0,this.slider_right_position=1,this.slider_dragged=null,this.slice_clicked=!1,this.clicked_slice="";for(let e in this.props.data)this.state.show[e]=!0;this.__PT=null,this.__SVG=null}clear_click(){""!=this.clicked_slice&&this.deemphasize_slice(this.clicked_slice),this.slice_clicked=!1,this.clicked_slice=""}handle_slice_emphasis(e,t){if(null!=document.getElementById(t))switch(e.type){case"pointerenter":this.slice_clicked||this.emphasize_slice(t);break;case"pointerleave":this.slice_clicked||this.deemphasize_slice(t);break;case"pointerdown":this.slice_clicked?this.clicked_slice==t?this.clear_click():(this.deemphasize_slice(this.clicked_slice),this.clicked_slice=t,this.emphasize_slice(t)):(this.slice_clicked=!0,this.clicked_slice=t,this.emphasize_slice(t))}}emphasize_slice(e){let t=document.getElementById(e),r=document.getElementById(e+"_text");t.setAttribute("filter","url(#dropShadow_slice)"),t.setAttribute("transform","translate("+-360*(1.02-1)+","+-135*(1.02-1)+") scale(1.02,1.02)"),r.setAttribute("visibility","visible"),t.parentNode.appendChild(t)}deemphasize_slice(e){let t=document.getElementById(e),r=document.getElementById(e+"_text");null!=t&&(t.setAttribute("filter","null"),t.setAttribute("transform","translate(0, 0)")),r.setAttribute("visibility","hidden")}sliderMouseEnter(){document.getElementById("slider_line_middle").setAttribute("stroke-opacity",.5)}sliderMouseLeave(){document.getElementById("slider_line_middle").setAttribute("stroke-opacity",.2)}_getCircleFromHitbox(e){let t=e.getAttribute("id").substring(0,15);return{isLeft:"slider_circle_1_hitbox"==e.getAttribute("id"),circle:document.getElementById(t),hitbox:e,label:document.getElementById(t+"_label")}}sliderCircleEnter(e){if(this.sliderMouseEnter(),null!=this.slider_dragged)return;let t=e.target,r=this._getCircleFromHitbox(t),i=this._getCircleFromHitbox(r.isLeft?document.getElementById("slider_circle_2_hitbox"):document.getElementById("slider_circle_1_hitbox")),n=r.isLeft?document.getElementById("slider_circle_2_label_path"):document.getElementById("slider_circle_1_label_path"),o=r.isLeft?document.getElementById("slider_circle_1_label_path"):document.getElementById("slider_circle_2_label_path");r.circle.setAttribute("r",5),r.circle.setAttribute("filter","url(#dropShadow_circle)"),r.label.setAttribute("visibility","visible"),o.setAttribute("fill-opacity",.8),i.label.setAttribute("visibility","visible"),n.setAttribute("fill-opacity",.4)}sliderCircleLeave(e){let t=e.target,r=this._getCircleFromHitbox(t);if(null==this.slider_dragged&&this.sliderMouseLeave(),null!=this.slider_dragged&&r.circle.getAttribute("id")==this.slider_dragged.circle.getAttribute("id"))return;let i=this._getCircleFromHitbox(r.isLeft?document.getElementById("slider_circle_2_hitbox"):document.getElementById("slider_circle_1_hitbox"));r.circle.setAttribute("r",3),r.circle.setAttribute("filter",""),r.label.setAttribute("visibility","hidden"),i.label.setAttribute("visibility","hidden")}sliderCircleDown(e){let t=e.target,r=this._getCircleFromHitbox(t);this.slider_dragged=r}sliderCircleMove(e){if(null==this.slider_dragged)return;let t=this.slider_dragged,r=0;this.__PT.x=e.clientX,this.__PT.y=e.clientY,r=this.__PT.matrixTransform(this.__SVG.getScreenCTM().inverse()).x,t.isLeft?(r>264+192*this.slider_right_position&&(r=264+192*this.slider_right_position),r<264&&(r=264),this.slider_left_position=(r-264+0)/192,document.getElementById("slider_line_left").setAttribute("x2",r),document.getElementById("slider_line_middle").setAttribute("x1",r),document.getElementById("slider_grad").setAttribute("x1",r)):(r<264+192*this.slider_left_position&&(r=264+192*this.slider_left_position),r>456&&(r=456),this.slider_right_position=(r-264+0)/192,document.getElementById("slider_line_middle").setAttribute("x2",r),document.getElementById("slider_line_right").setAttribute("x1",r),document.getElementById("slider_grad").setAttribute("x2",r)),t.circle.setAttribute("cx",r),t.hitbox.setAttribute("cx",r),t.label.setAttribute("transform","translate("+r+",275)"),document.getElementById(t.label.getAttribute("id")+"_text").textContent=this.props.scaleFunction((r-264+0)/192)}sliderCircleRelease(e){if(null==this.slider_dragged)return;let t=this.slider_dragged;t.circle.parentNode.appendChild(t.circle),t.label.parentNode.appendChild(t.label),t.hitbox.parentNode.appendChild(t.hitbox),this.slider_dragged=null,this.sliderCircleLeave({target:t.hitbox}),this.props.onSliderChange([this.slider_left_position,this.slider_right_position])}generateSlices(){let e=[],t=-.125,r=c(Object.keys(this.props.data).length),i=this.allCount();for(let n=0;n<Object.keys(this.props.data).length;++n){let o=Object.keys(this.props.data)[n];if(!this.state.show[o]||null==this.props.data[o])continue;if(0==this.props.data[o].counts[0])continue;let s=(this.props.data[o].counts[0]+0)/i;1==s&&(s-=1e-6);let l=u(r[n],1,.25);e.push(this.add_slice(o,!0,l,t,s)),t+=s}for(let n=0;n<Object.keys(this.props.data).length;++n){let o=Object.keys(this.props.data)[n];if(!this.state.show[o]||null==this.props.data[o])continue;if(0==this.props.data[o].counts[1])continue;let s=(this.props.data[o].counts[1]+0)/i;1==s&&(s-=1e-6);let l=u(r[n],1,.8);e.push(this.add_slice(o,!1,l,t,s)),t+=s}return e}add_slice(e,t,r,i,n){let s=t?e:e+"_u";var l,a,c,u,f,h,p,m,_,g,y,b;return o.default.createElement("path",{key:s,id:s,fill:r,d:(l=360,a=135,c=120,u=60,f=360*i,h=360*(i+n),p=d(l,a,c,h),m=d(l,a,c,f),_=d(l,a,u,h),g=d(l,a,u,f),y=h-f<=180?"0":"1",b=["M",p.x,p.y,"A",c,c,0,y,0,m.x,m.y,"L",g.x,g.y,"A",u,u,0,y,1,_.x,_.y,"L",p.x,p.y].join(" "),b),onPointerDown:e=>this.handle_slice_emphasis(e,s),onPointerEnter:e=>this.handle_slice_emphasis(e,s),onPointerLeave:e=>this.handle_slice_emphasis(e,s)})}generateLabels(){let e=[],t=c(Object.keys(this.props.data).length),r=this.allCount();for(let i=0;i<Object.keys(this.props.data).length;++i){let n=Object.keys(this.props.data)[i];if(!this.state.show[n]||null==this.props.data[n])continue;let o=(this.props.data[n].counts[0]+0)/r,s=u(t[i],1,.1);e.push(this.add_label(n,!0,s,o))}for(let i=0;i<Object.keys(this.props.data).length;++i){let n=Object.keys(this.props.data)[i];if(!this.state.show[n]||null==this.props.data[n])continue;let o=(this.props.data[n].counts[1]+0)/r,s=u(t[i],1,.1);e.push(this.add_label(n,!1,s,o))}return e}add_label(e,t,r,i){const n={fill:r,textAnchor:"middle",fontSize:34,fontFamily:["Impact","Arial Black","Gadget","sans-serif"]},s={fill:r+"80",textAnchor:"middle",fontSize:18,fontFamily:["Impact","Arial Black","Gadget","sans-serif"]},l={fill:r+"80",textAnchor:"middle",fontSize:10,fontFamily:["Impact","Arial Black","Gadget","sans-serif"]};return o.default.createElement("g",{key:t?e+"_text":e+"_u_text",id:t?e+"_text":e+"_u_text",visibility:"hidden",filter:"dropShadow_slice"},o.default.createElement("text",{x:360,y:135,style:n,dy:".3em"},(100*i).toFixed(2)+"%"),o.default.createElement("text",{x:360,y:135,style:s,dy:"-1.2em"},this.props.data[e].counts[t?0:1]),(()=>{let r=this.props.data[e].wordType;if(t||(r="Unknown "+r),r.length<25)return o.default.createElement("text",{x:360,y:150,style:l,dy:"1.2em"},r);let i=r.split(" ");return o.default.createElement("text",{x:360,y:150,style:l,dy:"1.2em"},o.default.createElement("tspan",{x:360,dy:"1.2em",textAnchor:"middle"},i[0]+" "+i[1]),o.default.createElement("tspan",{x:360,dy:"1.2em",textAnchor:"middle"},i[2]))})(this.props.data[e].wordType))}labelPath(){return"M 0 0 l -15 -16.77 a 20 20 0 1 1 30 0 l -15 16.77"}genSlider(){const e={textAnchor:"middle",fontSize:12,fontFamily:"monospace",fill:"#ffffff"};return console.log("GENSLIDERS"),console.log(this.slider_left_position),console.log(this.slider_right_position),o.default.createElement("g",{id:"plot_slider"},o.default.createElement("line",{id:"slider_line_left",x1:264,y1:275,x2:264+192*this.slider_left_position,y2:275,stroke:s,strokeLinecap:"round",strokeOpacity:.2,strokeWidth:5}),o.default.createElement("line",{id:"slider_line_right",x1:264+192*this.slider_right_position,y1:275,x2:456,y2:275,stroke:l,strokeLinecap:"round",strokeOpacity:.2,strokeWidth:5}),o.default.createElement("line",{id:"slider_line_middle",x1:264+192*this.slider_left_position,y1:275,x2:264+192*this.slider_right_position,y2:275,stroke:"url(#slider_grad)",strokeOpacity:.2,strokeLinecap:"round",strokeWidth:5}),o.default.createElement("line",{id:"slider_hitbox",x1:264,y1:275,x2:456,y2:275,stroke:"#00000000",strokeLinecap:"round",strokeWidth:12,onPointerEnter:e=>this.sliderMouseEnter(),onPointerLeave:e=>this.sliderMouseLeave()}),o.default.createElement("circle",{id:"slider_circle_1",cx:264+192*this.slider_left_position,cy:275,r:3,fill:s}),o.default.createElement("g",{id:"slider_circle_1_label",visibility:"hidden",transform:"translate("+(264+192*this.slider_left_position)+",275)"},o.default.createElement("path",{id:"slider_circle_1_label_path",d:this.labelPath(),fill:s,filter:"url(#dropShadow_slice)"}),o.default.createElement("text",{id:"slider_circle_1_label_text",style:e,x:0,y:-25},this.props.scaleFunction(this.slider_left_position))),o.default.createElement("circle",{id:"slider_circle_1_hitbox",cx:264+192*this.slider_left_position,cy:275,fill:"#00000000",r:6,onPointerEnter:e=>this.sliderCircleEnter(e),onPointerLeave:e=>this.sliderCircleLeave(e),onPointerDown:e=>this.sliderCircleDown(e)}),o.default.createElement("circle",{id:"slider_circle_2",cx:264+192*this.slider_right_position,cy:275,r:3,fill:l}),o.default.createElement("g",{id:"slider_circle_2_label",visibility:"hidden",transform:"translate("+(264+192*this.slider_right_position)+",275)"},o.default.createElement("path",{id:"slider_circle_2_label_path",d:this.labelPath(),fill:l,filter:"url(#dropShadow_slice)"}),o.default.createElement("text",{id:"slider_circle_2_label_text",style:e,x:0,y:-25},this.props.scaleFunction(this.slider_right_position))),o.default.createElement("circle",{id:"slider_circle_2_hitbox",cx:264+192*this.slider_right_position,cy:275,fill:"#00000000",r:6,onPointerEnter:e=>this.sliderCircleEnter(e),onPointerLeave:e=>this.sliderCircleLeave(e),onPointerDown:e=>this.sliderCircleDown(e)}))}knownCount(){let e=0;for(let t in this.props.data)this.state.show[t]&&null!=this.props.data[t]&&(e+=this.props.data[t].counts[0]);return e}allCount(){let e=0;for(let t in this.props.data)this.state.show[t]&&null!=this.props.data[t]&&(e+=this.props.data[t].counts[0],e+=this.props.data[t].counts[1]);return e}componentDidMount(){document.addEventListener("pointerup",e=>this.sliderCircleRelease(e)),document.addEventListener("pointermove",e=>this.sliderCircleMove(e));let e=document.getElementById("FrequentWordsCard");this.__SVG=e,this.__PT=e.createSVGPoint()}render(){return o.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",id:"FrequentWordsCard",version:"1.1",viewBox:"0 0 506 306"},o.default.createElement("defs",{id:"filters"},o.default.createElement("linearGradient",{id:"slider_grad",x1:264,y1:275,x2:456,y2:275,gradientUnits:"userSpaceOnUse"},o.default.createElement("stop",{id:"slider_grad_stop1",offset:"0%",stopColor:s}),o.default.createElement("stop",{id:"slider_grad_stop2",offset:"100%",stopColor:l})),o.default.createElement("radialGradient",{id:"background_grad",cx:"50%",cy:"50%",r:"50%",fx:"50%",fy:"50%"},o.default.createElement("stop",{offset:"50%",stopColor:"#ffffff"}),o.default.createElement("stop",{offset:"100%",stopColor:"#fdfdfd"})),o.default.createElement("filter",{id:"dropShadow_bg"},o.default.createElement("feFlood",{floodColor:"#3D4574",floodOpacity:"0.5",result:"offsetColor"}),o.default.createElement("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"1.3"}),o.default.createElement("feOffset",{dx:"3",dy:"3",result:"offsetBlur"}),o.default.createElement("feComposite",{in:"offsetColor",in2:"offsetBlur",operator:"in"}),o.default.createElement("feMerge",null,o.default.createElement("feMergeNode",null),o.default.createElement("feMergeNode",{in:"SourceGraphic"}))),o.default.createElement("filter",{id:"dropShadow_slice"},o.default.createElement("feFlood",{floodColor:"#3D4574",floodOpacity:"0.5",result:"offsetColor"}),o.default.createElement("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"1.3"}),o.default.createElement("feOffset",{dx:"1",dy:"1",result:"offsetBlur"}),o.default.createElement("feComposite",{in:"offsetColor",in2:"offsetBlur",operator:"in"}),o.default.createElement("feMerge",null,o.default.createElement("feMergeNode",null),o.default.createElement("feMergeNode",{in:"SourceGraphic"}))),o.default.createElement("filter",{id:"dropShadow_circle"},o.default.createElement("feFlood",{floodColor:"#3D4574",floodOpacity:"0.2",result:"offsetColor"}),o.default.createElement("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"1.3"}),o.default.createElement("feOffset",{dx:".5",dy:".5",result:"offsetBlur"}),o.default.createElement("feComposite",{in:"offsetColor",in2:"offsetBlur",operator:"in"}),o.default.createElement("feMerge",null,o.default.createElement("feMergeNode",null),o.default.createElement("feMergeNode",{in:"SourceGraphic"}))),o.default.createElement("filter",{id:"blurABit"},o.default.createElement("feGaussianBlur",{in:"SouceImage",stdDeviation:".1"}))),o.default.createElement("g",{id:"widget"},o.default.createElement("g",{id:"background",height:"300",width:"500"},o.default.createElement("rect",{id:"background_sheet",fill:"url(#background_grad)",filter:"url(#dropShadow_bg)",width:"500",height:"300",ry:"20",rx:"20",y:"0",x:"0",onPointerDown:e=>this.clear_click()})),o.default.createElement("text",{id:"heading",x:"20",y:"30",dy:".3em",textLength:"200",lengthAdjust:"spacingAndGlyphs",style:{fill:"#333333",fontSize:22,textAnchor:"start",fontFamily:["Impact","Arial Black","Gadget","sans-serif"]}},"Most Frequent Known Words"),o.default.createElement("text",{id:"total_known",x:"120",y:"110",style:{fill:"#404040",fontSize:60,textAnchor:"middle",fontFamily:["Impact","Arial Black","Gadget","sans-serif"]}},this.knownCount()),o.default.createElement("text",{id:"total",x:"120",y:"110",dy:"2em",style:{fill:"#999999",fontSize:12,textAnchor:"middle",fontFamily:["Impact","Arial Black","Gadget","sans-serif"]}},"Total words selected: "+this.allCount()),o.default.createElement("g",{id:"plot"},o.default.createElement("circle",{cx:360,cy:135,r:120,fill:"#f2f2f2"}),this.generateSlices()),o.default.createElement("g",{id:"plot_labels"},this.generateLabels()),this.genSlider()))}}function c(e,t=0){let r=[],i=1/e,n=Math.floor(.25/i)+1;for(let o=0;o<e;++o)r.push((o*n*i+t)%1);return r}function u(e,t,r){var i,n,o;if(0==t)i=n=o=r;else{var s=function(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e},l=r<.5?r*(1+t):r+t-r*t,a=2*r-l;i=s(a,l,e+1/3),n=s(a,l,e),o=s(a,l,e-1/3)}return i=Math.round(255*i).toString(16),n=Math.round(255*n).toString(16),o=Math.round(255*o).toString(16),"#"+(i=i.length<2?"0"+i:i)+(n=n.length<2?"0"+n:n)+(o=o.length<2?"0"+o:o)}function d(e,t,r,i){var n=(i-90)*Math.PI/180;return{x:e+r*Math.cos(n),y:t+r*Math.sin(n)}}t.default=a}])}));
//# sourceMappingURL=graph-demo-3ears.js.map