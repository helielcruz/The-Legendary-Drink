import type { Drinks } from "~/interfaces/drinks";

export const useDrinks = () => useState<Drinks[]>("drinks", ()=> [])

export const useFavorite = () => useState<Drinks[]>("favorites", ()=> [])