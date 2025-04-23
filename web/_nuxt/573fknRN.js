import{_ as g,a as w,b as E,J as U,C as j,c as N,t as O,q as T,p as k}from"./DF3Jl0WX.js";import{e as D,g as I,h as m,i as f,l as B,r as q,s as _,j as x,k as A,c as F,o as L,a as u,b as a,m as o,w as v,d as M,t as h,p as z,q as R}from"./D9YgJou2.js";import{u as V}from"./CNsHr9yA.js";import{u as $}from"./Cq-n5m1o.js";const G={class:"mx-2 flex flex-col flex-1 overflow-y-auto"},H={class:"flex items-center my-2 justify-end"},K={class:"flex items-center gap-6"},P={class:"flex gap-6 flex-1 pb-1 box-border overflow-y-auto"},Q={class:"w-2/5 relative overflow-y-auto"},W={class:"absolute right-0 top-0"},X=`{
  code:0,
    msg:'',
    data:{
    total:100,
      "page":1,
      limit:10,
      'user-list':[
        {
          'username':'',
          'create-time':''
        }
      ]
    }
}`,le=D({__name:"type",setup(Y){const d=I({zh:{convert:"转换",copied:"已复制",title:"JSON / JS 转换为 Type",extract:"提取Types深度",tip:{jsonErr:"JSON 或 JS 输入错误"}},en:{convert:"Convert",copied:"Copied",title:"JSON / JS Convert to Type",extract:"Extract Types Level",tip:{jsonErr:"JSON or JS Error !"}},ko:{convert:"변환",copied:"복사됨",title:"JSON / JS Type로 변환",extract:"추출 Types 깊이",tip:{jsonErr:"JSON 또는 JS 오류!"}}});m(()=>{V().title=d("title"),f(B,()=>V().title=d("title"))});const t=q({useInterface:!1,extract:0,addExport:!0,addDeclare:!1,optional:!1,nullable:!1});m(()=>{const s=_.json2type.get();s&&(Object.assign(t,s.options),n.value=s.code),f([t,n],()=>{_.json2type.set({code:n.value,options:t})},{deep:!0})});const n=x(X),i=x(""),y=async()=>{const s=N(O(n.value));if(!s){c.add({title:d("tip.jsonErr"),duration:1e3,color:"error"});return}const e=T(s,"result",t).map(r=>r.code).join(`

`);i.value=await k(e)},{copy:b}=$(),c=A(),J=s=>{s&&b(s).then(()=>{c.add({title:d("copied"),duration:1e3})})};return(s,e)=>{const r=g,S=w,C=E,p=z;return L(),F("div",G,[u("div",H,[u("div",K,[a(r,{modelValue:o(t).addExport,"onUpdate:modelValue":e[0]||(e[0]=l=>o(t).addExport=l),class:"cursor-pointer",label:"Export"},null,8,["modelValue"]),a(r,{modelValue:o(t).addDeclare,"onUpdate:modelValue":e[1]||(e[1]=l=>o(t).addDeclare=l),class:"cursor-pointer",label:"Declare"},null,8,["modelValue"]),a(r,{modelValue:o(t).useInterface,"onUpdate:modelValue":e[2]||(e[2]=l=>o(t).useInterface=l),class:"cursor-pointer",label:"Interface"},null,8,["modelValue"]),a(C,{label:o(d)("extract"),class:"flex items-center"},{default:v(()=>[a(S,{modelValue:o(t).extract,"onUpdate:modelValue":e[3]||(e[3]=l=>o(t).extract=l),type:"number",class:"ml-1",min:0},null,8,["modelValue"])]),_:1},8,["label"]),a(r,{modelValue:o(t).nullable,"onUpdate:modelValue":e[4]||(e[4]=l=>o(t).nullable=l),class:"cursor-pointer",label:"Nullable"},null,8,["modelValue"]),a(r,{modelValue:o(t).optional,"onUpdate:modelValue":e[5]||(e[5]=l=>o(t).optional=l),class:"cursor-pointer",label:"Optional"},null,8,["modelValue"]),a(p,{onClick:y},{default:v(()=>[M(h(o(d)("convert")),1)]),_:1})])]),u("div",P,[a(U,{modelValue:o(n),"onUpdate:modelValue":e[6]||(e[6]=l=>R(n)?n.value=l:null),class:"w-3/5 overflow-y-auto"},null,8,["modelValue"]),u("div",Q,[a(j,{"model-value":o(i),class:"h-full overflow-y-auto"},null,8,["model-value"]),u("div",W,[a(p,{icon:"i-fluent-copy-24-regular",onClick:e[7]||(e[7]=l=>J(o(i)))})])])])])}}});export{le as default};
