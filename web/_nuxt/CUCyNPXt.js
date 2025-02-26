import{x as A,A as y,_ as U,f as C,c as n,o as a,s as g,$ as v,l as m,q as h,t as u,p as K,E as L,y as V,z as T,F as E,k as i,B as D,C as k,w as I,a0 as F,R as G,a as d,W as $,K as B,a1 as N,Z as M,d as O,b as R}from"./BXYePK9H.js";import{B as q}from"./C1LvqAxa.js";import{u as J}from"./CkcdhSiv.js";const P={base:"inline-flex items-center",rounded:"rounded-md",font:"font-medium",size:{xs:"text-xs px-1.5 py-0.5",sm:"text-xs px-2 py-1",md:"text-sm px-2 py-1",lg:"text-sm px-2.5 py-1.5"},gap:{xs:"gap-0.5",sm:"gap-1",md:"gap-1",lg:"gap-1.5"},color:{white:{solid:"ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900"},gray:{solid:"ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"},black:{solid:"text-white dark:text-gray-900 bg-gray-900 dark:bg-white"}},variant:{solid:"bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900",outline:"text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400",soft:"bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400",subtle:"bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25"},icon:{base:"flex-shrink-0",size:{xs:"h-4 w-4",sm:"h-4 w-4",md:"h-5 w-5",lg:"h-5 w-5"}},default:{size:"sm",variant:"solid",color:"primary"}},W={base:"",background:"bg-white dark:bg-gray-900",divide:"divide-y divide-gray-200 dark:divide-gray-800",ring:"ring-1 ring-gray-200 dark:ring-gray-800",rounded:"rounded-lg",shadow:"shadow",body:{base:"",background:"",padding:"px-4 py-5 sm:p-6"},header:{base:"",background:"",padding:"px-4 py-5 sm:px-6"},footer:{base:"",background:"",padding:"px-4 py-4 sm:px-6"}},o=A(y.ui.strategy,y.ui.badge,P),Y=C({components:{UIcon:L},inheritAttrs:!1,props:{size:{type:String,default:()=>o.default.size,validator(e){return Object.keys(o.size).includes(e)}},color:{type:String,default:()=>o.default.color,validator(e){return[...y.ui.colors,...Object.keys(o.color)].includes(e)}},variant:{type:String,default:()=>o.default.variant,validator(e){return[...Object.keys(o.variant),...Object.values(o.color).flatMap(t=>Object.keys(t))].includes(e)}},label:{type:[String,Number],default:null},icon:{type:String,default:null},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:null},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:t,attrs:r}=V("badge",T(e,"ui"),o),{size:s,rounded:p}=E({ui:t,props:e}),b=i(()=>e.icon&&e.leading||e.icon&&!e.trailing||!e.trailing||e.leadingIcon),f=i(()=>e.icon&&e.trailing||e.trailing||e.trailingIcon),j=i(()=>{var z,S;const c=((S=(z=t.value.color)==null?void 0:z[e.color])==null?void 0:S[e.variant])||t.value.variant[e.variant];return D(k(t.value.base,t.value.font,p.value,t.value.size[s.value],t.value.gap[s.value],c==null?void 0:c.replaceAll("{color}",e.color)),e.class)}),x=i(()=>e.leadingIcon||e.icon),w=i(()=>e.trailingIcon||e.icon),l=i(()=>k(t.value.icon.base,t.value.icon.size[s.value])),_=i(()=>k(t.value.icon.base,t.value.icon.size[s.value]));return{attrs:r,isLeading:b,isTrailing:f,badgeClass:j,leadingIconName:x,trailingIconName:w,leadingIconClass:l,trailingIconClass:_}}}),Z={key:0};function H(e,t,r,s,p,b){const f=L;return a(),n("span",K({class:e.badgeClass},e.attrs),[g(e.$slots,"leading",{},()=>[e.isLeading&&e.leadingIconName?(a(),v(f,{key:0,name:e.leadingIconName,class:h(e.leadingIconClass),"aria-hidden":"true"},null,8,["name","class"])):m("",!0)]),g(e.$slots,"default",{},()=>[e.label?(a(),n("span",Z,u(e.label),1)):m("",!0)]),g(e.$slots,"trailing",{},()=>[e.isTrailing&&e.trailingIconName?(a(),v(f,{key:0,name:e.trailingIconName,class:h(e.trailingIconClass),"aria-hidden":"true"},null,8,["name","class"])):m("",!0)])],16)}const Q=U(Y,[["render",H]]),X=A(y.ui.strategy,y.ui.card,W),ee=C({inheritAttrs:!1,props:{as:{type:String,default:"div"},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:t,attrs:r}=V("card",T(e,"ui"),X),s=i(()=>D(k(t.value.base,t.value.rounded,t.value.divide,t.value.ring,t.value.shadow,t.value.background),e.class));return{ui:t,attrs:r,cardClass:s}}});function te(e,t,r,s,p,b){return a(),v(F(e.$attrs.onSubmit?"form":e.as),K({class:e.cardClass},e.attrs),{default:I(()=>[e.$slots.header?(a(),n("div",{key:0,class:h([e.ui.header.base,e.ui.header.padding,e.ui.header.background])},[g(e.$slots,"header")],2)):m("",!0),e.$slots.default?(a(),n("div",{key:1,class:h([e.ui.body.base,e.ui.body.padding,e.ui.body.background])},[g(e.$slots,"default")],2)):m("",!0),e.$slots.footer?(a(),n("div",{key:2,class:h([e.ui.footer.base,e.ui.footer.padding,e.ui.footer.background])},[g(e.$slots,"footer")],2)):m("",!0)]),_:3},16,["class"])}const ae=U(ee,[["render",te]]),se={class:"page-container"},ie={class:"m-6 lg:m-12"},oe={class:"text-4xl mb-2"},ne={class:"flex flex-wrap justify-around"},re={class:"text-3xl"},le={class:"mt-2"},de={class:"mt-2"},ce=["href"],pe=C({__name:"index",setup(e){J().title="";const t=G({zh:{msg:"请给个star支持一下吧"},en:{msg:"Your star is important for me"}}),r=[{title:"soon-mock",description:"一键生成增删查改, apifox本地化替代",tags:["数据持久化","jwt授权","接口级权限控制","未mock接口可转发其他服务端"],github:"https://github.com/leafio/soon-mock"},{title:"soon-fetch",description:"基于fetch,不到3K,axios替代",tags:["超时断开","快速定义api方法","解析rest url 参数"],github:"https://github.com/leafio/soon-fetch"},{title:"soon-i18n",description:"react , vue , svelte , solid 均可使用的i18n库",tags:["不到3K","ts智能提醒","适配框架, 数据状态不丢失"],github:"https://github.com/leafio/soon-i18n"},{title:"react-vmodel",description:"像v-model一样，简单、快捷地双向绑定",tags:["ts智能提醒","兼容 antd 、material ui"],github:"https://github.com/leafio/react-vmodel"},{title:"soon-admin-react-nextjs",description:"next15 react19",tags:["i18n","table页模板","支持mobile"],github:"https://github.com/leafio/soon-admin-react-nextjs"},{title:"soon-admin-express",description:"typescript，prisma",tags:["接口级权限管理","与登录接口结合的图片验证码"],github:"https://github.com/leafio/soon-admin-express"}],s=[{title:"soon-mock",description:"generate rest apis by just one press",tags:["data persistence ","jwt","api level auth","url redirect"],github:"https://github.com/leafio/soon-mock"},{title:"soon-fetch",description:"alternative for axios, based on fetch",tags:["timeout disconnect","fast define api","restful url parse"],github:"https://github.com/leafio/soon-fetch"},{title:"soon-i18n",description:"i18n lib for react , vue , svelte , solid ...",tags:["less than 3K","ts prompt","state keeping"],github:"https://github.com/leafio/soon-i18n"},{title:"react-vmodel",description:"like v-model, simple and fast two-way binding",tags:["ts prompt","could use with antd 、material ui"],github:"https://github.com/leafio/react-vmodel"},{title:"soon-admin-vue3",description:"vue3, totally written in script setup",tags:["multi-tabs","i18n","table page template","support pc and mobile"],github:"https://github.com/leafio/soon-admin-vue3"},{title:"soon-admin-express",description:"typescript，prisma",tags:["api level auth"," captcha combined login api"],github:"https://github.com/leafio/soon-admin-express"}],p={zh:r,en:s,ko:s},b=i(()=>p[M.value]);return(f,j)=>{const x=Q,w=ae;return a(),n("div",se,[d("div",ie,[d("div",oe,u($(t)("msg")),1),d("div",ne,[(a(!0),n(B,null,N($(b),(l,_)=>(a(),v(w,{key:_,class:"shadow my-2 lg:m-4 p-4 w-[90%] lg:w-[45%] xl:w-[30%]"},{default:I(()=>[d("h3",re,u(l.title),1),d("div",le,u(l.description),1),d("div",de,[(a(!0),n(B,null,N(l.tags,c=>(a(),v(x,{key:c,class:"mr-2 mb-1"},{default:I(()=>[O(u(c),1)]),_:2},1024))),128))]),d("a",{href:l.github,target:"_blank",class:"flex items-center mt-2"},[R($(q),{class:"mr-1"}),O(" "+u(l.github),1)],8,ce)]),_:2},1024))),128))])])])}}});export{pe as default};
