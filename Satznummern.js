const pattern = /https:\/\/www.gesetze-im-internet.de\/\w+\/\w+.html/g;
let URL = window.location.href;
if (URL.match(pattern)) {
    const elem = document.getElementsByClassName('jurAbsatz')[0];
    const text = elem.textContent.split('. ');
    let beautyfied = [];
    for (const [nr, satz] of text.entries()) {
        beautyfied.push("<sup>"+(nr+1)+"</sup>"+satz+".");
    }
    elem.innerHTML = beautyfied.join(' ').replace('..', '.');
}
