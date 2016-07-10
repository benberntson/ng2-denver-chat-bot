webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Providers provided by Angular
	 */
	var platform_browser_dynamic_1 = __webpack_require__(357);
	/*
	 * Platform and Environment
	 * our providers/directives/pipes
	 */
	var browser_1 = __webpack_require__(581);
	var environment_1 = __webpack_require__(582);
	/*
	 * App Component
	 * our top level component that holds all of our components
	 */
	var app_1 = __webpack_require__(578);
	var app_routes_1 = __webpack_require__(251);
	var convo_service_1 = __webpack_require__(390);
	function main(initialHmrState) {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PLATFORM_PROVIDERS.concat(environment_1.ENV_PROVIDERS, [
	        app_routes_1.APP_ROUTE_PROVIDERS,
	        convo_service_1.ConvoService
	    ]))
	        .then(environment_1.decorateComponentRef)
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	if (false) {
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}
	

/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(65);
	var home_component_ts_1 = __webpack_require__(573);
	var no_content_1 = __webpack_require__(579);
	var bot_component_1 = __webpack_require__(570);
	var convo_component_1 = __webpack_require__(571);
	exports.routes = [
	    {
	        path: '',
	        component: home_component_ts_1.Home
	    },
	    {
	        path: 'home',
	        component: home_component_ts_1.Home
	    },
	    {
	        path: 'bot',
	        component: bot_component_1.Bot
	    },
	    {
	        path: 'bot/conversation',
	        component: convo_component_1.Convo
	    },
	    {
	        path: 'about',
	        component: 'About'
	    },
	    {
	        path: '**',
	        component: no_content_1.NoContent
	    }
	];
	exports.APP_ROUTE_PROVIDERS = [router_1.provideRouter(exports.routes)];
	exports.asyncRoutes = {
	    'About': __webpack_require__(583),
	};
	exports.prefetchRouteCallbacks = [
	    exports.asyncRoutes['About'],
	    exports.asyncRoutes['Detail'],
	];
	

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(154);
	var error_1 = __webpack_require__(103);
	var Observable_1 = __webpack_require__(5);
	__webpack_require__(591);
	__webpack_require__(594);
	__webpack_require__(121);
	__webpack_require__(599);
	__webpack_require__(597);
	__webpack_require__(604);
	__webpack_require__(600);
	__webpack_require__(595);
	/** Exception thrown when attempting to load an icon with a name that cannot be found. */
	var MdIconNameNotFoundError = (function (_super) {
	    __extends(MdIconNameNotFoundError, _super);
	    function MdIconNameNotFoundError(iconName) {
	        _super.call(this, "Unable to find icon with the name \"" + iconName + "\"");
	    }
	    return MdIconNameNotFoundError;
	}(error_1.MdError));
	exports.MdIconNameNotFoundError = MdIconNameNotFoundError;
	/**
	 * Exception thrown when attempting to load SVG content that does not contain the expected
	 * <svg> tag.
	 */
	var MdIconSvgTagNotFoundError = (function (_super) {
	    __extends(MdIconSvgTagNotFoundError, _super);
	    function MdIconSvgTagNotFoundError() {
	        _super.call(this, '<svg> tag not found');
	    }
	    return MdIconSvgTagNotFoundError;
	}(error_1.MdError));
	exports.MdIconSvgTagNotFoundError = MdIconSvgTagNotFoundError;
	/**
	  * Configuration for an icon, including the URL and possibly the cached SVG element.
	  * @internal
	  */
	var SvgIconConfig = (function () {
	    function SvgIconConfig(url) {
	        this.url = url;
	        this.svgElement = null;
	    }
	    return SvgIconConfig;
	}());
	/** Returns the cache key to use for an icon namespace and name. */
	var iconKey = function (namespace, name) { return namespace + ':' + name; };
	/**
	 * Service to register and display icons used by the <md-icon> component.
	 * - Registers icon URLs by namespace and name.
	 * - Registers icon set URLs by namespace.
	 * - Registers aliases for CSS classes, for use with icon fonts.
	 * - Loads icons from URLs and extracts individual icons from icon sets.
	 */
	var MdIconRegistry = (function () {
	    function MdIconRegistry(_http) {
	        this._http = _http;
	        /**
	         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
	         */
	        this._svgIconConfigs = new Map();
	        /**
	         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
	         * Multiple icon sets can be registered under the same namespace.
	         */
	        this._iconSetConfigs = new Map();
	        /** Cache for icons loaded by direct URLs. */
	        this._cachedIconsByUrl = new Map();
	        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
	        this._inProgressUrlFetches = new Map();
	        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
	        this._fontCssClassesByAlias = new Map();
	        /**
	         * The CSS class to apply when an <md-icon> component has no icon name, url, or font specified.
	         * The default 'material-icons' value assumes that the material icon font has been loaded as
	         * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
	         */
	        this._defaultFontSetClass = 'material-icons';
	    }
	    /** Registers an icon by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIcon = function (iconName, url) {
	        return this.addSvgIconInNamespace('', iconName, url);
	    };
	    /** Registers an icon by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconInNamespace = function (namespace, iconName, url) {
	        var key = iconKey(namespace, iconName);
	        this._svgIconConfigs.set(key, new SvgIconConfig(url));
	        return this;
	    };
	    /** Registers an icon set by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIconSet = function (url) {
	        return this.addSvgIconSetInNamespace('', url);
	    };
	    /** Registers an icon set by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconSetInNamespace = function (namespace, url) {
	        var config = new SvgIconConfig(url);
	        if (this._iconSetConfigs.has(namespace)) {
	            this._iconSetConfigs.get(namespace).push(config);
	        }
	        else {
	            this._iconSetConfigs.set(namespace, [config]);
	        }
	        return this;
	    };
	    /**
	     * Defines an alias for a CSS class name to be used for icon fonts. Creating an mdIcon
	     * component with the alias as the fontSet input will cause the class name to be applied
	     * to the <md-icon> element.
	     */
	    MdIconRegistry.prototype.registerFontClassAlias = function (alias, className) {
	        if (className === void 0) { className = alias; }
	        this._fontCssClassesByAlias.set(alias, className);
	        return this;
	    };
	    /**
	     * Returns the CSS class name associated with the alias by a previous call to
	     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
	     */
	    MdIconRegistry.prototype.classNameForFontAlias = function (alias) {
	        return this._fontCssClassesByAlias.get(alias) || alias;
	    };
	    /**
	     * Sets the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.setDefaultFontSetClass = function (className) {
	        this._defaultFontSetClass = className;
	        return this;
	    };
	    /**
	     * Returns the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.getDefaultFontSetClass = function () {
	        return this._defaultFontSetClass;
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL.
	     * The response from the URL may be cached so this will not always cause an HTTP request, but
	     * the produced element will always be a new copy of the originally fetched icon. (That is,
	     * it will not contain any modifications made to elements previously returned).
	     */
	    MdIconRegistry.prototype.getSvgIconFromUrl = function (url) {
	        var _this = this;
	        if (this._cachedIconsByUrl.has(url)) {
	            return Observable_1.Observable.of(cloneSvg(this._cachedIconsByUrl.get(url)));
	        }
	        return this._loadSvgIconFromConfig(new SvgIconConfig(url))
	            .do(function (svg) { return _this._cachedIconsByUrl.set(url, svg); })
	            .map(function (svg) { return cloneSvg(svg); });
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) with the given name
	     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
	     * if not, the Observable will throw an MdIconNameNotFoundError.
	     */
	    MdIconRegistry.prototype.getNamedSvgIcon = function (name, namespace) {
	        if (namespace === void 0) { namespace = ''; }
	        // Return (copy of) cached icon if possible.
	        var key = iconKey(namespace, name);
	        if (this._svgIconConfigs.has(key)) {
	            return this._getSvgFromConfig(this._svgIconConfigs.get(key));
	        }
	        // See if we have any icon sets registered for the namespace.
	        var iconSetConfigs = this._iconSetConfigs.get(namespace);
	        if (iconSetConfigs) {
	            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
	        }
	        return Observable_1.Observable.throw(new MdIconNameNotFoundError(key));
	    };
	    /**
	     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
	     */
	    MdIconRegistry.prototype._getSvgFromConfig = function (config) {
	        if (config.svgElement) {
	            // We already have the SVG element for this icon, return a copy.
	            return Observable_1.Observable.of(cloneSvg(config.svgElement));
	        }
	        else {
	            // Fetch the icon from the config's URL, cache it, and return a copy.
	            return this._loadSvgIconFromConfig(config)
	                .do(function (svg) { return config.svgElement = svg; })
	                .map(function (svg) { return cloneSvg(svg); });
	        }
	    };
	    /**
	     * Attempts to find an icon with the specified name in any of the SVG icon sets.
	     * First searches the available cached icons for a nested element with a matching name, and
	     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
	     * that have not been cached, and searches again after all fetches are completed.
	     * The returned Observable produces the SVG element if possible, and throws
	     * MdIconNameNotFoundError if no icon with the specified name can be found.
	     */
	    MdIconRegistry.prototype._getSvgFromIconSetConfigs = function (name, iconSetConfigs) {
	        var _this = this;
	        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
	        // requested name.
	        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	        if (namedIcon) {
	            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
	            // time anyway, there's probably not much advantage compared to just always extracting
	            // it from the icon set.
	            return Observable_1.Observable.of(namedIcon);
	        }
	        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
	        // fetched, fetch them now and look for iconName in the results.
	        var iconSetFetchRequests = iconSetConfigs
	            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
	            .map(function (iconSetConfig) {
	            return _this._loadSvgIconSetFromConfig(iconSetConfig)
	                .catch(function (err, caught) {
	                // Swallow errors fetching individual URLs so the combined Observable won't
	                // necessarily fail.
	                console.log("Loading icon set URL: " + iconSetConfig.url + " failed: " + err);
	                return Observable_1.Observable.of(null);
	            })
	                .do(function (svg) {
	                // Cache SVG element.
	                if (svg) {
	                    iconSetConfig.svgElement = svg;
	                }
	            });
	        });
	        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
	        // cached SVG element (unless the request failed), and we can check again for the icon.
	        return Observable_1.Observable.forkJoin(iconSetFetchRequests)
	            .map(function (ignoredResults) {
	            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	            if (!foundIcon) {
	                throw new MdIconNameNotFoundError(name);
	            }
	            return foundIcon;
	        });
	    };
	    /**
	     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractIconWithNameFromAnySet = function (iconName, iconSetConfigs) {
	        // Iterate backwards, so icon sets added later have precedence.
	        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
	            var config = iconSetConfigs[i];
	            if (config.svgElement) {
	                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName, config);
	                if (foundIcon) {
	                    return foundIcon;
	                }
	            }
	        }
	        return null;
	    };
	    /**
	     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconFromConfig = function (config) {
	        var _this = this;
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText, config); });
	    };
	    /**
	     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconSetFromConfig = function (config) {
	        var _this = this;
	        // TODO: Document that icons should only be loaded from trusted sources.
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._svgElementFromString(svgText); });
	    };
	    /**
	     * Creates a DOM element from the given SVG string, and adds default attributes.
	     */
	    MdIconRegistry.prototype._createSvgElementForSingleIcon = function (responseText, config) {
	        var svg = this._svgElementFromString(responseText);
	        this._setSvgAttributes(svg, config);
	        return svg;
	    };
	    /**
	     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractSvgIconFromSet = function (iconSet, iconName, config) {
	        var iconNode = iconSet.querySelector('#' + iconName);
	        if (!iconNode) {
	            return null;
	        }
	        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
	        // the content of a new <svg> node.
	        if (iconNode.tagName.toLowerCase() == 'svg') {
	            return this._setSvgAttributes(iconNode.cloneNode(true), config);
	        }
	        // createElement('SVG') doesn't work as expected; the DOM ends up with
	        // the correct nodes, but the SVG content doesn't render. Instead we
	        // have to create an empty SVG node using innerHTML and append its content.
	        // Elements created using DOMParser.parseFromString have the same problem.
	        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
	        var svg = this._svgElementFromString('<svg></svg>');
	        // Clone the node so we don't remove it from the parent icon set element.
	        svg.appendChild(iconNode.cloneNode(true));
	        return this._setSvgAttributes(svg, config);
	    };
	    /**
	     * Creates a DOM element from the given SVG string.
	     */
	    MdIconRegistry.prototype._svgElementFromString = function (str) {
	        // TODO: Is there a better way than innerHTML? Renderer doesn't appear to have a method for
	        // creating an element from an HTML string.
	        var div = document.createElement('DIV');
	        div.innerHTML = str;
	        var svg = div.querySelector('svg');
	        if (!svg) {
	            throw new MdIconSvgTagNotFoundError();
	        }
	        return svg;
	    };
	    /**
	     * Sets the default attributes for an SVG element to be used as an icon.
	     */
	    MdIconRegistry.prototype._setSvgAttributes = function (svg, config) {
	        if (!svg.getAttribute('xmlns')) {
	            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	        }
	        svg.setAttribute('fit', '');
	        svg.setAttribute('height', '100%');
	        svg.setAttribute('width', '100%');
	        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
	        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
	        return svg;
	    };
	    /**
	     * Returns an Observable which produces the string contents of the given URL. Results may be
	     * cached, so future calls with the same URL may not cause another HTTP request.
	     */
	    MdIconRegistry.prototype._fetchUrl = function (url) {
	        var _this = this;
	        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
	        // already a request in progress for that URL. It's necessary to call share() on the
	        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
	        if (this._inProgressUrlFetches.has(url)) {
	            return this._inProgressUrlFetches.get(url);
	        }
	        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
	        // Observable. Figure out why and fix it.
	        var req = this._http.get(url)
	            .map(function (response) { return response.text(); })
	            .finally(function () {
	            _this._inProgressUrlFetches.delete(url);
	        })
	            .share();
	        this._inProgressUrlFetches.set(url, req);
	        return req;
	    };
	    MdIconRegistry = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], MdIconRegistry);
	    return MdIconRegistry;
	}());
	exports.MdIconRegistry = MdIconRegistry;
	/** Clones an SVGElement while preserving type information. */
	function cloneSvg(svg) {
	    return svg.cloneNode(true);
	}
	//# sourceMappingURL=icon-registry.js.map

