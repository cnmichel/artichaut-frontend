<script setup lang="ts">
import {onBeforeMount, reactive, ref, watch} from "vue";
import { useI18n } from "vue-i18n";
import { getCurrentUser } from "@/services/api.js";
import type { FormInstance, FormRules } from 'element-plus';
import {ElMessage} from "element-plus";

const { t } = useI18n();

const props = defineProps(['cart'])
const emit = defineEmits(['next'])

const addressCheck = ref(true)
const billingForm = ref(true)
const cart = ref()
const totals = reactive({
  HT: 0,
  TTC: 0,
  TVA: 0,
  DC10: 0,
  DC25: 0
})

const customer = reactive({
  data: {
    firstname: '',
    lastname: '',
    tel_number: '',
    promo_10: 0,
    promo_25: 0,
    addresses: [{
      name: '',
      street: '',
      city: '',
      zip_code: '',
      country: ''
    }]
  }
})

let billingAddress = reactive({
  name: '',
  street: '',
  city: '',
  zip_code: '',
  country: ''
})

const formRef = ref<FormInstance>()
// Form validation rules
const rules = reactive<FormRules>({
  firstname: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  lastname: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  tel_number: [{
    type: "string",
    required: true,
    message: t('validations.format'),
    pattern: "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$",
    trigger: 'blur'
  }],
  name: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  street: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  city: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  country: [{ type: "string", required: true, message: t('validations.required'), trigger: 'blur' }],
  zip_code: [{
    type: "string",
    required: true,
    message: t('validations.format'),
    pattern: "^[a-z0-9][a-z0-9\\- ]{0,10}[a-z0-9]$",
    trigger: 'blur'
  }],
})

// Watcher to update totals values
watch(() => cart.value, () => {
  totals.HT = cart.value.HT;
  totals.TVA = cart.value.TVA;
  if (customer.data.promo_25 === 1) {
    console.log("25")
    totals.DC25 = (cart.value.TTC * 0.25).toFixed(2);
    totals.TTC = cart.value.TTC * 0.75;
  } else if (customer.data.promo_10 === 1) {
    console.log("10")
    totals.DC10 = (cart.value.TTC * 0.1).toFixed(2);
    totals.TTC = cart.value.TTC * 0.9;
  }
})

const handleCheck = (value: boolean) => {
  // Open billing form on checkbox unchecked
  billingForm.value = value;
}

const onSubmit = () => {
  // TODO implémenter la fonction pour valider le paiement et mettre à jour la réservation
  ElMessage({
    message: 'Fonctionalité en cours d\'implémentation',
    type: 'error',
    grouping: true,
    offset: 85
  })
  emit('next', '/checkout/confirm');
}

onBeforeMount(() => {
  // Fetch the current user information
  getCurrentUser().then((data: any) => {
    if (data.customer) {
      // Set customer information if exist
      customer.data = data.customer;
    }
  }).finally(() => {
    // Set cart props
    cart.value = props.cart;
  })
})
</script>

