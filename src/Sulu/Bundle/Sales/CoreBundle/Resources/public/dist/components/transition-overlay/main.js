define(["text!sulusalescore/components/transition-overlay/transition-overlay.html"],function(a){"use strict";var b={customerData:[],transitionData:[],customerItemData:[],itemUrl:null},c={overlayContainerClass:"transition-overlay-inner-container",transitionSelect:"#transition-select",customerSelect:"#customer-select",itemsTable:"#item-table"},d="sulu.transition-overlay.",e=function(){return f.call(this,"initialized")},f=function(a){var b=d;return this.options.instanceName&&(b+="."+this.options.instanceName),b+"."+a},g=function(){},h=function(){},i=function(b){var d,e,f;d=this.sandbox.dom.createElement('<div class="'+c.overlayContainerClass+'"></div>'),this.sandbox.dom.append(this.$el,d),f={data:b},e=this.sandbox.util.template(a,f),this.sandbox.start([{name:"overlay@husky",options:{el:d,container:this.$el,displayHeader:!1,openOnStart:!0,removeOnClose:!0,cssClass:"transition-overlay-container",instanceName:"transition",data:e,skin:"wide"}}]),this.sandbox.once("husky.overlay.transition.opened",n.bind(this))},j=function(a){var b=[];for(var c in a)b.push({id:c,name:this.sandbox.translate(a[c])});return b},k=function(a){for(var b,c=this.options.customerItemData,d=[],e=-1,f=c.length;++e<f&&(b=c[e],a&&a!=b.id||(d=d.concat(b.items),!a)););return d},l=function(a){this.sandbox.start([{name:"item-table@sulusalescore",options:{el:c.itemsTable,showPrice:!1,displayToolbars:!1,hasNestedItems:!0,columns:["quantity","quantityUnit","name","address"],data:k.call(this,a)}}])},m=function(a){this.customerId=a,l.call(this,a)},n=function(){var a=j.call(this,this.options.transitionData),b=this.options.customerData;this.sandbox.start([{name:"select@husky",options:{el:c.transitionSelect,data:a,style:"action big",preSelectedElements:[a[0].name]}},{name:"select@husky",options:{el:c.customerSelect,data:b,defaultLabel:this.sandbox.translate("public.all"),deselectField:this.sandbox.translate("public.all"),selectCallback:m.bind(this),deselectCallback:m.bind(this)}}]),l.call(this)};return{initialize:function(){this.customerId=null,this.options=this.sandbox.util.extend({},b,this.options),g.call(this),h.call(this),this.render(),this.sandbox.emit(e.call(this))},render:function(){i.call(this)}}});