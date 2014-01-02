var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Pencil;
inherits(Pencil, EventEmitter);

function Pencil (opts) {
    if (!(this instanceof Pencil)) return new Pencil(opts);
    if (!opts) opts = {};
    if (typeof opts === 'string') opts = { svg: opts };
    this.enabled = true;
    
    var svg = opts.svg || createElement('svg');
    if (typeof svg === 'string') {
        svg = document.querySelector(opts.svg);
    }
    this.element = svg;
    this.polyline = null;
    this.points = [];
    
    var self = this;
    svg.addEventListener('mousedown', function (ev) { self._onmousedown(ev) });
    svg.addEventListener('mouseup', function (ev) { self._onmouseup(ev) });
    svg.addEventListener('mousemove', function (ev) { self._onmousemove(ev) });
    svg.addEventListener('mouseout', function (ev) { self._onmouseout(ev) });
}

Pencil.prototype.enable = function () {
    this.enabled = true;
};

Pencil.prototype.disable = function () {
    this.enabled = false;
};

Pencil.prototype._onmousedown = function (ev) {
    if (!this.enabled) return;
    var x = ev.offsetX, y = ev.offsetY;
    
    this.points = [ [ x, y ] ];
    this.polyline = createElement('polyline');
    this.polyline.setAttribute('points', this.points.join(' '));
    this.element.appendChild(this.polyline);
    this.emit('point', this.points[0]);
};

Pencil.prototype._onmouseup = function (ev) {
    if (!this.enabled) return;
    this.emit('points', this.points);
    this.points = [];
    this.polyline = null;
};

Pencil.prototype._onmousemove = function (ev) {
    if (!this.enabled) return;
    if (!this.polyline) return;
    
    var pt = [ ev.offsetX, ev.offsetY ];
    this.points.push(pt);
    this.polyline.setAttribute('points', this.points.join(' '));
    this.emit('point', pt);
};

Pencil.prototype._onmouseout = function (ev) {
    if (!this.enabled) return;
    if (!this.polyline) return;
};

Pencil.prototype.appendTo = function (target) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    target.appendChild(this.element);
};

function createElement (name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
