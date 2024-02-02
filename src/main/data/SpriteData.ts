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

        let items: {[key: string]: [number, number, number, number]} = {};
        const itemList = [
            "berries", "herbs", "bread", "cookedFish", "cookedMeat", "fish", "meat", 
            "freshWater", "muddyWater", "tool1", "tool2", "tool3", "basket1", "bucket1",
            "campfire", "clothing1", "sticks", "rocks", "leaves", "fiber", "hide", "clay",
            "composite", "twine", "cloth", "logs", "planks", "wheat", "flour", "potato",
            "stone", "coal", "copperOre", "tinOre", "ironOre", "zincOre", "siliconOre", "goldOre",
            "bricks", "copper", "tin", "iron", "zinc", "bronze", "steel", "gold"];
        for (let i = 0; i < itemList.length; i++) {
            items[itemList[i].toString() + "Small"] = [(i % 8) * 16, Math.floor(i / 8) * 16, 16, 16]
        }

        renderer.addSheetWithSprites("items", itemsSmall, items);

        renderer.addSheetWithSprites("temp", temp, {
            "temp": [0, 0, 32, 32],
        });
    }
}