export default defineNuxtRouteMiddleware((to, from) => {
    const param = to.params.value

    if(param) {
        return navigateTo("/")
    }
})