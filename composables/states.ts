import type { Drinks } from "~/interfaces/drinks";

export const useDrinks = () => useState<Drinks[]>("drinks", ()=> [])

export const useCategory = () => useState<string>("category", ()=> 'Shake')

export const useLoadingCarrossel = () => useState<Boolean>("loadingCarrossel", ()=> false)