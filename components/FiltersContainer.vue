<template>
    <div class="w-fit">
        <UContainer class="w-full flex flex-wrap justify-center space-x-6 p-4">
            <UContainer class="border-solid border-2 rounded-full bg-transparent pt-1 pb-1 border-violet-400 placeholder-slate-400 font-thin m-2">
                <select v-model="selectedCategorie" class="border-0 bg-transparent outline-none" @change="getDrinksByCategory()">
                    <option class="text-slate-400 bg-zinc-800" value="Favorites" :disabled="favorites.length < 1">{{ $t('favorites') }}</option>
                    <option class="text-slate-400 bg-zinc-800" v-for="categorie of categories" :key="categorie" :value="categorie">{{ categorie }}</option>
                </select>
            </UContainer>
            <UContainer  class=" border-solid border-2 rounded-full bg-transparent p-1 border-violet-400 placeholder-slate-400 font-thin m-2">
                <font-awesome-icon
                    class="ml-2 mr-2"
                    icon="fa-solid fa-magnifying-glass" />
                <input 
                    class=" border-0 bg-transparent outline-none"
                    v-model="search"
                    :placeholder="$t('search')"
                    @input="getDrinksDynamically()"
                >
            </UContainer>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { CocktailsRequests } from "../api/cocktail/requests/cocktails-requests";
    const { errorsVerify } = useErrors()
    const drinksAll = useDrinksAll()
    const favoriteStore = useFavoriteStore()
    const { favorites } = storeToRefs(favoriteStore)
    
    let selectedCategorie = useCategory()
    let search = ref('')
    let categories = ref([])

    const { $toast } = useNuxtApp()

    onMounted(()=> getDrinksByCategory())

    let drinks = useDrinks()

    let Cocktails = new CocktailsRequests()
    
    try {    
        categories.value = (await Cocktails.categoriesList()).data.drinks.map((item: any) => item.strCategory)
    } catch (error: any) {
        $toast.error(`${errorsVerify(error)}`)
    }


    async function getDrinksByCategory() {
        try{
            drinks.value = selectedCategorie.value === 'Favorites'? favorites.value : (await Cocktails.filterByCategory(selectedCategorie.value)).data.drinks
        } catch (error: any){
            $toast.error(`${errorsVerify(error)}`)
        }
    }

    async function getDrinksDynamically(){
        try {
            if(search.value){
                drinks.value = await drinksAll
                let cocktailsFiltered = drinks.value.filter((drinksFiltered: any) =>  drinksFiltered.strDrink.toUpperCase().startsWith(search.value.toUpperCase()))
                drinks.value = cocktailsFiltered.length > 0? cocktailsFiltered : []
            }else{
                await getDrinksByCategory()
            }
            
        } catch (error) {
            $toast.error(`${errorsVerify(error)}`)
        }
    }


</script>