define([],function(){"use strict";var a="#order-form",b={accountContactsUrl:"/admin/api/accounts/<%= id %>/contacts?flat=true",accountAddressesUrl:"/admin/api/accounts/<%= id %>/addresses",accountUrl:"/admin/api/accounts?searchFields=name&flat=true&fields=id,name",accountInputId:"#account-input",deliveryAddressInstanceName:"delivery-address",paymentAddressInstanceName:"invoice-address",contactSelectId:"#contact-select"},c=function(){var a=[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)}],b={icon:"gear",iconSize:"large",group:"left",id:"options-button",position:30,items:[{title:this.sandbox.translate("toolbar.delete"),callback:function(){this.sandbox.emit("sulu.header.toolbar.delete")}.bind(this)}]},c={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",position:40,items:[]},g={confirm:{title:this.sandbox.translate("salesorder.orders.confirm"),callback:d.bind(this)},edit:{title:this.sandbox.translate("salesorder.orders.edit"),callback:e.bind(this)},shipping:{title:this.sandbox.translate("salesorder.orders.shipping.create"),callback:f.bind(this)},divider:{divider:!0}};this.options.data.id&&(1===this.orderStatusId?c.items.push(g.confirm):3===this.orderStatusId&&c.items.push(g.edit),this.orderStatusId>2&&(c.items.push(g.divider),c.items.push(g.shipping)),b.items.length>0&&a.push(b),c.items.length>0&&a.push(c)),this.sandbox.emit("sulu.header.set-toolbar",{template:a})},d=function(){g.call(this,function(){this.sandbox.emit("sulu.salesorder.order.confirm")})},e=function(){g.call(this,function(){this.sandbox.emit("sulu.salesorder.order.edit")})},f=function(){g.call(this,function(){this.sandbox.emit("sulu.salesorder.shipping.create")})},g=function(a){"function"==typeof a&&(this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.unsaved-changes-confirm",null,a.bind(this)))},h=function(){return this.options.data&&this.options.data.status?this.options.data.status.id:null},i=function(a){this.options.orderStatuses=a},j=function(){this.sandbox.on("sulu.salesorder.set-order-status",i.bind(this)),this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.salesorder.order.delete",this.options.data.id)},this),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".initialized",function(){this.isEditable||this.sandbox.dom.attr(this.$find(b.accountInputId+" input"),"disabled","disabled"),this.dfdAutoCompleteInitialized.resolve()},this),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".selection-removed",r.bind(this)),this.sandbox.on("sulu.salesorder.order.saved",function(a){this.options.data=a,k.call(this,!0)},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesorder.orders.list")},this),this.sandbox.on("husky.input.desired-delivery-date.initialized",function(){this.dfdDesiredDeliveryDate.resolve()},this),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".select",r.bind(this)),this.sandbox.on("sulu.editable-data-row.delivery-address.initialized",function(){this.dfdDeliveryAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.invoice-address.initialized",function(){this.dfdInvoiceAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view.delivery-address.changed",function(a){this.options.data.deliveryAddress=a,m.call(this,this.options.data),s.call(this)}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view.invoice-address.changed",function(a){this.options.data.invoiceAddress=a,m.call(this,this.options.data),s.call(this)}.bind(this))},k=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},l=function(b){var c=this.sandbox.form.create(a);c.initialized.then(function(){m.call(this,b,!0),n.call(this,b)}.bind(this))},m=function(b){this.sandbox.form.setData(a,b).then(function(){this.accountId=o.call(this)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},n=function(c){this.sandbox.start(a),this.dfdDesiredDeliveryDate.resolve(),c.account&&c.account.id&&t.call(this,c.account.id,c),this.sandbox.start([{name:"auto-complete@husky",options:{el:b.accountInputId,remoteUrl:b.accountUrl,resultKey:"accounts",getParameter:"search",value:c.account?c.account:"",instanceName:this.accountInstanceName,valueKey:"name",noNewValues:!0}}])},o=function(){return this.sandbox.dom.attr(b.accountInputId,"data-id")},p=function(a,b){b=b||[],this.sandbox.emit("husky.select.contact-select.update",a,b)},q=function(a,b,c){this.sandbox.emit("sulu.editable-data-row."+b+".data.update",a,c)},r=function(a){var c=a.id||null;c!==this.accountId&&(this.accountId=c,c?t.call(this,c):(p.call(this,[]),q.call(this,[],b.deliveryAddressInstanceName),q.call(this,[],b.paymentAddressInstanceName)))},s=function(){k.call(this,!1)},t=function(a,c){var d,e;this.sandbox.util.load(this.sandbox.util.template(b.accountContactsUrl,{id:a})).then(function(a){d=a._embedded.contacts,e=c&&c.contact?[c.contact.id]:null,p.call(this,d,e)}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this)),this.sandbox.util.load(this.sandbox.util.template(b.accountAddressesUrl,{id:a})).then(function(a){d=a._embedded.addresses,e=null,c&&c.deliveryAddress||(e=u.call(this,d,"deliveryAddress",!0),!e&&d.length>0&&(e=d[0])),this.sandbox.data.when(this.dfdDeliveryAddressInitialized).then(function(){q.call(this,d,b.deliveryAddressInstanceName,e),this.options.data.deliveryAddress=e,m.call(this,this.options.data)}.bind(this)),e=null,c&&c.invoiceAddress||(e=u.call(this,d,"billingAddress",!0),!e&&d.length>0&&(e=d[0])),this.sandbox.data.when(this.dfdInvoiceAddressInitialized).then(function(){q.call(this,d,b.paymentAddressInstanceName,e),this.options.data.invoiceAddress=e,m.call(this,this.options.data)}.bind(this))}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},u=function(a,b,c){var d=null;return a&&a.length>0&&this.sandbox.util.each(a,function(a,e){return e.hasOwnProperty(b)&&e[b]===c?(d=e,!1):void 0}.bind(this)),d};return{view:!0,layout:{},templates:["/admin/order/template/order/form"],initialize:function(){this.saved=!0,this.formId=a,this.accountId=null,this.contactId=null,this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdAutoCompleteInitialized=this.sandbox.data.deferred(),this.dfdDesiredDeliveryDate=this.sandbox.data.deferred(),this.dfdInvoiceAddressInitialized=this.sandbox.data.deferred(),this.dfdDeliveryAddressInitialized=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdDesiredDeliveryDate,this.dfdAutoCompleteInitialized).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.orderStatusId=h.call(this),this.isEditable=this.orderStatusId<=2;var b=this.options.data.id?this.options.data.id:"new";this.accountInstanceName="customerAccount"+b,j.call(this),c.call(this),k.call(this,!0),this.render(),this.listenForChange()},initSidebar:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",a+b)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0],{isEditable:this.isEditable}));var a=this.options.data;l.call(this,a)},submit:function(){if(this.sandbox.logger.log("save Model"),this.sandbox.form.validate(a)){var b=this.sandbox.form.getData(a);""===b.id&&delete b.id,b.account={id:this.sandbox.dom.attr("#"+this.accountInstanceName,"data-id")},this.sandbox.logger.log("log data",b),this.sandbox.emit("sulu.salesorder.order.save",b)}},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(a,"change",s.bind(this),".changeListener select, .changeListener input, .changeListener .husky-select, .changeListener textarea"),this.sandbox.dom.on(a,"keyup",s.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.item-table.changed",s.bind(this)),this.sandbox.on("husky.select.contact-select.selected.item",s.bind(this)),this.sandbox.on("husky.select.responsible-contact-select.selected.item",s.bind(this)),this.sandbox.on("husky.select.delivery-terms.selected.item",s.bind(this)),this.sandbox.on("husky.select.payment-terms.selected.item",s.bind(this))}.bind(this))}}});