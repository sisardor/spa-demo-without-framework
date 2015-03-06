
// my custom implementation of some function of JQuery
window.dome = (function () {
    function Dome (els) {
      	for(var i = 0; i < els.length; i++ ) {
            this[i] = els[i];
        }
        this.length = els.length;       
    }
    Dome.prototype.forEach = function (callback) {
        this.map(callback);
        return this; 
    };
    Dome.prototype.map = function (callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results; //.length > 1 ? results : results[0];
    };
    
    Dome.prototype.mapOne = function (callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };
    Dome.prototype.find = function(tagName){
        return this[0].getElementsByTagName(tagName);
    };
    Dome.prototype.append = function (els) {
        this[0].innerHTML = els
        return;
        return this.forEach(function (parEl, i) {
            els.forEach(function (childEl) {
                parEl.appendChild( (i > 0) ? childEl.cloneNode(true) : childEl);
            });
        });
    };

    Dome.prototype.addClass = function (classes) {
        var className = "";
        if (typeof classes !== 'string') {
            for (var i = 0; i < classes.length; i++) {
               className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function (el) {
            el.className += className;
        });
    };

    Dome.prototype.removeClass = function (clazz) {
        return this.forEach(function (el) {
            var cs = el.className.split(' '), i;

            while ( (i = cs.indexOf(clazz)) > -1) { 
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(' ');
        });
    };

	Dome.prototype.html = function (html) {
        if (typeof html !== "undefined") {
            return this.forEach(function (el) {
                el.innerHTML = html;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerHTML;
            });
        }
    };
     
    var dome = {
        get: function (selector) {
			var els;
			if (typeof selector === "string") {
				els = document.querySelectorAll(selector);
			} else if (selector.length) {
				els = selector;
			} else {
				els = [selector];
			}
			return new Dome(els);
        }   
    };
     
    return dome;
}());

