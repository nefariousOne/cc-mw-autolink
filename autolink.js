HTML JSResult Skip Results Iframe
EDIT ON
// GECKO/PERFORCE APP LINKING

function applyLink(el) {
    if ($(el).is("a") || $(el).hasClass(".external-link") || $(el).hasClass(".title") || ($(el).parents(".syntaxhighlighter").length > 0)) {
        return;
    } else {
        if ($(el).html() !== null) {
            var newHtml = $(el).html().replace(regex, function (m) {
                var n = m.match(/\d+/g).map(Number);
                var l = "";
                if (m.match(/g\d+/gi)) {
                    l = '<a class="app-linker" href="http://komodo.mathworks.com/main/gecko/view?Record=' + n + '">' + m + '</a>';
                } else {
                    l = '<a class="app-linker" href="http://p4db.mathworks.com/cgi-bin/changeView.cgi?CH=' + n + '">' + m + '</a>';
                }
                return l;
            });
            $(el).html(newHtml);
        }
    }
}

function hasChildren(el) {
    if (($(el).children().length > 0)) {
        return true;
    }
}

function itterateChildren(el) {
    var ninos = hasChildren(el);
    if (ninos) {
        // DO NOTHING
        //var hijos = $(el).find('*');
        //itterateChildren(hijos);
    } else {
        applyLink(el);
    }
}

var pattern;
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Safari hates the lookarounds so we need to set it up as a string and create a Regexp object if the browser is not Safari
isSafari ? pattern = /((^<[^>]*>)(\b(g|c)\d{4,}\b)(<[^>]*>$)|\b(?!-)(g|c)\d{4,}(?!-))\b/gim : pattern = "\\b(?<!(-|#|\\.|:))(g|c)\\d{4,}(?!(-|(\\W\\d)))\\b";

var regex = new RegExp(pattern, 'gim');

var mwAppLinker = function () {
    var els = $("#content").find('*');
    $(els).each(function () {
        itterateChildren($(this));
    });
}


// let's let other plugins execute their JS
//  before we start messing with the output
setTimeout(function () {
    mwAppLinker();
}, 1500);

Resources
