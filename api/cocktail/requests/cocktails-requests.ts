import Cocktail from "../config/cocktail-v1.config";

export class CocktailsRequests {
    async categoriesList (): Promise<any> {
        return await Cocktail.get('/list.php?c=list')
    }
}