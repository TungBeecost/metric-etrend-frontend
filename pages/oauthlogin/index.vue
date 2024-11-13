<script setup lang="ts">
import type {LocationQuery} from "vue-router";

const route = useRoute()

interface TokenData {
  access_token: string
  token_type: string
}

const oAuthGoogleCallback = async (query: LocationQuery): Promise<TokenData | null | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.URL_AUTH_SERVICE_API}/auth/google/callback`
  try {
    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      query
      // query: {
      //   code: query.code,
      //   state: query.state
      // }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

onMounted(async () => {
  const tokenData = await oAuthGoogleCallback(route.query)
  console.log('tokenData', tokenData)
  if (!tokenData?.access_token) {
    return
  }
  const accessToken = useCookie("access-token", {maxAge: 60 * 60 * 24});
  accessToken.value = tokenData.access_token;
  navigateTo('/')
})
</script>

<template>
  <div class="oauth-page"/>
</template>

<style scoped lang="scss"></style>