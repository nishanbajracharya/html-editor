(self.webpackChunkeditor=self.webpackChunkeditor||[]).push([[93],{1296:(t,e,n)=>{var r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,a="object"==typeof self&&self&&self.Object===Object&&self,s=c||a||Function("return this")(),l=Object.prototype.toString,p=Math.max,v=Math.min,b=function(){return s.Date.now()};function y(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function d(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(y(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=y(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var n=o.test(t);return n||u.test(t)?f(t.slice(2),n?2:8):i.test(t)?NaN:+t}t.exports=function(t,e,n){var r,i,o,u,f,c,a=0,s=!1,l=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function g(e){var n=r,o=i;return r=i=void 0,a=e,u=t.apply(o,n)}function j(t){return a=t,f=setTimeout(O,e),s?g(t):u}function h(t){var n=t-c;return void 0===c||n>=e||n<0||l&&t-a>=o}function O(){var t=b();if(h(t))return x(t);f=setTimeout(O,function(t){var n=e-(t-c);return l?v(n,o-(t-a)):n}(t))}function x(t){return f=void 0,m&&r?g(t):(r=i=void 0,u)}function T(){var t=b(),n=h(t);if(r=arguments,i=this,c=t,n){if(void 0===f)return j(c);if(l)return f=setTimeout(O,e),g(c)}return void 0===f&&(f=setTimeout(O,e)),u}return e=d(e)||0,y(n)&&(s=!!n.leading,o=(l="maxWait"in n)?p(d(n.maxWait)||0,e):o,m="trailing"in n?!!n.trailing:m),T.cancel=function(){void 0!==f&&clearTimeout(f),a=0,r=c=i=f=void 0},T.flush=function(){return void 0===f?u:x(b())},T}}}]);