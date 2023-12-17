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
    const { locale } = useI18n()
    const { errorsVerify } = useErrors()
    const drinksAll = useDrinksAll()
    const favoriteStore = useFavoriteStore()
    const { favorites } = storeToRefs(favoriteStore)
    
    let selectedCategorie = useCategory()
    let search = ref('')
    let categories = ref([])
    let loading = useLoadingCarrossel()

    const { $toast } = useNuxtApp()

    onMounted(()=> getDrinksByCategory())

    let drinks = useDrinks()

    let Cocktails = new CocktailsRequests()
    
    try {
        loading.value = true    
        categories.value = (await Cocktails.categoriesList()).data.drinks.map((item: any) => item.strCategory)
        loading.value = false
    } catch (error: any) {
        loading.value = false
        $toast.error(`${errorsVerify(error, locale)}`)
    }


    async function getDrinksByCategory() {
        try{
            loading.value = true
            drinks.value = selectedCategorie.value === 'Favorites'? favorites.value : (await Cocktails.filterByCategory(selectedCategorie.value)).data.drinks
            loading.value = false
        } catch (error: any){
            loading.value = false
            $toast.error(`${errorsVerify(error, locale)}`)
        }
    }

    async function getDrinksDynamically(){
        try {
            if(search.value){
                loading.value = true
                drinks.value = await drinksAll
                loading.value = false
                let cocktailsFiltered = drinks.value.filter((drinksFiltered: any) =>  drinksFiltered.strDrink.toUpperCase().includes(search.value.toUpperCase()))
                drinks.value = cocktailsFiltered.length > 0? cocktailsFiltered : []
            }else{
                loading.value = true
                await getDrinksByCategory()
                loading.value = false
            }
            
        } catch (error) {
            loading.value = false
            $toast.error(`${errorsVerify(error, locale)}`)
        }
    }


</script>