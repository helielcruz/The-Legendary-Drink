<template>
    <div>
        <FiltersContainer/>
        
        <DrinksContainer/>
        <!-- {{ drinks }} -->
    </div>
</template>

<script lang="ts" setup>
    const drinks = useDrinks()
</script>