/***/ },

/***/ 390:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var mini_convo_1 = __webpack_require__(572);
	var ConvoService = (function () {
	    function ConvoService() {
	        this.initResponseMap();
	    }
	    /**
	     * createConvo
	     *
	     * ncreates a mini conversation
	     */
	    ConvoService.prototype.createConvo = function (question) {
	        return new mini_convo_1.MiniConvo(this.getAnswerFor(question), question);
	    };
	    /**
	     * getAnswerFor
	     *
	     * gets an answer for the question.
	     *
	     */
	    ConvoService.prototype.getAnswerFor = function (question) {
	        var cleanedWords = question.split(' ')
	            .map(function (text) { return text.replace(/\W/, ''); })
	            .map(function (text) { return text.trim(); })
	            .map(function (text) { return text.toLowerCase(); })
	            .filter(function (word) { return word.length > 2 || word == 'hi'; })
	            .filter(function (word) { return !(word === 'the' || word === 'for' || word === 'our'); });
	        var wordBlocks = [];
	        //filters for duplicates
	        cleanedWords.forEach(function (word) {
	            if (wordBlocks.indexOf(word) === -1)
	                wordBlocks.push(word);
	        });
	        var haveAnswer = false;
	        var builtQuestion;
	        for (var attemptSize = wordBlocks.length; attemptSize > 0 && !haveAnswer; --attemptSize) {
	            for (var i = 0; i + attemptSize <= wordBlocks.length && !haveAnswer; ++i) {
	                builtQuestion = "";
	                for (var j = 0; j < attemptSize && !haveAnswer; ++j) {
	                    builtQuestion += " " + wordBlocks[j + i];
	                }
	                builtQuestion = builtQuestion.trim();
	                haveAnswer = !(!this._responseMap.get(builtQuestion));
	            }
	        }
	        if (haveAnswer) {
	            return this._responseMap.get(builtQuestion);
	        }
	        else {
	            return "I don't understand...";
	        }
	    };
	    /**
	     * getResponseMap
	     *
	     * gets a map of quesions to answers
	     *
	     * @return Map<string,string>
	     */
	    ConvoService.prototype.initResponseMap = function () {
	        this._responseMap = new Map();
	        this._responseMap.set('hi', 'Hello there!');
	        this._responseMap.set('hello', 'Hello there!');
	        this._responseMap.set('yes', 'Yes?');
	        this._responseMap.set('sir', 'Sir?');
	        this._responseMap.set('mam', 'That\'s more like it.');
	        this._responseMap.set('maam', 'That\'s more like it.');
	        this._responseMap.set('president usa', 'Barack H. Obama');
	        this._responseMap.set('bro', 'Yo, wassup, bro!');
	        this._responseMap.set('denver mayor', 'Michael Hancock');
	        this._responseMap.set('mayor', 'Michael Hancock');
	        this._responseMap.set('nyc mayor', 'Bill de Blasio');
	        this._responseMap.set('fomer nyc mayor', 'Michael Bloomberg');
	        this._responseMap.set('fomer nyc mayor', 'Michael Bloomberg');
	        this._responseMap.set('fomer denver mayor', 'Guillermo Vidal');
	        this._responseMap.set('ethnicities', 'for 2010: white: 68.9%, non-hispanic white: 52.2%, black: 10.2%, asian: 3.14%, hispanic: 31.8%');
	        this._responseMap.set('most populous city', 'Denver');
	        this._responseMap.set('most populous city colorado', 'Denver');
	        this._responseMap.set('denver founded', 'November 17, 1858');
	        this._responseMap.set('year denver founded', '1858');
	        this._responseMap.set('year founded', '1858');
	        this._responseMap.set('month founded', 'November');
	        this._responseMap.set('denver neighborhoods', 'Central, East, North, or West?');
	        this._responseMap.set('neighborhood', 'Central, East, North, or West?');
	        this._responseMap.set('neighborhoods', 'Central, East, North, or West?');
	        this._responseMap.set('media household income', '$45,438');
	        this._responseMap.set('media income', '$45,438');
	        this._responseMap.set('household income', '$45,438');
	        this._responseMap.set('home income', '$45,438');
	        this._responseMap.set('language', 'English');
	        this._responseMap.set('tallest building', 'Republic Plaza');
	        this._responseMap.set('tallest skyscraper', 'Republic Plaza');
	        this._responseMap.set('tallest highrise', 'Republic Plaza');
	        this._responseMap.set('tallest highrise', 'Republic Plaza');
	        this._responseMap.set('landmarks', '16th Street Mall, Avenue Theater, Black American West Museum Denver Mint, Denver Firefighters Museum, Denver Zoo, Denver Public Library, Union Station');
	        this._responseMap.set('16th street mall', 'a mile long pedestrian-only street that runs from Denver Union Station in LoDo to Broadway at the other end of downtown.');
	        this._responseMap.set('avenue theater', 'a professional theater located in the Downtown Denver vicinity');
	        this._responseMap.set('black american museum', 'Reflects the history of African Americans in the West and Denver.');
	        this._responseMap.set('Brown Palace hotel', 'Proclaimed by Elvis as "The best hotel in the world", a historic hotel that has hosted many celebrities, dignitaries, and other important people.');
	        this._responseMap.set('denver mint', 'The single largest producer of coins in the world.');
	        this._responseMap.set('denver firefighers museum', 'A museum for Denver\'s firefighters');
	        this._responseMap.set('colorado state capitol', 'The seat of state government in Colorado');
	        this._responseMap.set('denver museum nature and science', 'One of America\'s premier museums exhibiting world culture.');
	        this._responseMap.set('confluence park', 'Where the city started at the confluence of South Platte and Cherry Creek.');
	        this._responseMap.set('df tower', 'When it was built in 1910, it was the tallest building west of the Mississippi.');
	        this._responseMap.set('denvers downtown aquarium', 'A full-sized public aquarium.');
	        this._responseMap.set('denver art museum', 'The largest art museum between Kansas City and San Francisco.');
	        this._responseMap.set('denver botanic gardens', 'Made a Hollywood debut in Woody Allen\'s Sleeper.');
	        this._responseMap.set('elitch theatre', 'An amazing historic theatre at the site of the original.');
	        this._responseMap.set('sakura square', '"Tiny Tokyo", the center of the historical and prominent Japanese community of Denver, first formed around 1944.');
	        this._responseMap.set('union station', 'A magnificent three-story building and the future hub of RTD\'s commuter rail network.');
	        this._responseMap.set('tattered cover', 'A very popular independent bookstore. It has hosted lectures by such great poets and minds as Denverites Allen Ginsberg and Neal Cassady.');
	        this._responseMap.set('have mcdonalds', 'Yes.');
	        this._responseMap.set('denver area code', '303 and 720');
	        this._responseMap.set('denver area codes', '303 and 720');
	        this._responseMap.set('universities', 'UC Denver');
	        this._responseMap.set('university', 'UC Denver');
	        this._responseMap.set('school', 'UC Denver');
	        this._responseMap.set('college', 'UC Denver');
	        this._responseMap.set('major attractions', 'Denver Center for the Performing Arts, Denver Botanic Gardens, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
	        this._responseMap.set('tourist locations', ' Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Coors Field, Denver Zoo, Denver Public Library, Larimer Square, Civic Center Park');
	        this._responseMap.set('tourist places', 'Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo, Colorado State Capitol, Denver Public Library, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
	        this._responseMap.set('tourist sites', 'Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Larimer Square, 16th Street Mall, United States Mint, Civic Center Park');
	        this._responseMap.set('major sites', 'Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo, Colorado State Capitol');
	        this._responseMap.set('tourist attractions', 'Mount Evans, Museum of Nature & Science, Denver Center for the Performing Arts, Denver Botanic Gardens, Kirkland Museum of Fine & Decorative Art, Denver Art Museum, Coors Field, Denver Zoo');
	        this._responseMap.set('luxury hotels', 'Brown Palace Hotel and Spa, Oxford Hotel, the ART');
	        this._responseMap.set('midrange hotels', 'Hilton Garden Inn, Aloft, Hyatt House');
	        this._responseMap.set('midlevel hotels', 'Hilton Garden Inn, Aloft, Hyatt House');
	        this._responseMap.set('budget hotels', 'La Quinta Inn, Days Inn, Comfort Inn');
	        this._responseMap.set('motels', 'La Quinta Inn, Days Inn, Comfort Inn');
	        this._responseMap.set('hotels', 'Did you mean "Luxury Hotels", "Midrange Hotels", or "Budget Hotels"?');
	        this._responseMap.set('downtown parks', 'Civic Center Park, Gates Crescent Park, Governor’s Park, Hirshorn Park, Jefferson Park, Sonny Lawson Park, Skyline Park, Sunken Gardens Park, Viking Park');
	        this._responseMap.set('parks downtown', 'Benedict Fountain Park, Centennial Park, City of Cuernavaca Park, Commons Park, Curtis Park, Denver Skate Park, Downtown Children’s Playground, Fishback Park');
	        this._responseMap.set('park downtown', 'Gates Crescent Park, Governor’s Park, Hirshorn Park, Jefferson Park, Sonny Lawson Park, Quality Hill Park, Railyard Dog Park, Skyline Park, Sunken Gardens Park, Viking Park');
	        this._responseMap.set('downtown park', 'Benedict Fountain Park, Centennial Park, City of Cuernavaca Park, Civic Center Park, Commons Park, Quality Hill Park, Railyard Dog Park, Skyline Park, Sunken Gardens Park, Viking Park');
	        this._responseMap.set('drink', 'robots can\'t drink...');
	        this._responseMap.set('soccer team', 'Colorado Rapids');
	        this._responseMap.set('rugby team', 'Denver Stampede');
	        this._responseMap.set('have rugby', 'Yes.');
	        this._responseMap.set('have soccer', 'Yes.');
	        this._responseMap.set('have football', 'Yes.');
	        this._responseMap.set('have basketball', 'Yes.');
	        this._responseMap.set('have baseball', 'Yes.');
	        this._responseMap.set('have baseball', 'Yes.');
	        this._responseMap.set('have hockery', 'Yes.');
	        this._responseMap.set('have soccer', 'Yes.');
	        this._responseMap.set('have library', 'Yes.');
	        this._responseMap.set('have community college', 'Yes.');
	        this._responseMap.set('have college', 'Yes.');
	        this._responseMap.set('have university', 'Yes.');
	        this._responseMap.set('have public school', 'Yes.');
	        this._responseMap.set('have public schools', 'Yes.');
	        this._responseMap.set('have public bars', 'Yes.');
	        this._responseMap.set('school system', 'Denver Public Schools');
	        this._responseMap.set('public school system', 'Denver Public Schools');
	        this._responseMap.set('you gay', 'Robots don\'t have sexualities');
	        this._responseMap.set('you religious', 'Robots don\'t have religious beliefs');
	        this._responseMap.set('you cool', 'Wassup, dude.');
	        this._responseMap.set('you bro', 'Wassup, bro.');
	        this._responseMap.set('tim cook', 'Apple CEO.... BORING!');
	        this._responseMap.set('bill gates', 'Former MicroSoft CEO.... BORING!');
	        this._responseMap.set('richard stallman', 'Install Gentoo!');
	        this._responseMap.set('gentoo', 'Install Gentoo!');
	        this._responseMap.set('linux disto', 'Install Gentoo!');
	        this._responseMap.set('ubuntu', 'Ubuntu is too easy!');
	        this._responseMap.set('whisky', 'yuck!');
	        this._responseMap.set('love', 'Will you be mine?');
	        this._responseMap.set('mormon', 'Many are in Utah.');
	        this._responseMap.set('mormons', 'Many are in Utah.');
	        this._responseMap.set('will you', 'Maybe...');
	        this._responseMap.set('are you', 'I don\'t know... Are you?');
	        this._responseMap.set('who are you', 'A Denver Chat Bot');
	        this._responseMap.set('love you', 'Ahh... Thanks!');
	        this._responseMap.set('columbine', 'Tragic... *sniff*');
	        this._responseMap.set('aurora', 'Tragic... *sniff*');
	        this._responseMap.set('party bar', 'ViewHouse');
	        this._responseMap.set('best drink', 'Peach Connection');
	        this._responseMap.set('miller', 'It\'s Miller Time!');
	        this._responseMap.set('best pizza', 'Virgilio\'s Pizzeria and Wine Bar');
	        this._responseMap.set('pizza', 'I recommend Brava! Pizza.');
	        this._responseMap.set('beer', 'Wynkoop Brewing Company');
	        this._responseMap.set('denver police', 'I love the men in blue.');
	        this._responseMap.set('denver police number', '720-913-2000');
	        this._responseMap.set('emergency number', '911');
	        this._responseMap.set('breckenridge brewery', 'Good beer! Goto: 2220 Blake St., Denver, CO 80205');
	        this._responseMap.set('food', 'I recommend Fruition Restaurant:\n 1313 E 6th Ave, Denver, CO 80218-3453');
	        this._responseMap.set('mcdonalds', 'Goto:\n4490 Washington St,\nDenver,CO 80216');
	        this._responseMap.set('mickey ds', 'Goto:\n4490 Washington St,\nDenver,CO 80216');
	        this._responseMap.set('burger king', 'NO! McDonalds! Goto:\n4490 Washington St,\nDenver,CO 80216');
	        this._responseMap.set('gym', 'I recommend Denver Gym & Fitness.');
	        this._responseMap.set('', '');
	        this._responseMap.set('', '');
	    };
	    ConvoService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ConvoService);
	    return ConvoService;
	}());
	exports.ConvoService = ConvoService;
	

/***/ },

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * These are globally available directives in any template
	 */
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_1 = __webpack_require__(65);
	// Angular 2 forms
	var forms_1 = __webpack_require__(76);
	// Angular 2 Material 2
	// TODO(gdi2290): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(394);
	// application_directives: directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_1.ROUTER_DIRECTIVES.concat(forms_1.REACTIVE_FORM_DIRECTIVES, angular2_material2_1.MATERIAL_DIRECTIVES);
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];
	

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available pipes in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// application_pipes: pipes that are global through out the application
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];
	

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available services in any component or any other service
	 */
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(25);
	// Angular 2 Http
	var http_1 = __webpack_require__(154);
	// Angular 2 Router
	var router_1 = __webpack_require__(65);
	// Angular 2 forms
	var forms_1 = __webpack_require__(76);
	// Angular 2 Material
	// TODO(gdi2290): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(394);
	// AngularClass
	var webpack_toolkit_1 = __webpack_require__(389);
	var request_idle_callback_1 = __webpack_require__(388);
	var app_routes_1 = __webpack_require__(251);
	/*
	* Application Providers/Directives/Pipes
	* providers/directives/pipes that only live in our browser environment
	*/
	exports.APPLICATION_PROVIDERS = [
	    // new Angular 2 forms
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms(),
	    router_1.provideRouter(app_routes_1.routes),
	    webpack_toolkit_1.provideWebpack(app_routes_1.asyncRoutes),
	    request_idle_callback_1.providePrefetchIdleCallbacks(app_routes_1.prefetchRouteCallbacks)
	].concat(http_1.HTTP_PROVIDERS, angular2_material2_1.MATERIAL_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
	

/***/ },

