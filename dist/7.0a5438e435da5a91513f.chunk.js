(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"0PRj":function(n,o,t){"use strict";t.r(o);var e=t("mrSG"),l=t("Ip0R"),i=t("gIcY"),a=t("CcnG"),r=t("ZYCi");console.log("`Detail` component loaded asynchronously");var c=function(){function n(){}return n.prototype.ngOnInit=function(){console.log("hello `Detail` component")},e.b([Object(a.n)({selector:"detail",template:"\n    <h1>Hello from Detail</h1>\n    <span>\n      <a [routerLink]=\" ['./child-detail'] \">\n        Child Detail\n      </a>\n    </span>\n    <router-outlet></router-outlet>\n  "})],n)}(),d=[{path:"",children:[{path:"",component:c},{path:"child-detail",loadChildren:"./+child-detail#ChildDetailModule"}]}];t.d(o,"DetailModule",function(){return u}),console.log("`Detail` bundle loaded asynchronously");var u=function(){function n(){}return n.routes=d,e.b([Object(a.I)({declarations:[c],imports:[l.b,i.a,r.d.forChild(d)]})],n)}()}}]);