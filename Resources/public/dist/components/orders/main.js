define(["sulusalesorder/model/order","sulusalesorder/util/header"],function(a,b){"use strict";return{initialize:function(){if(this.bindCustomEvents(),this.bindSidebarEvents(),this.order=null,"list"===this.options.display)this.renderList();else{if("form"!==this.options.display)throw"display type wrong";this.renderForm().then(function(){b.setHeader.call(this,this.order)}.bind(this))}},bindCustomEvents:function(){this.sandbox.on("sulu.salesorder.order.delete",this.showDeleteWarning.bind(this)),this.sandbox.on("sulu.salesorder.order.confirm",this.confirmOrder.bind(this)),this.sandbox.on("sulu.salesorder.order.edit",this.editOrder.bind(this)),this.sandbox.on("sulu.salesorder.order.save",this.saveOrder.bind(this)),this.sandbox.on("sulu.salesorder.orders.load",this.loadOrder.bind(this)),this.sandbox.on("sulu.salesorder.order.new",this.addOrder.bind(this)),this.sandbox.on("sulu.salesorder.orders.list",this.showOrderList.bind(this)),this.sandbox.on("sulu.salesorder.shipping.create",this.createOrderShipping.bind(this)),this.sandbox.on("salesorder.orders.sidebar.getData",this.getDataForOrderSidebar.bind(this))},getDataForOrderSidebar:function(b){if(b.data&&b.callback&&"function"==typeof b.callback){var c,d=a.findOrCreate({id:b.data});d.fetch({success:function(a){c=a.toJSON(),c.account&&c.contact?b.callback(c.contact.id,c.account.id):this.sandbox.logger.error("received invalid data when initializing sidebar",c)}.bind(this),error:function(){this.sandbox.logger.error("error while fetching order")}.bind(this)})}else this.sandbox.logger.error("param for getDataForOrderSidebar has to be an object with a data attribute and a valid callback (attribute)!")},bindSidebarEvents:function(){},confirmOrder:function(){this.convertStatus("confirm")},editOrder:function(){this.convertStatus("edit")},createOrderShipping:function(){this.sandbox.emit("sulu.router.navigate",b.getUrl.call(this,this.options.id,"shippings/add"),!0,!1)},convertStatus:function(a){this.order.set({action:a}),this.order.save(null,{type:"post",success:function(a){this.sandbox.logger.log("successfully changed status",a),this.loadOrder(this.order.id,!0)}.bind(this)})},loadOrder:function(a,c){c=c===!0,this.sandbox.emit("sulu.router.navigate",b.getUrl.call(this,a,"details"),!0,!1,c)},showDeleteWarning:function(a){this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.delete-desc",null,this.delOrderHandler.bind(this,a))},delOrderHandler:function(a){this.sandbox.emit("sulu.header.toolbar.item.loading","options-button"),"array"===this.sandbox.util.typeOf(a)?this.sandbox.util.foreach(a,function(a){this.delOrder(a,function(){this.sandbox.emit("husky.datagrid.record.remove",a)}.bind(this),null)}.bind(this)):this.delOrder(a,function(){this.sandbox.emit("sulu.router.navigate","sales/orders")}.bind(this),null)},delOrder:function(b,c,d){c="function"==typeof c?c:null,d="function"==typeof d?d:null,this.order=a.findOrCreate({id:b}),this.order.destroy({success:c,fail:d})},showOrderList:function(){this.sandbox.emit("sulu.router.navigate","sales/orders")},saveOrder:function(a){this.sandbox.emit("sulu.header.toolbar.item.loading","save-button"),this.order.set(a),this.order.save(null,{success:function(b){var c=b.toJSON();a.id?this.sandbox.emit("sulu.salesorder.order.saved",c):this.sandbox.emit("sulu.router.navigate","sales/orders/edit:"+c.id+"/overview")}.bind(this),error:function(){this.sandbox.logger.log("error while saving profile")}.bind(this)})},addOrder:function(){this.sandbox.emit("sulu.router.navigate","sales/orders/add")},renderList:function(){var a=this.sandbox.dom.createElement('<div id="orders-list-container"/>');this.html(a),this.sandbox.start([{name:"orders/components/list@sulusalesorder",options:{el:a}}])},renderForm:function(){this.order=new a;var b=this.sandbox.dom.createElement('<div id="order-form-container"/>'),c=this.sandbox.data.deferred();return this.html(b),this.options.id?(this.order=new a({id:this.options.id}),this.order.fetch({success:function(a){this.sandbox.start([{name:"orders/components/form@sulusalesorder",options:{el:b,data:a.toJSON()}}]),c.resolve()}.bind(this),error:function(){this.sandbox.logger.log("error while fetching order"),c.reject()}.bind(this)})):(this.sandbox.start([{name:"orders/components/form@sulusalesorder",options:{el:b,data:this.order.toJSON()}}]),c.resolve()),c.promise()}}});