<template>
  <div class="flex flex-col lg:grid lg:grid-cols-5 w-full p-6 lg:py-12 lg:px-12">

    <!-- Form side -->
    <div class="flex flex-col w-full col-span-3 p-6 lg:px-12">
      <!-- Personal details -->
      <div class="personal-details">
        <h4 class="text-xl">{{ $t('titles.your-details') }}</h4>
        <el-divider />
        <el-form ref="formRef"
                 :model="customer.data" :rules="rules"
                 label-position="top" label-width="auto"
                 require-asterisk-position="right" size="large">
          <div class="flex flex-col justify-content-center lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.firstname`)" prop="firstname" required>
              <el-input v-model="customer.data.firstname" />
            </el-form-item>
            <el-form-item :label="t(`fields.lastname`)" prop="lastname" required>
              <el-input v-model="customer.data.lastname" />
            </el-form-item>
          </div>
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.phone`)" prop="tel_number" required>
              <el-input v-model="customer.data.tel_number" />
            </el-form-item>
          </div>
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.street`)" prop="addresses[0].street" required>
              <el-input v-model="customer.data.addresses[0].street" />
            </el-form-item>
            <el-form-item :label="t(`fields.zip-code`)" prop="addresses[0].zip_code" required>
              <el-input v-model="customer.data.addresses[0].zip_code" />
            </el-form-item>
          </div>
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.city`)" prop="addresses[0].city" required>
              <el-input v-model="customer.data.addresses[0].city" />
            </el-form-item>
            <el-form-item :label="t(`fields.country`)" prop="addresses[0].country" required>
              <el-input v-model="customer.data.addresses[0].country" />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- Billing address -->
      <div class="billing-address pt-12">
        <h4 class="text-xl">{{ $t('titles.billing-address') }}</h4>
        <el-divider />
        <el-checkbox v-model="addressCheck"
                     class="mb-4"
                     @change="handleCheck"
                     :label="t('fields.same-address')"
                     :validate-event="false"
                     size="large" />
        <el-form v-if="!billingForm" ref="formRef"
                 :model="billingAddress" :rules="rules"
                 label-position="top" label-width="auto"
                 require-asterisk-position="right" size="large">
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.label`)" prop="name" required>
              <el-input v-model="billingAddress.name" />
            </el-form-item>
          </div>
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.street`)" prop="street" required>
              <el-input v-model="billingAddress.street" />
            </el-form-item>
            <el-form-item :label="t(`fields.zip-code`)" prop="zip_code" required>
              <el-input v-model="billingAddress.zip_code" />
            </el-form-item>
          </div>
          <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            <el-form-item :label="t(`fields.city`)" prop="city" required>
              <el-input v-model="billingAddress.city" />
            </el-form-item>
            <el-form-item :label="t(`fields.country`)" prop="country" required>
              <el-input v-model="billingAddress.country" />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex flex-col w-full col-span-2 p-6 lg:px-12">
      <!-- Cart section -->
      <el-card class="box-card cart-recap backdrop-blur mb-6" shadow="hover">
        <div>
          <h4 class="text-2xl drop-shadow-lg text-white mb-6">{{ $t('titles.cart') }}</h4>
          <div class="flex justify-between">
            <h5 class="text-l drop-shadow-lg text-white">{{ $t('messages.excl-tax') }}</h5>
            <p class="text-l font-bold drop-shadow-lg text-white">{{ totals.HT }} €</p>
          </div>
          <div class="flex justify-between">
            <h5 class="text-l drop-shadow-lg text-white">{{ $t('messages.tax-10') }}</h5>
            <p class="text-l font-bold drop-shadow-lg text-white">{{ totals.TVA }} €</p>
          </div>
          <div v-if="customer.data.promo_10 === 1 && customer.data.promo_25 === 0" class="flex justify-between">
            <h5 class="text-l drop-shadow-lg text-white">{{ $t('messages.premium-dc') }}</h5>
            <p class="text-l font-bold drop-shadow-lg text-white">- {{ totals.DC10 }} €</p>
          </div>
          <div v-if="customer.data.promo_25 === 1" class="flex justify-between">
            <h5 class="text-l drop-shadow-lg text-white">{{ $t('messages.prestige-dc') }}</h5>
            <p class="text-l font-bold drop-shadow-lg text-white">- {{ totals.DC25 }} €</p>
          </div>
          <el-divider />
          <div class="flex justify-between">
            <h5 class="text-xl drop-shadow-lg text-white">{{ $t('messages.incl-tax') }}</h5>
            <p class="text-xl font-bold drop-shadow-lg text-white">{{ totals.TTC }} €</p>
          </div>
        </div>
      </el-card>
      <!-- Payment section -->
      <el-card class="box-card payment-stripe backdrop-blur" shadow="hover">
        <div class="flex flex-col">
          <h4 class="text-2xl drop-shadow-lg mb-6">{{ $t('titles.payment') }}</h4>
          <el-button class="w-2/3 self-center my-2" color="#253343" size="large" round @click="onSubmit(formRef)">
            {{ $t('buttons.pay') }}
          </el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<style scoped>
.cart-recap {
  border-radius: 12px;
  border-width: 0;
  background-color: rgba(30, 41, 59, 0.95);
}
.payment-stripe {
  border-radius: 12px;
  background-color: rgba(250, 250, 250, 0.90);
}
</style>