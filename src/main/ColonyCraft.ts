import { ClockController } from "./controllers/ClockController";
import { MouseController } from "./controllers/MouseController";
import { ScreenController } from "./controllers/ScreenController";
import { FontData } from "./data/FontData";
import { Inventory } from "./features/inventory/Inventory";
import { Item } from "./features/inventory/Item";
import { ItemGroup } from "./features/inventory/ItemGroup";
import { RenderUtil } from "./render/RenderUtil";
import { SpriteRenderer } from "./render/SpriteRenderer";
import { TextRenderer } from "./render/TextRenderer";
import { LayerGame } from "./render/layers/LayerGame";
import { LayerOverlay } from "./render/layers/LayerOverlay";
import { LayerUI } from "./render/layers/LayerUI";
import { OverlayInventory } from "./render/screens/OverlayInventory";
import { OverlayHUD } from "./render/screens/OverlayHUD";
import { ScreenPerformance } from "./render/screens/ScreenPerformance";
import { ScreenTitle } from "./render/screens/ScreenTitle";
import { SimulationController } from "./controllers/SimulationController";

import fontImage from "./resources/ui/font.png";
import fontImageSmall from "./resources/ui/fontsmall.png";
import buttons from "./resources/ui/buttons.png";
import items from "./resources/inventory/items.png";
import icons from "./resources/inventory/icons.png";
import temp from "./resources/ui/temp.png";

export class ColonyCraft {
    public static width: number;
    public static height: number;
    public static clock: ClockController;
    public static draw: RenderUtil;
    public static mouse: MouseController;
    public static currentScreens: string[];
    public static language: string = "en_us";
    public static inventory: Inventory;
    public static simulation: SimulationController;

    private static font: TextRenderer;
    private static fontSmall: TextRenderer;
    private static canvas: HTMLCanvasElement;
    private static ctx: CanvasRenderingContext2D;
    private static renderer: ScreenController;
    private static sprites: SpriteRenderer;

    public static main () {
        //Set width and height
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        //Initialize Renderers
        this.renderer = new ScreenController();
        this.font = new TextRenderer(FontData.normal, fontImage, 14, 18, 2);
        this.fontSmall = new TextRenderer(FontData.small, fontImageSmall, 7, 9, 1);
        this.sprites = new SpriteRenderer();
        this.draw = new RenderUtil(this.font, this.fontSmall, this.sprites);
        this.mouse = new MouseController();

        this.currentScreens = [];

        //Initialize Screens
        this.renderer.addLayerWithScreens(new LayerUI(), [
            new ScreenTitle(this.width, this.height),
            new ScreenPerformance(this.width, this.height),
            new OverlayHUD(this.width, this.height),
        ]);
        this.renderer.addLayerWithScreens(new LayerGame(), [
            
        ]);
        this.renderer.addLayerWithScreens(new LayerOverlay(), [
           new OverlayInventory(this.width, this.height), 
        ]);
        this.currentScreens.push("title");

        //Initialize Sprites
        this.sprites.addSheetWithSprites("buttons", buttons, {
            "play": [0, 0, 24, 24],
            "pause": [24, 0, 24, 24],
            "close": [0, 24, 24, 24]
        });

        this.sprites.addSheetWithSprites("items", items, {
            "storage": [0, 0, 32, 32],
        });

        this.sprites.addSheetWithSprites("icons", icons, {
            "iconStorage": [0, 0, 16, 16],
        });

        this.sprites.addSheetWithSprites("temp", temp, {
            "temp": [0, 0, 32, 32],
        });

        //Initialize Inventory
        this.inventory = new Inventory();

        //Inventory Details
        // Volume = m^3 per 1k units

        this.inventory.addCategoryWithItems(new ItemGroup("food", "Food"), [
            //TODO: FoodItem
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("fluids", "Fluids"), [
            //TODO: FluidItem
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("primitive", "Primitive Materials"), [
            new Item("sticks", 1, "Sticks"), //TODO: Balance
            new Item("rocks", 2, "Rocks"), //TODO: Balance
            new Item("leaves", 0.4, "Leaves") //TODO: Balance
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("lumber", "Lumber"), [
            new Item("logs", 4, "Logs"), //TODO: Balance
            new Item("planks", 1, "Planks"), //TODO: Balance
            new Item("beams", 0.5, "Beams"), //TODO: Balance
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("mining", "Mining"), [
            new Item("stone", 5, "Stone"), //TODO: Balance
            new Item("coal", 5, "Coal"), //TODO: Balance
            new Item("ironOre", 5, "Magnetite Ore"), //TODO: Balance
            new Item("tinOre", 5, "Casserite Ore"), //TODO: Balance
            new Item("copperOre", 5, "Chalcopyrite Ore"), //TODO: Balance
            new Item("zincOre", 5, "Sphalerite Ore"), //TODO: Balance
            new Item("goldOre", 8, "Gold Ore"), //TODO: Balance
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("building", "Building Materials"), [
            new Item("Stone Bricks", 2, "Stone Bricks"), //TODO: Balance
            
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("metallurgy", "Metallurgy"), [
            new Item("iron", 2, "Iron"), //TODO: Balance
            new Item("tin", 2, "Tin"), //TODO: Balance
            new Item("copper", 2, "Copper"), //TODO: Balance
            new Item("zinc", 2, "Zinc"), //TODO: Balance
            new Item("bronze", 2, "Bronze"), //TODO: Balance
            new Item("steel", 2, "Steel"), //TODO: Balance
            new Item("silicon", 2, "Silicon"), //TODO: Balance
            new Item("gold", 2, "Gold"), //TODO: Balance
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("industrial", "Industrial Materials"), [
            new Item("metalBeam", 1, "Metal Beams"), //TODO: Balance
            new Item("machineParts", 2, "Machine Parts"), //TODO: Balance
        ]);
        this.inventory.addCategoryWithItems(new ItemGroup("electronics", "Electronics"), [
            //TODO: Electronics
        ]);

        this.simulation = new SimulationController();

        //Create clock controller and start frame and tick
        this.clock = new ClockController(60, 1);
        this.clock.startFrame();
        //this.clock.startTick();
    }

    public static tick() {
        if (!this.simulation.running) return;
        if (++this.clock.day > 30) {
            this.clock.day = 1;
            if (++this.clock.season > 4) {
                this.clock.season = 1;
                this.clock.year++;
            }
        }
        this.inventory.calculateStorageUsed();
    }

    public static render() {
        //clear current screen
        this.renderer.clear();

        //perform button update
        this.mouse.update();

        //render screens
        this.renderer.render();

        //draw to canvas
        this.ctx.drawImage(this.renderer.canvas, 0, 0);
    }

    public static resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.renderer.resize();
    }

    public static sheetLoaded(name: string): boolean {
        return this.sprites.getLoaded(name);
    }
}