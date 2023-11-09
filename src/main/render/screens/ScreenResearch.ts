import { ColonyCraft } from "../../ColonyCraft";
import { Unlockable } from "../../content/colony/other/Unlockable";
import { Technology } from "../../content/colony/research/Technology";
import { Trait } from "../../content/colony/traits/Trait";
import { KeyAction } from "../../player/KeyAction";
import { KeyBind } from "../../player/KeyBind";
import { Screen } from "../Screen";
import { Button } from "../ui/Button";
import { ClickHandler } from "../ui/ClickHandler";
import { Scrollable } from "../ui/Scrollable";
import { Slidable } from "../ui/Slidable";
import { Node } from "../ui/tree/Node";
import { Tree } from "../ui/tree/Tree";

export class ScreenResearch extends Screen {
    private closeButton: Button;
    private layout: Tree;
    private slider: Slidable;
    private scrollableX: Scrollable;
    private scrollableY: Scrollable;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private initialX: number = 0;
    private initialY: number = 0;
    private hover: string = "";
    private selectionClickable: ClickHandler;

    constructor(game: ColonyCraft, width: number, height: number) {
        super(width, height, 0, 0);
        this.closeButton = new Button(Math.floor(this.width - 31), 6, 32, 32, (game: ColonyCraft) => {
            game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
            game.currentScreens.push("game");
        }, (game: ColonyCraft) => {
            return game.currentScreens.includes("research");
        });

        game.mouse.registerClickable(this.closeButton);

        this.scrollableX = new Scrollable(0, 0, 1, "h", game => game.currentScreens.includes("research"));
        this.scrollableY = new Scrollable(0, 0, 1, "v", game => game.currentScreens.includes("research"));
        this.slider = new Slidable(0, 0, this.width, this.height, game => game.currentScreens.includes("research"), () => {}, (game, x, y) => {
            this.initialX = this.scrollableX.value;
            this.initialY = this.scrollableY.value;
        }, (game, x, y, offsetX, offsetY) => {
            this.scrollableX.setValue(this.initialX - offsetX);
            this.scrollableY.setValue(this.initialY - offsetY);
        });

        game.mouse.registerScrollable(this.scrollableX);
        game.mouse.registerScrollable(this.scrollableY);
        game.mouse.registerHoldable(this.slider);

        game.key.addAction(new KeyAction("closeResearch", "Close Research", (game, prevScreens) => {
            if (prevScreens.includes("research")) {
                game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
                game.currentScreens.push("game");
            }
        }));
        game.draw.addCloseAction(game.key.actions.closeResearch);

        game.key.addAction(new KeyAction("openResearch", "Open Research", (game, prevScreens) => {
            if (prevScreens.includes("game") && !prevScreens.includes("overlay")) {
                game.currentScreens.splice(game.currentScreens.indexOf("game"), 1);
                game.currentScreens.push("research");
            }
            else if (prevScreens.includes("research")) {
                game.currentScreens.splice(game.currentScreens.indexOf("research"), 1);
                game.currentScreens.push("game");
            }
        }));

        game.key.addAction(new KeyAction("centerTree", "Center Tree", (game, prevScreens) => {
            if (prevScreens.includes("research")) {
                this.scrollableX.setValue(0);
                this.scrollableY.setValue(0);
            }
        }));

        game.key.addBinding(new KeyBind("Open Tree", "T", "KeyT", [game.key.actions.openResearch]));
        game.key.addBinding(new KeyBind("Center Tree", "C", "KeyC", [game.key.actions.centerTree]));

        this.layout = new Tree(width, height);

        for (let id in game.colony.research.technologies) {
            const research = game.colony.research.technologies[id];
            this.layout.addNode(new Node(research.id, research.name, research.prereqs));
        }

        for (let id in game.colony.traits.traits) {
            const trait = game.colony.traits.traits[id];
            this.layout.addNode(new Node(trait.id, trait.name, trait.prereqs));
        }

        this.layout.processTree();

        this.selectionClickable = new ClickHandler(0, 0, this.width, this.height, (game, x, y) => {
            for (let node of this.layout.nodeList) {
                const n = this.layout.nodes[node];
                if (x >= n.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX && x <= n.pos[0] + Tree.NODE_SIZE[0] / 2 - this.offsetX && y >= n.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY && y <= n.pos[1] + Tree.NODE_SIZE[1] / 2 - this.offsetY) {
                    const unlockable = game.colony.getUnlockable(node);
                    if (unlockable instanceof Trait) continue;
                    let shown = true;
                    for (let prereq of n.prereqs) {
                        if (!game.colony.getUnlockable(prereq).unlocked) {
                            shown = false;
                            break;
                        }
                    }
                    if (shown && !unlockable.unlocked) game.colony.research.active = unlockable;
                    return;
                }
            }
            this.hover = "";
        }, game => game.currentScreens.includes("research"), (game, x, y) => {
            for (let node of this.layout.nodeList) {
                const n = this.layout.nodes[node];
                if (x >= n.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX && x <= n.pos[0] + Tree.NODE_SIZE[0] / 2 - this.offsetX && y >= n.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY && y <= n.pos[1] + Tree.NODE_SIZE[1] / 2 - this.offsetY) {
                    let shown = true;
                    for (let prereq of n.prereqs) {
                        if (!game.colony.getUnlockable(prereq).unlocked) {
                            shown = false;
                            break;
                        }
                    }
                    if (shown) this.hover = node;
                    else this.hover = "";
                    return;
                }
            }
            this.hover = "";
        });

        game.mouse.registerClickable(this.selectionClickable);
    }

