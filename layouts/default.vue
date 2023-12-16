<template>
    <div>
        <UContainer class="grid grid-cols-6 place-items-center">
            <img class=" w-40 col-span-2" src="../assets/images/_c6668a1a-b7c3-48e5-be1e-67501f56d759-removebg-preview (1).png" alt="">
            <div class=" col-start-5 h-10 rounded-md">
                <select v-model="locale" class=" bg-transparent outline-none p-2">
                    <option  class=" bg-zinc-200 text-zinc-400" value="pt" selected>PT</option>
                    <option v-for="language of languages" :key="language" class=" bg-zinc-200 text-zinc-400" :value="language">{{ language }}</option>
                </select>
            </div>
        </UContainer>
        <slot></slot>
        <UContainer class="grid grid-cols-5 mt-2 place-items-center w-full bg-zinc-800">
            <div class=" col-span-5">Developed by <a class=" text-violet-400" href="https://br.linkedin.com/in/heliel-quintiliano-58b3a2174">Heliel Cruz</a></div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
    import languages from "../locale/languages.locale.json";
    const { locale } = useI18n()
</script>