describe("dome", function () {
    describe("get", function () {
        it("can get elements by id", function () {
            var el = document.getElementById('one');
            expect(dome.get("#one")[0]).toEqual(el);
        });
        it("can get elements by class", function () {
            expect(dome.get(".two").length).toEqual(3);
        });

        it("can get elements by tag name", function () {
            expect(dome.get("b").length).toEqual(4);
        })
        it("creates a dome object from a single node", function () {
            var one = document.getElementById('one');
            expect(dome.get(one)[0]).toBe(one);
        });
        it("creates a dome object from a NodeList", function () {
            var two = $(".two").get();
            expect(dome.get(two)[0]).toBe(two[0]);
        });
    });

    
    describe("html", function () {
        beforeEach(function () {
            this.d = dome.get(".two");
        });
        afterEach(function () {
            this.d.html("");
        });
        it("can set the html content of an element", function () {
            this.d.html("<strong>Test!</strong>");
            expect(this.d[0].innerHTML.toLowerCase()).toEqual("<strong>test!</strong>");
        });
        it("can get the html content of an element", function () {
            this.d.html("<strong>Test!</strong>");
            expect(this.d.html()[0].toLowerCase()).toEqual("<strong>test!</strong>");
        });
    });


    // describe("addClass", function () {
    //     beforeEach(function () {
    //         this.d = dome.get(".two");
    //     });
    //     afterEach(function () {
    //         this.d.forEach(function (el) {
    //             el.className = "two";
    //         });
    //     });
    //     it("can add a single class to elements", function () {
    //         this.d.addClass('single');
    //         expect(this.d[0].className.indexOf('single')).toBeGreaterThan(-1);
    //     });
    //     it("can add multiple classes (via array) to elements", function () {
    //         this.d.addClass(["multiple", "classes"]);
    //         var cn = this.d[0].className;
    //         expect(cn.indexOf("multiple")).toBeLessThan(cn.indexOf("classes"));
    //     });
    // });
    // describe("removeClass", function () {
    //     beforeEach(function () {
    //         this.d = dome.get(".two");
    //         this.d.addClass("classes");
    //     });
    //     afterEach(function () {
    //         this.d.forEach(function (el) {
    //             el.className = "two";
    //         });
    //     });
    //     it("can remove a class from elements", function () {
    //         this.d.removeClass("classes");
    //         expect(this.d[0].className.indexOf('classes')).toBe(-1);
    //     });
    //     it("removes all instances of that class from elements", function () {
    //         this.d.addClass("test classes");
    //         this.d.removeClass("classes");
    //         expect(this.d[0].className.indexOf('classes')).toBe(-1);
    //     });
    // });


    
});

describe("BBProducts", function () {
    describe("unit", function () {
        it("show append dome to document", function () {
            var isElementExists = document.getElementById('bb-card');
            if(isElementExists) {
                BBProducts.init('#bb-card');
                BBProducts.renderUI({ products: [{name:"Jasmine Test"}] });
                expect($('.bb-items-list')).not.toBe(null);
                expect($('.bb-items-list').length).toBe(1);
            }
        });

        it("show append dome to document and be eaual to {sku: 777}", function () {
            var isElementExists = document.getElementById('bb-card');
            if(isElementExists) {
                BBProducts.init('#bb-card');
                BBProducts.renderUI({ products: [{name:"Jasmine Test", sku:777}] });
                expect($('.bb-items-list li').data()).toEqual({sku: 777});
            }
        });

        it("show update window.location.hash to /?sku=777 on click", function () {
            var isElementExists = document.getElementById('bb-card');
            window.location.hash='';
            if(isElementExists) {
                BBProducts.init('#bb-card');
                BBProducts.renderUI({ products: [{name:"Jasmine Test", sku:777}] });
                $('.bb-items-list li').click();
                var hash = window.location.hash.slice(1);
                expect(hash).toBe("/?sku=777");
            }
        });
    });
});