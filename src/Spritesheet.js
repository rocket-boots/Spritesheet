import GameImage from './GameImage.js';

class Spritesheet {
	constructor(options = {}) {
		const gameImageOptions = (options.url) ? {url: options.url} : {name: options.name};
		this.sheet = new GameImage(gameImageOptions);
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
						const spriteImage = new GameImage({
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
		return new GameImage(this.getImage(key));
	}
}

export default Spritesheet;