    public render(game: ColonyCraft, ctx: OffscreenCanvasRenderingContext2D): void {
        const research = game.colony.research;

        this.offsetX = this.scrollableX.value;
        this.offsetY = this.scrollableY.value;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = "#222222";
        for (let i = 0; i < this.layout.maxRank; i++) {
            if (i % 2 == 0) ctx.fillRect(0, Math.round(i * (Tree.NODE_SIZE[1] + Tree.NODE_SPACING[1]) - this.offsetY + Tree.TOP_MARGIN - (Tree.NODE_SPACING[1] + Tree.NODE_SIZE[1]) / 2), this.width, Math.round(Tree.NODE_SIZE[1] + Tree.NODE_SPACING[1]));
        }

        for (let id of this.layout.nodeList) {
            const node = this.layout.nodes[id];
            if (node.pos[0] - this.offsetX < -Tree.NODE_SIZE * 2 || node.pos[0] - this.offsetX > this.width + Tree.NODE_SIZE[0] * 2 || node.pos[1] - this.offsetY < -Tree.NODE_SIZE[1] * 2 || node.pos[1] - this.offsetY > this.height + Tree.NODE_SIZE[1] * 2) continue;
            let unlockable: Unlockable = research.technologies[id];
            if (!unlockable) {
                unlockable = game.colony.traits.traits[id];
            }
            let shown = true;
            for (let prereq of node.prereqs) {
                if (!game.colony.getUnlockable(prereq).unlocked) {
                    shown = false;
                    break;
                }
            }
            if (unlockable && shown) {

                if (unlockable.unlocked) ctx.fillStyle = '#224422';
                else if (unlockable.type == "progress") ctx.fillStyle = '#444422';
                else if (unlockable.type == "food") ctx.fillStyle = '#224444';
                else ctx.fillStyle = '#222222';

                ctx.strokeStyle = "#777777";
                if (id == this.hover || node.prereqs.includes(this.hover) || node.postreqs.includes(this.hover)) {
                    if (unlockable.unlocked) ctx.strokeStyle = "#aaffaa";
                    else ctx.strokeStyle = "#ffffff";
                }
                ctx.lineWidth = 2;

                ctx.fillRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX), Math.round(node.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY), Tree.NODE_SIZE[0], Tree.NODE_SIZE[1]);

                //draw bar on the bottom of each node that shows what types of research it is
                if (unlockable instanceof Technology && shown) {
                    let types = [];
                    if (unlockable.needed.invention > 0) types.push("i");
                    if (unlockable.needed.math > 0) types.push("m");
                    if (unlockable.needed.physics > 0) types.push("p");
                    if (unlockable.needed.chemistry > 0) types.push("c");
                    if (unlockable.needed.biology > 0) types.push("b");
                    if (unlockable.needed.quantum > 0) types.push("q");

                    for (let i = 0; i < types.length; i++) {
                        let type = types[i];
                        if (type == "i") ctx.fillStyle = '#1E90FF';
                        else if (type == "m") ctx.fillStyle = '#FFD700';
                        else if (type == "p") ctx.fillStyle = '#48D1CC';
                        else if (type == "c") ctx.fillStyle = '#FF4500';
                        else if (type == "b") ctx.fillStyle = '#32CD32';
                        else if (type == "q") ctx.fillStyle = '#FF42EE';
                        ctx.fillRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 + i * Tree.NODE_SIZE[0] / types.length - this.offsetX), Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2 - 4 - this.offsetY), Math.round(Tree.NODE_SIZE[0] / types.length), 4);
                    }

                    if (unlockable.progress > 0 && unlockable.progress < 1) {
                        ctx.fillStyle = '#33FF33';
                        ctx.fillRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX), Math.round(node.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY), Math.round(Tree.NODE_SIZE[0] * unlockable.progress), 4);
                    }
                } else if (unlockable instanceof Trait && shown) {
                    ctx.fillStyle = unlockable.type === "s" ? "#8A2BE2" : unlockable.type === "c" ? "#ADFF2F" : unlockable.type === "p" ? "#FF7F50" : "#DAA520";
                    ctx.fillRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX), Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2 - 4 - this.offsetY), Tree.NODE_SIZE[0], 4);

                    if (unlockable.progress > 0 && unlockable.progress < 1) {
                        ctx.fillStyle = '#33FF33';
                        ctx.fillRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX), Math.round(node.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY), Math.round(Tree.NODE_SIZE[0] * unlockable.progress), 4);
                    }
                }

                ctx.strokeRect(Math.round(node.pos[0] - Tree.NODE_SIZE[0] / 2 - this.offsetX), Math.round(node.pos[1] - Tree.NODE_SIZE[1] / 2 - this.offsetY), Tree.NODE_SIZE[0], Tree.NODE_SIZE[1]);
                if (shown) {
                    game.draw.textCenter(node.name.split(" ").map(e => e[0]).join(""), node.pos[0] - this.offsetX, node.pos[1] - 14 - this.offsetY, 14, "white");
                    game.draw.textSmallCenter(node.name, node.pos[0] - this.offsetX, node.pos[1] + 6 - this.offsetY, 7, "white");
                }
            }
        }

        for (let req of this.layout.reqs) {
            ctx.beginPath();
            ctx.strokeStyle = "#ffffff55";
            let pre: Unlockable = game.colony.getUnlockable(req.pre);
            let post: Unlockable = game.colony.getUnlockable(req.post);
            if (pre.unlocked && post.unlocked) ctx.strokeStyle = "#ccffcc55";
            if (req.post == this.hover || req.pre == this.hover) {
                if (pre.unlocked && post.unlocked) ctx.strokeStyle = "#aaffaa";
                else ctx.strokeStyle = "#ffffff";
            }
            let postshown = true;
            for (let prereq of post.prereqs) {
                if (!game.colony.getUnlockable(prereq).unlocked) {
                    postshown = false;
                    break;
                }
            }
            if (pre.unlocked && postshown) {
                ctx.lineWidth = 1;
                ctx.moveTo(req.points[0][0] - this.offsetX, req.points[0][1] - this.offsetY);
                for (let i = 1; i < req.points.length; i++) {
                    ctx.lineTo(req.points[i][0] - this.offsetX, req.points[i][1] - this.offsetY);
                }
                ctx.stroke();
            }
        }

        this.scrollableX.resize(-Math.max(0, Math.max(...this.layout.subRanks) * (Tree.NODE_SIZE[0] + Tree.NODE_SPACING[0]) / 2 - this.width / 2), Math.max(0, Math.max(...this.layout.subRanks) * (Tree.NODE_SIZE[0] + Tree.NODE_SPACING[0]) / 2 - this.width / 2));
        this.scrollableY.resize(0, Math.max(0, this.layout.maxRank * (Tree.NODE_SIZE[1] + Tree.NODE_SPACING[1]) - this.height));

        game.draw.renderText(ctx);

        const current = game.colony.research.active;
        if (current != null) {
            ctx.fillStyle = "#222222";
            ctx.strokeStyle = "#777777";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(-50, this.height - 160, Math.floor(this.width / 3 + 50), 200, 6);
            ctx.fill();
            ctx.stroke();

            game.draw.textCenter(current.name, Math.floor(this.width / 6), this.height - 152, 14, "white");

            //overall
            ctx.fillStyle = "#33dd33";
            ctx.fillRect(10, this.height - 130, Math.floor(this.width / 3 - 20) * (current.progress), 24);
            ctx.strokeRect(10, this.height - 130, Math.floor(this.width / 3 - 20), 24);
            game.draw.textCenter(Math.floor(current.progress * 100) + "%", Math.floor(this.width / 6), this.height - 125, 14, "white");

            //invention
            if (current.needed.invention > 0) {
                ctx.fillStyle = "#1E90FF";
                ctx.fillRect(10, this.height - 102, Math.floor(this.width / 3 - 20) * (current.current.invention / current.needed.invention), 12);
                ctx.strokeRect(10, this.height - 102, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Invention: " + game.draw.toShortNumber(current.current.invention) + "/" + game.draw.toShortNumber(current.needed.invention), Math.floor(this.width / 6), this.height - 100, 7, "white");
            }

            //math
            if (current.needed.math > 0) {
                ctx.fillStyle = "#FFD700";
                ctx.fillRect(10, this.height - 86, Math.floor(this.width / 3 - 20) * (current.current.math / current.needed.math), 12);
                ctx.strokeRect(10, this.height - 86, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Math: " + game.draw.toShortNumber(current.current.math) + "/" + game.draw.toShortNumber(current.needed.math), Math.floor(this.width / 6), this.height - 84, 7, "white");
            }

            //physics
            if (current.needed.physics > 0) {
                ctx.fillStyle = "#48D1CC";
                ctx.fillRect(10, this.height - 70, Math.floor(this.width / 3 - 20) * (current.current.physics / current.needed.physics), 12);
                ctx.strokeRect(10, this.height - 70, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Physics: " + game.draw.toShortNumber(current.current.physics) + "/" + game.draw.toShortNumber(current.needed.physics), Math.floor(this.width / 6), this.height - 68, 7, "white");
            }

            //chemistry
            if (current.needed.chemistry > 0) {
                ctx.fillStyle = "#FF4500";
                ctx.fillRect(10, this.height - 54, Math.floor(this.width / 3 - 20) * (current.current.chemistry / current.needed.chemistry), 12);
                ctx.strokeRect(10, this.height - 54, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Chemistry: " + game.draw.toShortNumber(current.current.chemistry) + "/" + game.draw.toShortNumber(current.needed.chemistry), Math.floor(this.width / 6), this.height - 52, 7, "white");
            }

            //biology
            if (current.needed.biology > 0) {
                ctx.fillStyle = "#32CD32";
                ctx.fillRect(10, this.height - 38, Math.floor(this.width / 3 - 20) * (current.current.biology / current.needed.biology), 12);
                ctx.strokeRect(10, this.height - 38, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Biology: " + game.draw.toShortNumber(current.current.biology) + "/" + game.draw.toShortNumber(current.needed.biology), Math.floor(this.width / 6), this.height - 36, 7, "white");
            }

            //quantum
            if (current.needed.quantum > 0) {
                ctx.fillStyle = "#FF42EE";
                ctx.fillRect(10, this.height - 22, Math.floor(this.width / 3 - 20) * (current.current.quantum / current.needed.quantum), 12);
                ctx.strokeRect(10, this.height - 22, Math.floor(this.width / 3 - 20), 12);
                game.draw.textSmallCenter("Quantum: " + game.draw.toShortNumber(current.current.quantum) + "/" + game.draw.toShortNumber(current.needed.quantum), Math.floor(this.width / 6), this.height - 20, 7, "white");
            }
        }

        if (this.hover != "") {
            ctx.fillStyle = "#222222";
            ctx.strokeStyle = "#777777";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(Math.round(2 * this.width / 3), this.height - 160, Math.floor(this.width / 3 + 50), 200, 6);
            ctx.fill();
            ctx.stroke();

            const unlockable = game.colony.getUnlockable(this.hover);
            if (unlockable) {
                game.draw.textCenter(unlockable.name, Math.floor(5 * this.width / 6), this.height - 152, 14, "white");
                if (unlockable instanceof Technology) {
                    let i = 0;
                    for (let desc of unlockable.desc) {
                        game.draw.textSmallCenter(desc, Math.floor(5 * this.width / 6), this.height - 116 + i * 10, 7, "white");
                        i++;
                    }

                    if (unlockable.type == "progress") {
                        game.draw.textSmallCenter("Unlocks further progress", Math.floor(5 * this.width / 6), this.height - 132, 7, "yellow");
                    } else if (unlockable.type == "food") {
                        game.draw.textSmallCenter("Unlocks further food production", Math.floor(5 * this.width / 6), this.height - 132, 7, "cyan");
                    }

                    if (!unlockable.unlocked) {
                        const active = game.colony.research.active;
                        if (unlockable.needed.invention > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active ? (game.draw.toShortNumber(unlockable.current.invention) + "/") : "") + game.draw.toShortNumber(unlockable.needed.invention) + " Invention", Math.floor(5 * this.width / 6), this.height - 62, 7, "#1e90ff");
                        if (unlockable.needed.math > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.math) + "/") : "") + game.draw.toShortNumber(unlockable.needed.math) + " Math", Math.floor(5 * this.width / 6), this.height - 52, 7, "#ffd700");
                        if (unlockable.needed.physics > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.physics) + "/") : "") + game.draw.toShortNumber(unlockable.needed.physics) + " Physics", Math.floor(5 * this.width / 6), this.height - 42, 7, "#48d1cc");
                        if (unlockable.needed.chemistry > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.chemistry) + "/") : "") + game.draw.toShortNumber(unlockable.needed.chemistry) + " Chemistry", Math.floor(5 * this.width / 6), this.height - 32, 7, "#ff4500");
                        if (unlockable.needed.biology > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.biology) + "/") : "") + game.draw.toShortNumber(unlockable.needed.biology) + " Biology", Math.floor(5 * this.width / 6), this.height - 22, 7, "#32cd32");
                        if (unlockable.needed.quantum > 0) game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active  ? (game.draw.toShortNumber(unlockable.current.quantum) + "/") : "") + game.draw.toShortNumber(unlockable.needed.quantum) + " Quantum", Math.floor(5 * this.width / 6), this.height - 12, 7, "#ff42ee");
                    }

                } else if (unlockable instanceof Trait) {
                    switch (unlockable.type) {
                        case "s":
                            game.draw.textSmallCenter("Social Trait", Math.floor(5 * this.width / 6), this.height - 125, 7, "#8a2be2");
                            break;
                        case "c":
                            game.draw.textSmallCenter("Cultural Trait", Math.floor(5 * this.width / 6), this.height - 125, 7, "#adff2f");
                            break;
                        case "p":
                            game.draw.textSmallCenter("Political Trait", Math.floor(5 * this.width / 6), this.height - 125, 7, "#ff7f50");
                            break;
                        case "r":
                            game.draw.textSmallCenter("Religious Trait", Math.floor(5 * this.width / 6), this.height - 125, 7, "#daa520");
                            break;
                    }

                    let i = 0;
                    for (let desc of unlockable.desc) {
                        game.draw.textSmallCenter(desc, Math.floor(5 * this.width / 6), this.height - 105 + i * 10, 7, "white");
                        i++;
                    }

                    if (!unlockable.unlocked) {
                        game.draw.textSmallCenter("Costs:", Math.floor(5 * this.width / 6), this.height - 22, 7, "white");
                        if (unlockable.type == "s") {
                            const active = game.colony.traits.active.s;
                            game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active ? game.draw.toShortNumber(unlockable.current) + "/" : "") + game.draw.toShortNumber(unlockable.needed) + " Social Development Points", Math.floor(5 * this.width / 6), this.height - 12, 7, "#8a2be2");
                        }
                        else if (unlockable.type == "c") {
                            const active = game.colony.traits.active.c;
                            game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active ? game.draw.toShortNumber(unlockable.current) + "/" : "") + game.draw.toShortNumber(unlockable.needed) + " Cultural Development Points", Math.floor(5 * this.width / 6), this.height - 12, 7, "#adff2f");
                        }
                        else if (unlockable.type == "p") {
                            const active = game.colony.traits.active.p;
                            game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active ? game.draw.toShortNumber(unlockable.current) + "/" : "") + game.draw.toShortNumber(unlockable.needed) + " Political Development Points", Math.floor(5 * this.width / 6), this.height - 12, 7, "#ff7f50");
                        }
                        else if (unlockable.type == "r") {
                            const active = game.colony.traits.active.r;
                            game.draw.textSmallCenter((unlockable.progress > 0 || unlockable === active ? game.draw.toShortNumber(unlockable.current) + "/" : "") + game.draw.toShortNumber(unlockable.needed) + " Religious Development Points", Math.floor(5 * this.width / 6), this.height - 12, 7, "#daa520");
                        }
                    }
                }
            }
        }

        game.draw.sprite(ctx, "close", this.width - 32, 8, 24, 24);

        game.draw.renderText(ctx);
    }

    public active(game: ColonyCraft): boolean {
        return game.currentScreens.includes("research");
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}