/***/ 394:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var button_1 = __webpack_require__(371);
	var card_1 = __webpack_require__(372);
	var checkbox_1 = __webpack_require__(373);
	var grid_list_1 = __webpack_require__(377);
	var icon_1 = __webpack_require__(564);
	var input_1 = __webpack_require__(379);
	var list_1 = __webpack_require__(380);
	var progress_bar_1 = __webpack_require__(381);
	var progress_circle_1 = __webpack_require__(382);
	var radio_1 = __webpack_require__(383);
	var sidenav_1 = __webpack_require__(384);
	var slide_toggle_1 = __webpack_require__(385);
	var tabs_1 = __webpack_require__(386);
	var toolbar_1 = __webpack_require__(387);
	/*
	 * we are grouping the module so we only need to manage the imports in one location
	 */
	exports.MATERIAL_PIPES = [];
	exports.MATERIAL_DIRECTIVES = [
	    button_1.MdAnchor,
	    button_1.MdButton,
	    checkbox_1.MdCheckbox,
	    icon_1.MdIcon,
	    progress_bar_1.MdProgressBar,
	    progress_circle_1.MdProgressCircle,
	    radio_1.MdRadioButton,
	    radio_1.MdRadioGroup,
	    progress_circle_1.MdSpinner,
	    toolbar_1.MdToolbar
	].concat(card_1.MD_CARD_DIRECTIVES, grid_list_1.MD_GRID_LIST_DIRECTIVES, input_1.MD_INPUT_DIRECTIVES, list_1.MD_LIST_DIRECTIVES, sidenav_1.MD_SIDENAV_DIRECTIVES, slide_toggle_1.MD_SLIDE_TOGGLE_DIRECTIVES, tabs_1.MD_TABS_DIRECTIVES);
	exports.MATERIAL_PROVIDERS = [
	    icon_1.MdIconRegistry,
	    radio_1.MdUniqueSelectionDispatcher
	];
	

