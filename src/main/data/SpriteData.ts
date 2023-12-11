import { SpriteRenderer } from "../render/SpriteRenderer";
import buttons from "../resources/ui/buttons.png";
import icons from "../resources/icons.png";
import iconsSmall from "../resources/iconsSmall.png";
import itemsSmall from "../resources/itemsSmall.png";
import temp from "../resources/ui/temp.png";

export class SpriteData {
    public static addSprites(renderer: SpriteRenderer) {
        //Initialize Sprites
        renderer.addSheetWithSprites("buttons", buttons, {
            "play": [0, 0, 24, 24],
            "pause": [24, 0, 24, 24],
            "close": [0, 24, 24, 24]
        });

        renderer.addSheetWithSprites("icons", icons, {
            "storage": [0, 0, 32, 32],
            "people": [32, 0, 32, 32],
            "workers": [64, 0, 32, 32],
            "health": [96, 0, 32, 32],
            "morale": [128, 0, 32, 32],
            "land": [160, 0, 32, 32],
            "stats": [192, 0, 32, 32],
        });

        renderer.addSheetWithSprites("iconsSmall", iconsSmall, {
            "storageSmall": [0, 0, 16, 16],
            "peopleSmall": [16, 0, 16, 16],
            "workersSmall": [32, 0, 16, 16],
            "healthSmall": [48, 0, 16, 16],
            "moraleSmall": [64, 0, 16, 16],
            "landSmall": [80, 0, 16, 16],
            "statsSmall": [96, 0, 16, 16],
        });

        renderer.addSheetWithSprites("items", itemsSmall, {
            "berriesSmall": [0, 0, 16, 16], 
            "herbsSmall": [16, 0, 16, 16],
            "breadSmall": [32, 0, 16, 16],
            "cookedFishSmall": [48, 0, 16, 16],
            //"cookedMeatSmall": [64, 0, 16, 16],
            "fishSmall": [80, 0, 16, 16],
            //"meatSmall": [96, 0, 16, 16],
            "freshWaterSmall": [112, 0, 16, 16],
            "muddyWaterSmall": [0, 16, 16, 16],
            //"tool1Small": [16, 16, 16, 16],
            //"tool2Small": [32, 16, 16, 16],
            //"tool3Small": [48, 16, 16, 16],
            //"basket1Small": [64, 16, 16, 16],
            //"bucket1Small": [80, 16, 16, 16],
            //"campfireSmall": [96, 16, 16, 16],
            //"clothing1Small": [112, 16, 16, 16],
            "sticksSmall": [0, 32, 16, 16],
            "rocksSmall": [16, 32, 16, 16],
            "leavesSmall": [32, 32, 16, 16],
            "fiberSmall": [48, 32, 16, 16],
            "hideSmall": [64, 32, 16, 16],
            //"claySmall": [80, 32, 16, 16],
            //"mudSmall": [96, 32, 16, 16],
            //"compositeSmall": [112, 32, 16, 16],
            //"twineSmall": [0, 48, 16, 16],
            //"clothSmall": [16, 48, 16, 16],
            //"logsSmall": [32, 48, 16, 16],
            //"planksSmall": [48, 48, 16, 16],
            //"beamsSmall": [64, 48, 16, 16],
            "wheatSmall": [80, 48, 16, 16],
            "flourSmall": [96, 48, 16, 16],
            //"potatoSmall": [112, 48, 16, 16],
            "stoneSmall": [0, 64, 16, 16],
            "coalSmall": [16, 64, 16, 16],
            "copperOreSmall": [32, 64, 16, 16],
            "tinOreSmall": [48, 64, 16, 16],
            "ironOreSmall": [64, 64, 16, 16],
            "zincOreSmall": [80, 64, 16, 16],
            "siliconOreSmall": [96, 64, 16, 16],
            "goldOreSmall": [112, 64, 16, 16],
        });

        renderer.addSheetWithSprites("temp", temp, {
            "temp": [0, 0, 32, 32],
        });
    }
}