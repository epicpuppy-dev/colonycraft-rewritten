import { SpriteRenderer } from "../render/SpriteRenderer";
import buttons from "../resources/ui/buttons.png";
import sprites from "../resources/sprites.png";
import spritesSmall from "../resources/spritesSmall.png";
import temp from "../resources/ui/temp.png";

export class SpriteData {
    public static addSprites(renderer: SpriteRenderer) {
        //Initialize Sprites
        renderer.addSheetWithSprites("buttons", buttons, {
            "play": [0, 0, 24, 24],
            "pause": [24, 0, 24, 24],
            "close": [0, 24, 24, 24]
        });

        renderer.addSheetWithSprites("sprites", sprites, {
            "storage": [0, 0, 32, 32],
            "logs": [32, 0, 32, 32],
            "people": [64, 0, 32, 32],
            "sticks": [96, 0, 32, 32],
            "leaves": [128, 0, 32, 32],
            "planks": [160, 0, 32, 32],
            "stone": [192, 0, 32, 32],
            "workers": [224, 0, 32, 32],
            "health": [0, 32, 32, 32],
            "morale": [32, 32, 32, 32],
        });

        renderer.addSheetWithSprites("spritesSmall", spritesSmall, {
            "storageSmall": [0, 0, 16, 16],
            "logsSmall": [16, 0, 16, 16],
            "peopleSmall": [32, 0, 16, 16],
            "sticksSmall": [48, 0, 16, 16],
            "leavesSmall": [64, 0, 16, 16],
            "planksSmall": [80, 0, 16, 16],
            "stoneSmall": [96, 0, 16, 16],
            "workersSmall": [112, 0, 16, 16],
            "healthSmall": [0, 16, 16, 16],
            "moraleSmall": [16, 16, 16, 16],
        });

        renderer.addSheetWithSprites("temp", temp, {
            "temp": [0, 0, 32, 32],
        });
    }
}