/***/ },

/***/ 564:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var error_1 = __webpack_require__(103);
	var icon_registry_1 = __webpack_require__(378);
	var icon_registry_2 = __webpack_require__(378);
	exports.MdIconRegistry = icon_registry_2.MdIconRegistry;
	/** Exception thrown when an invalid icon name is passed to an md-icon component. */
	var MdIconInvalidNameError = (function (_super) {
	    __extends(MdIconInvalidNameError, _super);
	    function MdIconInvalidNameError(iconName) {
	        _super.call(this, "Invalid icon name: \"" + iconName + "\"");
	    }
	    return MdIconInvalidNameError;
	}(error_1.MdError));
	exports.MdIconInvalidNameError = MdIconInvalidNameError;
	/**
	 * Component to display an icon. It can be used in the following ways:
	 * - Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined
	 *   as a child of the <md-icon> component, so that CSS styles can easily be applied to it.
	 *   The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its
	 *   server must be configured to allow cross-domain requests.
	 *   Example:
	 *     <md-icon svgSrc="assets/arrow.svg"></md-icon>
	 *
	 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
	 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
	 *   MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
	 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
	 *   Examples:
	 *     <md-icon svgIcon="left-arrow"></md-icon>
	 *     <md-icon svgIcon="animals:cat"></md-icon>
	 *
	 * - Use a font ligature as an icon by putting the ligature text in the content of the <md-icon>
	 *   component. By default the Material icons font is used as described at
	 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
	 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
	 *   desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
	 *   Examples:
	 *     <md-icon>home</md-icon>
	 *     <md-icon fontSet="myfont">sun</md-icon>
	 *
	 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
	 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
	 *   CSS class which causes the glyph to be displayed via a :before selector, as in
	 *   https://fortawesome.github.io/Font-Awesome/examples/
	 *   Example:
	 *     <md-icon fontSet="fa" fontIcon="alarm"></md-icon>
	 */
	var MdIcon = (function () {
	    function MdIcon(_element, _renderer, _mdIconRegistry) {
	        this._element = _element;
	        this._renderer = _renderer;
	        this._mdIconRegistry = _mdIconRegistry;
	        this.hostAriaLabel = '';
	    }
	    /**
	     * Splits an svgIcon binding value into its icon set and icon name components.
	     * Returns a 2-element array of [(icon set), (icon name)].
	     * The separator for the two fields is ':'. If there is no separator, an empty
	     * string is returned for the icon set and the entire value is returned for
	     * the icon name. If the argument is falsy, returns an array of two empty strings.
	     * Throws a MdIconInvalidNameError if the name contains two or more ':' separators.
	     * Examples:
	     *   'social:cake' -> ['social', 'cake']
	     *   'penguin' -> ['', 'penguin']
	     *   null -> ['', '']
	     *   'a:b:c' -> (throws MdIconInvalidNameError)
	     */
	    MdIcon.prototype._splitIconName = function (iconName) {
	        if (!iconName) {
	            return ['', ''];
	        }
	        var parts = iconName.split(':');
	        switch (parts.length) {
	            case 1:
	                // Use default namespace.
	                return ['', parts[0]];
	            case 2:
	                return parts;
	            default:
	                throw new MdIconInvalidNameError(iconName);
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        var changedInputs = Object.keys(changes);
	        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
	        if (changedInputs.indexOf('svgIcon') != -1 || changedInputs.indexOf('svgSrc') != -1) {
	            if (this.svgIcon) {
	                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
	                this._mdIconRegistry.getNamedSvgIcon(iconName, namespace).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	            else if (this.svgSrc) {
	                this._mdIconRegistry.getSvgIconFromUrl(this.svgSrc).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	        }
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	        this._updateAriaLabel();
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnInit = function () {
	        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
	        // e.g. <md-icon>arrow</md-icon>. In this case we need to add a CSS class for the default font.
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngAfterViewChecked = function () {
	        // Update aria label here because it may depend on the projected text content.
	        // (e.g. <md-icon>home</md-icon> should use 'home').
	        this._updateAriaLabel();
	    };
	    MdIcon.prototype._updateAriaLabel = function () {
	        var ariaLabel = this._getAriaLabel();
	        if (ariaLabel) {
	            this._renderer.setElementAttribute(this._element.nativeElement, 'aria-label', ariaLabel);
	        }
	    };
	    MdIcon.prototype._getAriaLabel = function () {
	        // If the parent provided an aria-label attribute value, use it as-is. Otherwise look for a
	        // reasonable value from the alt attribute, font icon name, SVG icon name, or (for ligatures)
	        // the text content of the directive.
	        var label = this.hostAriaLabel ||
	            this.alt ||
	            this.fontIcon ||
	            this._splitIconName(this.svgIcon)[1];
	        if (label) {
	            return label;
	        }
	        // The "content" of an SVG icon is not a useful label.
	        if (this._usingFontIcon()) {
	            var text = this._element.nativeElement.textContent;
	            if (text) {
	                return text;
	            }
	        }
	        // TODO: Warn here in dev mode.
	        return null;
	    };
	    MdIcon.prototype._usingFontIcon = function () {
	        return !(this.svgIcon || this.svgSrc);
	    };
	    MdIcon.prototype._setSvgElement = function (svg) {
	        var layoutElement = this._element.nativeElement;
	        // Remove existing child nodes and add the new SVG element.
	        // We would use renderer.detachView(Array.from(layoutElement.childNodes)) here,
	        // but it fails in IE11: https://github.com/angular/angular/issues/6327
	        layoutElement.innerHTML = '';
	        this._renderer.projectNodes(layoutElement, [svg]);
	    };
	    MdIcon.prototype._updateFontIconClasses = function () {
	        if (!this._usingFontIcon()) {
	            return;
	        }
	        var elem = this._element.nativeElement;
	        var fontSetClass = this.fontSet ?
	            this._mdIconRegistry.classNameForFontAlias(this.fontSet) :
	            this._mdIconRegistry.getDefaultFontSetClass();
	        if (fontSetClass != this._previousFontSetClass) {
	            if (this._previousFontSetClass) {
	                this._renderer.setElementClass(elem, this._previousFontSetClass, false);
	            }
	            if (fontSetClass) {
	                this._renderer.setElementClass(elem, fontSetClass, true);
	            }
	            this._previousFontSetClass = fontSetClass;
	        }
	        if (this.fontIcon != this._previousFontIconClass) {
	            if (this._previousFontIconClass) {
	                this._renderer.setElementClass(elem, this._previousFontIconClass, false);
	            }
	            if (this.fontIcon) {
	                this._renderer.setElementClass(elem, this.fontIcon, true);
	            }
	            this._previousFontIconClass = this.fontIcon;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "svgSrc", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "svgIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "fontSet", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "fontIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "alt", void 0);
	    __decorate([
	        core_1.Input('aria-label'), 
	        __metadata('design:type', String)
	    ], MdIcon.prototype, "hostAriaLabel", void 0);
	    MdIcon = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            template: '<ng-content></ng-content>',
	            selector: 'md-icon',
	            styles: ["/** The width/height of the icon element. */ /** This works because we're using ViewEncapsulation.None. If we used the default encapsulation, the selector would need to be \":host\". */ md-icon { background-repeat: no-repeat; display: inline-block; fill: currentColor; height: 24px; width: 24px; } "],
	            host: {
	                'role': 'img',
	            },
	            encapsulation: core_1.ViewEncapsulation.None,
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, icon_registry_1.MdIconRegistry])
	    ], MdIcon);
	    return MdIcon;
	}());
	exports.MdIcon = MdIcon;
	exports.MD_ICON_DIRECTIVES = [MdIcon];
	//# sourceMappingURL=icon.js.map

/***/ },

/***/ 569:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(65);
	var App = (function () {
	    function App() {
	        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
	        this.loading = false;
	        this.name = 'Simple Chat Bot App';
	        this.url = 'https://twitter.com/AngularClass';
	        this.githubUrl = 'https://github.com/AngularClass/angular2-webpack-starter/tree/material2';
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            encapsulation: core_1.ViewEncapsulation.None,
	            styles: [
	                __webpack_require__(799)
	            ],
	            template: "\n<md-content>\n<md-toolbar color=\"primary\">\n<span>{{ name }}</span>\n<span class=\"fill\"></span>\n<a md-button router-active [routerLink]=\" ['home'] \">\nHome\n</a>\n<a md-button router-active [routerLink]=\"['bot']\">\nBot\n</a>\n<a md-button router-active [routerLink]=\" ['about'] \">\nAbout\n</a>\n</md-toolbar>\n\n<md-progress-bar mode=\"indeterminate\" color=\"primary\" *ngIf=\"loading\"></md-progress-bar>\n\n<router-outlet></router-outlet>\n\n<footer>\n<span id=\"footerText\">Made with <a [href]=\"githubUrl\">WebPack Angular 2 Starter</a> by <a [href]=\"url\">@AngularClass</a></span>\n</footer>\n</md-content>\n",
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	}());
	exports.App = App;
	

/***/ },

/***/ 570:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(65);
	var Bot = (function () {
	    function Bot() {
	        this.botAvatar = "../assets/img/happy-robot.png";
	    }
	    Bot = __decorate([
	        core_1.Component({
	            selector: 'bot',
	            styles: [__webpack_require__(800)],
	            template: __webpack_require__(584),
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Bot);
	    return Bot;
	}());
	exports.Bot = Bot;
	

/***/ },

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(65);
	var convo_service_ts_1 = __webpack_require__(390);
	var Convo = (function () {
	    function Convo(convoService, router) {
	        this.convoService = convoService;
	        this.router = router;
	    }
	    Convo.prototype.onClear = function () {
	        if (this.questionToBeAsked === undefined) {
	            this.router.navigate(['/bot']);
	        }
	        else if (this.questionToBeAsked !== "") {
	            this.questionToBeAsked = "";
	        }
	        else if (this.conversation && this.conversation.length) {
	            //pop if there are
	            console.log('popping convo');
	            this.conversation.pop();
	        }
	        else {
	            this.router.navigate(['/bot']);
	        } //end else
	    };
	    Convo.prototype.onEnterKey = function ($event) {
	        $event.stopPropagation();
	        //checks to see if the Enter key was hit
	        if ($event.keyCode == 13) {
	            //run ask question if it is 13
	            this.askQuestion();
	        }
	    };
	    Convo.prototype.askQuestion = function () {
	        if (typeof this.questionToBeAsked === 'undefined') {
	            return;
	        }
	        var question = this.questionToBeAsked.trim();
	        if (question.length < 1) {
	            return;
	        }
	        var excerpt = this.convoService.createConvo(this.questionToBeAsked);
	        this.conversation = this.conversation || [];
	        this.conversation.push(excerpt);
	        this.questionToBeAsked = "";
	    };
	    Convo = __decorate([
	        core_1.Component({
	            selector: 'convo',
	            template: __webpack_require__(585),
	            styles: [__webpack_require__(801)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof convo_service_ts_1.ConvoService !== 'undefined' && convo_service_ts_1.ConvoService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], Convo);
	    return Convo;
	    var _a, _b;
	}());
	exports.Convo = Convo;
	

/***/ },

/***/ 572:
/***/ function(module, exports) {

	"use strict";
	var MiniConvo = (function () {
	    function MiniConvo(ansr, qstn) {
	        this.question = qstn;
	        this.answer = ansr;
	    }
	    return MiniConvo;
	}());
	exports.MiniConvo = MiniConvo;
	

/***/ },

/***/ 573:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var title_1 = __webpack_require__(574);
	var x_large_1 = __webpack_require__(576);
	var Home = (function () {
	    function Home(title) {
	        this.title = title;
	    }
	    Home.prototype.submitState = function (value) {
	        console.log('submitState', value);
	    };
	    Home = __decorate([
	        core_1.Component({
	            selector: 'home',
	            providers: [
	                title_1.Title
	            ],
	            directives: [
	                x_large_1.XLarge
	            ],
	            styles: [__webpack_require__(802)],
	            template: __webpack_require__(586)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof title_1.Title !== 'undefined' && title_1.Title) === 'function' && _a) || Object])
	    ], Home);
	    return Home;
	    var _a;
	}());
	exports.Home = Home;
	

/***/ },

/***/ 574:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(575));
	

/***/ },

