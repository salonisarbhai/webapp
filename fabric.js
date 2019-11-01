var canvas = new fabric.Canvas("my-canvas", {
  backgroundColor: '#fff',
  width: 400,
  height: 400
});
fabric.Rectangle = fabric.util.createClass(fabric.Rect, {
  type: 'rectangle',
  _render: function(ctx) {
    var w = this.width,
      h = this.height,
      x = -this.width / 2,
      y = -this.height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y);
    ctx.closePath();
    this._renderPaintInOrder(ctx);
  }
});
fabric.Rectangle.fromObject = function(object, callback) {
  return fabric.Object._fromObject('Rectangle', object, callback);
};
var rect, isDown, origX, origY;

function onMouseDown(o) {
  isDown = true;
  var pointer = canvas.getPointer(o.e);
  origX = pointer.x;
  origY = pointer.y;
  var pointer = canvas.getPointer(o.e);
  rect = new fabric.RectangleTriangle({
    left: origX,
    top: origY,
    width: pointer.x - origX,
    height: pointer.y - origY,
    fill: 'blue',
    selectable:false
  });
  canvas.add(rect);
};

function onMouseMove(o) {
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);

  if (origX > pointer.x) {
    rect.set({
      left: Math.abs(pointer.x)
    });
  }
  if (origY > pointer.y) {
    rect.set({
      top: Math.abs(pointer.y)
    });
  }

  rect.set({
    width: Math.abs(origX - pointer.x)
  });
  rect.set({
    height: Math.abs(origY - pointer.y)
  });
  canvas.renderAll();
};

function onMouseUp(o) {
  isDown = false;
  rect.setCoords();
};

function select() {
  canvas.off('mouse:up', onMouseUp);
  canvas.off('mouse:move', onMouseMove);
  canvas.off('mouse:down', onMouseDown);
  canvas.selection = true;
  objectSelectable(true);
}

function draw() {
  canvas.on('mouse:up', onMouseUp);
  canvas.on('mouse:move', onMouseMove);
  canvas.on('mouse:down', onMouseDown);
  canvas.selection = false;
  objectSelectable(false);
}

function objectSelectable(value) {
  canvas.forEachObject(function(obj) {
    obj.selectable = value;
  })
}
draw();
