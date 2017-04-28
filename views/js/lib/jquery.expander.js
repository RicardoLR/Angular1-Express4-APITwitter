/*!
 * jQuery Expander Plugin - v1.7.0 - 2016-03-12
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&"object"==typeof module.exports?module.exports=a:a(jQuery)}(function(a){a.expander={version:"1.7.0",defaults:{slicePoint:100,sliceOn:null,preserveWords:!0,normalizeWhitespace:!0,showWordCount:!1,detailPrefix:" ",wordCountText:" ({{count}} words)",widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:!1,wordEnd:/(&(?:[^;]+;)?|[0-9a-zA-Z\u00C0-\u0100]+|[^\u0000-\u007F]+)$/,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",moreLinkClass:"more-link",lessLinkClass:"less-link",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:!0,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null,afterCollapse:null}},a.fn.expander=function(b){function c(a,b){var c="span",d=a.summary,e=q.exec(d),f=e?e[2].toLowerCase():"";return b?(c="div",e&&"a"!==f&&!a.expandAfterSummary?d=d.replace(q,a.moreLabel+"$1"):d+=a.moreLabel,d='<div class="'+a.summaryClass+'">'+d+"</div>"):d+=a.moreLabel,[d,a.detailPrefix||"","<",c+' class="'+a.detailClass+'"',">",a.details,"</"+c+">"].join("")}function d(a,b){var c='<span class="'+a.moreClass+'">'+a.expandPrefix;return a.showWordCount?a.wordCountText=a.wordCountText.replace(/\{\{count\}\}/,b.replace(n,"").replace(/\&(?:amp|nbsp);/g,"").replace(/(?:^\s+|\s+$)/,"").match(/\w+/g).length):a.wordCountText="",c+='<a href="#" class="'+a.moreLinkClass+'">'+a.expandText+a.wordCountText+"</a></span>"}function e(b,c){return b.lastIndexOf("<")>b.lastIndexOf(">")&&(b=b.slice(0,b.lastIndexOf("<"))),c&&(b=b.replace(m,"")),a.trim(b)}function f(a,b){b.stop(!0,!0)[a.collapseEffect](a.collapseSpeed,function(){var c=b.prev("span."+a.moreClass).show();c.length||b.parent().children("div."+a.summaryClass).show().find("span."+a.moreClass).show(),a.afterCollapse&&a.afterCollapse.call(b)})}function g(b,c,d){b.collapseTimer&&(j=setTimeout(function(){f(b,c),a.isFunction(b.onCollapse)&&b.onCollapse.call(d,!1)},b.collapseTimer))}function h(b){var c="ExpandMoreHere374216623",d=b.summaryText.replace(b.sliceOn,c);d=a("<div>"+d+"</div>").text();var e=d.indexOf(c),f=b.summaryText.indexOf(b.sliceOn);return-1!==e&&e<b.slicePoint&&(b.summaryText=b.allHtml.slice(0,f)),b}var i="init";"string"==typeof b&&(i=b,b={});var j,k=a.extend({},a.expander.defaults,b),l=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,m=k.wordEnd,n=/<\/?(\w+)[^>]*>/g,o=/<(\w+)[^>]*>/g,p=/<\/(\w+)>/g,q=/(<\/([^>]+)>)\s*$/,r=/^(<[^>]+>)+.?/,s=/\s\s+/g,t=function(b){return k.normalizeWhitespace?a.trim(b||"").replace(s," "):b},u={init:function(){this.each(function(){var b,i,m,q,s,u,v,w,x,y,z,A,B,C,D,E=[],F=[],G="",H={},I=this,J=a(this),K=a([]),L=a.extend({},k,J.data("expander")||a.meta&&J.data()||{}),M=!!J.find("."+L.detailClass).length,N=!!J.find("*").filter(function(){var b=a(this).css("display");return/^block|table|list/.test(b)}).length,O=N?"div":"span",P=O+"."+L.detailClass,Q=L.moreClass+"",R=L.lessClass+"",S=L.expandSpeed||0,T=t(J.html()),U=T.slice(0,L.slicePoint);if(L.moreSelector="span."+Q.split(" ").join("."),L.lessSelector="span."+R.split(" ").join("."),!a.data(this,"expanderInit")){for(a.data(this,"expanderInit",!0),a.data(this,"expander",L),a.each(["onSlice","beforeExpand","afterExpand","onCollapse","afterCollapse"],function(b,c){H[c]=a.isFunction(L[c])}),U=e(U),s=U.replace(n,"").length;s<L.slicePoint;)q=T.charAt(U.length),"<"===q&&(q=T.slice(U.length).match(r)[0]),U+=q,s++;for(L.sliceOn&&(D=h({sliceOn:L.sliceOn,slicePoint:L.slicePoint,allHtml:T,summaryText:U}),U=D.summaryText),U=e(U,L.preserveWords&&T.slice(U.length).length),u=U.match(o)||[],v=U.match(p)||[],m=[],a.each(u,function(a,b){l.test(b)||m.push(b)}),u=m,i=v.length,b=0;i>b;b++)v[b]=v[b].replace(p,"$1");if(a.each(u,function(b,c){var d=c.replace(o,"$1"),e=a.inArray(d,v);-1===e?(E.push(c),F.push("</"+d+">")):v.splice(e,1)}),F.reverse(),M)x=J.find(P).remove().html(),U=J.html(),T=U+x,w="";else{if(x=T.slice(U.length),y=a.trim(x.replace(n,"")),""===y||y.split(/\s+/).length<L.widow)return;w=F.pop()||"",U+=F.join(""),x=E.join("")+x}L.moreLabel=J.find(L.moreSelector).length?"":d(L,x),N?x=T:"&"===U.charAt(U.length-1)&&(G=/^[#\w\d\\]+;/.exec(x),G&&(x=x.slice(G[0].length),U+=G[0])),U+=w,L.summary=U,L.details=x,L.lastCloseTag=w,H.onSlice&&(m=L.onSlice.call(I,L),L=m&&m.details?m:L),z=c(L,N),J.empty().append(z),B=J.find(P),C=J.find(L.moreSelector),"slideUp"===L.collapseEffect&&"slideDown"!==L.expandEffect||J.is(":hidden")?B.css({display:"none"}):B[L.collapseEffect](0),K=J.find("div."+L.summaryClass),A=function(a){a.preventDefault();var b=a.startExpanded?0:S;C.hide(),K.hide(),H.beforeExpand&&L.beforeExpand.call(I),B.stop(!1,!0)[L.expandEffect](b,function(){B.css({zoom:""}),H.afterExpand&&L.afterExpand.call(I),g(L,B,I)})},C.find("a").unbind("click.expander").bind("click.expander",A),L.userCollapse&&!J.find(L.lessSelector).length&&J.find(P).append('<span class="'+L.lessClass+'">'+L.userCollapsePrefix+'<a href="#" class="'+L.lessLinkClass+'">'+L.userCollapseText+"</a></span>"),J.find(L.lessSelector+" a").unbind("click.expander").bind("click.expander",function(b){b.preventDefault(),clearTimeout(j);var c=a(this).closest(P);f(L,c),H.onCollapse&&L.onCollapse.call(I,!0)}),L.startExpanded&&A({preventDefault:function(){},startExpanded:!0})}})},destroy:function(){this.each(function(){var b,c,d=a(this);d.data("expanderInit")&&(b=a.extend({},d.data("expander")||{},k),c=d.find("."+b.detailClass).contents(),d.removeData("expanderInit"),d.removeData("expander"),d.find(b.moreSelector).remove(),d.find("."+b.summaryClass).remove(),d.find("."+b.detailClass).after(c).remove(),d.find(b.lessSelector).remove())})}};return u[i]&&u[i].call(this),this},a.fn.expander.defaults=a.expander.defaults});