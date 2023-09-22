import { ClockController } from "./controllers/ClockController";
import { MouseController } from "./controllers/MouseController";
import { ScreenController } from "./controllers/ScreenController";
import { FontData } from "./data/FontData";
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
import { EntityController } from "./controllers/EntityController";
import { Colony } from "./features/colony/Colony";
import { LootManager } from "./features/loot/LootManager";
import { LootData } from "./data/LootData";
import { SpriteData } from "./data/SpriteData";

export class ColonyCraft {
    public static width: number;
    public static height: number;
    public static clock: ClockController;
    public static draw: RenderUtil;
    public static mouse: MouseController;
    public static currentScreens: string[];
    public static language: string = "en_us";
    public static colony: Colony;
    public static simulation: SimulationController;
    public static entities: EntityController;
    public static loot: LootManager;

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

        //Initialize Entity Ticker
        this.entities = new EntityController();

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

        SpriteData.addSprites(this.sprites);

        //Initialize Colony
        this.colony = new Colony();
        this.loot = new LootManager();
        LootData.addLoot(this.loot, this.colony.inventory);

        //Initialize Simulation
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
        this.entities.tick(this);
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