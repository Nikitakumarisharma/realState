"use strict";(()=>{var e={};e.id=409,e.ids=[409],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,s)=>{Object.defineProperty(s,"M",{enumerable:!0,get:function(){return function e(s,t){return t in s?s[t]:"then"in s&&"function"==typeof s.then?s.then(s=>e(s,t)):"function"==typeof s&&"default"===t?s:void 0}}})},5552:(e,s,t)=>{t.r(s),t.d(s,{config:()=>l,default:()=>p,routeModule:()=>m});var n={};t.r(n),t.d(n,{default:()=>c});var r=t(2328),o=t(2706),a=t(6762);let i=require("nodemailer");var u=t.n(i);async function c(e,s){if("POST"!==e.method)return s.status(405).json({message:"Method Not Allowed"});try{let{name:t,email:n,message:r,contact:o}=e.body;if(!t||!n)return s.status(400).json({success:!1,message:"Name and email are required"});if(!process.env.EMAIL_USER||!process.env.EMAIL_PASS||!process.env.EMAIL_RECEIVER)return s.status(500).json({success:!1,message:"Missing email configuration"});let a=u().createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),i=!!o,c={from:`"${t}" <${process.env.EMAIL_USER}>`,to:process.env.EMAIL_RECEIVER,subject:i?`🎉 New Signup: ${t}`:`📩 Contact Form Submission from ${t}`,text:i?`New User Signed Up!

Name: ${t}
Email: ${n}
Contact: ${o}`:`Name: ${t}
Email: ${n}

Message:
${r}`,replyTo:n,html:i?`
          <h2>New User Signup</h2>
          <p><strong>Name:</strong> ${t}</p>
          <p><strong>Email:</strong> ${n}</p>
          <p><strong>Contact:</strong> ${o}</p>
        `:`
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${t}</p>
          <p><strong>Email:</strong> ${n}</p>
          <p><strong>Message:</strong></p>
          <p>${r}</p>
        `};return await a.sendMail(c),console.log(`✅ Email sent successfully! (${i?"Signup":"Contact Form"})`),s.status(200).json({success:!0,message:"Email sent successfully!"})}catch(e){return console.error("❌ Email sending error:",e),s.status(500).json({success:!1,message:"Email could not be sent",error:e.message})}}let p=(0,a.M)(n,"default"),l=(0,a.M)(n,"config"),m=new r.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:n})},2706:(e,s)=>{Object.defineProperty(s,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},2328:(e,s,t)=>{e.exports=t(5600)}};var s=require("../../webpack-api-runtime.js");s.C(e);var t=s(s.s=5552);module.exports=t})();