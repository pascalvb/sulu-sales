define([],function(){"use strict";var a=function(a){var c,d,e,f=null,g={save:{}},h={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",dropdownItems:[]},i={divider:!0};if(a.id){for(c=-1,d=a.workflows.length;++c<d;)e=a.workflows[c],0===h.dropdownItems.length?f=e.section:f&&f!==e.section&&(h.dropdownItems.push(i),f=e.section),h.dropdownItems.push({title:this.sandbox.translate(e.title),callback:b.bind(this,e)});h.dropdownItems.length>0&&(g.workflows={options:h})}this.sandbox.emit("sulu.header.set-toolbar",{buttons:g})},b=function(a){if(a.hasOwnProperty("event")&&a.event){var b=a.parameters||null;this.sandbox.emit(a.event,b)}else a.hasOwnProperty("route")&&a.route?f.call(this,function(){this.sandbox.emit("sulu.router.navigate",a.route)}.bind(this),e.bind(this,"")):this.sandbox.logger.log("no route or event provided for workflow with title "+a.title)},c=function(){HeaderUtil.checkForUnsavedData.call(this,function(){this.sandbox.emit("sulu.salesorder.order.confirm")},e.bind(this,constants.translationConversionFailed))},d=function(){HeaderUtil.checkForUnsavedData.call(this,function(){this.sandbox.emit("sulu.salesorder.order.edit")},e.bind(this,constants.translationConversionFailed))},e=function(a){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate(a))},f=function(a,b){"function"==typeof a&&(this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.save-unsaved-changes-confirm",null,function(){this.submit().then(a.bind(this),b.bind(this))}.bind(this)))},g=function(){this.sandbox.on("sulu.salesorder.order.edit.clicked",d.bind(this)),this.sandbox.on("sulu.salesorder.order.confirm.clicked",c.bind(this))},h=function(a,b){var c,d,e=null;c=this.sandbox.translate("salesorder.order"),d="object"==typeof b,d&&b.hasOwnProperty("titleAddition")&&(e=b.titleAddition),a&&a.number&&(c+=" #"+a.number),e&&(c+=" "+e),this.sandbox.emit("sulu.header.set-title",c)};return{initialize:function(){g.call(this)},setHeader:function(a,b){a=a.toJSON(),h.call(this,a,b)},setToolbar:function(b){a.call(this,b)},checkForUnsavedData:function(a,b){f.call(this,a,b)},getUrl:function(a,b){var c="sales/orders";return a&&(c+="/edit:"+a),b&&(c+="/"+b),c},enableSave:function(){this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)},disableSave:function(){this.sandbox.emit("sulu.header.toolbar.item.disable","save",!1)},loadingSave:function(){this.sandbox.emit("sulu.header.toolbar.item.loading","save")}}});