<script setup lang="ts">
import {reactive, ref} from 'vue';
import { useI18n } from "vue-i18n";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus';
import { register } from "@/services/auth.js";

const { t } = useI18n();

// Events emitted on signup action
const emit = defineEmits<{
  (e: 'register', isRegistered: boolean): void
}>()

const alertDisplay = ref(false)
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
})

// Rule for validating confirmed password
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t('validations.password')))
  } else if (value !== form.password) {
    callback(new Error(t('validations.password-confirm')))
  } else {
    callback()
  }
}

// Form validation rules
const rules = reactive<FormRules>({
  email: [{ type: "email", required: true, message: t('validations.email'), trigger: 'blur' }],
  password: [{ type: "string", required: true, message: t('validations.password'), trigger: 'blur' }],
  passwordConfirm: [{ validator: validatePass, trigger: 'blur' },],
})

const onSubmit = async (formRef: FormInstance) => {
  // Return if no form instance active
  if (!formRef) return
  // Init loading on submit button
  isLoading.value = true;
  // Form validation
  await formRef.validate((valid) => {
    if (valid) {
      // Register user via api with email and password
      const $user = {
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirm
      }
      register($user).then((data: any) => {
        if (data.token) {
          // Emit register event and notification message
          emit('register', true);
          isLoading.value = false;
          ElMessage({
            message: t('validations.register-success'),
            type: 'success',
            offset: 30
          })
        } else {
          // Display error alert on register fail
          alertDisplay.value = true;
          isLoading.value = false;
        }
      })
    }
    isLoading.value = false;
  })
}
</script>

<template>
  <el-card class="grid box-card w-full h-auto xs:max-lg:justify-center lg:h-full lg:py-12 lg:px-16 py-3 px-3">
    <div class="grid content-between h-full">
      <!-- Title and subtitle section -->
      <div>
        <h4 class="text-3xl mb-3">{{ $t('titles.signup') }}</h4>
        <p class="text-slate-500 mb-8">{{ $t('auth.signup-text') }}</p>
      </div>
      <!-- Form section -->
      <div>
        <el-form ref="formRef"
                 :model="form"
                 :rules="rules"
                 label-position="top"
                 label-width="auto"
                 hide-required-asterisk
                 size="large">
          <el-form-item :label="t('auth.email-signup')" prop="email">
            <el-input v-model="form.email" type="email" />
          </el-form-item>
          <el-form-item :label="t('auth.password-signup')" prop="password">
            <el-input v-model="form.password" type="password" show-password />
          </el-form-item>
          <el-form-item :label="t('auth.password-confirm')" prop="passwordConfirm">
            <el-input v-model="form.passwordConfirm" type="password" show-password />
          </el-form-item>
          <el-alert v-if="alertDisplay" :description="t('validations.register-error')" type="error" :closable="false"/>
          <el-form-item>
            <el-button class="w-full mt-6"
                       color="#00B561"
                       :loading="isLoading"
                       @click="onSubmit(formRef)">
              {{ $t('buttons.signup') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- Other action section -->
      <div>
        <el-divider content-position="center">
          <template v-slot:default>
            <p>{{ $t('messages.or') }}</p>
          </template>
        </el-divider>
        <router-link to="/login">
          <el-button class="w-full mt-2" size="large" plain>
            {{ $t('buttons.login') }}
          </el-button>
        </router-link>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>