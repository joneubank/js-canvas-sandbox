var Color = 
{
    "random" : function() 
    {
        return "#"+("000000" + ((1<<24)*Math.random()|0).toString(16)).substr(-6);
    },

    /*
    * Invert takes an input of the form '#xxx' or '#xxxxxx' where x is a hex digit
    * Returns the inverted color from the value entered in the same format, 
    *   or '#fff' if the input format was wrong or an error occurs
    */
    "invert" : function(color) {
        var output = "#fff";

        if(color.length == 7) {
            var temp = color.substr(-6);
            var r = parseInt(temp.substr(0,2), 16);
            var g = parseInt(temp.substr(2,2), 16);
            var b = parseInt(temp.substr(4,2), 16);

            var invR = 255-r;
            var invG = 255-g;
            var invB = 255-b;

            output = "#" + ("00"+invR.toString(16)).substr(-2) + ("00"+invG.toString(16)).substr(-2) + ("00"+invB.toString(16)).substr(-2);
        } else if (color.length == 4) {
            var temp = color.substr(-3);
            var r = parseInt(temp.substr(0,1), 16);
            var g = parseInt(temp.substr(1,1), 16);
            var b = parseInt(temp.substr(2,1), 16);

            var invR = 15-r;
            var invG = 15-g;
            var invB = 15-b;

            output = "#" + invR.toString(16) + invG.toString(16) + invB.toString(16);
        }

        return output;
    }
}