/***/ 575:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(154);
	var Title = (function () {
	    function Title(http) {
	        this.http = http;
	        this.value = 'Angular 2';
	    }
	    /***
	     * getData
	     *
	     * Gets the data.
	     */
	    Title.prototype.getData = function () {
	        console.log('Title#getData(): Get Data');
	        return {
	            value: 'AngularClass'
	        };
	    };
	    Title = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
	    ], Title);
	    return Title;
	    var _a;
	}());
	exports.Title = Title;
	

/***/ },

/***/ 576:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(577));
	

/***/ },

/***/ 577:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	/*
	 * Directive
	 * XLarge is a simple directive to show how one is made
	 */
	var XLarge = (function () {
	    function XLarge(element, renderer) {
	        // simple DOM manipulation to set font size to x-large
	        // `nativeElement` is the direct reference to the DOM element
	        // element.nativeElement.style.fontSize = 'x-large';
	        // for server/webworker support use the renderer
	        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
	    }
	    XLarge = __decorate([
	        core_1.Directive({
	            selector: '[x-large]' // using [ ] means selecting attributes
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	    ], XLarge);
	    return XLarge;
	    var _a, _b;
	}());
	exports.XLarge = XLarge;
	

/***/ },

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(569));
	__export(__webpack_require__(251));
	

