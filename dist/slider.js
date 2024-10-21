(()=>{"use strict";const e=wp.blockEditor,t=wp.blocks,n=wp.components;function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function l(e,t,n){return(t=function(e){var t=function(e){if("object"!=r(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==r(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(0,t.registerBlockType)("bettors-den-slider/slider",l(l(l(l(l({title:"Bettors Den Slider",icon:"slides",category:"bettors-den-slider"},"icon","slides"),"supports",{align:["full"]}),"attributes",{transitionSpeed:{type:"number",default:2e3},autoplaySpeed:{type:"number",default:8e3}}),"edit",(function(t){var r=t.attributes,l=t.setAttributes;return React.createElement(React.Fragment,null,React.createElement(e.InspectorControls,null,React.createElement(n.PanelBody,{title:"Settings",initialOpen:!0},React.createElement(n.PanelRow,null,React.createElement(n.TextControl,{value:r.transitionSpeed,onChange:function(e){return l({transitionSpeed:parseInt(e,10)})},label:"Transition Speed (ms)"})),React.createElement(n.PanelRow,null,React.createElement(n.TextControl,{value:r.autoplaySpeed,onChange:function(e){return l({autoplaySpeed:parseInt(e,10)})},label:"Autoplay Speed (ms)"})))),React.createElement("div",{style:{backgroundColor:"#fff"}},React.createElement("div",{style:{backgroundColor:"#0B2153",textAlign:"center",padding:"5px",fontFamily:"sans-serif"}},React.createElement("h4",{style:{color:"#fff"}},"Bettors Den Slider")),React.createElement("div",{style:{padding:"0px"}},React.createElement(e.InnerBlocks,{allowedBlocks:["bettors-den-slider/slide"],template:[["bettors-den-slider/slide"]],templateLock:!1,renderAppender:e.InnerBlocks.ButtonBlockAppender})),React.createElement("div",{style:{backgroundColor:"#0B2153",padding:"10px 20px",color:"#fff",display:"flex",flexDirection:"row",gap:"40px",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"}},React.createElement("span",null,"Transition Speed: ",React.createElement("strong",null,r.transitionSpeed/1e3)," seconds"),React.createElement("span",null,"Autoplay Speed: ",React.createElement("strong",null,r.autoplaySpeed/1e3)," seconds"))))})),"save",(function(){return React.createElement(e.InnerBlocks.Content,null)})))})();
//# sourceMappingURL=slider.js.map