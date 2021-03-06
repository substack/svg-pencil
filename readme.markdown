# svg-pencil

pencil tool for drawing on scalable vector graphics

# example

[run this demo](http://scratch.substack.net/svg-pencil/)

main.js:

``` js
var pencil = require('svg-pencil');
var p = pencil();
p.appendTo('#viewport');
```

index.html:

``` html
<html>
  <head>
    <style>
      #viewport {
        border: 2px solid purple;
        width: 700px;
        height: 600px;
        user-select: none;
      }
    </style>
  </head>
  <body>
    <div>draw pretty pix</div>
    <div id="viewport"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

then compile with [browserify](http://browserify.org):

```
browserify main.js > bundle.js
```

and open index.html:

![pencil graphics whoa](example/example.png)

# methods

``` js
var pencil = require('svg-pencil')
```

## var p = pencil(opts={})

Create a new pencil instance `p` from `opts`:

* `opts.svg` - use an existing svg element instead of creating one
* `opts.fill` - the fill color to use, default: `'none'`
* `opts.stroke` - the stroke color to use, default: `'black'`
* `opts.strokeWidth` - the stroke width, default: `'1px'`

If `opts` is a string, treat it as the `opts.svg` value.

At any time you can modify the `p.stroke`, `p.fill`, and `p.strokeWidth`
properties, which will affect all new `<path>` elements.

## p.appendTo(target)

Append the svg element root to `target`, a dom element or query selector string.

## p.hide()

Hide the svg.

## p.show()

Show the svg.

## p.enable()

Enable event handling.

## p.disable()

Disable event handling.

## var svgSource = p.toSource()

Return an `svgSource` string with the file contents.

## var p = pencil.parse(svgSource)

Return a new pencil instance `p` from some existing svg source `svgSource`.

# events

## p.on('point', function (pt) {})

Every time a new point is added to the `<path>`, this event fires with the
`[x,y]` array `pt`.

## p.on('path', function (elem) {})

When a new `<path>` is created, this event fires with the element reference
`elem`.

## p.on('points', function (points) {})

When the mouseup event happens and a `<path>` is no longer being created, this
event fires with the array of `points`.

## p.on('enable', function () {})

Emitted when the pencil is enabled.

## p.on('disable', function () {})

Emitted when the pencil is disabled.

# install

With [npm](https://npmjs.org) do:

```
npm install svg-pencil
```

# license

MIT