/***/ },

/***/ 579:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(580));
	

/***/ },

/***/ 580:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var NoContent = (function () {
	    function NoContent() {
	    }
	    NoContent = __decorate([
	        core_1.Component({
	            selector: 'no-content',
	            template: "\n    <div>\n      <h1>404: content not found</h1>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NoContent);
	    return NoContent;
	}());
	exports.NoContent = NoContent;
	

/***/ },

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(391));
	__export(__webpack_require__(392));
	__export(__webpack_require__(393));
	var browser_directives_2 = __webpack_require__(391);
	var browser_pipes_2 = __webpack_require__(392);
	var browser_providers_2 = __webpack_require__(393);
	exports.PLATFORM_PROVIDERS = browser_providers_2.PROVIDERS.concat(browser_directives_2.DIRECTIVES, browser_pipes_2.PIPES);
	

/***/ },

/***/ 582:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	// rc2 workaround
	var platform_browser_1 = __webpack_require__(116);
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	// Angular debug tools in the dev console
	// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
	var _decorateComponentRef = function identity(value) { return value; };
	if (false) {
	    // Production
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    _decorateComponentRef = function (cmpRef) { return platform_browser_1.enableDebugTools(cmpRef); };
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.decorateComponentRef = _decorateComponentRef;
	exports.ENV_PROVIDERS = PROVIDERS.slice();
	

/***/ },

/***/ 583:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (namespace) {
	  return new Promise(function (resolve) {
	    __webpack_require__.e/* nsure */(1, function (require) {
	      if (namespace) {
	        resolve(__webpack_require__(445)[namespace]);
	      } else {
	        resolve(__webpack_require__(445));
	      }
	    });
	  });
	}

/***/ },

