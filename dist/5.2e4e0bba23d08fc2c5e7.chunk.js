(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9TGN":function(n,r,o){"use strict";o.r(r);var e=o("mrSG"),l=o("Ip0R"),t=o("gIcY"),a=o("CcnG"),c=o("ZYCi");console.log("`Barrel` component loaded asynchronously");var i=function(){function n(){}return n.prototype.ngOnInit=function(){console.log("hello `Barrel` component")},e.b([Object(a.n)({selector:"barrel",template:"\n    <h1>Hello from Barrel</h1>\n    <span>\n      <a [routerLink]=\" ['./child-barrel'] \">\n        Child Barrel\n      </a>\n    </span>\n    <router-outlet></router-outlet>\n  "})],n)}(),u=[{path:"",children:[{path:"",component:i},{path:"child-barrel",loadChildren:"./+child-barrel#ChildBarrelModule"}]}];o.d(r,"BarrelModule",function(){return d}),console.log("`Barrel` bundle loaded asynchronously");var d=function(){function n(){}return n.routes=u,e.b([Object(a.I)({declarations:[i],imports:[l.b,t.a,c.d.forChild(u)]})],n)}()}}]);