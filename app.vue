<template>
  <a-extract-style>
    <a-config-provider
        :theme="{
            token: {
              'colorPrimary': '#e85912',
              'colorTextBase': '#241e46',
              'colorError': '#ee3324',
              'borderRadius': 8,
              'wireframe': false
            },
          }"
    >
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </a-config-provider>
  </a-extract-style>
</template>
