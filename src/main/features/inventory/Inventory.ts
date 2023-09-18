import { Item } from "./Item";
import { ItemGroup } from "./ItemGroup";

export class Inventory {
    public categories: { [key: string]: ItemGroup } = {};
    public items: { [key: string]: Item } = {};
    
}