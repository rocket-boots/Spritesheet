# Spritesheet
Spritesheet and Game Image manager

## Install

* Download and use the source files
* or `npm install git+https://github.com/rocket-boots/Spritesheet.git#v0.5.0` (Substitute the version number for the version of your choice)

## How to Use

```js
import { Spritesheet, GameImage } from 'rocket-boot-spritesheet';

const WALKING_SPRITESHEET_URL = 'path/to/your/image.png';
const TILE_SIZE = 16;
const WALK_SPRITE_KEYS = ['walk1', 'walk2', 'walk3', 'walk4'];
const MAX_WALKING_ANIM_INDEX = WALK_SPRITE_KEYS.length;

const walkingSpritesheet = new Spritesheet({
	url: WALKING_SPRITESHEET_URL,
	spriteSize: {x: TILE_SIZE, y: TILE_SIZE},
	spriteKeys: [WALK_SPRITE_KEYS] // 2-dimensional array
});

await walkingSpritesheet.loaded;

function incrementWalkingAnimation() {
	walkingAnimationIndex++;
	if (walkingAnimationIndex >= MAX_WALKING_ANIM_INDEX) {
		walkingAnimationIndex = 0;
	}
	return walkingAnimationIndex;
}

function setImage(element, i) {
	const key = walkingSpritesheet.spriteKeys[0][i];
	element.href = walkingSpritesheet.getDataUrl(key);

}

window.setTimeout(() => {
	setImage(imageElement, incrementWalkingAnimation());
}, 500);

// TODO: add more documentation and examples
// See code for methods
```
