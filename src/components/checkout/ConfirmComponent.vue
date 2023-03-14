<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col w-full h-full p-6 lg:py-12 lg:px-24">
    <el-result
        icon="success"
        :title="t('messages.payment-confirm')"
        :sub-title="t('messages.reservation-confirm')"
    />
  </div>
</template>

<style scoped>

</style>