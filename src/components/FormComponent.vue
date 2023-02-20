<script setup lang="ts">
import {ref, onBeforeMount, reactive, shallowRef, watch} from 'vue'
import { map, mapValues, keyBy } from 'lodash'
import { getLangs } from '@/services/api.js'

interface Field {
  name: string,
  type: string,
  label: string
}

const props = defineProps<{
  mode: 'create'|'edit'
  openForm: boolean
  fields: Field[]
  data?: {}
  lang: number
  onSubmit: (data: any, lang: number) => {}
  onClose: () => void
}>()

// do not use same name with ref
const form = reactive(mapValues(keyBy(props.fields, 'name'), ''))
const langs = shallowRef('')
const selectedLang = ref(1)

onBeforeMount(() => {
  getLangs().then((data: any) => langs.value = data)
})

watch(
    () => props.data,
    () => {
      map(form, (v, k) => form[k] = props.data[k])
    }
)

watch(
    () => props.lang,
    () => {
      console.log(props.lang)
      selectedLang.value = props.lang;
    }
)

</script>

<template>
  <el-dialog :model-value="props.openForm" destroy-on-close :title="props.mode === 'create' ? 'Création' : 'Edition'">
    <el-form :model="form" label-position="top" label-width="120px" >

      <el-form-item v-for="({ name, label, type }, i) in fields" :key="i" :label="label">
        <el-input v-if="type === 'input'" v-model="form[name]"/>
        <el-input v-if="type === 'textarea'" v-model="form[name]" :autosize="{ minRows: 2 }" type="textarea"/>
        <el-input v-if="type === 'url'" v-model="form[name]">
          <template #prepend>Url</template>
        </el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-select style="float: left" v-model="selectedLang" default-first-option	>
          <el-option
              v-for="lang in langs"
              :key="lang.id"
              :label="lang.code"
              :value="lang.id"
          />
        </el-select>
        <el-button plain @click="onClose">Annuler</el-button>
        <el-button color="#00B561" @click="props.onSubmit(form, selectedLang)">{{ props.mode === 'create' ? 'Créer' : 'Sauvegarder' }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
.el-button.is-plain {
  --el-button-hover-text-color: #00B561 !important;
  --el-button-hover-border-color: #00B561 !important;
}
.el-input {
  --el-input-focus-border-color: #00B561 !important;
}
.el-textarea {
  --el-input-focus-border-color: #00B561 !important;
}
</style>