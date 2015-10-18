var Data = function(canvas) {
    var data = {};

    canvas.data = data;
    canvas.data = {};
    canvas.data.circle = circle = Shapes.circle(50, canvas._elem.width/2-25, canvas._elem.height/2-25, Color.random());

    return canvas;
}