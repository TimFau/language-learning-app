(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,a){t.exports=a(19)},16:function(t,e,a){},18:function(t,e,a){},19:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),o=a(4),r=a.n(o),i=(a(16),a(5)),l=a(6),c=a(8),u=a(7),h=a(2),m=a(9),d=a(1),g=a.n(d);a(17),a(18);function b(t,e,a,n){return function(t){for(var e=t.length-1;e>0;e--){var a=Math.floor(Math.random()*(e+1)),n=[t[a],t[e]];t[e]=n[0],t[a]=n[1]}return t}(n.slice(e,3).concat(a[t]))}var p=[],f=[],v={},C=[],k=[],E=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(c.a)(this,Object(u.a)(e).call(this,t))).state={language1:"",language2:"",inputValue:"",wordBank:[],inputMode:"Word Bank"},a.getCard=a.getCard.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.switchInput=a.switchInput.bind(Object(h.a)(a)),a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"getData",value:function(){g.a.get("https://spreadsheets.google.com/feeds/list/1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM/od6/public/values?alt=json",function(t){g()(t.feed.entry).each(function(){p.push(this.gsx$language1.$t),f.push(this.gsx$langauge2.$t)}),this.setState(function(t){return{language1:p.shift(),language2:f.shift(),initialCount:p.length,randomNum:Math.floor(Math.random()*p.length),randomNum2:Math.floor(Math.random()*p.length)-4,success:""}}),C=p,k=f,this.handleWordBank()}.bind(this))}},{key:"getCard",value:function(){g()("#root").removeClass("success").removeClass("incorrect"),"yes"===this.state.success&&(p.splice(this.state.randomNum,1),f.splice(this.state.randomNum,1)),this.setState(function(t,e){return{randomNum:Math.floor(Math.random()*p.length),randomNum2:Math.floor(Math.random()*C.length),success:"",inputValue:""}}),this.handleWordBank(),v={width:(this.state.initialCount-p.length)*(100/this.state.initialCount)+"%"}}},{key:"handleWordBank",value:function(){this.setState(function(t){return{wordBank:b(t.randomNum,t.randomnNum2,f,k)}})}},{key:"handleChange",value:function(t){this.setState({inputValue:t.target.value})}},{key:"handleSubmit",value:function(t){t.preventDefault(),"yes"===this.state.success||g()(".success, .incorrect")[0]?this.getCard():this.state.inputValue.toLowerCase().trim()===f[this.state.randomNum].toLowerCase().trim()?(g()("#root").addClass("success"),this.setState({success:"yes"})):g()("#root").addClass("incorrect")}},{key:"switchInput",value:function(){g()(".form-control, .word-bank").toggleClass("d-none"),"Word Bank"===this.state.inputMode?this.setState({inputMode:"Keyboard"}):this.setState({inputMode:"Word Bank"})}},{key:"componentWillMount",value:function(){this.getData(),this.getCard()}},{key:"render",value:function(){var t=this;return s.a.createElement("div",{className:"container main-container"},s.a.createElement("div",{className:"container progress-container"},s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress-bar progress-bar-striped active",role:"progressbar","aria-valuenow":this.state.initialCount-p.length,"aria-valuemin":"0","aria-valuemax":this.state.initialCount,style:v})),s.a.createElement("span",null,p.length," out of ",this.state.initialCount," words left")),s.a.createElement("form",{onSubmit:this.handleSubmit,id:"form"},s.a.createElement("h3",null,"Translate to ",this.state.language2,":"),s.a.createElement("h1",null,'"',p[this.state.randomNum],'"'),s.a.createElement("input",{type:"text",placeholder:"Enter translation",value:this.state.inputValue,onChange:this.handleChange,className:"form-control d-none"}),s.a.createElement("div",{className:"list-group word-bank"},this.state.wordBank.map(function(e){return s.a.createElement("button",{type:"button",className:"list-group-item",value:e,onClick:t.handleChange},e," ",s.a.createElement("a",{href:"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text="+e+"&op=translate&sl=it&tl=en",target:"_blank"},"GT"))}))),s.a.createElement("div",{className:"button-container"},s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-lg btn-left"},"Skip"),s.a.createElement("button",{className:"btn btn-lg btn-center btn-outline-secondary",onClick:this.switchInput},"Word Bank"===this.state.inputMode?"Keyboard":"Word Bank"),s.a.createElement("button",{type:"submit",value:"submit",className:"btn btn-lg btn-primary btn-right",onClick:this.handleSubmit},"Submit"),s.a.createElement("div",{className:"alert alert-success container-fluid"},s.a.createElement("div",{className:"message"},s.a.createElement("h4",null,"Correct:"),s.a.createElement("span",null,f[this.state.randomNum])),s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-success btn-lg"},"Continue")),s.a.createElement("div",{className:"alert alert-danger container-fluid"},s.a.createElement("div",{className:"message"},s.a.createElement("h4",null,"Correct answer:"),s.a.createElement("span",null,f[this.state.randomNum])),s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-danger btn-lg"},"Continue"))))}}]),e}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.be8f3936.chunk.js.map