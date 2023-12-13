<template>
    <div>
        <UContainer>
            <FiltersContainer/>
        </UContainer>
        <DrinksContainer/>
        <!-- {{ drinks }} -->
    </div>
</template>

<script lang="ts" setup>
    const drinks = useDrinks()
</script>