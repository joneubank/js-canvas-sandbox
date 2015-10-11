var Color = (function() {

    var randColor = function () {
        return "#"+("000000" + ((1<<24)*Math.random()|0).toString(16)).substr(-6);
    }

    return {
        "random"        : randColor
    }
})();