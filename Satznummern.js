const pattern = /https:\/\/www\.gesetze-im-internet\.de\/\w+\/\w+\.html.*/g;
let URL = window.location.href;


function has_numbers(absatz) {
    return absatz.innerHTML.includes("<dl");
}


function get_saetze(absatz) {
    let saetze = absatz.textContent.split(/(?<=[^A-Z].[.?!]) +(?=[§A-Z])/g);
    return saetze;
}


function format_sup(satz, nr) {
    if (satz.startsWith('(')) {
        let teil = satz.split(/^(\(.+\))/).filter(elem => elem);
        return teil[0] + " <sup style='color: red;'>"+nr+"</sup>"+teil[1].trim();
    } else {
        return "<sup style='color: red;'>"+nr+"</sup>"+satz;
    }
}


if (URL.match(pattern)) {
    const absaetze = Array.from(document.getElementsByClassName('jurAbsatz'));

    absaetze.forEach((absatz) => {
        if (has_numbers(absatz)) {
            let new_absatz = [];
            let saetze = absatz.innerHTML.split(/(\<dl.*\<\/dl\>)/g);
            let nr = 1;
            saetze.forEach((satz) => {
                if (satz.endsWith('</dl>') ||  satz.match(/^[a-z]/)) {
                    new_absatz.push(satz);
                } else {
                    new_absatz.push(format_sup(satz, nr));
                    ++nr;
                }
            });
            absatz.innerHTML = new_absatz.join(' ');
        } else if (get_saetze(absatz).length > 1) {
            let new_absatz = [];
            let saetze = get_saetze(absatz);
            let nr = 1;
            saetze.forEach((satz) => {
                new_absatz.push(format_sup(satz, nr));
                ++nr;
            });
            absatz.innerHTML = new_absatz.join(' ');
        }
    });
}
