// ==UserScript==
// @name        Redirect arxiv.org to xxx.itp.ac.cn
// @namespace   uso2usom
// @description On any web page it will check if the clicked links goes to arxiv.org. If so, the link will be rewritten to point to xxx.itp.ac.cn
// @include     http://*.*
// @include     https://*.*
// @version     1.2
// @grant       none
// ==/UserScript==

// This is a slightly brute force solution, but there is no other way to do it using only a userscript.

// Release Notes

// version 1.2
// Focus on pdf link only!
// Add '.pdf' link  automatically. Convenient for saving as pdf.

// version 1.1
// Redirect arxiv.org to CN.arxiv.org

// document.body.addEventListener('mousedown', function(e){
//     var targ = e.target || e.srcElement;
//     if ( targ && targ.href && targ.href.match(/https?:\/\/arxiv.org\/pdf/) ) {
//         targ.href = targ.href.replace(/https?:\/\/arxiv\.org/, 'http://cn.arxiv.org');
//     }
//     if ( targ && targ.href && targ.href.match(/http?:\/\/arxiv.org\/pdf/) ) {
//         targ.href = targ.href.replace(/http?:\/\/arxiv\.org/, 'http://cn.arxiv.org');
//     }
//     if ( targ && targ.href && targ.href.match(/https?:\/\/arxiv.org\/abs/) ) {
//         targ.href = targ.href.replace(/https?:\/\/arxiv\.org\/abs/, 'http://cn.arxiv.org/pdf');
//     }
//     if ( targ && targ.href && targ.href.match(/http?:\/\/arxiv.org\/abs/) ) {
//         targ.href = targ.href.replace(/http?:\/\/arxiv\.org\/abs/, 'http://cn.arxiv.org/pdf');
//     }
//     if (targ && targ.href && targ.href.match(/http?:\/\/cn.arxiv.org\/pdf/) && !targ.href.match(/\.pdf/) )
//     {
//        targ.href = targ.href + '.pdf';
//     }
// });


function findFatherNode(node, nodeName='A', maxDeep=1000){
    for (var i = 0; i < maxDeep; i++) {
        if (! node){return node}
        if (node.nodeName == nodeName){
            return node
        }else{
            node = node.parentElement
        }
    };
}

document.body.addEventListener('mousedown', function(e){
    var targ = e.target || e.srcElement;
    var aTag = findFatherNode(targ, 'A', 10);
    if (!aTag || !(aTag.href)){return};

    var headN = 17;
    var hrefHead = aTag.href.slice(0, headN);
    var hrefTail = aTag.href.slice(headN);
    if ( (hrefHead.indexOf('arxiv.org')==-1)){return};

    if ( hrefHead.match(/https?:\/\/arxiv\.org/) ) {
        hrefHead = hrefHead.replace(/https?:\/\/arxiv\.org/, 'http://xxx.itp.ac.cn');
    }
    if ( hrefHead.match(/http?:\/\/arxiv\.org/) ) {
        hrefHead = hrefHead.replace(/http?:\/\/arxiv\.org/, 'http://xxx.itp.ac.cn');
    }
    aTag.href = hrefHead + hrefTail
    // console.log(targ, targ.href);
});

