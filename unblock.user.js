// ==UserScript==
// @name        port webcam no ads
// @description Fix ad checks on Port Canaveral camera pages
// @match       http://portfever.com*
// @match       http://www.portfever.com*
// @match       http://portcanaveralwebcam.com*
// @match       http://www.portcanaveralwebcam.com*
// @run-at      document-end
// @grant       unsafeWindow
// @grant       GM_addStyle
// ==/UserScript==
// "fullscreen":false

document.addEventListener ("readystatechange", FireWhenReady, true);

var byebye = ['e2','MTTWdiv','newsdiv','twitterbg','twitterbox','fblinkdiv','weatherdiv','plusonediv','promoboxdiv',
              'adbannerdiv', 'bgbannerdiv', 'adskyleftdiv', 'bgskyleftdiv', 'adskyrightdiv', 'bgskyrightdiv',
              'headbannerdiv', 'siteselectdiv', 'partnerad1div', 'adskyright2div', 'belowMTdiv', 'footerdiv' ];
for (var cnt = 0; cnt < byebye.length; cnt++) { nukediv(byebye[cnt]); }

var root   = document.getElementById('root');
if (root)  { root.style.width = 890; root.style.display = 'inline'; }

var body   = document.getElementsByTagName('body')[0];
if (body)  { body.removeAttribute("style"); }

var headbox   = document.getElementsByClassName('headbox');
for (var cnth = 0; cnth < headbox.length; cnth++) { if (headbox)  { headbox[cnth].remove(); } }

var hdiv   = document.getElementById('HDTVcamdiv');
if (hdiv)  { hdiv.style.position = 'static'; hdiv.style.top = 0; hdiv.style.left = 0; }

replace_js("fullscreen:false", "fullscreen:true");
replace_js("\"fullscreen\":false", "\"fullscreen\":true");

function replace_js(oldstr, newstr) {
    var allscripts = document.getElementsByTagName('script');
    for (var i = 0; i < allscripts.length; i++) {
        var scriptHTML = allscripts[i].innerHTML;
        scriptHTML = scriptHTML.replace(RegExp(oldstr, "mg"), newstr);
        allscripts[i].innerHTML = scriptHTML;
    }
    var allparams = document.getElementsByName("flashvars");
    for (var j = 0; j < allparams.length; j++) {
        var paramvalue = allparams[j].value;
        paramvalue = paramvalue.replace(RegExp(oldstr, "mg"), newstr);
        allparams[j].setAttribute("value", paramvalue);
    }
}

function nukediv ( divname ) {
    var divelement = document.getElementById(divname);
    if (divelement) { divelement.remove(); }
}

function FireWhenReady () {
    this.fired  = this.fired || false;
    if (    document.readyState != "uninitialized" &&  document.readyState != "loading" &&  ! this.fired) {
        this.fired = true;
        document.body.onload  = function () { console.log ("body onload intercepted."); };
    }
}