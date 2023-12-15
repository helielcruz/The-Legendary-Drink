import type { Drinks } from "~/interfaces/drinks";

export const useDrinks = () => useState<Drinks[]>("drinks", ()=> [])