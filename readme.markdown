# svg-pencil

pencil tool for drawing on scalable vector graphics

# example

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
* `opts.fill` - the fill color to use, default: `'transparent'`
* `opts.stroke` - the stroke color to use, default: `'black'`
* `opts.strokeWidth` - the stroke width, default: `'1px'`

If `opts` is a string, treat it as the `opts.svg` value.

At any time you can modify the `p.stroke`, `p.fill`, and `p.strokeWidth`
properties, which will affect all new polyline elements.

## p.appendTo(target)

Append the svg element root to `target`, a dom element or query selector string.

# events

## p.on('point', function (pt) {})

Every time a new point is added to the polyline, this event fires with the
`[x,y]` array `pt`.

## p.on('polyline', function (elem) {})

When a new polyline is created, this event fires with the element reference
`elem`.

## p.on('points', function (points) {})

When the mouseup event happens and a polyline is no longer being created, this
event fires with the array of `points`.

# install

With [npm](https://npmjs.org) do:

```
npm install svg-pencil
```

# license

MIT
