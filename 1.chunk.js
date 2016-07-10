webpackJsonp([1],{

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(803));
	

/***/ },

/***/ 803:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	/*
	 * We're loading this component asynchronously
	 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
	 * see https://github.com/gdi2290/es6-promise-loader for more info
	 */
	console.log('`About` component loaded asynchronously');
	var About = (function () {
	    function About() {
	        this.emailMailto = "mailto:benjamin.berntson@gmail.com";
	    }
	    About.prototype.ngOnInit = function () {
	        console.log('hello `About` component');
	        // static data that is bundled
	        // var mockData = require('assets/mock-data/mock-data.json');
	        // console.log('mockData', mockData);
	        // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
	        // this.asyncDataWithWebpack();
	    };
	    About.prototype.asyncDataWithWebpack = function () {
	        // you can also async load mock data with 'es6-promise-loader'
	        // you would do this if you don't want the mock-data bundled
	        // remember that 'es6-promise-loader' is a promise
	        // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
	        // setTimeout(() => {
	        //
	        //   let asyncDataPromise = asyncMockDataPromiseFactory();
	        //   asyncDataPromise.then(json => {
	        //     console.log('async mockData', json);
	        //   });
	        //
	        // });
	    };
	    About = __decorate([
	        core_1.Component({
	            selector: 'about',
	            styles: ["\nh1 {\nfont-family: Arial, Helvetica, sans-serif\n}\nmd-card{\nmargin: 25px;\n}\na:link{\ncolor: black;\ntext-decoration: none;\n}\na:visited {\ncolor: purple;\n}\na:hover{\ncursor: pointer;\n}\n.email{\ndisplay: inline-block;\nfont-size: 22px;\n}\n"],
	            template: "\n<md-card>\n<h4>Summary:</h4>\n<br>\nThis is a simple 'chat bot' application I've created.\nThe application runs entirely client side. I'm planning on putting\nthe application logic in a service titled chat-bot.service.ts\n</md-card>\n<md-card>\n<p>\nMade with <i class=\"material-icons\">favorite</i> by Ben Berntson\n</p>\n<a [href]=\"emailMailto\">\n<span class=\"email\">\nBenjamin.Berntson@gmail.com\n</span>&nbsp;\n<i class=\"material-icons\">email</i>\n</a>\n</md-card>\n",
	            host: { 'class': 'ng-animate ' }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], About);
	    return About;
	}());
	exports.About = About;
	

/***/ }

});
//# sourceMappingURL=1.map