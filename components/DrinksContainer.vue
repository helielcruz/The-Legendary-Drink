<template>
    <div>
        <UContainer>
            <UCard class="bg-transparent h-auto border-solid border-2 rounded-s-md bg-transparent pt-1 pb-1 border-violet-400">
                <!-- <div v-for="drink of drinks" :key="drink">
                    {{ drink }}
                </div> -->
                <UPagination
                    v-model="drinks"
                    :active-button="{ variant: 'outline' }"
                    :inactive-button="{ color: 'gray' }"
                    :model-value="1"
                    :total="drinks.length"
                />
            </UCard>
        </UContainer>
    </div>
</template>

<script setup>
    let drinks = useDrinks()
</script>