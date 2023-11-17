import { ColonyCraft } from "../ColonyCraft";
import { Statistic } from "../content/stats/Statistic";
import { StatsManager } from "../content/stats/StatsManager";

export class StatsData {
    public static addStats (game: ColonyCraft, manager: StatsManager) {
        const intervals = {"daily": 2, "quarterly": 30, "yearly": 120};
        manager.addStatistic(new Statistic(game, "population", "Total", intervals, (game: ColonyCraft) => {
            return game.colony.population.seniors + game.colony.population.adults + game.colony.population.children + game.colony.population.babies;
        }));
        manager.addStatistic(new Statistic(game, "seniors", "Seniors", intervals, (game: ColonyCraft) => game.colony.population.seniors));
        manager.addStatistic(new Statistic(game, "adults", "Adults", intervals, (game: ColonyCraft) => game.colony.population.adults));
        manager.addStatistic(new Statistic(game, "children", "Children", intervals, (game: ColonyCraft) => game.colony.population.children));
        manager.addStatistic(new Statistic(game, "babies", "Infants", intervals, (game: ColonyCraft) => game.colony.population.babies));
        manager.addStatistic(new Statistic(game, "morale", "Morale", intervals, (game: ColonyCraft) => game.colony.welfare.morale));
        manager.addStatistic(new Statistic(game, "health", "Health", intervals, (game: ColonyCraft) => game.colony.welfare.health));
        manager.addStatistic(new Statistic(game, "storageFree", "Free", intervals, (game: ColonyCraft) => game.colony.inventory.storageCapacity - game.colony.inventory.storageUsed));
        manager.addStatistic(new Statistic(game, "storageUsed", "Used", intervals, (game: ColonyCraft) => game.colony.inventory.storageUsed));
        manager.addStatistic(new Statistic(game, "storageCapacity", "Capacity", intervals, (game: ColonyCraft) => game.colony.inventory.storageCapacity));
        manager.addStatistic(new Statistic(game, "landFree", "Free", intervals, (game: ColonyCraft) => game.colony.buildings.landMax - game.colony.buildings.landPending));
        manager.addStatistic(new Statistic(game, "landPending", "Pending", intervals, (game: ColonyCraft) => game.colony.buildings.landPending));
        manager.addStatistic(new Statistic(game, "landUsed", "Used", intervals, (game: ColonyCraft) => game.colony.buildings.landUsed));
        manager.addStatistic(new Statistic(game, "landMax", "Total", intervals, (game: ColonyCraft) => game.colony.buildings.landMax));
    }
}