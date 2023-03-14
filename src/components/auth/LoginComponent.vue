<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
import type { FormInstance, FormRules } from 'element-plus';
import { login } from "@/services/auth.js";

const { t } = useI18n();

// Events emitted on login action
const emit = defineEmits<{
  (e: 'login', isLogged: boolean): void
}>()

const alertDisplay = ref(false)
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: '',
})

// Form validation rules
const rules = reactive<FormRules>({
  email: [{ type: "email", required: true, message: t('validations.email'), trigger: 'blur' }],
  password: [{ type: "string", required: true, message: t('validations.password'), trigger: 'blur' }],
})

const onSubmit = async (formRef: FormInstance) => {
  // Return if no form instance active
  if (!formRef) return
  // Init loading on submit button
  isLoading.value = true;
  // Form validation
  await formRef.validate((valid) => {
    if (valid) {
      // Login user via api with email and password
      const $user = {
        email: form.email,
        password: form.password,
      }
      login($user).then(({ email, token }: any) => {
        if (token) {
          // Emit login event
          emit('login', true);
          localStorage.setItem('user_email', email);
          localStorage.setItem('token', token);
          isLoading.value = false;
        } else {
          // Display error alert on login fail
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
  <div class="grid content-between h-full">
    <!-- Title and subtitle section -->
    <div>
      <h4 class="text-3xl mb-3">{{ $t('titles.login') }}</h4>
      <p class="text-slate-500 mb-8">{{ $t('auth.login-text') }}</p>
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
        <el-form-item :label="t('auth.email-login')" prop="email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item :label="t('auth.password-login')" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-alert v-if="alertDisplay" :description="t('validations.login-error')" type="error" :closable="false"/>
        <el-form-item>
          <el-button class="w-full mt-6"
                     color="#00B561"
                     :loading="isLoading"
                     @click="onSubmit(formRef)">
            {{ $t('buttons.login') }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-button class="w-full mb-2" link>
        {{ $t('auth.forgot-password') }}
      </el-button>
    </div>
    <!-- Other action section -->
    <div>
      <el-divider content-position="center">
        <template v-slot:default>
          <p>{{ $t('messages.or') }}</p>
        </template>
      </el-divider>
      <router-link to="/signup">
        <el-button class="w-full mt-2" size="large" plain>
          {{ $t('buttons.signup') }}
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>