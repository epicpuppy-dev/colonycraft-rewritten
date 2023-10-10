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
import { UIHUD } from "./render/screens/UIHUD";
import { UIPerformance } from "./render/screens/UIPerformance";
import { ScreenTitle } from "./render/screens/ScreenTitle";
import { SimulationController } from "./controllers/SimulationController";
import fontImage from "./resources/ui/font.png";
import fontImageSmall from "./resources/ui/fontsmall.png";
import { EntityController } from "./controllers/EntityController";
import { Colony } from "./content/colony/Colony";
import { LootManager } from "./content/loot/LootManager";
import { LootData } from "./data/LootData";
import { SpriteData } from "./data/SpriteData";
import { InventoryData } from "./data/InventoryData";
import { JobData } from "./data/JobData";
import { LayerPanel } from "./render/layers/LayerPanel";
import { PanelJobs } from "./render/screens/PanelJobs";
import { PanelResearch } from "./render/screens/PanelResearch";
import { OverlayResearch } from "./render/screens/OverlayResearch";
import { KeyController } from "./controllers/KeyController";
import { PanelTraits } from "./render/screens/PanelTraits";
import { UnlockableData } from "./data/UnlockableData";
import { OverlayTraits } from "./render/screens/OverlayTraits";
import { PanelBuildings } from "./render/screens/PanelBuildings";
import { BuildingData } from "./data/BuildingData";
import { OverlayBuildings } from "./render/screens/OverlayBuildings";

export class ColonyCraft {
    public width: number;
    public height: number;
    public clock: ClockController;
    public draw: RenderUtil;
    public mouse: MouseController;
    public currentScreens: string[];
    public language: string = "en_us";
    public colony: Colony;
    public simulation: SimulationController;
    public entities: EntityController;
    public loot: LootManager;
    public key: KeyController;

    private font: TextRenderer;
    private fontSmall: TextRenderer;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private renderer: ScreenController;
    private sprites: SpriteRenderer;

    constructor () {
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
        this.key = new KeyController();

        //Initialize Renderers
        this.renderer = new ScreenController(this);
        this.font = new TextRenderer(this, FontData.normal, fontImage, 14, 18, 2);
        this.fontSmall = new TextRenderer(this, FontData.small, fontImageSmall, 7, 9, 1);
        this.sprites = new SpriteRenderer();
        this.draw = new RenderUtil(this, this.font, this.fontSmall, this.sprites);

        //Initialize Controls
        this.mouse = new MouseController();

        this.currentScreens = [];

        //Initialize Screens
        this.renderer.addLayerWithScreens(new LayerGame(this), [
            new ScreenTitle(this, this.width, this.height),
        ]);
        this.renderer.addLayerWithScreens(new LayerPanel(this), [
            new PanelJobs(this, this.width, this.height),
            new PanelResearch(this, this.width, this.height),
            new PanelTraits(this, this.width, this.height),
            new PanelBuildings(this, this.width, this.height),
        ]);
        this.renderer.addLayerWithScreens(new LayerUI(this), [
            new UIPerformance(this.width, this.height),
            new UIHUD(this, this.width, this.height),
        ]);
        this.renderer.addLayerWithScreens(new LayerOverlay(this), [
           new OverlayInventory(this, this.width, this.height), 
           new OverlayResearch(this, this.width, this.height),
           new OverlayTraits(this, this.width, this.height),
           new OverlayBuildings(this, this.width, this.height),
        ]);
        this.currentScreens.push("title");

        SpriteData.addSprites(this.sprites);

        //Initialize Colony
        this.colony = new Colony(this);
        this.loot = new LootManager();

        UnlockableData.addUnlockables(this);
        InventoryData.addItems(this.colony.inventory);
        LootData.addLoot(this.loot, this.colony.inventory);
        JobData.addJobs(this, this.colony.jobs);
        BuildingData.addBuildings(this, this.colony.buildings);

        //this.colony.research.active = this.colony.research.technologies.test;

        //Initialize Simulation
        this.simulation = new SimulationController();

        //Create clock controller and start frame and tick
        this.clock = new ClockController(60, 1);
        this.clock.startFrame(this);
        //this.clock.startTick();

        this.colony.buildings.queueBuilding(this.colony.buildings.buildings.test, 2);
    }

    public tick() {
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

    public render() {
        //clear current screen
        this.renderer.clear();

        //perform button update
        this.mouse.update(this);
        this.key.tick(this);

        //render screens
        this.renderer.render(this);

        //draw to canvas
        this.ctx.drawImage(this.renderer.canvas, 0, 0);
    }

    public resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.renderer.resize();
    }

    public sheetLoaded(name: string): boolean {
        return this.sprites.getLoaded(name);
    }
}