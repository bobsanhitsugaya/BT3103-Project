(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26e10b50"],{"94a0":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("div",{staticClass:"messaging"},[e("div",{staticClass:"inbox_msg"},[t._m(0),e("div",{staticClass:"mesgs"},[e("div",{staticClass:"msg_history"},t._l(t.messages,(function(s){return e("div",{key:s,staticClass:"incoming_msg"},[e("div",{class:[s.author===t.authUser.email?"sent_msg":"received_msg"]},[e("div",{staticClass:"received_withd_msg"},[e("p",[t._v(" "+t._s(s.message))]),e("span",{staticClass:"time_date"},[t._v(t._s(s.createdAt.toDate().getMonth()+"/"+s.createdAt.toDate().getDate()+" "+s.createdAt.toDate().getHours()+":"+s.createdAt.toDate().getMinutes())+"||"+t._s(s.author))])])])])})),0),e("div",{staticClass:"type_msg"},[e("div",{staticClass:"input_msg_write"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"write_msg",attrs:{type:"text",placeholder:"Type a message"},domProps:{value:t.message},on:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.saveMessage(s)},input:function(s){s.target.composing||(t.message=s.target.value)}}}),t._m(1)])])])])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"inbox_people"},[e("div",{staticClass:"headind_srch"},[e("div",{staticClass:"recent_heading"},[e("h4",[t._v("Recent")])]),e("div",{staticClass:"srch_bar"},[e("div",{staticClass:"stylish-input-group"},[e("input",{staticClass:"search-bar",attrs:{type:"text",placeholder:"Search"}}),e("span",{staticClass:"input-group-addon"},[e("button",{attrs:{type:"button"}},[e("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"}})])])])])]),e("div",{staticClass:"inbox_chat"},[e("div",{staticClass:"chat_list active_chat"},[e("div",{staticClass:"chat_people"},[e("div",{staticClass:"chat_img"},[e("img",{attrs:{src:"https://ptetutorials.com/images/user-profile.png",alt:"sunil"}})]),e("div",{staticClass:"chat_ib"},[e("h5",[t._v("Lionel Lew "),e("span",{staticClass:"chat_date"},[t._v("Dec 25")])]),e("p",[t._v("I love BT3103.")])])])]),e("div",{staticClass:"chat_list"},[e("div",{staticClass:"chat_people"},[e("div",{staticClass:"chat_img"},[e("img",{attrs:{src:"https://ptetutorials.com/images/user-profile.png",alt:"sunil"}})]),e("div",{staticClass:"chat_ib"},[e("h5",[t._v("Mitchell "),e("span",{staticClass:"chat_date"},[t._v("Dec 25")])]),e("p",[t._v("I love making webApps.")])])])])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"msg_send_btn",attrs:{type:"button"}},[e("i",{staticClass:"fa fa-paper-plane-o",attrs:{"aria-hidden":"true"}})])}],c=e("8aa5"),n=e.n(c),r={name:"Chat",data:function(){return{message:null,messages:[],authUser:{}}},methods:{saveMessage:function(){var t=this;null!=this.message?db.collection("chat").add({message:this.message,author:this.authUser.email,createdAt:new Date}).then((function(){t.scrollToBottom()})):alert("Enter message first"),this.message=null},fetchMessages:function(){var t=this;db.collection("chat").orderBy("createdAt").onSnapshot((function(s){var e=[];s.forEach((function(t){e.push(t.data())})),t.messages=e,setTimeout((function(){t.scrollToBottom()}),1e3)}))},scrollToBottom:function(){var t=document.querySelector(".msg_history");t.scrollTop=t.scrollHeight}},created:function(){var t=this;n.a.auth().onAuthStateChanged((function(s){t.authUser=s||{}})),this.fetchMessages()},beforeRouteEnter:function(t,s,e){e((function(t){n.a.auth().onAuthStateChanged((function(s){s?e():t.$router.push("/login")}))}))}},o=r,l=(e("c1c0"),e("2877")),u=Object(l["a"])(o,a,i,!1,null,"337799e1",null);s["default"]=u.exports},c1c0:function(t,s,e){"use strict";var a=e("fab3"),i=e.n(a);i.a},fab3:function(t,s,e){}}]);
//# sourceMappingURL=chunk-26e10b50.2e01f3ed.js.map