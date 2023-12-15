import type { Drinks } from "~/interfaces/drinks"

export const useFavoriteStore = defineStore("favorites", ()=> {
    const favorites = ref<Drinks[]>([])

    const addFavoriteStore = (drink: any) => {
        const favoritesFiltered = favorites.value.some((item: any) => item.idDrink === drink.idDrink)
        if(!favoritesFiltered) favorites.value.push(drink)
    }

    const removeFavoriteStore = (drink: any) => {
        favorites.value = favorites.value.filter(drinks => drinks.idDrink !== drink.idDrink)    
    }

    let favoritesVerify = (idDrink: string) => {
        return favorites.value.find((drink: any) => drink.idDrink == idDrink) !== undefined
    }

    return { favorites, addFavoriteStore, removeFavoriteStore, favoritesVerify }
}, {
    persist: true
})