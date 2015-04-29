/*! esri-leaflet - v1.0.0-rc.2 - 2015-04-29
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache License*/
(function (factory) {
  //define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], function (L) {
      return factory(L);
    });
  //define a common js module that relies on 'leaflet'
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'));
  }

  if(typeof window !== 'undefined' && window.L){
    factory(window.L);
  }
}(function (L) {

var EsriLeaflet={VERSION:"1.0.0",Layers:{},Services:{},Controls:{},Tasks:{},Util:{},Support:{CORS:!!(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest),pointerEvents:""===document.documentElement.style.pointerEvents}};"undefined"!=typeof window&&window.L&&(window.L.esri=EsriLeaflet),function(a){function b(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function c(a,b){for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}function d(a){return c(a[0],a[a.length-1])||a.push(a[0]),a}function e(a){var b,c=0,d=0,e=a.length,f=a[d];for(d;e-1>d;d++)b=a[d+1],c+=(b[0]-f[0])*(b[1]+f[1]),f=b;return c>=0}function f(a,b,c,d){var e=(d[0]-c[0])*(a[1]-c[1])-(d[1]-c[1])*(a[0]-c[0]),f=(b[0]-a[0])*(a[1]-c[1])-(b[1]-a[1])*(a[0]-c[0]),g=(d[1]-c[1])*(b[0]-a[0])-(d[0]-c[0])*(b[1]-a[1]);if(0!==g){var h=e/g,i=f/g;if(h>=0&&1>=h&&i>=0&&1>=i)return!0}return!1}function g(a,b){for(var c=0;c<a.length-1;c++)for(var d=0;d<b.length-1;d++)if(f(a[c],a[c+1],b[d],b[d+1]))return!0;return!1}function h(a,b){for(var c=!1,d=-1,e=a.length,f=e-1;++d<e;f=d)(a[d][1]<=b[1]&&b[1]<a[f][1]||a[f][1]<=b[1]&&b[1]<a[d][1])&&b[0]<(a[f][0]-a[d][0])*(b[1]-a[d][1])/(a[f][1]-a[d][1])+a[d][0]&&(c=!c);return c}function i(a,b){var c=g(a,b),d=h(a,b[0]);return!c&&d?!0:!1}function j(a){for(var b,c,f,h=[],j=[],k=0;k<a.length;k++){var l=d(a[k].slice(0));if(!(l.length<4))if(e(l)){var m=[l];h.push(m)}else j.push(l)}for(var n=[];j.length;){f=j.pop();var o=!1;for(b=h.length-1;b>=0;b--)if(c=h[b][0],i(c,f)){h[b].push(f),o=!0;break}o||n.push(f)}for(;n.length;){f=n.pop();var p=!1;for(b=h.length-1;b>=0;b--)if(c=h[b][0],g(c,f)){h[b].push(f),p=!0;break}p||h.push([f.reverse()])}return 1===h.length?{type:"Polygon",coordinates:h[0]}:{type:"MultiPolygon",coordinates:h}}function k(a){var b=[],c=a.slice(0),f=d(c.shift().slice(0));if(f.length>=4){e(f)||f.reverse(),b.push(f);for(var g=0;g<c.length;g++){var h=d(c[g].slice(0));h.length>=4&&(e(h)&&h.reverse(),b.push(h))}}return b}function l(a){for(var b=[],c=0;c<a.length;c++)for(var d=k(a[c]),e=d.length-1;e>=0;e--){var f=d[e].slice(0);b.push(f)}return b}a.Util.extentToBounds=function(a){var b=new L.LatLng(a.ymin,a.xmin),c=new L.LatLng(a.ymax,a.xmax);return new L.LatLngBounds(b,c)},a.Util.boundsToExtent=function(a){return a=L.latLngBounds(a),{xmin:a.getSouthWest().lng,ymin:a.getSouthWest().lat,xmax:a.getNorthEast().lng,ymax:a.getNorthEast().lat,spatialReference:{wkid:4326}}},a.Util.arcgisToGeojson=function(c,d){var e={};return"number"==typeof c.x&&"number"==typeof c.y&&(e.type="Point",e.coordinates=[c.x,c.y]),c.points&&(e.type="MultiPoint",e.coordinates=c.points.slice(0)),c.paths&&(1===c.paths.length?(e.type="LineString",e.coordinates=c.paths[0].slice(0)):(e.type="MultiLineString",e.coordinates=c.paths.slice(0))),c.rings&&(e=j(c.rings.slice(0))),(c.geometry||c.attributes)&&(e.type="Feature",e.geometry=c.geometry?a.Util.arcgisToGeojson(c.geometry):null,e.properties=c.attributes?b(c.attributes):null,c.attributes&&(e.id=c.attributes[d]||c.attributes.OBJECTID||c.attributes.FID)),e},a.Util.geojsonToArcGIS=function(c,d){d=d||"OBJECTID";var e,f={wkid:4326},g={};switch(c.type){case"Point":g.x=c.coordinates[0],g.y=c.coordinates[1],g.spatialReference=f;break;case"MultiPoint":g.points=c.coordinates.slice(0),g.spatialReference=f;break;case"LineString":g.paths=[c.coordinates.slice(0)],g.spatialReference=f;break;case"MultiLineString":g.paths=c.coordinates.slice(0),g.spatialReference=f;break;case"Polygon":g.rings=k(c.coordinates.slice(0)),g.spatialReference=f;break;case"MultiPolygon":g.rings=l(c.coordinates.slice(0)),g.spatialReference=f;break;case"Feature":c.geometry&&(g.geometry=a.Util.geojsonToArcGIS(c.geometry,d)),g.attributes=c.properties?b(c.properties):{},c.id&&(g.attributes[d]=c.id);break;case"FeatureCollection":for(g=[],e=0;e<c.features.length;e++)g.push(a.Util.geojsonToArcGIS(c.features[e],d));break;case"GeometryCollection":for(g=[],e=0;e<c.geometries.length;e++)g.push(a.Util.geojsonToArcGIS(c.geometries[e],d))}return g},a.Util.responseToFeatureCollection=function(b,c){var d;if(c)d=c;else if(b.objectIdFieldName)d=b.objectIdFieldName;else if(b.fields){for(var e=0;e<=b.fields.length-1;e++)if("esriFieldTypeOID"===b.fields[e].type){d=b.fields[e].name;break}}else d="OBJECTID";var f={type:"FeatureCollection",features:[]},g=b.features||b.results;if(g.length)for(var h=g.length-1;h>=0;h--)f.features.push(a.Util.arcgisToGeojson(g[h],d));return f},a.Util.cleanUrl=function(a){return a=a.replace(/\s\s*/g,""),"/"!==a[a.length-1]&&(a+="/"),a},a.Util.geojsonTypeToArcGIS=function(a){var b;switch(a){case"Point":b="esriGeometryPoint";break;case"MultiPoint":b="esriGeometryMultipoint";break;case"LineString":b="esriGeometryPolyline";break;case"MultiLineString":b="esriGeometryPolyline";break;case"Polygon":b="esriGeometryPolygon";break;case"MultiPolygon":b="esriGeometryPolygon"}return b}}(EsriLeaflet),function(a){function b(a){var b="";a.f="json";for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c],f=Object.prototype.toString.call(e);b.length&&(b+="&"),d="[object Array]"===f||"[object Object]"===f?JSON.stringify(e):"[object Date]"===f?e.valueOf():e,b+=encodeURIComponent(c)+"="+encodeURIComponent(d)}return b}function c(a,b){var c=new XMLHttpRequest;return c.onerror=function(c){a.call(b,{error:{code:500,message:"XMLHttpRequest error"}},null)},c.onreadystatechange=function(){var d,e;if(4===c.readyState){try{d=JSON.parse(c.responseText)}catch(f){d=null,e={code:500,message:"Could not parse response as JSON."}}!e&&d.error&&(e=d.error,d=null),a.call(b,e,d)}},c}var d=0;window._EsriLeafletCallbacks={},a.Request={request:function(a,d,e,f){var g=b(d),h=c(e,f),i=(a+"?"+g).length;if(2e3>=i&&L.esri.Support.CORS)h.open("GET",a+"?"+g),h.send(null);else if(i>2e3&&L.esri.Support.CORS)h.open("POST",a),h.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),h.send(g);else{if(2e3>=i&&!L.esri.Support.CORS)return L.esri.Request.get.JSONP(a,d,e,f);if(console&&console.warn)return void console.warn("a request to "+a+" was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html")}return h},post:{XMLHTTP:function(a,d,e,f){var g=c(e,f);return g.open("POST",a),g.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),g.send(b(d)),g}},get:{CORS:function(a,d,e,f){var g=c(e,f);return g.open("GET",a+"?"+b(d),!0),g.send(null),g},JSONP:function(a,c,e,f){var g="c"+d;c.callback="window._EsriLeafletCallbacks."+g;var h=L.DomUtil.create("script",null,document.body);return h.type="text/javascript",h.src=a+"?"+b(c),h.id=g,window._EsriLeafletCallbacks[g]=function(a){if(window._EsriLeafletCallbacks[g]!==!0){var b,c=Object.prototype.toString.call(a);"[object Object]"!==c&&"[object Array]"!==c&&(b={error:{code:500,message:"Expected array or object as JSONP response"}},a=null),!b&&a.error&&(b=a,a=null),e.call(f,b,a),window._EsriLeafletCallbacks[g]=!0}},d++,{id:g,url:h.src,abort:function(){window._EsriLeafletCallbacks._callback[g]({code:0,message:"Request aborted."})}}}}},a.get=a.Support.CORS?a.Request.get.CORS:a.Request.get.JSONP,a.post=a.Request.post.XMLHTTP,a.request=a.Request.request}(EsriLeaflet),EsriLeaflet.Services.Service=L.Evented.extend({options:{proxy:!1,useCors:EsriLeaflet.Support.CORS},initialize:function(a,b){this.url=EsriLeaflet.Util.cleanUrl(a),this._requestQueue=[],this._authenticating=!1,L.Util.setOptions(this,b)},get:function(a,b,c,d){return this._request("get",a,b,c,d)},post:function(a,b,c,d){return this._request("post",a,b,c,d)},request:function(a,b,c,d){return this._request("request",a,b,c,d)},metadata:function(a,b){return this._request("get","",{},a,b)},authenticate:function(a){return this._authenticating=!1,this.options.token=a,this._runQueue(),this},_request:function(a,b,c,d,e){this.fire("requeststart",{url:this.url+b,params:c,method:a},!0);var f=this._createServiceCallback(a,b,c,d,e);if(this.options.token&&(c.token=this.options.token),this._authenticating)return void this._requestQueue.push([a,b,c,d,e]);var g=this.options.proxy?this.options.proxy+"?"+this.url+b:this.url+b;return"get"!==a&&"request"!==a||this.options.useCors?EsriLeaflet[a](g,c,f):EsriLeaflet.Request.get.JSONP(g,c,f)},_createServiceCallback:function(a,b,c,d,e){var f=[a,b,c,d,e];return L.Util.bind(function(g,h){!g||499!==g.code&&498!==g.code?(d.call(e,g,h),g?this.fire("requesterror",{url:this.url+b,params:c,message:g.message,code:g.code,method:a},!0):this.fire("requestsuccess",{url:this.url+b,params:c,response:h,method:a},!0),this.fire("requestend",{url:this.url+b,params:c,method:a},!0)):(this._authenticating=!0,this._requestQueue.push(f),this.fire("authenticationrequired",{authenticate:L.Util.bind(this.authenticate,this)},!0))},this)},_runQueue:function(){for(var a=this._requestQueue.length-1;a>=0;a--){var b=this._requestQueue[a],c=b.shift();this[c].apply(this,b)}this._requestQueue=[]}}),EsriLeaflet.Services.service=function(a,b){return new EsriLeaflet.Services.Service(a,b)},EsriLeaflet.Services.FeatureLayer=EsriLeaflet.Services.Service.extend({options:{idAttribute:"OBJECTID"},query:function(){return new EsriLeaflet.Tasks.Query(this)},addFeature:function(a,b,c){return delete a.id,a=EsriLeaflet.Util.geojsonToArcGIS(a),this.post("addFeatures",{features:[a]},function(a,c){var d=c&&c.addResults?c.addResults[0]:void 0;b&&b.call(this,a||c.addResults[0].error,d)},c)},updateFeature:function(a,b,c){return a=EsriLeaflet.Util.geojsonToArcGIS(a,this.options.idAttribute),this.post("updateFeatures",{features:[a]},function(a,d){var e=d&&d.updateResults?d.updateResults[0]:void 0;b&&b.call(c,a||d.updateResults[0].error,e)},c)},deleteFeature:function(a,b,c){return this.post("deleteFeatures",{objectIds:a},function(a,d){var e=d&&d.deleteResults?d.deleteResults[0]:void 0;b&&b.call(c,a||d.deleteResults[0].error,e)},c)}}),EsriLeaflet.Services.featureLayer=function(a,b){return new EsriLeaflet.Services.FeatureLayer(a,b)},EsriLeaflet.Tasks.Task=L.Class.extend({options:{proxy:!1,useCors:EsriLeaflet.Support.CORS},generateSetter:function(a,b){var c=a.match(/([a-zA-Z]+)\[\]/);return a=c?c[1]:a,c?L.Util.bind(function(b){return L.Util.isArray(b)?this.params[a]=b.join(","):this.params[a]=b,this},b):L.Util.bind(function(b){return this.params[a]=b,this},b)},initialize:function(a,b){if(a.url&&a.request?(this._service=a,this.url=a.url):this.url=EsriLeaflet.Util.cleanUrl(a),this.params=L.Util.extend({},this.params||{}),this.setters)for(var c in this.setters){var d=this.setters[c];this[c]=this.generateSetter(d,this)}L.Util.setOptions(this,b)},token:function(a){return this._service?this._service.authenticate(a):this.params.token=a,this},request:function(a,b){return this._service?this._service.request(this.path,this.params,a,b):this._request("request",this.path,this.params,a,b)},_request:function(a,b,c,d,e){var f=this.options.proxy?this.options.proxy+"?"+this.url+b:this.url+b;return"get"!==a&&"request"!==a||this.options.useCors?EsriLeaflet[a](f,c,d,e):EsriLeaflet.Request.get.JSONP(f,c,d,e)}}),EsriLeaflet.Tasks.Query=EsriLeaflet.Tasks.Task.extend({setters:{offset:"offset",limit:"limit",outFields:"fields[]",precision:"geometryPrecision",featureIds:"objectIds[]",returnGeometry:"returnGeometry",token:"token"},path:"query",params:{returnGeometry:!0,where:"1=1",outSr:4326,outFields:"*"},within:function(a){return this._setGeometry(a),this.params.spatialRel="esriSpatialRelContains",this},intersects:function(a){return this._setGeometry(a),this.params.spatialRel="esriSpatialRelIntersects",this},contains:function(a){return this._setGeometry(a),this.params.spatialRel="esriSpatialRelWithin",this},overlaps:function(a){return this._setGeometry(a),this.params.spatialRel="esriSpatialRelOverlaps",this},nearby:function(a,b){return a=L.latLng(a),this.params.geometry=[a.lng,a.lat].join(","),this.params.geometryType="esriGeometryPoint",this.params.spatialRel="esriSpatialRelIntersects",this.params.units="esriSRUnit_Meter",this.params.distance=b,this.params.inSr=4326,this},where:function(a){return this.params.where=a.replace(/"/g,"'"),this},between:function(a,b){return this.params.time=[a.valueOf(),b.valueOf()].join(),this},fields:function(a){return L.Util.isArray(a)?this.params.outFields=a.join(","):this.params.outFields=a,this},simplify:function(a,b){var c=Math.abs(a.getBounds().getWest()-a.getBounds().getEast());return this.params.maxAllowableOffset=c/a.getSize().y*b,this},orderBy:function(a,b){return b=b||"ASC",this.params.orderByFields=this.params.orderByFields?this.params.orderByFields+",":"",this.params.orderByFields+=[a,b].join(" "),this},returnGeometry:function(a){return this.params.returnGeometry=a,this},run:function(a,b){return this._cleanParams(),this.request(function(c,d){a.call(b,c,d&&EsriLeaflet.Util.responseToFeatureCollection(d),d)},b)},count:function(a,b){return this._cleanParams(),this.params.returnCountOnly=!0,this.request(function(b,c){a.call(this,b,c&&c.count,c)},b)},ids:function(a,b){return this._cleanParams(),this.params.returnIdsOnly=!0,this.request(function(b,c){a.call(this,b,c&&c.objectIds,c)},b)},bounds:function(a,b){return this._cleanParams(),this.params.returnExtentOnly=!0,this.request(function(c,d){a.call(b,c,d&&d.extent&&EsriLeaflet.Util.extentToBounds(d.extent),d)},b)},pixelSize:function(a){return a=L.point(a),this.params.pixelSize=[a.x,a.y].join(","),this},layer:function(a){return this.path=a+"/query",this},_cleanParams:function(){delete this.params.returnIdsOnly,delete this.params.returnExtentOnly,delete this.params.returnCountOnly},_setGeometry:function(a){return this.params.inSr=4326,a instanceof L.LatLngBounds?(this.params.geometry=EsriLeaflet.Util.boundsToExtent(a),void(this.params.geometryType="esriGeometryEnvelope")):(a.getLatLng&&(a=a.getLatLng()),a instanceof L.LatLng&&(a={type:"Point",coordinates:[a.lng,a.lat]}),a instanceof L.GeoJSON&&(a=a.getLayers()[0].feature.geometry,this.params.geometry=EsriLeaflet.Util.geojsonToArcGIS(a),this.params.geometryType=EsriLeaflet.Util.geojsonTypeToArcGIS(a.type)),a.toGeoJSON&&(a=a.toGeoJSON()),"Feature"===a.type&&(a=a.geometry),"Point"===a.type||"LineString"===a.type||"Polygon"===a.type?(this.params.geometry=EsriLeaflet.Util.geojsonToArcGIS(a),void(this.params.geometryType=EsriLeaflet.Util.geojsonTypeToArcGIS(a.type))):void(console&&console.warn&&console.warn("invalid geometry passed to spatial query. Should be an L.LatLng, L.LatLngBounds or L.Marker or a GeoJSON Point Line or Polygon object")))}}),EsriLeaflet.Tasks.query=function(a,b){return new EsriLeaflet.Tasks.Query(a,b)},EsriLeaflet.Layers.FeatureGrid=L.Layer.extend({options:{cellSize:512,updateInterval:150},initialize:function(a){a=L.setOptions(this,a)},onAdd:function(a){this._map=a,this._update=L.Util.throttle(this._update,this.options.updateInterval,this),this._reset(),this._update()},onRemove:function(){this._map.removeEventListener(this.getEvents(),this),this._removeCells()},getEvents:function(){var a={viewreset:this._reset,moveend:this._update};return a},addTo:function(a){return a.addLayer(this),this},removeFrom:function(a){return a.removeLayer(this),this},_reset:function(){this._removeCells(),this._cells={},this._activeCells={},this._cellsToLoad=0,this._cellsTotal=0,this._cellNumBounds=this._getCellNumBounds(),this._resetWrap()},_resetWrap:function(){var a=this._map,b=a.options.crs;if(!b.infinite){var c=this._getCellSize();b.wrapLng&&(this._wrapLng=[Math.floor(a.project([0,b.wrapLng[0]]).x/c),Math.ceil(a.project([0,b.wrapLng[1]]).x/c)]),b.wrapLat&&(this._wrapLat=[Math.floor(a.project([b.wrapLat[0],0]).y/c),Math.ceil(a.project([b.wrapLat[1],0]).y/c)])}},_getCellSize:function(){return this.options.cellSize},_update:function(){if(this._map){var a=this._map.getPixelBounds(),b=this._map.getZoom(),c=this._getCellSize();if(!(b>this.options.maxZoom||b<this.options.minZoom)){var d=L.bounds(a.min.divideBy(c).floor(),a.max.divideBy(c).floor());this._addCells(d),this._removeOtherCells(d)}}},_addCells:function(a){var b,c,d,e=[],f=a.getCenter(),g=this._map.getZoom();for(b=a.min.y;b<=a.max.y;b++)for(c=a.min.x;c<=a.max.x;c++)d=new L.Point(c,b),d.z=g,e.push(d);var h=e.length;if(0!==h)for(this._cellsToLoad+=h,this._cellsTotal+=h,e.sort(function(a,b){return a.distanceTo(f)-b.distanceTo(f)}),c=0;h>c;c++)this._addCell(e[c])},_cellCoordsToBounds:function(a){var b=this._map,c=this.options.cellSize,d=a.multiplyBy(c),e=d.add([c,c]),f=b.unproject(d,a.z).wrap(),g=b.unproject(e,a.z).wrap();return new L.LatLngBounds(f,g)},_cellCoordsToKey:function(a){return a.x+":"+a.y},_keyToCellCoords:function(a){var b=a.split(":"),c=parseInt(b[0],10),d=parseInt(b[1],10);return new L.Point(c,d)},_removeOtherCells:function(a){for(var b in this._cells)a.contains(this._keyToCellCoords(b))||this._removeCell(b)},_removeCell:function(a){var b=this._activeCells[a];b&&(delete this._activeCells[a],this.cellLeave&&this.cellLeave(b.bounds,b.coords),this.fire("cellleave",{bounds:b.bounds,coords:b.coords},!0))},_removeCells:function(){for(var a in this._cells){var b=this._cells[a].bounds,c=this._cells[a].coords;this.cellLeave&&this.cellLeave(b,c),this.fire("cellleave",{bounds:b,coords:c},!0)}},_addCell:function(a){this._wrapCoords(a);var b=this._cellCoordsToKey(a),c=this._cells[b];c&&!this._activeCells[b]&&(this.cellEnter&&this.cellEnter(c.bounds,a),this.fire("cellenter",{bounds:c.bounds,coords:a},!0),this._activeCells[b]=c),c||(c={coords:a,bounds:this._cellCoordsToBounds(a)},this._cells[b]=c,this._activeCells[b]=c,this.createCell&&this.createCell(c.bounds,a),this.fire("cellcreate",{bounds:c.bounds,coords:a},!0))},_wrapCoords:function(a){a.x=this._wrapLng?L.Util.wrapNum(a.x,this._wrapLng):a.x,a.y=this._wrapLat?L.Util.wrapNum(a.y,this._wrapLat):a.y},_getCellNumBounds:function(){var a=this._map.getPixelWorldBounds(),b=this._getCellSize();return a?L.bounds(a.min.divideBy(b).floor(),a.max.divideBy(b).ceil().subtract([1,1])):null}}),function(a){function b(a){this.values=a||[]}a.Layers.FeatureManager=a.Layers.FeatureGrid.extend({options:{where:"1=1",fields:["*"],from:!1,to:!1,timeField:!1,timeFilterMode:"server",simplifyFactor:0,precision:6},initialize:function(c,d){if(a.Layers.FeatureGrid.prototype.initialize.call(this,d),d=L.setOptions(this,d),this.url=a.Util.cleanUrl(c),this._service=new a.Services.FeatureLayer(this.url,d),this._service.addEventParent(this),"*"!==this.options.fields[0]){for(var e=!1,f=0;f<this.options.fields.length;f++)this.options.fields[f].match(/^(OBJECTID|FID|OID|ID)$/i)&&(e=!0);e===!1&&console&&console.warn&&console.warn("no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.")}this.options.timeField.start&&this.options.timeField.end?(this._startTimeIndex=new b,this._endTimeIndex=new b):this.options.timeField&&(this._timeIndex=new b),this._currentSnapshot=[],this._activeRequests=0,this._pendingRequests=[]},onAdd:function(b){return a.Layers.FeatureGrid.prototype.onAdd.call(this,b)},onRemove:function(b){return a.Layers.FeatureGrid.prototype.onRemove.call(this,b)},getAttribution:function(){return this.options.attribution},createCell:function(a,b){this._requestFeatures(a,b)},_requestFeatures:function(a,b,c){return this._activeRequests++,1===this._activeRequests&&this.fire("loading",{bounds:a},!0),this._buildQuery(a).run(function(d,e,f){f&&f.exceededTransferLimit&&this.fire("drawlimitexceeded",{},!0),this._activeRequests--,!d&&e.features.length&&this._addFeatures(e.features,b),c&&c.call(this,d,e),this._activeRequests<=0&&this.fire("load",{bounds:a},!0)},this)},_addFeatures:function(a){for(var b=a.length-1;b>=0;b--){var c=a[b].id;this._currentSnapshot.push(c)}this.options.timeField&&this._buildTimeIndexes(a),this.createLayers(a)},_buildQuery:function(a){var b=this._service.query().intersects(a).where(this.options.where).fields(this.options.fields).precision(this.options.precision);return this.options.simplifyFactor&&b.simplify(this._map,this.options.simplifyFactor),"server"===this.options.timeFilterMode&&this.options.from&&this.options.to&&b.between(this.options.from,this.options.to),b},setWhere:function(a,b,c){this.options.where=a&&a.length?a:"1=1";for(var d=[],e=[],f=0,g=null,h=L.Util.bind(function(a,h){if(a&&(g=a),h)for(var i=h.features.length-1;i>=0;i--)e.push(h.features[i].id);f--,0>=f&&(this._currentSnapshot=e,this.removeLayers(d),this.addLayers(e),b&&b.call(c,g))},this),i=this._currentSnapshot.length-1;i>=0;i--)d.push(this._currentSnapshot[i]);for(var j in this._activeCells){f++;var k=this._keyToCellCoords(j),l=this._cellCoordsToBounds(k);this._requestFeatures(l,j,h)}return this},getWhere:function(){return this.options.where},getTimeRange:function(){return[this.options.from,this.options.to]},setTimeRange:function(a,b,c,d){var e=this.options.from,f=this.options.to,g=0,h=null,i=L.Util.bind(function(i){i&&(h=i),this._filterExistingFeatures(e,f,a,b),g--,c&&0>=g&&c.call(d,h)},this);if(this.options.from=a,this.options.to=b,this._filterExistingFeatures(e,f,a,b),"server"===this.options.timeFilterMode)for(var j in this._activeCells){g++;var k=this._keyToCellCoords(j),l=this._cellCoordsToBounds(k);this._requestFeatures(l,j,i)}},refresh:function(){for(var a in this._activeCells){var b=this._keyToCellCoords(a),c=this._cellCoordsToBounds(b);this._requestFeatures(c,a)}},_filterExistingFeatures:function(a,b,c,d){var e=a&&b?this._getFeaturesInTimeRange(a,b):this._currentSnapshot,f=this._getFeaturesInTimeRange(c,d);if(f.indexOf)for(var g=0;g<f.length;g++){var h=e.indexOf(f[g]);h>=0&&e.splice(h,1)}this.removeLayers(e),this.addLayers(f)},_getFeaturesInTimeRange:function(a,b){var c,d=[];if(this.options.timeField.start&&this.options.timeField.end){var e=this._startTimeIndex.between(a,b),f=this._endTimeIndex.between(a,b);c=e.concat(f)}else c=this._timeIndex.between(a,b);for(var g=c.length-1;g>=0;g--)d.push(c[g].id);return d},_buildTimeIndexes:function(a){var b,c;if(this.options.timeField.start&&this.options.timeField.end){var d=[],e=[];for(b=a.length-1;b>=0;b--)c=a[b],d.push({id:c.id,value:new Date(c.properties[this.options.timeField.start])}),e.push({id:c.id,value:new Date(c.properties[this.options.timeField.end])});this._startTimeIndex.bulkAdd(d),this._endTimeIndex.bulkAdd(e)}else{var f=[];for(b=a.length-1;b>=0;b--)c=a[b],f.push({id:c.id,value:new Date(c.properties[this.options.timeField])});this._timeIndex.bulkAdd(f)}},_featureWithinTimeRange:function(a){if(!this.options.from||!this.options.to)return!0;var b=+this.options.from.valueOf(),c=+this.options.to.valueOf();if("string"==typeof this.options.timeField){var d=+a.properties[this.options.timeField];return d>=b&&c>=d}if(this.options.timeField.start&&this.options.timeField.end){var e=+a.properties[this.options.timeField.start],f=+a.properties[this.options.timeField.end];return e>=b&&c>=e||f>=b&&c>=f}},authenticate:function(a){return this._service.authenticate(a),this},metadata:function(a,b){return this._service.metadata(a,b),this},query:function(){return this._service.query()},addFeature:function(a,b,c){return this._service.addFeature(a,function(a,d){a||this.refresh(),b&&b.call(c,a,d)},this),this},updateFeature:function(a,b,c){return this._service.updateFeature(a,function(a,d){a||this.refresh(),b&&b.call(c,a,d)},this)},deleteFeature:function(a,b,c){return this._service.deleteFeature(a,function(a,d){!a&&d.objectId&&this.removeLayers([d.objectId],!0),b&&b.call(c,a,d)},this)}}),b.prototype._query=function(a){for(var b,c,d,e=0,f=this.values.length-1;f>=e;)if(d=b=(e+f)/2|0,c=this.values[Math.round(b)],+c.value<+a)e=b+1;else{if(!(+c.value>+a))return b;f=b-1}return~f},b.prototype.sort=function(){this.values.sort(function(a,b){return+b.value-+a.value}).reverse(),this.dirty=!1},b.prototype.between=function(a,b){this.dirty&&this.sort();var c=this._query(a),d=this._query(b);return 0===c&&0===d?[]:(c=Math.abs(c),d=0>d?Math.abs(d):d+1,this.values.slice(c,d))},b.prototype.bulkAdd=function(a){this.dirty=!0,this.values=this.values.concat(a)}}(EsriLeaflet),EsriLeaflet.Layers.FeatureLayer=EsriLeaflet.Layers.FeatureManager.extend({initialize:function(a,b){EsriLeaflet.Layers.FeatureManager.prototype.initialize.call(this,a,b),b=L.setOptions(this,b),this._layers={}},onAdd:function(a){return EsriLeaflet.Layers.FeatureManager.prototype.onAdd.call(this,a)},onRemove:function(a){for(var b in this._layers)a.removeLayer(this._layers[b]);return EsriLeaflet.Layers.FeatureManager.prototype.onRemove.call(this,a)},createNewLayer:function(a){return L.GeoJSON.geometryToLayer(a,this.options)},createLayers:function(a){for(var b=a.length-1;b>=0;b--){var c,d=a[b],e=this._layers[d.id];if(e&&!this._map.hasLayer(e)&&this._map.addLayer(e),e&&e.setLatLngs){var f=this.createNewLayer(d);e.setLatLngs(f.getLatLngs())}e||(c=this.createNewLayer(d),c.feature=d,c.defaultOptions=c.options,c.addEventParent(this),this._popup&&c.bindPopup&&c.bindPopup(this._popup(c.feature,c),this._popupOptions),this.options.onEachFeature&&this.options.onEachFeature(c.feature,c),this._layers[c.feature.id]=c,this.resetStyle(c.feature.id),this.fire("createfeature",{feature:c.feature},!0),(!this.options.timeField||this.options.timeField&&this._featureWithinTimeRange(d))&&this._map.addLayer(c))}},addLayers:function(a){for(var b=a.length-1;b>=0;b--){var c=this._layers[a[b]];c&&(this.fire("addfeature",{feature:c.feature},!0),this._map.addLayer(c))}},removeLayers:function(a,b){for(var c=a.length-1;c>=0;c--){var d=a[c],e=this._layers[d];e&&(this.fire("removefeature",{feature:e.feature,permanent:b},!0),this._map.removeLayer(e)),e&&b&&delete this._layers[d]}},resetStyle:function(a){var b=this._layers[a];return b&&(b.options=b.defaultOptions,this.setFeatureStyle(b.feature.id,this.options.style)),this},setStyle:function(a){return this.options.style=a,this.eachFeature(function(b){this.setFeatureStyle(b.feature.id,a)},this),this},setFeatureStyle:function(a,b){var c=this._layers[a];"function"==typeof b&&(b=b(c.feature)),c.setStyle&&c.setStyle(b)},bindPopup:function(a,b){this._popup=a,this._popupOptions=b;for(var c in this._layers){var d=this._layers[c],e=this._popup(d.feature,d);d.bindPopup(e,b)}return this},unbindPopup:function(){this._popup=!1;for(var a in this._layers){var b=this._layers[a];if(b.unbindPopup)b.unbindPopup();else if(b.getLayers){var c=b.getLayers();for(var d in c){var e=c[d];e.unbindPopup()}}}return this},eachFeature:function(a,b){for(var c in this._layers)a.call(b,this._layers[c]);return this},getFeature:function(a){return this._layers[a]}}),EsriLeaflet.FeatureLayer=EsriLeaflet.Layers.FeatureLayer,EsriLeaflet.Layers.featureLayer=function(a,b){return new EsriLeaflet.Layers.FeatureLayer(a,b)},EsriLeaflet.featureLayer=function(a,b){return new EsriLeaflet.Layers.FeatureLayer(a,b)};
//# sourceMappingURL=esri-leaflet-feature-layer.js.map

  return EsriLeaflet;
}));