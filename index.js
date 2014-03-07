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
    this.path = null;
    this.points = [];
    
    this.fill = opts.fill || 'none';
    this.stroke = opts.stroke || 'black';
    this.strokeWidth = opts.strokeWidth || '1px';
    
    var self = this;
    this.root = opts.root || window;
    this.listeners = {
        mousedown: function (ev) { self._onmousedown(ev) },
        mouseup: function (ev) { self._onmouseup(ev) },
        mousemove: function (ev) { self._onmousemove(ev) }
    };
    this.element.addEventListener('mousedown', this.listeners.mousedown);
    this.root.addEventListener('mouseup', this.listeners.mouseup);
    this.root.addEventListener('mousemove', this.listeners.mousemove);
}

Pencil.prototype.unregister = function () {
    this.element.removeEventListener('mousedown', this.listeners.mousedown);
    this.root.removeEventListener('mouseup', this.listeners.mouseup);
    this.root.removeEventListener('mousemove', this.listeners.mousemove);
};

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
    this.path = createElement('path');
    this.path.setAttribute('style', [
        'fill:' + this.fill,
        'stroke:' + this.stroke,
        'stroke-width:' + this.strokeWidth
    ].join(';'));
    
    this.emit('point', this.points[0]);
    
    this._setPoints();
    this.emit('path', this.path);
    
    this.element.appendChild(this.path);
};

Pencil.prototype._onmouseup = function (ev) {
    if (!this.enabled) return;
    if (!this.path) return;
    this.emit('points', this.points);
    this.points = [];
    this.path = null;
};

Pencil.prototype._onmousemove = function (ev) {
    if (!this.enabled) return;
    if (!this.path) return;
    
    var pt = [ ev.offsetX, ev.offsetY ];
    this.emit('point', pt);
    this.points.push(pt);
    this._setPoints();
};

Pencil.prototype._setPoints = function () {
    this.path.setAttribute('d', 'M ' + this.points.join(' L '));
};

Pencil.prototype.toSource = function () {
    var div = document.createElement('div');
    div.appendChild(this.element.cloneNode(true));
    return div.innerHTML;
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

Pencil.parse = function (src) {
    var div = document.createElement('div');
    div.innerHTML = src;
    return new Pencil({ svg: div.querySelector('svg') });
};
