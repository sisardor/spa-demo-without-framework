(function () {
    'use strict';
    // My custom implementation of some function of JQuery
    window.dome = (function () {
        function MyCutomeDOM (els) {
          	for(var i = 0; i < els.length; i++ ) {
                this[i] = els[i];
            }
            this.length = els.length;       
        }
        MyCutomeDOM.prototype.forEach = function (callback) {
            this.map(callback);
            return this; 
        };
        MyCutomeDOM.prototype.map = function (callback) {
            var results = [];
            for (var i = 0; i < this.length; i++) {
                results.push(callback.call(this, this[i], i));
            }
            return results; //.length > 1 ? results : results[0];
        };
        
        MyCutomeDOM.prototype.mapOne = function (callback) {
            var m = this.map(callback);
            return m.length > 1 ? m : m[0];
        };
        MyCutomeDOM.prototype.find = function(tagName){
            return this[0].getElementsByTagName(tagName);
        };
        MyCutomeDOM.prototype.attr = function (attr, val) {
            if (typeof val !== 'undefined') {
                return this.forEach(function(el) {
                    el.setAttribute(attr, val);
                });
            } else {
                return this.mapOne(function (el) {
                    return el.getAttribute(attr);
                });
            }
        };
        MyCutomeDOM.prototype.append = function (els) {
            this[0].innerHTML = els;
            return;
        };

        MyCutomeDOM.prototype.addClass = function (classes) {
            var className = '';
            if (typeof classes !== 'string') {
                for (var i = 0; i < classes.length; i++) {
                   className += ' ' + classes[i];
                }
            } else {
                className = ' ' + classes;
            }
            return this.forEach(function (el) {
                el.className += className;
            });
        };

        MyCutomeDOM.prototype.removeClass = function (clazz) {
            return this.forEach(function (el) {
                var cs = el.className.split(' '), i;

                while ( (i = cs.indexOf(clazz)) > -1) { 
                    cs = cs.slice(0, i).concat(cs.slice(++i));
                }
                el.className = cs.join(' ');
            });
        };

    	MyCutomeDOM.prototype.html = function (html) {
            if (typeof html !== 'undefined') {
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
    			if (typeof selector === 'string') {
    				els = document.querySelectorAll(selector);
    			} else if (selector.length) {
    				els = selector;
    			} else {
    				els = [selector];
    			}
    			return new MyCutomeDOM(els);
            }   
        };
         
        return dome;
    }());

}());