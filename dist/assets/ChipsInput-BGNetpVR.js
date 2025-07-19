import{r as l,j as o}from"./index-DcZ0E0zD.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase()),u=e=>{const t=f(e);return t.charAt(0).toUpperCase()+t.slice(1)},m=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim(),y=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:c="",children:a,iconNode:i,...s},d)=>l.createElement("svg",{ref:d,...w,width:t,height:t,stroke:e,strokeWidth:n?Number(r)*24/Number(t):r,className:m("lucide",c),...!a&&!y(s)&&{"aria-hidden":"true"},...s},[...i.map(([p,x])=>l.createElement(p,x)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(e,t)=>{const r=l.forwardRef(({className:n,...c},a)=>l.createElement(g,{ref:a,iconNode:t,className:m(`lucide-${h(u(e))}`,`lucide-${e}`,n),...c}));return r.displayName=u(e),r};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],j=C("trash-2",b),k=()=>{const[e,t]=l.useState(""),[r,n]=l.useState([]),c=s=>{t(s.target.value)},a=s=>{s.key==="Enter"&&e.trim()!==""&&(r.includes(e.trim())||n([...r,e.trim()]),t(""))},i=s=>{n(r.filter(d=>d!==s))};return o.jsx("div",{className:"min-h-screen bg-cyan-100 flex items-center justify-center px-4",children:o.jsxs("div",{className:"bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg",children:[o.jsx("h2",{className:"text-xl font-bold mb-4 text-gray-800",children:"Enter Text Below"}),o.jsx("input",{type:"text",value:e,onKeyDown:a,onChange:c,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400",placeholder:"Type and hit enter"}),r.length>0&&o.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:r.map(s=>o.jsxs("div",{className:"flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm",children:[o.jsx("span",{className:"mr-2",children:s}),o.jsx("button",{onClick:()=>i(s),className:"hover:text-red-500 transition-colors duration-200",children:o.jsx(j,{size:16})})]},s))})]})})};export{k as default};
