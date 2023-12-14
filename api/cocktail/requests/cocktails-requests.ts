import Cocktail from "../config/cocktail-v1.config";

export class CocktailsRequests {
    async categoriesList (): Promise<any> {
        return await Cocktail.get('/list.php?c=list')
    }

    async filterByCategory (category: string): Promise<any> {
        return await Cocktail.get(`/filter.php?c=${category}`)
    }

    async cocktailByName (cocktail: string): Promise<any> {
        return await Cocktail.get(`/search.php?s=${cocktail}`)
    }

    async cocktailById (cocktailId: string): Promise<any> {
        return await Cocktail.get(`/lookup.php?i=${cocktailId}`)
    }
}