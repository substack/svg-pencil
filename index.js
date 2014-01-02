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
    svg.addEventListener('mousedown', this.listeners.mousedown);
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
    this.polyline = createElement('polyline');
    this.polyline.setAttribute('fill', this.fill);
    this.polyline.setAttribute('stroke', this.stroke);
    this.polyline.setAttribute('stroke-width', this.strokeWidth);
    
    this.emit('point', this.points[0]);
    
    this.polyline.setAttribute('points', this.points.join(' '));
    this.emit('polyline', this.polyline);
    
    this.element.appendChild(this.polyline);
};

Pencil.prototype._onmouseup = function (ev) {
    if (!this.enabled) return;
    if (!this.polyline) return;
    this.emit('points', this.points);
    this.points = [];
    this.polyline = null;
};

Pencil.prototype._onmousemove = function (ev) {
    if (!this.enabled) return;
    if (!this.polyline) return;
    
    var pt = [ ev.offsetX, ev.offsetY ];
    this.emit('point', pt);
    this.points.push(pt);
    this.polyline.setAttribute('points', this.points.join(' '));
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
