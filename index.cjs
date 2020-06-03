(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/GameImage.js

class GameImage extends Image {
	constructor(options) { 
		super();
		options = options || {};
		const name = options.name || options;
		if (typeof name === "string") {
			this.src = "images/" + name + ".png";
		}
		const src = options.src || options.url || null;
		if (typeof src === "string") {
			this.src = src;
		}
		this.name = options.name || null;
		this.data = null;
		/*
			console.log(n);
			let c = this.getCanvasContext();
			c.putImageData(n, 0, 0);
			this.src = c._canvas.toDataURL();
		*/
		this.flippedHorizontal = null;
		this.flippedVertical = null;
		this.pixiTexture = null;
		this.pixiSprite = null;		
		this.outline = new Image();
		this.isLoaded = false;
		// Setup now and after loaded
		this.loaded = new Promise((resolve, reject) => {
			this.onload = () => {
				this.setup();
				this.isLoaded = true;
				resolve(this);
			};
			if (this.complete) {
				this.onload();
			}
		});
	}
	setup() {
		this.data = this.getImageData();
		this.flippedHorizontal = this.getFlippedImage(-1, 1);
		this.flippedVertical = this.getFlippedImage(1, -1);
		this.setOutline();
		if (typeof RocketBoots !== 'undefined' && RocketBoots.PIXI) {
			this.setPixiProperties();
		}
	}
	getImageData(ctx) {
		if (!ctx) {
			ctx = this.getCanvasContext();
		}
		ctx.drawImage(this, 0, 0);
		return ctx.getImageData(0, 0, this.width, this.height);
	}
	getFlippedImage(a, b) {
		let c = this.getCanvasContext();
		c.save();
		c.scale(a, b);
		//c.translate(-this.width, this.height);
		c.translate((a < 1) ? -this.width : 0, (b < 1) ? -this.height : 0);
		//c.rotate(Math.PI);
		c.drawImage(this, 0, 0);
		c.restore();
		//let data = c.getImageData(0, 0, this.width, this.height);
		//c.putImageData(data, 0, 0);
		let img = new Image();
		img.src = c._canvas.toDataURL();
		return img;
	}
	getCanvasContext() {
		let canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		let c = canvas.getContext('2d');
		c._canvas = canvas;
		return c;
	}
	setSourceByCanvas(canvas) {
		this.src = canvas.toDataURL();
	}
	setSourceByCanvasContext(ctx) {
		this.setSourceByCanvas(ctx._canvas);
	}
	setOutline() { // TODO
		return;
		let data;
		// TODO Get outline data.... 
		let c = this.getCanvasContext();
		canvas.width = 0; // TODO
		canvas.height = 0; // TODO
		c.putImageData(data, 0, 0);
		this.outline = canvas.toDataURL();
	}
	createPixiTexture() {
		return new RocketBoots.PIXI.Texture.fromImage(this.src);
	}
	createPixiSprite() {
		const texture = this.createPixiTexture();
		return new RocketBoots.PIXI.Sprite(texture);
	}
	setPixiProperties() {
		this.pixiTexture = this.createPixiTexture();
		this.pixiSprite = new RocketBoots.PIXI.Sprite(this.pixiTexture);
		//console.log(this.pixiTexture, this.pixiSprite)
	}
	replaceColor(oldColor, newColor) {
		// Based on http://jsfiddle.net/m1erickson/4apAS/
		const ctx = this.getCanvasContext();
		const oldRed = oldColor.red;
		const oldGreen = oldColor.green;
		const oldBlue = oldColor.blue;
		const newRed = newColor.red;
		const newGreen = newColor.green;
		const newBlue = newColor.blue;
		let count = 0;
		let imageData = this.getImageData(ctx);
		for (let i = 0; i < imageData.data.length; i += 4) {
			// is this pixel the old rgb?
			if (
				imageData.data[i] == oldRed &&
				imageData.data[i + 1] == oldGreen &&
				imageData.data[i + 2] == oldBlue
			) {
				imageData.data[i] = newRed;
				imageData.data[i + 1] = newGreen;
				imageData.data[i + 2] = newBlue;
				count++;
			}
		}
		// TODO: can set by data directly?
		ctx.putImageData(imageData, 0, 0);
		this.setSourceByCanvasContext(ctx);
		return count;
	}
}

/* harmony default export */ var src_GameImage = (GameImage);

// CONCATENATED MODULE: ./src/Spritesheet.js


class Spritesheet_Spritesheet {
	constructor(options = {}) {
		const gameImageOptions = (options.url) ? {url: options.url} : {name: options.name};
		this.sheet = new src_GameImage(gameImageOptions);
		this.spriteSize = options.spriteSize || {x: 16, y: 16};
		this.spriteKeys = options.spriteKeys || [[]];
		this.spriteList = [];
		this.spriteImages = {};
		this.spriteDataUrls = {};
		this.loaded = new Promise((resolve, reject) => {
			this.sheet.onload = () => {
				this.parse().then(() => {
					resolve(this);	
				});
			};
			if (this.sheet.complete) {
				resolve(this); // this.sheet.onload() ? 
			}
		});
	}

	parse() {
		const canvas = document.createElement('canvas');
		let w = this.spriteSize.x;
		let h = this.spriteSize.y;
		let c = canvas.getContext('2d');
		let x = 0;
		let y = 0;
		let kx = 0;
		let ky = 0;
		let promises = [];
		canvas.width = w;
		canvas.height = h;
		this.spriteList.length = 0; //while (this.spriteList.length) { this.spriteList.pop(); }
		while (y < this.sheet.height) {
			let rowOfKeys = this.spriteKeys[ky];
			kx = 0;
			x = 0;
			//console.log("--- Row ---\n", rowOfKeys);
			if (rowOfKeys !== undefined && rowOfKeys.length > 0) {
				while (x < this.sheet.width) {
					const key = rowOfKeys[kx];
					if (key !== undefined) {
						c.clearRect(0, 0, canvas.width, canvas.height);
						c.drawImage(this.sheet, x, y, w, h, 0, 0, w, h);
						const src = canvas.toDataURL();
						const spriteImage = new src_GameImage({
							name: key,
							src: src
						});
						this.spriteList.push(spriteImage);
						this.spriteImages[key] = spriteImage;
						this.spriteDataUrls[key] = src;
						//console.log(src);
						promises.push(spriteImage.loaded);
					}
					//console.log(x, y, key, kx, ky);
					x += w;
					kx++;
				}
			}
			y += h;
			ky++;
		}
		return Promise.all(promises);
	}

	getImage(key) {
		const image = this.spriteImages[key];
		if (!image) {
			console.error('Cannot find image with key', key, 'in spritesheet', this);
		}
		return image;
	}

	getDataUrl(key) {
		const url = this.spriteDataUrls[key];
		if (!url) {
			console.error('Cannot find image with key', key, 'in spritesheet', this);
		}
		return url;		
	}

	getImageCopy(key) {
		return new src_GameImage(this.getImage(key));
	}
}

/* harmony default export */ var src_Spritesheet = (Spritesheet_Spritesheet);

// CONCATENATED MODULE: ./index.mjs



/* harmony default export */ var index = __webpack_exports__["default"] = ({ Spritesheet: src_Spritesheet, GameImage: src_GameImage });


/***/ })
/******/ ])["default"]));