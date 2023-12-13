<template>
    <div class="w-fit">
        <UContainer class="w-full flex flex-wrap justify-center space-x-6 p-4">
            <UContainer class="border-solid border-2 rounded-full bg-transparent pt-1 pb-1 border-violet-400 placeholder-slate-400 font-thin m-2">
                <select v-model="selectedCategorie" class="border-0 bg-transparent outline-none" @change="getDrinksByCategory()">
                    <option class="text-slate-400 bg-zinc-800" value="" :disabled="true">Categorias</option>
                    <option class="text-slate-400 bg-zinc-800" v-for="categorie of categories" :key="categorie" :value="categorie">{{ categorie }}</option>
                </select>
            </UContainer>
            <UContainer  class="border-solid border-2 rounded-full bg-transparent p-1 border-violet-400 placeholder-slate-400 font-thin m-2">
                <font-awesome-icon
                    class="ml-2 mr-2"
                    icon="fa-solid fa-magnifying-glass" />
                <input 
                    class="border-0 bg-transparent outline-none"
                    v-model="search"
                    placeholder="Pesquisar"
                >
            </UContainer>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { CocktailsRequests } from "../api/cocktail/requests/cocktails-requests";
    
    let selectedCategorie = ref('')
    let search = ref('')
    // let responseCategory = ref({})

    let drinks = useDrinks()

    let Cocktails = new CocktailsRequests()
    
    let categories = (await Cocktails.categoriesList()).data.drinks.map((item: any) => item.strCategory)


    async function getDrinksByCategory() {
        drinks.value = (await Cocktails.filterByCategory(selectedCategorie.value)).data.drinks
    }


</script>