import { Node } from "./Node";
import { Requirement } from "./Requirement";

export class Tree {
    public static readonly NODE_SPACING = [50, 100];
    public static readonly NODE_SIZE = [150, 50];
    public static readonly TOP_MARGIN = 50;

    public nodes: {[id: string]: Node} = {};
    public reqs: Requirement[] = [];
    public nodeList: string[] = [];
    private width: number;
    private height: number;
    public maxRank: number = 0;
    public subRanks: number[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public addNode(node: Node): void {
        this.nodes[node.id] = node;
    }

    public processTree(): void {
        this.processNodes();
        this.rankNodes();
        this.orderNodes(10);
        this.positionNodes();
        this.processRequirements();
    }

    private processNodes(): void {
        //reset postreqs of all nodes
        for (let id in this.nodes) {
            this.nodes[id].postreqs = [];
        }

        //set postreqs of all nodes
        for (let id in this.nodes) {
            const node = this.nodes[id];
            for (let prereq of node.prereqs) {
                this.nodes[prereq].postreqs.push(node.id);
            }
        }
    }

    private rankNodes(): void {
        //reset rank of all nodes
        for (let id in this.nodes) {
            this.nodes[id].rank = -1;
        }

        let nodes: string[] = [];
        let rank = 0;
        while (nodes.length < Object.keys(this.nodes).length) {
            let newNodes: string[] = [];
            for (let id in this.nodes) {
                const node = this.nodes[id];

                //if a node has a rank already, skip it
                if (node.rank >= 0) continue;

                let prereqsMet = true;
                for (let prereq of node.prereqs) {
                    if (!nodes.includes(prereq)) {
                        prereqsMet = false;
                        break;
                    }
                }

                if (prereqsMet) {
                    node.rank = rank;
                    newNodes.push(id);
                }
            }

            nodes = nodes.concat(newNodes);
            rank++;

            //timeout if we get stuck
            if (rank > Object.keys(this.nodes).length) {
                console.error("Tree: Unsolvable tree");
                break;
            }
        }
        this.maxRank = rank;
    }

    private orderNodes(times: number = 3): void {
        this.nodeList = [];
        //add base nodes first
        for (let id in this.nodes) {
            if (this.nodes[id].rank == 0) {
                this.nodeList.push(id);
            }
        }

        //loop through node list and add nodes with postreqs to the list
        for (let i = 0; i < this.nodeList.length; i++) {
            const node = this.nodes[this.nodeList[i]];
            for (let postreq of node.postreqs) {
                if (!this.nodeList.includes(postreq)) {
                    this.nodeList.push(postreq);
                }
            }
        }

        //assign each node a subrank and subtotal
        //  count number of nodes in each rank
        let rankCounts: number[] = new Array(this.maxRank).fill(0);
        for (let id of this.nodeList) {
            const node = this.nodes[id];
            rankCounts[node.rank]++;
        }

        //sort nodes by pos index
        //pos index = ([average index of all prereqs] / [max index of all prereqs] + [average index of all postreqs] / [max index of all postreqs]) / 2
        for (let j = 0; j < times; j++) {
            //  assign each node a subrank and subtotal
            let subRank: number[] = new Array(this.maxRank).fill(0);
            for (let id of this.nodeList) {
                const node = this.nodes[id];
                node.subrank = subRank[node.rank]++;
                node.subtotal = rankCounts[node.rank];
            }
            for (let i = 0; i < this.nodeList.length; i++) {
                const node = this.nodes[this.nodeList[i]];
                let totalNodes = 0;
                let totalPos = 0;
                for (let prereq of node.prereqs) {
                    totalPos += this.nodes[prereq].subrank / (this.nodes[prereq].subtotal - 1);
                    totalNodes++;
                }
                for (let postreq of node.postreqs) {
                    totalPos += this.nodes[postreq].subrank / (this.nodes[postreq].subtotal - 1);
                    totalNodes++;
                }

                if (totalNodes == 0) {totalNodes = 1; totalPos = 0;}

                node.priority = totalPos / totalNodes;

                //sort list of prereqs
                node.prereqs.sort((a, b) => {
                    return this.nodes[a].subrank - (this.nodes[a].subtotal - 1) / 2 - this.nodes[b].subrank - (this.nodes[b].subtotal - 1) / 2;
                });

                //sort list of postreqs
                node.postreqs.sort((a, b) => {
                    return this.nodes[a].subrank - (this.nodes[a].subtotal - 1) / 2 - this.nodes[b].subrank - (this.nodes[b].subtotal - 1) / 2;
                });
            }
            this.nodeList.sort((a, b) => {
                return this.nodes[a].priority - this.nodes[b].priority;
            });
        }
        this.subRanks = rankCounts;
    }

    private positionNodes(): void {
        const SPACING = [Tree.NODE_SPACING[0] + Tree.NODE_SIZE[0], Tree.NODE_SPACING[1] + Tree.NODE_SIZE[1]];

        let rank = 0;
        while (true) {
            let nodes = 0;
            for (let id of this.nodeList) {
                const node = this.nodes[id];

                if (node.rank == rank) {
                    nodes++;
                }
            }

            const offsetLeft = Math.round((nodes - 1) * SPACING[0] / 2);
            
            let pos = 0;
            for (let id of this.nodeList) {
                const node = this.nodes[id];

                if (node.rank == rank) {
                    node.pos = [Math.round(this.width / 2 - offsetLeft + pos * SPACING[0]), Tree.TOP_MARGIN + rank * SPACING[1]];
                    pos++;
                }
            }

            if (nodes == 0) break;
            rank++;
        }
    }

    private processRequirements(): void {
        this.reqs = [];

        //sort list of postreqs by postition
        for (let id of this.nodeList) {
            const node = this.nodes[id];
            node.postreqs.sort((a, b) => this.nodeList.indexOf(a) - this.nodeList.indexOf(b));
        }

        //for each rank calculate how many reqs there are from this rank to the next
        let xValues: [number, number][][][] = [];
        for (let i = 0; i < this.maxRank; i++) {
            xValues.push([]);
        }
        let rankCounts: number[] = new Array(this.maxRank).fill(0);

        const SPACING = [Tree.NODE_SPACING[0] + Tree.NODE_SIZE[0], Tree.NODE_SPACING[1] + Tree.NODE_SIZE[1]];

        let gapTotals: {[key: number]: number}[] = [];
        for (let i = 0; i < this.maxRank; i++) {
            gapTotals.push({});
        }

        //calculate how many lines are going into each gap
        for (let id of this.nodeList) {
            const node = this.nodes[id];
            let i = 0;
            let offsetLeft = node.postreqs.length * 2;
            for (let postreq of node.postreqs) {
                let postnode = this.nodes[postreq];
                if (postnode.rank - 1 != node.rank) {
                    let prevX = Math.round(node.pos[0] - offsetLeft + i * 4) + 0.5;
                    for (let r = node.rank; r < postnode.rank - 1; r++) {
                        //find nearest available gap in rank
                        let nearestGap: number;
                        if (this.subRanks[r + 1] % 2 == 0) nearestGap = Math.floor((prevX + SPACING[0] / 2) / SPACING[0]);
                        else nearestGap = Math.floor(prevX / SPACING[0]) + 0.5;
                        if (gapTotals[r][nearestGap]) gapTotals[r][nearestGap]++;
                        else gapTotals[r][nearestGap] = 1;

                        prevX = nearestGap * SPACING[0];
                    }
                }
                i++;
            }
        }

        let gapCurrent: {[key: number]: number}[] = [];
        for (let i = 0; i < this.maxRank; i++) {
            gapCurrent.push({});
        }

        for (let id of this.nodeList) {
            const node = this.nodes[id];
            let i = 0
            let offsetLeft = (node.postreqs.length - 1) * 2;
            for (let postreq of node.postreqs) {
                let postnode = this.nodes[postreq];
                if (postnode.rank - 1 != node.rank) {
                    let prevX = node.pos[0] - offsetLeft + i * 4;
                    for (let r = node.rank; r < postnode.rank; r++) {
                        let x: number = this.findNearestGap(node, postnode, r, prevX, gapCurrent, gapTotals);

                        //determine if you can combine several lines on the same y level
                        let newXRange: [number, number] = [Math.round(prevX) + 0.5, Math.round(x) + 0.5];
                        let newYLevel = true;
                        let reverse = newXRange[0] < newXRange[1];
                        for (let y = 0; y < xValues[r].length; y++) {
                            if (reverse) y = xValues[r].length - y - 1;
                            let yLevel = xValues[r][y];
                            let combineYLevel = true;
                            for (let range of yLevel) {
                                if (!(Math.min(newXRange[0], newXRange[1]) >= range[1] + 4 || Math.max(newXRange[0], newXRange[1]) <= range[0] - 4)) {
                                    combineYLevel = false;
                                }
                            }
                            if (combineYLevel) {
                                yLevel.push([Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]);
                                newYLevel = false;
                                break;
                            }
                        }
                        if (newYLevel) {
                            if (!reverse) xValues[r].push([[Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]]);
                            else if (reverse) xValues[r].unshift([[Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]]);
                            rankCounts[r]++;
                        }
                        prevX = x;
                    }
                    i++;
                    continue;
                }

                //determine if you can combine several lines on the same y level
                let newXRange: [number, number] = [Math.round(node.pos[0] - offsetLeft + i * 4) + 0.5, Math.round(postnode.pos[0] - postnode.prereqs.length * 2 + postnode.prereqs.indexOf(node.id) * 4) + 0.5];
                let newYLevel = true;
                let reverse = newXRange[0] < newXRange[1];
                for (let y = 0; y < xValues[node.rank].length; y++) {
                    if (reverse) y = xValues[node.rank].length - y - 1;
                    let yLevel = xValues[node.rank][y];
                    let combineYLevel = true;
                    for (let range of yLevel) {
                        if (!(Math.min(newXRange[0], newXRange[1]) >= range[1] + 4 || Math.max(newXRange[0], newXRange[1]) <= range[0] - 4)) {
                            combineYLevel = false;
                        }
                    }
                    if (combineYLevel) {
                        yLevel.push([Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]);
                        newYLevel = false;
                        break;
                    }
                }
                if (newYLevel) {
                    if (!reverse) xValues[node.rank].push([[Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]]);
                    else if (reverse) xValues[node.rank].unshift([[Math.min(newXRange[0], newXRange[1]), Math.max(newXRange[0], newXRange[1])]]);
                    rankCounts[node.rank]++;
                }
                i++;
            }
        }

        //position lines
        gapCurrent = [];
        for (let i = 0; i < this.maxRank; i++) {
            gapCurrent.push({});
        }
        for (let id of this.nodeList) {
            const node = this.nodes[id];
            let i = 0
            let offsetLeft = (node.postreqs.length - 1) * 2;
            for (let postreq of node.postreqs) {
                let postnode = this.nodes[postreq];

                if (postnode.rank - 1 != node.rank) {
                    let prevX = node.pos[0] - offsetLeft + i * 4;
                    let points: [number, number][] = [[Math.round(prevX) + 0.5, Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2) + 0.5]];
                    for (let r = node.rank; r < postnode.rank; r++) {
                        let x: number = this.findNearestGap(node, postnode, r, prevX, gapCurrent, gapTotals);

                        //find the y level of the line
                        let yLevel = 0;
                        let newXRange: [number, number] = [Math.round(prevX) + 0.5, Math.round(x) + 0.5];
                        for (let y = 0; y < xValues[r].length; y++) {
                            let yLevelFound = false;
                            for (let range of xValues[r][y]) {
                                if (range[0] == Math.min(...newXRange) && range[1] == Math.max(...newXRange)) {
                                    yLevelFound = true;
                                    break;
                                }
                            }
                            if (yLevelFound) {
                                yLevel = y;
                                break;
                            }
                        }

                        points.push([Math.round(prevX) + 0.5, Math.round(node.pos[1] + SPACING[1] / 2 - rankCounts[r] * 2 + yLevel * 4 + (r - node.rank) * SPACING[1]) + 0.5]);
                        points.push([Math.round(x) + 0.5, Math.round(node.pos[1] + SPACING[1] / 2 - rankCounts[r] * 2 + yLevel * 4 + (r - node.rank) * SPACING[1]) + 0.5]);

                        prevX = x;
                    }
                    points.push([Math.round(postnode.pos[0] - postnode.prereqs.length * 2 + postnode.prereqs.indexOf(node.id) * 4) + 0.5, Math.round(postnode.pos[1] - Tree.NODE_SIZE[1] / 2) + 0.5]);
                    this.reqs.push(new Requirement(node.id, postreq, points));
                } else {
                    let yLevel = 0;
                    let currentRange = [Math.round(node.pos[0] - offsetLeft + i * 4) + 0.5, Math.round(postnode.pos[0] - postnode.prereqs.length * 2 + postnode.prereqs.indexOf(node.id) * 4) + 0.5];
                    for (let y = 0; y < xValues[node.rank].length; y++) {
                        let yLevelFound = false;
                        for (let range of xValues[node.rank][y]) {
                            if (range[0] == Math.min(...currentRange) && range[1] == Math.max(...currentRange)) {
                                yLevelFound = true;
                                break;
                            }
                        }
                        if (yLevelFound) {
                            yLevel = y;
                            break;
                        }
                    }

                    this.reqs.push(new Requirement(node.id, postreq, [
                        [currentRange[0], Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2) + 0.5], 
                        [currentRange[0], Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2 + Tree.NODE_SPACING[1] / 2 - rankCounts[node.rank] * 2 + yLevel * 4) + 0.5],
                        [currentRange[1], Math.round(node.pos[1] + Tree.NODE_SIZE[1] / 2 + Tree.NODE_SPACING[1] / 2 - rankCounts[node.rank] * 2 + yLevel * 4) + 0.5],
                        [currentRange[1], Math.round(postnode.pos[1] - Tree.NODE_SIZE[1] / 2) + 0.5]
                    ]));
                }
                i++;
            }
        }
    }

    private findNearestGap (node: Node, postnode: Node, r: number, prevX: number, gapCurrent: {[key: number]: number}[], gapTotals: {[key: number]: number}[]): number {
        const SPACING: [number, number] = [Tree.NODE_SIZE[0] + Tree.NODE_SPACING[0], Tree.NODE_SIZE[1] + Tree.NODE_SPACING[1]];
        if (r == postnode.rank - 1) {
            return postnode.pos[0] - postnode.prereqs.length * 2 + postnode.prereqs.indexOf(node.id) * 4;
        //if the line is to the right or left of all nodes in the next rank, just draw a straight line down
        } else if (prevX > this.width / 2 + (this.subRanks[r + 1]) / 2 * -SPACING[0] && prevX < this.width / 2 + (this.subRanks[r + 1]) / 2 * SPACING[0]) {
            //find nearest available gap in rank
            let nearestGap: number;
            if (this.subRanks[r + 1] % 2 == 0) nearestGap = Math.floor((prevX + SPACING[0] / 2 - this.width / 2) / SPACING[0]);
            else nearestGap = Math.floor((prevX - this.width / 2) / SPACING[0]) + 0.5;
            if (gapCurrent[r][nearestGap]) gapCurrent[r][nearestGap]++;
            else gapCurrent[r][nearestGap] = 1;

            //find the x value of the gap
            if (!gapTotals[r][nearestGap]) gapTotals[r][nearestGap] = 1;
            return nearestGap * SPACING[0] + this.width / 2 - (gapTotals[r][nearestGap] - 1) * 2 + (gapCurrent[r][nearestGap] - 1) * 4;
        } else {
            return prevX;
        }
    }
}