webpackJsonp([2],{208:function(e,r,n){"use strict";function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function a(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function o(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0}),n.d(r,"Orders",function(){return b});var i=n(0),c=n.n(i),l=n(11),p=n(221),s=n(20),d=n(67),u=n(66),m=n(8),f=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),b=function(e){function r(){return t(this,r),a(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return o(r,e),f(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=this.props.loading?c.a.createElement(u.a,null):this.props.orders.map(function(e){return c.a.createElement(p.a,{key:e.id,ingredients:e.ingredients,price:+e.price,orderData:e.orderData})});return c.a.createElement("div",null,e)}}]),r}(i.Component),A=function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}},x=function(e){return{onFetchOrders:function(r,n){return e(m.j(r,n))}}};r.default=Object(l.b)(A,x)(Object(d.a)(b,s.a))},221:function(e,r,n){"use strict";var t=n(0),a=n.n(t),o=n(222),i=n.n(o),c=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map(function(e){return a.a.createElement("span",{style:{textTransform:"capitalize",margin:"0 5px",display:"inline-block",padding:"2px",border:"1px solid #ccc"},key:e.name},e.name,": ",e.amount)});return a.a.createElement("div",{className:i.a.Order},a.a.createElement("div",null,a.a.createElement("p",null,"Ingredients: ",t),a.a.createElement("br",null),a.a.createElement("p",null,"Price: ",e.price.toFixed(2))),a.a.createElement("div",null,a.a.createElement("p",null,"Name: ",e.orderData.name),a.a.createElement("br",null),a.a.createElement("p",null,"Email: ",e.orderData.email),a.a.createElement("p",null,"Phone: ",e.orderData.phone),a.a.createElement("br",null),a.a.createElement("p",null,"Street: ",e.orderData.street),a.a.createElement("p",null,"City: ",e.orderData.city),a.a.createElement("p",null,"Zipcode: ",e.orderData.zipcode),a.a.createElement("br",null),a.a.createElement("p",{style:{textTransform:"capitalize"}},"Delivery method: ",e.orderData.deliveryMethod)))};r.a=c},222:function(e,r,n){var t=n(223);"string"===typeof t&&(t=[[e.i,t,""]]);var a={hmr:!1};a.transform=void 0;n(205)(t,a);t.locals&&(e.exports=t.locals)},223:function(e,r,n){r=e.exports=n(204)(!0),r.push([e.i,".Order__Order__W-Npf{margin:10px;padding:10px;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;border:1px solid #eee;-webkit-box-sizing:border-box;box-sizing:border-box;display:grid;grid-template-columns:1fr 1fr}.Order__Order__W-Npf p{display:inline-block;margin:.5em 15px}","",{version:3,sources:["E:/Study/JavaScript/React/react-projects/burger-app/src/components/Order/Order.css"],names:[],mappings:"AAAA,qBACE,YAAa,AACb,aAAc,AACd,kCAAmC,AAC3B,0BAA2B,AACnC,sBAAuB,AACvB,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,6BAA+B,CAChC,AAED,uBACE,qBAAsB,AACtB,gBAAkB,CACnB",file:"Order.css",sourcesContent:[".Order {\r\n  margin: 10px;\r\n  padding: 10px;\r\n  -webkit-box-shadow: 0 2px 3px #ccc;\r\n          box-shadow: 0 2px 3px #ccc;\r\n  border: 1px solid #eee;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n}\r\n\r\n.Order p {\r\n  display: inline-block;\r\n  margin: .5em 15px;\r\n}"],sourceRoot:""}]),r.locals={Order:"Order__Order__W-Npf"}}});
//# sourceMappingURL=2.88995d4f.chunk.js.map