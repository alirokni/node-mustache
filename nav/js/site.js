$(window).load (function (){
 $.fn.locate = function(){
  var w = $(window), wHeight=w.height(), wWidth=w.width(), tContactWidth, tCallWidth=0;
  wWidth=wWidth<700?700:wWidth;
  tContactWidth=((wWidth/2)-387)+"px";
  tCallWidth=((wWidth/2)-337)+"px";
  $("#contact-form").css("left",tContactWidth);
  $("#call-form").css("left",tCallWidth);
 };$().locate();
 $(window).resize(function(){
  $().locate();
 }); /* closing locate function */

 $("#toolBox")
  .mouseout(function(){$("#openSlider").show();$("#sprite").hide();})
  .mouseover(function(){$("#openSlider").hide();$("#sprite").show();})  ;

  if((!Modernizr.video||!Modernizr.inputtypes.email||!Modernizr.inputtypes.range)){$("#no_html5").html("Your browser (or an older version) does not support some or any HTML5 elements! <span class='x'>X</span>").addClass("no-html5-compliant");}

  $(".x").click(function(){$(this).parent().fadeOut("slow");});
  $("#footer li:eq(0)").click(function(){$("#footer section:eq(1)").hide("fast");$("#contact-form").toggle(200)});
  $("#footer li:eq(1)").click(function(){$("#footer section:eq(0)").hide("fast");$("#call-form").toggle(200)});
  $(".submit").attr("disabled","disabled"); // disable form submittion before entering valid email
  var validate = function(){
   var oEmail = $("#email").val();
   var oEmailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   if(oEmail.length < 1 ||(!oEmailRegExp.test(oEmail))){
    $("#note,.req").addClass("req-on");
    $(document.body).data({
    "req-star":" * ",
    "req-note":"* Valid Email Required"
    });
    $(".req:first").text($(document.body).data("req-star"));
    $("#note").text($(document.body).data("req-note"));
    $(".submit").attr("disabled","disabled");
   }else{
    $("#note, .req").removeClass("req-on");
    $(".submit").removeAttr("disabled");
   }
  }; /*  closing validate function */

  $(".oForm")
   .find("#email").bind("blur keyup", validate)
   .find("#email").end().blur(function(){if((!Modernizr.sessionstorage) && ($("input[id='email']").val() !='')){contactFormCookie()}})
   $("#message").blur(function(){if((!Modernizr.sessionstorage) && ($("textarea[id='message']").val() !='')){contactFormCookie()}});

  $("a[rel=license], a[rel=external]").attr("target","_blank");
/*
  if(swfobject.hasFlashPlayerVersion("9")){
   var att = { data:"https://clients4.google.com/voice/embed/webCallButton", width:"230", height:"85" };
   var par = { menu:"false", FlashVars:"id=3fc4d1fec02bbb797b5f0a1f278ee8c86284621b&amp;style=0", wmode:"transparent" };
   var id = "noflash";
   var myFlashContent = swfobject.createSWF(att, par, id);
  };

  swfobject.registerObject("myId","9.0.0");
*/
 $(".submit").click(function(){
  $.ajax({
   type: "POST",
   url: "contactform.php",
   data: ({"email":$("#email").val(),"subject":$("#subject").val(), "message":$("#message").val()}),
   success: function(msg,textStatus,xhr){
    if(msg == "-1"){
     $("#note").addClass("req-on");
     $("#note").text("A Valid Email required");
    }else if(msg == "1"){
     $("#note").removeClass("req").addClass("pos");
     $("#note").text("A Successfull Deliverey");
    }else{
     $("div #note").addClass("req-on");
     $("#note").text("There is an issue!!!");
    }
   }
  }); /* closing ajax call */
 });

 html5SupportCookie();

}); /* closing jquery window onload function */

$(function(){

 if(Modernizr.inputtypes.range){

   var rangeChanger= function(index){
    var a = parseInt(index);
    var oTabClass = ".tabs-"+(a+1);
    var oTabId = "#tabs-"+(a+1);
    $("#range").val(index);
    $(".range ul li").removeClass("light-color");
    $(oTabClass).addClass("light-color");
    $("#tabs .contenttxt span").hide();
    $(oTabId).show();
   }

   $(".no-input-range").addClass("hide");
   $(".range ul li").click(function(){
    var clickIndex = $(".range ul li").index(this);
    rangeChanger(clickIndex);
   });
   $("#range").change(function(){
    var indexIndex = $("#range").val();
    rangeChanger(indexIndex);
   });
 }else{
   $(".input-range").parent().addClass("hide");
   $(".no-input-range li").click(function(){
    var b = $(".no-input-range li").index(this);
    var oTabClass = ".tabs"+(b+1);
    var oTabId = "#tabs-"+(b+1);
    $(".no-input-range li").removeClass("colorOn");
    $(oTabClass).addClass("colorOn");
    $("#tabs p.contenttxt").hide();
    $(oTabId).show();
   });
 }

 if(Modernizr.sessionstorage){
  $("input[id='email'], textarea[id='message']").blur(function(){
   if($("input[id='email']").val() != ''){sessionStorage.setItem("Email", $("input[id='email']").val());}
   if($("textarea[id='message']").val() !=''){sessionStorage.setItem("Message", $("textarea[id='message']").val());}
  });
  if(sessionStorage.getItem("Email") || sessionStorage.getItem("Message")){
   $("input[id='email']").val(sessionStorage.getItem("Email"));
   $("textarea[id='message']").val(sessionStorage.getItem("Message"));
  };
  $(".clear").click(function(){
         sessionStorage.clear();
     $("#note, .req").removeClass("req-on");
     $("input[id='email'],textarea[id='message']").val("");
         $(".submit").attr("disabled","disabled");
  });
 }else{
  $(window).load (function (){
   contactFormCookie();
  });
 } /* closing Modernizr.sessionstorage condition */

}); /* closing jquery dom onload function */

 function setCookie(cookieName,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=cookieName+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
 };

 function getCookie(cookieName){
  var c_start, c_end='';
  if (document.cookie.length>0){
   c_start=document.cookie.indexOf(cookieName + "=");
   if (c_start!=-1){
    c_start=c_start + cookieName.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
   }
   return "";
  };

function html5SupportCookie(){
  var oFlag=getCookie('Flag');
  if (oFlag!=null && oFlag!="") {
   oFlag="none";
   $("#no_html5").css("display",oFlag);
  }else{
   oFlag="block"
   $("#no_html5").css("display",oFlag);
   if (oFlag!=null && oFlag!=""){setCookie('Flag',oFlag,365)}
  }
 };

 function contactFormCookie(){
  var oEMAIL=getCookie('Email');
  var oMESSAGE=getCookie('Message');
  if(oEMAIL!=null && oEMAIL!=""){ //not empty
   $("input[id='email']").val(oEMAIL);
   clearCookies();
  }else{ // empty
   oEMAIL=$("input[id='email']").val();
   setCookie('Email',oEMAIL,365);
  };
  if(oMESSAGE!=null && oMESSAGE!=""){ //not empty
   $("textarea[id='message']").val(oMESSAGE);
   clearCookies();
  }else{ // empty
   oMESSAGE=$("textarea[id='message']").val();
   setCookie('Message',oMESSAGE,365);
  };
 }

 function clearCookies(){
   $(".clear").click(function(){
    setCookie('Email',"",-1);
    setCookie('Message',"",-1);
    $("#note, .req").removeClass("req-on");
    $("input[id='email'],textarea[id='message']").val("");
    $(".submit").attr("disabled","disabled");
   });
 }
