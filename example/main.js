var pencil = require('../');
var p = pencil();
p.appendTo('#viewport');

var link = document.querySelector('#download')
link.addEventListener('click', function (ev) {
    ev.preventDefault();
    saveAs('pretty.svg');
});

function saveAs (filename) {
    var link = document.createElement('a');
    var div = document.createElement('div');
    div.appendChild(p.element.cloneNode(true));
    
    var data = btoa(div.innerHTML);
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:image/svg;base64,' + data);
    link.click();
}
