<script lang="ts">

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // something vue-i18n options here ...
})

const app = createApp({
  // something vue options here ...
})

app.use(i18n)
app.mount('#app')

</script>

<template>

  <h1>{{ $t("message.H1") }}</h1>
</template>