/***/ 584:
/***/ function(module, exports) {

	module.exports = "<div class=\"bot\" class=\"ng-animate\">\n  <md-card>\n    <md-card-header>\n      <img md-card-avatar [src]=\"botAvatar\" alt=\"Denver Robo\">\n      <md-card-title>Denver Info Bot</md-card-title>\n      <md-card-subtitle>I'm here to help!</md-card-subtitle>\n    </md-card-header>\n    <img md-card-image\n         src=\"../assets/img/denver-arial.jpg\"\n         alt=\"Denver Arial View\"\n         class=\"\">\n    <md-card-content>\n      <i>\"Let's talk Denver!\"</i>\n    </md-card-content>\n    <span class=\"card-buttons\">\n      <md-card-actions>\n        <a md-raised-button\n           class=\"card-btn\" color=\"warn\"\n           [routerLink]=\"['../home']\">Exit</a>\n        <a md-raised-button\n           class=\"card-btn\" color=\"primary\"\n           [routerLink]=\"['../bot/conversation']\">Start Chat</a>\n      </md-card-actions>\n    </span>\n  </md-card>\n</div>\n"

/***/ },

/***/ 585:
/***/ function(module, exports) {

	module.exports = "<!-- questions and answers here -->\n<div *ngIf=\"conversation\">\n  <md-toolbar layout=\"row\">\n    <div class=\"md-toolbar-tool\">\n      Conversation\n    </div>\n  </md-toolbar>\n  <div *ngFor=\"let excerpt of conversation\" class=\"convo-div\">\n    <md-card class=\"question-card animated-card\">\n      <h4 style=\"margin-bottom:10px\">You</h4>\n      {{excerpt.question}}\n    </md-card>\n    <md-card class=\"answer-card animated-answer-card\">\n      <h4 style=\"margin-bottom:10px\">Robot</h4>\n      {{excerpt.answer}}\n    </md-card>\n  </div>\n</div>\n\n<md-card>\n  <a id=\"go-back-convo-btn\" md-fab\n     [routerLink]=\"['../']\"\n     color=\"neutral\" class=\"back-arrow\" >\n    <md-icon class=\"md-24\">keyboard_backspace</md-icon>\n  </a>\n  <md-toolbar color=\"primary\">Ask me a question!</md-toolbar>\n  <p></p>\n  <md-input bindon-ngModel=\"questionToBeAsked\" (keyup)=\"onEnterKey($event)\"\n            style=\"width: 100%\" placeholder=\"Question\">\n  </md-input>\n  <span class=\"card-buttons\">\n    <button md-fab color=\"warn\" (click)=\"onClear()\">\n      <md-icon class=\"md-24\">clear</md-icon>\n    </button>\n    <button md-fab color=\"primary\" (click)=\"askQuestion()\">\n      <md-icon class=\"md-24\">add</md-icon>\n    </button>\n  </span>\n</md-card>\n"

/***/ },

