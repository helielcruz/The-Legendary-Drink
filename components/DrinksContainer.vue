<template>
    <div>
        <UContainer>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent border-solid border-2 rounded-md pt-1 pb-1 border-violet-400">
                <div class="flex flex-col h-full m-2 p-2" v-for="drink of drinksPerPage" :key="drink">
                    <div class=" font-bold text-slate-400  shadow-black " >
                        <h2>{{ drink.strDrink.toUpperCase() }}</h2>
                    </div>
                    <UContainer class=" relative m-0 pl-0 pr-0 p-0 h-5/6 lg:pr-0 lg:pl-0 transition-all transform duration-500 ease-in-out opacity-100"
                        v-if="seeMore && drinkId == drink.idDrink">
                        <div
                            :style="{ backgroundImage: `url(${cocktail.data.drinks[0].strDrinkThumb})` }" 
                            class="h-full p-4 max-w-full flex flex-col rounded-t-md text-zinc-800">
                            <span class=" z-10 font-semibold">Instructions: {{cocktail.data.drinks[0].strInstructions}}</span>
                        </div>
                        <div class="rounded-t-md absolute inset-0 bg-white bg-opacity-50"></div>
                    </UContainer >
                    <img v-else class=" rounded-t-md shadow-rose-600 object-cover transition-opacity duration-500 ease-in-out opacity-50 hover:opacity-100" 
                        :src="drink.strDrinkThumb" alt="drink image">
                    <button
                        @click="seeMoreEnable(drink.idDrink)"
                        class=" hover:bg-emerald-600 text-violet-400 bg-transparent border-solid border-2 pt-1 pb-1 border-violet-400">
                        {{ seeMore && drinkId == drink.idDrink? 'See less' : 'See more' }}
                    </button>
                </div>           
            </div>
            <div>
                <button class="bg-transparent  hover:bg-emerald-600 text-violet-400 border-2 border-solid border-violet-400 m-2 p-2" 
                    @click="pagination(1)" :disabled="begin">
                    <font-awesome-icon icon="fa-solid fa-backward-step" /> Begin
                </button>
                <button class="bg-transparent  hover:bg-emerald-600 text-violet-400 border-2 border-solid border-violet-400 m-2 p-2" 
                    @click="pagination(2)" :disabled="previous">
                    <font-awesome-icon icon="fa-solid fa-chevron-left" /> Previous
                </button>
                <button class="bg-transparent  hover:bg-emerald-600 text-violet-400 border-2 border-solid border-violet-400 m-2 p-2" 
                    @click="pagination(3)" :disabled="next">
                    Next <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </button>           
            </div>
        </UContainer>
    </div>
</template>

<script setup>
    import { CocktailsRequests } from '../api/cocktail/requests/cocktails-requests'
    
    let itemsPerPage = 6
    let seeMore = ref(false)
    let drinkId = ref(0)
    let drinks = useDrinks()
    let drinksPerPage = ref(Array.from(drinks.value).slice(0, itemsPerPage))
    let begin = ref(true)
    let previous = ref(true)
    let next = ref(false)
    let page = ref(0)
    let cocktail = ref()

    watch(drinks, async (newDrinks, oldDrinks) => {
        drinksPerPage.value = Array.from(newDrinks).slice(0, itemsPerPage)
    })
    
    async function pagination(value) {
        switch(value) {
            case 1:
                page.value = 0
                slicePage(page.value)
                begin.value = true
                break
            case 2:
                if(page.value > 0) {
                    page.value--
                    slicePage(page.value)
                    next.value = false
                } else {
                    previous.value = true
                }
                break
            case 3:
                if ((page.value + 1) * itemsPerPage < drinks.value.length) {
                    page.value++
                    slicePage(page.value)
                    previous.value = false
                    begin.value = false
                } else {
                    next.value = true
                }

        }
    }
    function slicePage(page) {
        let start = page * itemsPerPage;
        let end = start + itemsPerPage;
        drinksPerPage.value = drinks.value.slice(start, end)
    }

    async function seeMoreEnable(cocktailId) {
        await getCocktailInformations(cocktailId)
        seeMore.value = seeMore.value && drinkId.value == cocktailId ? false: true,
        drinkId.value = cocktailId
        console.log(drinkId.value);
    }

    async function getCocktailInformations(cocktailId) {
        cocktail.value = await new CocktailsRequests().cocktailById(cocktailId)
    }
</script>