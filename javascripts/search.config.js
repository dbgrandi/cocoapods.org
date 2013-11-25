// Tracking the search results.
//
var trackAnalytics=function(e,t){var n=e.total;n>0?_gaq.push(["_trackEvent","search","with results",t,n]):_gaq.push(["_trackEvent","search","not found",t,0])};$(window).ready(function(){var e=$('#search input[type="search"]'),t=/\b(platform|on\:\w+\s?)+/,n=$("#results_container div.platform"),r=function(){n.find("label").removeClass("selected"),n.find("input:checked + label").addClass("selected")},i=function(){$("nav.navbar").css("opacity","1"),$("#search").removeClass("active"),$("#results_container").removeClass("active"),$("#search span.amount").hide(),$("#search_results div.platform").hide(),$("#search_results div.allocations").hide(),$("#search_results div.results").hide()},s=function(){$("nav.navbar").css("opacity","0"),$("#search").addClass("active"),$("#results_container").addClass("active"),$("#search span.amount").show()},o=function(){$("#search_results div.platform").show(),$("#search_results div.allocations").show()},u=function(){$("#search_results div.allocations").hide(),$("#search_results div.platform").hide(),$.getJSON("http://cocoapods.org/no_results.json","",function(e,t,n){var r=$("#results_container .no_results .tags"),i=[];$.each(e.tag,function(e,t){i.push("<a href='javascript:pickyClient.insert(\"tag:"+e+"\");'>"+e+"</a>")}),r.html("<p>Maybe it helps exploring via one of our keywords? </p>"),r.find("p").append(i.sort().join(", ")).append(".")})},a={ios:"iOS",osx:"OS X"},f=/^http/,l=function(e){var t,n,r=e.source;for(var i in r){if(i=="http")return"";n=r[i];if(n.toString().match(f)){t=n;break}}return t?'<a href="'+t+'">Repo</a>':""},c=function(e){var t=a[e.platforms],n=$.map(e.authors,function(e,t){return"<a href=\"javascript:pickyClient.insert('"+t.replace(/[']/,"\\\\'")+"')\">"+t+"</a>"}),r="infos col-lg-8 col-sm-7 col-xs-12",i="actions col-lg-4 col-sm-5 col-xs-12";return'<li class="result">  <div class="'+r+'">'+"    <h3>"+'      <a href="'+e.link+'">'+e.id+"</a>"+(t?'<span class="os">'+t+"</span>":"")+'      <span class="version">'+e.version+'        <span class="clippy">'+e.podspec+"</span>"+"      </span>"+"    </h3>"+'    <p class="subspecs">'+e.subspecs.join(", ")+"</p>"+"    <p>"+e.summary+"</p>"+'    <p class="author">'+n.join(", ")+"</p>"+"  </div>"+'  <div class="'+i+'">'+l(e)+'    <a href="http://cocoadocs.org/docsets/'+e.id+"/"+e.version+'">Docs</a>'+'    <a href="https://github.com/CocoaPods/Specs/tree/master/'+e.id+"/"+e.version+"/"+e.id+'.podspec">Spec</a>'+"  </div>"+"</li>"};pickyClient=new PickyClient({full:"http://cocoapods.org/search.json",fullResults:20,live:"http://cocoapods.org/search.json",liveResults:20,liveRendered:!0,liveSearchInterval:60,maxSuggestions:5,alwaysShowResults:!0,alwaysShowSelection:!0,wrapResults:'<ol class="results"></ol>',enclosingSelector:"#search",resultsSelector:"#search_results div.results",noResultsSelector:"#results_container .no_results",allocationsSelector:"#search_results div.allocations",hiddenAllocations:"#search_results div.allocations .onrequest",counterSelector:"#search form span.amount",moreSelector:"#search_results .allocations .more",beforeInsert:function(e){return""!=e&&s(),e.replace(t,"")},after:function(e,t){},before:function(e,r){if(e=="")return"";e=e.replace(t,"");var i=n.find("input:checked").val();return i===undefined||i==""?e:i+" "+e},success:function(t,n){trackAnalytics(t,n);if(""==e.val())return!1;0==t.total?u():o();var r=t.allocations;return r.each(function(e,t){t.entries=t.entries.map(function(e,t){return c(JSON.parse(t))})}),t},qualifiers:{en:{dependencies:"uses",platform:"on"}},groups:[["platform"]],choices:{en:{platform:"",name:"name",author:"author",summary:"summary",dependencies:"dependency",tags:"tag",version:"version","author,name":"author+name","name,author":"name+author","tags,name":"tag+name","name,tags":"name+tag","version,name":"version+name","name,version":"name+version","name,dependencies":"name+dependency","dependencies,name":"dependency+name","author,dependencies":"author+dependency","dependencies,author":"dependency+author","dependencies,version":"version+dependencies","version,dependencies":"version+dependency","author,version":"author+version","version,author":"version+author","summary,version":"version+summary","version,summary":"version+summary","summary,name":"summary+name","name,summary":"name+summary","summary,author":"summary+author","author,summary":"author+summary","summary,dependencies":"summary+dependency","dependencies,summary":"dependency+summary","name,dependencies":"name+dependency","dependencies,name":"dependency+name"}},explanations:{en:{author:"written by",versions:"on version",dependencies:"using",name:"named",platform:"only on",summary:"with summary",tags:"tagged as"}}}),e.on("input",function(e){""==this.value?i():s()}),n.find("input").bind("change",function(e){pickyClient.resend(),r(),$("#pod_search").focus()}),r(),window.initial_query!=""&&pickyClient.insertFromURL(window.initial_query)});