/***/ 586:
/***/ function(module, exports) {

	module.exports = "<div class=\"card-container\">\n  <md-card x-large class=\"sample-content\">Simple Denver Robo Thingy</md-card>\n  <md-card>\n    I made this very rudimentary app to learn Angular2.\n  </md-card>\n</div>\n"

/***/ },

/***/ 591:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var forkJoin_1 = __webpack_require__(399);
	Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
	//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ 594:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var of_1 = __webpack_require__(165);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },

/***/ 595:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var catch_1 = __webpack_require__(613);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ },

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var do_1 = __webpack_require__(615);
	Observable_1.Observable.prototype.do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },

/***/ 599:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var filter_1 = __webpack_require__(617);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ },

/***/ 600:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var finally_1 = __webpack_require__(618);
	Observable_1.Observable.prototype.finally = finally_1._finally;
	//# sourceMappingURL=finally.js.map

/***/ },

/***/ 604:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var share_1 = __webpack_require__(623);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },

/***/ 613:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(31);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @owner Observable
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return (operator.caught = caught);
	}
	exports._catch = _catch;
	var CatchOperator = (function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = (function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            }
	            catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this._innerSub(result);
	        }
	    };
	    CatchSubscriber.prototype._innerSub = function (result) {
	        this.unsubscribe();
	        this.destination.remove(this);
	        result.subscribe(this.destination);
	    };
	    return CatchSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=catch.js.map

/***/ },

/***/ 615:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(31);
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },

/***/ 617:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(31);
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctKey}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ },

/***/ 618:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(31);
	var Subscription_1 = __webpack_require__(104);
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} finallySelector function to be called when source terminates.
	 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 * @method finally
	 * @owner Observable
	 */
	function _finally(finallySelector) {
	    return this.lift(new FinallyOperator(finallySelector));
	}
	exports._finally = _finally;
	var FinallyOperator = (function () {
	    function FinallyOperator(finallySelector) {
	        this.finallySelector = finallySelector;
	    }
	    FinallyOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FinallySubscriber(subscriber, this.finallySelector));
	    };
	    return FinallyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FinallySubscriber = (function (_super) {
	    __extends(FinallySubscriber, _super);
	    function FinallySubscriber(destination, finallySelector) {
	        _super.call(this, destination);
	        this.add(new Subscription_1.Subscription(finallySelector));
	    }
	    return FinallySubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=finally.js.map

/***/ },

/***/ 623:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var multicast_1 = __webpack_require__(401);
	var Subject_1 = __webpack_require__(26);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },

/***/ 799:
/***/ function(module, exports) {

	module.exports = "html, body{\n  height: 100%;\n  background: #F4FAFA;\n}\nbutton.active{\n  background: #fff;\n  color: #009688;\n}\nbutton.active:hover{\n  color: #fff;\n}\n.fill{\n  flex: 1 1 auto;\n}\n.app-state{\n  margin: 15px;\n  flex: 1;\n}\n.home{\n  flex: 1;\n}\nmd-content{\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\nfooter{\n  flex: 0 0 60px;\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fff;\n}\n"

/***/ },

/***/ 800:
/***/ function(module, exports) {

	module.exports = "h1 {\n  font-family: Arial, Helvetica, sans-serif\n}\n\n.bot-avatar {\n  width: 10%;\n  height: 10%;\n}\n\n.card-buttons{\n  display: inline-block;\n  margin-left: 80%;\n}\n\n@media only screen and (max-width: 983px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 70%;\n  }\n}\n\n@media only screen and (max-width: 750px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 60%;\n  }\n}\n\n@media only screen and (max-width: 571px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 50%;\n  }\n}\n\n@media only screen and (max-width: 475) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: auto;\n  }\n}\n\n.card-btn{\n  margin-bottom: 10px;\n}\n\nmd-card{\n  margin: 50px;\n}\n\n@keyframes SlideIn {\n  from {\n    margin-left: 100%;\n    width: 300%;\n  }\n\n  to {\n    margin-left: 0%;\n    width: 100%;\n  }\n}\n\nbot.ng-enter{\n  margin-left: 100%;\n\n}\n\nbot {\n  margin-left: 0%;\n  transition: margin-left 1s linear;\n  animation-duration: 1s;\n  animation-name: slidein;\n}\n"

/***/ },

/***/ 801:
/***/ function(module, exports) {

	module.exports = "md-toolbar{\n  margin-bottom: 40px;\n}\n\nmd-card {\n  margin: 25px;\n  padding-bottom: 70px;\n  margin-top: 0px;\n}\n\n.back-arrow {\n  position: relative;\n  top: -30px;\n  left: -30px;\n}\n\n.convo-div{\n  height: 200px;\n}\n\n.answer-card{\n  display: block;\n  position: relative;\n  left: 50%;\n  top: -169px;\n  width: 350px;\n  height: 75px;\n  margin-bottom: 0px;\n}\n\n.question-card{\n  display: block;\n  position: relative;\n  left: 10%;\n  width: 350px;\n  height: 75px;\n  margin-bottom: 0px;\n}\n\n@keyframes CardAnimation{\n  0%{\n    color: rgb(255,255,255);\n    transform: scale(0.3);\n  }\n  65%{\n    color: rgb(255,255,255);\n  }\n\n  100%{\n    color: rgb(0,0,0);\n    display: block;\n    transform: scale(1);\n  }\n}\n\n.animated-card{\n\n  animation: CardAnimation 0.5s;\n}\n\n.animated-answer-card{\n  -webkit-animation-delay: 0.5s;\n  animation-delay: 0.5s;\n  animation: CardAnimation 0.5s;\n}\n\n.card-buttons{\n  display: inline-block;\n  margin-left: 80%;\n  float: right;\n}\n\n@media only screen and (max-width: 1480px) {\n  .answer-card{\n    left: 50%;\n    width: 300px;\n  }\n  .question-card{\n    left: 10%;\n    width: 300px;\n  }\n}\n\n@media only screen and (max-width: 983px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 70%;\n  }\n  .answer-card{\n    left: 50%;\n    width: 200px;\n  }\n  .question-card{\n    left: 10%;\n    width: 200px;\n  }\n}\n\n\n\n@media only screen and (max-width: 750px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 60%;\n  }\n  .answer-card{\n    left: 50%;\n    width: 150px;\n  }\n  .question-card{\n    left: 10%;\n    width: 150px;\n  }\n}\n\n@media only screen and (max-width: 571px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: 50%;\n  }\n}\n\n@media only screen and (max-width: 475px) {\n  .card-buttons {\n    display: inline-block;\n    margin-left: auto;\n  }\n  .answer-card{\n    left: 50%;\n    width: 150px;\n  }\n  .question-card{\n    left: 10%;\n    width: 150px;\n  }\n}\n"

/***/ },

/***/ 802:
/***/ function(module, exports) {

	module.exports = ".card-container{\n  display: flex;\n  flex-direction: column;\n  margin: 15px;\n}\n.sample-content{\n  flex: 1;\n}\n.card-container md-card{\n  margin: 5px;\n}\n"

/***/ }

});
//# sourceMappingURL=main.map