(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74e7fe81"],{"308b":function(t,a,e){"use strict";e.r(a);var c=e("7a23"),o=Object(c["H"])("data-v-2c5479fb");Object(c["u"])("data-v-2c5479fb");var n={class:"col-md-6 ms-3 mt-3"},r={class:"row ms-3"},s={class:"card cardWidth"},d={class:"card-body",style:{"text-align":"center"}},l=Object(c["h"])("span",null,[Object(c["h"])("i",{class:"bi bi-door-open"})],-1),b={class:"card cardWidth"},i={class:"card-body",style:{"text-align":"center"}},u=Object(c["h"])("span",null,[Object(c["h"])("i",{class:"bi bi-cup-straw"})],-1),h={class:"modal fade",id:"modalFichajes",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},j={class:"modal-dialog"},O={class:"modal-content"},f=Object(c["h"])("div",{class:"modal-header"},[Object(c["h"])("h5",{class:"modal-title",id:"exampleModalLabel"},"Fichar"),Object(c["h"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),p={class:"modal-body"},m={class:"row"},v={class:"row"},y={class:"table",style:{height:"400px"}},w={class:"table table-striped"},g=Object(c["h"])("thead",null,[Object(c["h"])("tr",null,[Object(c["h"])("th",{scope:"col"},"Nombre"),Object(c["h"])("th",{scope:"col"},"Fichar/Desfichar")])],-1),k={key:0},C={key:1},x=Object(c["h"])("div",{class:"modal-footer"},[Object(c["h"])("button",{type:"button",class:"btn btn-secondary btn-lg","data-bs-dismiss":"modal"},"Cerrar")],-1);Object(c["s"])();var F=o((function(t,a,e,o,F,M){return Object(c["r"])(),Object(c["d"])(c["a"],null,[Object(c["h"])("div",n,[Object(c["h"])("div",r,[Object(c["h"])("div",s,[Object(c["h"])("div",d,[l,Object(c["h"])("a",{href:"#",class:"btn btn-primary",onClick:a[1]||(a[1]=function(t){return o.abrirModal()})},"Fichar")])]),Object(c["h"])("div",b,[Object(c["h"])("div",i,[u,Object(c["h"])("button",{onClick:a[2]||(a[2]=function(t){return o.consumoPersonal()}),class:"btn btn-primary"},"Consumo personal")])])])]),Object(c["h"])("div",h,[Object(c["h"])("div",j,[Object(c["h"])("div",O,[f,Object(c["h"])("div",p,[Object(c["h"])("div",m,[Object(c["G"])(Object(c["h"])("input",{"onUpdate:modelValue":a[3]||(a[3]=function(t){return o.inputBusqueda=t}),class:"form-control",style:{width:"350px",height:"50px","font-size":"20px"},type:"text",placeholder:"Introduce tu nombre"},null,512),[[c["D"],o.inputBusqueda]]),Object(c["h"])("button",{type:"button",style:{width:"100px"},class:"btn btn-primary ms-2",onClick:a[4]||(a[4]=function(t){return o.buscar()})},"Buscar"),Object(c["h"])("div",v,[Object(c["h"])("div",y,[Object(c["h"])("table",w,[g,Object(c["h"])("tbody",null,[(Object(c["r"])(!0),Object(c["d"])(c["a"],null,Object(c["x"])(o.arrayTrabajadores,(function(t,a){return Object(c["r"])(),Object(c["d"])("tr",{key:a},[Object(c["h"])("td",null,Object(c["A"])(t.nombre),1),!1===t.fichado||void 0==t.fichado?(Object(c["r"])(),Object(c["d"])("td",k,[Object(c["h"])("a",{href:"#",class:"btn btn-outline-primary btn_fc",onClick:function(e){return o.fichar(t,a)}},"FICHAR",8,["onClick"])])):(Object(c["r"])(),Object(c["d"])("td",C,[Object(c["h"])("a",{href:"#",class:"btn btn-outline-success btn_fc",onClick:function(e){return o.desfichar(t,a)}},"DESFICHAR",8,["onClick"])]))])})),128))])])])])])]),x])])])],64)})),M=e("7b17"),T=e("bc3a"),A=e.n(T),B=e("5502"),I=e("a18c"),q={name:"Dependientas",setup:function(){var t=Object(B["b"])(),a="Santy",e=156,o=null,n=Object(c["w"])([]),r=Object(c["w"])("");function s(){o.show()}function d(){o.hide()}function l(){A.a.post("trabajadores/buscar",{busqueda:r.value}).then((function(t){n.value=t.data})).catch((function(t){console.log(t)}))}function b(t,a){A.a.post("trabajadores/fichar",{idTrabajador:t.idTrabajador}).then((function(t){t.data.error?(console.log(t.data.mensaje),n.value[a].fichado=!1):(console.log("Trabajador fichado"),n.value[a].fichado=!0)})).catch((function(t){console.log(t)}))}function i(t,a){A.a.post("trabajadores/desfichar",{idTrabajador:t.idTrabajador}).then((function(t){t.data.error?console.log("Error al desfichar"):(console.log("Trabajador desfichado"),n.value[a].fichado=!1)})).catch((function(t){console.log(t)}))}function u(){t.dispatch("setModoActual","CONSUMO PERSONAL"),t.dispatch("Footer/setMenuActivo",1),I["a"].push("/")}return Object(c["p"])((function(){o=new M["a"](document.getElementById("modalFichajes"),{keyboard:!1})})),{consumoPersonal:u,fichar:b,desfichar:i,inputBusqueda:r,arrayTrabajadores:n,buscar:l,cerrarModal:d,abrirModal:s,nombre:a,id:e}}},D=(e("d861"),e("6b0d")),E=e.n(D);const S=E()(q,[["render",F],["__scopeId","data-v-2c5479fb"]]);a["default"]=S},d266:function(t,a,e){},d861:function(t,a,e){"use strict";e("d266")}}]);
//# sourceMappingURL=chunk-74e7fe81.a983f48c.js.map