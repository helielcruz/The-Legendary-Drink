<template>
    <div>
        <select v-model="selectedCategorie">
            <option v-for="categorie of categories" :key="categorie" :value="categorie">{{ categorie }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { CocktailsRequests } from "../api/cocktail/requests/cocktails-requests";
    
    const selectedCategorie = ''

    let categories = await new CocktailsRequests().categoriesList()
    categories = categories.data.drinks.map((item: any) => item.strCategory)


</script>