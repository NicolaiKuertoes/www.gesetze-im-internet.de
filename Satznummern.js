const pattern = /https:\/\/www\.gesetze-im-internet\.de\/\w+\/\w+\.html.*/g;
let URL = window.location.href;

if (URL.match(pattern)) {
    const absaetze = document.getElementsByClassName('jurAbsatz');
    const abs_nr = /^(\(\w+\))/

    Array.from(absaetze).forEach((absatz) => {
        let saetze = absatz.innerHTML.split(/(?=\. [A-Z]{1})/g);
        if(saetze.length >= 2) {
        let newAbsatz = [];
        for (const [nr, satz] of saetze.entries()) {
            abs_nr.lastIndex = 0; // fix for weird regex test() bug https://stackoverflow.com/questions/3891641/regex-test-only-works-every-other-time
            if (abs_nr.test(satz)) {
                let satz_part = satz.split(abs_nr).filter(elm => elm);
                newAbsatz.push(satz_part[0] + " <sup style='color: red;'>" + (nr+1) + "</sup>" + satz_part[1].replace(/^\.\s+/, '').replace(/$/, '.').replace(/\.+$/, '.').trim());
            
            } else {
                newAbsatz.push("<sup style='color: #FF00BF;'>" + (nr+1) + "</sup>" +satz.replace(/^\.\s+/, '').replace(/$/, '.').replace(/\.+$/, '.'));
            }
        }
        absatz.innerHTML = newAbsatz.join(' ');
        }
    });
}
