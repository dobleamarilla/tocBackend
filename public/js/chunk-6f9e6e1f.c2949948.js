(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f9e6e1f"],{"2851d":function(t,e,n){},9906:function(t,e,n){"use strict";n("2851d")},"9a0b":function(t,e,n){"use strict";n.r(e);var i=n("7a23"),c=Object(i["H"])("data-v-16e0bd35");Object(i["u"])("data-v-16e0bd35");var s={class:"row pt-1"},o={class:"col-md-1"},a={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px"}},r={class:"list-group list-group-flush border-bottom scrollarea"},l=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Vender")],-1),u=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Caja")],-1),d=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Pedidos")],-1),b=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Trabajador/a")],-1),h=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Devoluciones")],-1),p=Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Entregas")],-1),f={class:"col"};Object(i["s"])();var j=c((function(t,e,n,j,g,m){var O=Object(i["y"])("router-link"),v=Object(i["y"])("router-view"),w=Object(i["y"])("ToastComponent");return Object(i["r"])(),Object(i["d"])(i["a"],null,[Object(i["h"])("div",s,[Object(i["h"])("div",o,[Object(i["h"])("div",a,[Object(i["h"])("div",r,[Object(i["h"])(O,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:c((function(){return[l]})),_:1}),Object(i["h"])(O,{to:"/menu/caja",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:c((function(){return[u]})),_:1}),Object(i["h"])("button",{onClick:e[1]||(e[1]=function(t){return j.pedidos()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[d]),Object(i["h"])(O,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:c((function(){return[b]})),_:1}),Object(i["h"])("button",{onClick:e[2]||(e[2]=function(t){return j.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[h]),Object(i["h"])("button",{onClick:e[3]||(e[3]=function(t){return j.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[p])])])]),Object(i["h"])("div",f,[Object(i["h"])(v)])]),Object(i["h"])(w)],64)})),g=n("5502"),m=n("bc3a"),O=n.n(m),v=n("0eb4"),w=n("a18c"),y=n("785f"),k={name:"Menu",setup:function(){var t=Object(g["b"])(),e=Object(i["b"])((function(){return t.state.Menu.hidden})),n=y["a"].getParametros();function c(){t.dispatch("Ticket/setActivoAction",null)}function s(){t.dispatch("Menu/setHiddenAction",!0),c()}function o(){w["a"].push("/menu/pedidos/".concat(n.codigoTienda))}function a(t){w["a"].push(t)}function r(){t.dispatch("setModoActual","DEVOLUCION"),w["a"].push("/")}function l(){var t=842;O.a.get("http://dsv.hiterp.com/TpvInforma.asp?Llic=00".concat(t,"&Versio=6001010&Tipus=EntregasPendientes")).then((function(t){for(var e=t.data,n="",i=!1,c=0;c<e.length;c++)if(i||"]"===e[c-1]&&"a"===e[c-2]){if(i=!0,"]"===e[c])break;n+=e[c]}console.log(n)})),s(),c()}return{pedidos:o,devoluciones:r,isHidden:e,hideMenu:s,quitarActivoTicket:c,imprimirEntregas:l,goTo:a}},components:{ToastComponent:v["a"]}},x=(n("9906"),n("d959")),T=n.n(x);const C=T()(k,[["render",j],["__scopeId","data-v-16e0bd35"]]);e["default"]=C}}]);
//# sourceMappingURL=chunk-6f9e6e1f.c2949948.js.map