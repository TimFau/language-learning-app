(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(22)},17:function(e,t,a){},20:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(5),l=a.n(o),r=(a(17),a(6)),i=a(7),c=a(11),d=a(8),m=a(2),u=a(10),h=a(1),g=a.n(h),p=(a(18),a(20),a(21),a(9));function b(e,t,a){for(var n=[t[e]],s=0;n.length<4&&s<10;)s++,n=n.concat(a[Math.floor(Math.random()*a.length)]),n=new Set(n),n=Object(p.a)(n);return function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}(n)}var v=[],N=[],w={},f=[],E=[],C=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={language1:"",language2:"",translationInputValue:"",wordBank:[],inputMode:"Flashcard",translateMode:"1to2",langFrom:"",langTo:"",customListInputValue:"",currentList:"",checkAccents:!1},a.getCard=a.getCard.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.keyboardModehandleChange=a.keyboardModehandleChange.bind(Object(m.a)(a)),a.switchInput=a.switchInput.bind(Object(m.a)(a)),a.switchTranslationMode=a.switchTranslationMode.bind(Object(m.a)(a)),a.showAnswerFc=a.showAnswerFc.bind(Object(m.a)(a)),a.archiveCard=a.archiveCard.bind(Object(m.a)(a)),a.setList=a.setList.bind(Object(m.a)(a)),a.customListhandleChange=a.customListhandleChange.bind(Object(m.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"getData",value:function(e){void 0===e&&(e="1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM"),g.a.get("https://spreadsheets.google.com/feeds/list/"+e+"/od6/public/values?alt=json",function(t){v=[],N=[],w={},g()(t.feed.entry).each(function(){v.push(this.gsx$language1.$t),N.push(this.gsx$langauge2.$t)}),this.setState(function(t){return{language1:v.shift(),language2:N.shift(),initialCount:v.length,randomNum:Math.floor(Math.random()*v.length),randomNum2:Math.floor(Math.random()*v.length)-4,success:"",currentList:e}}),f=v.slice(),E=N.slice(),this.handleWordBank(),this.getCard()}.bind(this))}},{key:"componentWillMount",value:function(){this.getData()}},{key:"getCard",value:function(){var e=this;g()("#root").removeClass("success").removeClass("incorrect").removeClass("show-answer"),g()(".modal").hide(),"yes"===this.state.success&&(v.splice(this.state.randomNum,1),N.splice(this.state.randomNum,1)),this.setState(function(t,a){return{randomNum:Math.floor(Math.random()*v.length),randomNum2:Math.floor(Math.random()*f.length),success:"",translationInputValue:"",langFrom:"1to2"===e.state.translateMode?v:N,langTo:"1to2"===e.state.translateMode?N:v}}),this.handleWordBank(),w={width:(this.state.initialCount-v.length)*(100/this.state.initialCount)+"%"},0===v.length&&g()("#success-modal").show()}},{key:"archiveCard",value:function(){v.splice(this.state.randomNum,1),N.splice(this.state.randomNum,1),g()("#root").removeClass("show-answer"),this.getCard()}},{key:"handleWordBank",value:function(){var e=this;this.setState(function(t){return"1to2"===e.state.translateMode?{wordBank:b(t.randomNum,N,E)}:{wordBank:b(t.randomNum,v,f)}})}},{key:"keyboardModehandleChange",value:function(e){this.setState({translationInputValue:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state.translationInputValue.toLowerCase().trim(),a=this.state.langTo[this.state.randomNum].toLowerCase().trim();!1===this.state.checkAccents&&(t=t.normalize("NFD").replace(/[\u0300-\u036f]/g,""),a=a.normalize("NFD").replace(/[\u0300-\u036f]/g,"")),"yes"===this.state.success||g()(".success, .incorrect")[0]?this.getCard():t===a?(g()("#root").addClass("success"),this.setState({success:"yes"})):g()("#root").addClass("incorrect")}},{key:"switchInput",value:function(e){"Wordbank"===e&&"Wordbank"!==this.state.inputMode?this.setState({inputMode:"Wordbank"}):"Keyboard"===e&&"Keyboard"!==this.state.inputMode?this.setState({inputMode:"Keyboard"}):"Flashcard"===e&&"Flashcard"!==this.state.inputMode&&this.setState({inputMode:"Flashcard"})}},{key:"switchTranslationMode",value:function(){var e=this;"1to2"===this.state.translateMode?this.setState({translateMode:"2to1"},function(){e.getCard()}):this.setState({translateMode:"1to2"},function(){e.getCard()})}},{key:"showAnswerFc",value:function(){g()("#root").toggleClass("show-answer")}},{key:"setList",value:function(e){if("es-basics"===e){this.getData("1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w"),this.getCard(),alert("List Changed to Spanish Basics")}else if("it-basics"===e){this.getData("1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM"),alert("List Changed to Italian Basics")}else if("it-other"===e){this.getData("16PNgsOyvfz6BIpjCqHMtMWBg59qLhyj5TVvmXzSzmPA"),alert("List Changed to Italian Other")}else if("test"===e){this.getData("1_qux2HIN3GhyYmaDF2KCg1JAAoe8c6xhPV228mR5hq8"),alert("List Changed to Test List")}else{var t=e;this.getData(t),g()("#close-custom-list-modal").click(),alert("List Changed to custom list")}}},{key:"customListhandleChange",value:function(e){this.setState({customListInputValue:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container main-container "+this.state.inputMode},s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),s.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNav"},s.a.createElement("ul",{className:"navbar-nav"},s.a.createElement("li",{className:"nav-item dropdown"},s.a.createElement("a",{className:"nav-link dropdown-toggle",href:"#",id:"navbarDropdownMenuLink",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Select List"),s.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"navbarDropdownMenuLink"},s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("it-basics")}},"Italian Basics"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("it-other")}},"Italian Other"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("es-basics")}},"Spanish"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("test")}},"Test List"),s.a.createElement("button",{type:"button",className:"dropdown-item","data-toggle":"modal","data-target":"#custom-list-modal"},"Load Custom"))),s.a.createElement("li",{className:"nav-item dropdown"},s.a.createElement("a",{className:"nav-link dropdown-toggle",href:"#",id:"navbarDropdownMenuLink",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Input Mode"),s.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"navbarDropdownMenuLink"},s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.switchInput("Flashcard")}},"Flashcard"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.switchInput("Keyboard")}},"Keyboard"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.switchInput("Wordbank")}},"Wordbank")))))),s.a.createElement("div",{className:"container progress-container"},s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress-bar progress-bar-striped active",role:"progressbar","aria-valuenow":this.state.initialCount-v.length,"aria-valuemin":"0","aria-valuemax":this.state.initialCount,style:w})),s.a.createElement("span",null,v.length," out of ",this.state.initialCount," words left")),s.a.createElement("form",{onSubmit:this.handleSubmit,id:"form"},s.a.createElement("h3",{onClick:this.switchTranslationMode},"Translate to ",s.a.createElement("span",null,"1to2"===this.state.translateMode?this.state.language1:this.state.language2),":"),s.a.createElement("h1",{className:"lang-from",onClick:"Flashcard"===this.state.inputMode?this.showAnswerFc:""},'"',this.state.langFrom[this.state.randomNum],'"'),"Flashcard"===this.state.inputMode&&[s.a.createElement("h1",{className:"lang-to",onClick:this.showAnswerFc},'"',this.state.langTo[this.state.randomNum],'"'),s.a.createElement("i",{className:"material-icons swap-card",onClick:this.showAnswerFc},"swap_vertical_circle"),s.a.createElement("span",{className:"navigate-next",onClick:this.getCard},s.a.createElement("i",{className:"material-icons"},"navigate_next")),s.a.createElement("span",{className:"archive",onClick:this.archiveCard},s.a.createElement("i",{className:"material-icons"},"archive"))],s.a.createElement("input",{type:"text",placeholder:"Enter translation",value:this.state.translationInputValue,onChange:this.keyboardModehandleChange,className:"form-control"}),s.a.createElement("div",{className:"list-group word-bank"},this.state.wordBank.map(function(t){return s.a.createElement("button",{type:"button",className:"list-group-item",value:t,onClick:e.keyboardModehandleChange},t," ",s.a.createElement("a",{className:"google-translate",href:"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text="+t+"&op=translate&sl=it&tl=en",target:"_blank"},s.a.createElement("i",{className:"material-icons"},"g_translate")))}))),s.a.createElement("div",{className:"button-container"},s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-lg btn-left btn-light"},"Skip"),s.a.createElement("button",{type:"submit",value:"submit",className:"btn btn-lg btn-primary btn-right",onClick:this.handleSubmit},"Submit"),s.a.createElement("div",{className:"alert alert-success container-fluid"},s.a.createElement("div",{className:"message"},s.a.createElement("h4",null,"Correct:"),s.a.createElement("span",null,"1to2"===this.state.translateMode?N[this.state.randomNum]:v[this.state.randomNum])),s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-success btn-lg"},"Continue")),s.a.createElement("div",{className:"alert alert-danger container-fluid"},s.a.createElement("div",{className:"message"},s.a.createElement("h4",null,"Correct answer:"),s.a.createElement("span",null,"1to2"===this.state.translateMode?N[this.state.randomNum]:v[this.state.randomNum])),s.a.createElement("button",{type:"button",onClick:this.getCard,className:"btn btn-danger btn-lg"},"Continue"))),s.a.createElement("div",{className:"modals"},s.a.createElement("div",{className:"modal",id:"custom-list-modal",tabindex:"-1",role:"dialog"},s.a.createElement("div",{className:"modal-dialog",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title"},"Load Custom List"),s.a.createElement("button",{type:"button",className:"close",id:"close-custom-list-modal","data-dismiss":"modal","aria-label":"Close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"modal-body"},s.a.createElement("p",null,"Enter list ID from Google Sheets Document."),s.a.createElement("input",{value:this.state.customListInputValue,onChange:this.customListhandleChange,placeholder:"ID Here"})),s.a.createElement("div",{className:"modal-footer"},s.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(t){return e.setList(e.state.customListInputValue)}},"Load"))))),s.a.createElement("div",{className:"modal",id:"success-modal",tabindex:"-1",role:"dialog"},s.a.createElement("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title"},"Congralutations!")),s.a.createElement("div",{className:"modal-body"},s.a.createElement("h3",null,"You've finished the list!"),s.a.createElement("button",{className:"btn btn-secondary",onClick:function(t){return e.getData(e.state.currentList)}},"Repeat List"),s.a.createElement("div",{className:"dropdown"},s.a.createElement("button",{className:"btn btn-primary dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Select New"),s.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("it-basics")}},"Italian Basics"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("it-other")}},"Italian Other"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("es-basics")}},"Spanish"),s.a.createElement("span",{className:"dropdown-item",onClick:function(t){return e.setList("test")}},"Test List")))))))))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.cddfb394.chunk.js.map