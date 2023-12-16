import type { Drinks } from "~/interfaces/drinks";
import { CocktailsRequests } from "../api/cocktail/requests/cocktails-requests";

export default async function () {

    let Cocktails = new CocktailsRequests()
    const categories = (await Cocktails.categoriesList()).data.drinks.map((item: any) => item.strCategory)

    return new Promise<Drinks[]>((resolve) => { 
        Promise.all(categories.map(async (categorie: string): Promise<Drinks[]> => (await Cocktails.filterByCategory(categorie)).data.drinks))
        .then(drinksAll => resolve(drinksAll.flat()))
    })

}