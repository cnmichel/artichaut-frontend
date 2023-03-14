<script setup lang="ts">
import { onBeforeMount, ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getCurrentUser, getCustomerReservations } from "@/services/api.js";
import { ElMessage } from 'element-plus'
import { Edit, Delete } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from 'element-plus';
import { isEmpty, words } from 'lodash';
import dayjs from "dayjs";

const { t } = useI18n();

interface User {
  avatar: string,
  email: string,
  email_verified_at?: string,
  customer: Customer
}

interface Customer {
  firstname: string,
  lastname: string,
  tel_number: string,
  promo_10: boolean,
  promo_25: boolean,
  addresses: Address[],
}

interface Address {
  name: string,
  street: string,
  city: string,
  zip_code: string,
  country: string,
}

interface Reservation {
  start_date: string,
  end_date: string,
}

const displayName = computed(() => {
  // Fetch user email and name from local storage
  const email = localStorage.getItem('user_email');
  const name = localStorage.getItem('user_name');
  // Display email if no name was set in local storate
  return name ? words(name)[0] : email
})

let currentUser = reactive({
  avatar: '',
  email: '',
  customer: {
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

const password = reactive({
  current: '',
  new: '',
  confirm: ''
})

const customerStatus = ref('')

const reservations = reactive({
  data: [
      {
        start_date: '',
        end_date: '',
        total_reservation: 0
      }
  ]
})

const formRef = ref<FormInstance>()
// Form validation rules
const rules = reactive<FormRules>({
  email: [{ type: "email", required: true, message: t('validations.email'), trigger: 'blur' }],
  password: [{ type: "string", required: true, message: t('validations.password'), trigger: 'blur' }],
})

const handleTableEdit = (index: number, row: Address) => {
  // TODO implémenter la fonction pour éditer une ligne du tableau
  ElMessage({
    message: 'Fonctionalité en cours d\'implémentation',
    type: 'warning',
    grouping: true,
    offset: 85
  })
}

const handleTableDelete = (index: number, row: Address) => {
  // TODO implémenter la fonction pour supprimer une ligne du tableau
  ElMessage({
    message: 'Fonctionalité en cours d\'implémentation',
    type: 'warning',
    grouping: true,
    offset: 85
  })
}

const handleTableDownload = (index: number, row: Reservation) => {
  // TODO implémenter la fonction pour télécharger une facture
  ElMessage({
    message: 'Fonctionalité en cours d\'implémentation',
    type: 'warning',
    grouping: true,
    offset: 85
  })
}

const onSubmit = async (formRef: FormInstance) => {
  // TODO implémenter la fonction pour les requêtes de formulaire
  ElMessage({
    message: 'Fonctionalité en cours d\'implémentation',
    type: 'warning',
    grouping: true,
    offset: 85
  })
}

onBeforeMount(() => {
  // Fetch the current user information
  getCurrentUser().then((data: User) => {
    currentUser = {...currentUser, ...data};
    if (data.customer) {
      // Get the membership tier of the customer to display correct card
      customerStatus.value = data.customer.promo_25 ? 'prestige' : data.customer.promo_10 ? 'premium' : 'classic'
      // Store the customer username in the local storage
      const username = data.customer.firstname + ' ' + data.customer.lastname;
      localStorage.setItem('user_name', username);
    }
  })
  // Fetch the current user reservations
  getCustomerReservations().then((data: Reservation[]) => {
    reservations.data = isEmpty(data) ? [] : data;
  })
})
</script>

<template>
  <!-- Header -->
  <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-24 justify-between w-full bg-slate-200 p-6 lg:py-12 lg:px-24">
    <el-card class="box-card user-info lg:h-60">
      <div class="grid user-bg bg-cover content-between w-full h-full"
           :style="{ backgroundImage: `url(src/assets/backgrounds/${customerStatus}.png)`}">
        <div>
          <h4 v-if="customerStatus !== 'premium'" class="text-2xl drop-shadow-lg mb-6">{{ $t('messages.hello') }} {{ displayName }}</h4>
          <h4 v-if="customerStatus === 'premium'" class="text-2xl drop-shadow-lg text-white mb-6">{{ $t('messages.hello') }} {{ displayName }}</h4>
        </div>
        <div class="mb-1">
          <h5 v-if="customerStatus === 'classic'" class="text-xl drop-shadow-lg">{{ $t('messages.classic') }}</h5>
          <div v-if="customerStatus === 'premium'">
            <h5 class="text-xl drop-shadow-lg text-white">{{ $t('messages.premium') }}</h5>
            <span class="drop-shadow-lg text-white">{{ $t('messages.premium-adv') }}</span>
          </div>
          <div v-if="customerStatus === 'prestige'">
            <h5 class="text-xl drop-shadow-lg">{{ $t('messages.prestige') }}</h5>
            <span class="drop-shadow-lg">{{ $t('messages.prestige-adv') }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card lg:h-60">
      <template #header>
        <div class="card-header">
          <h4 class="text-2xl drop-shadow-lg">{{ $t('messages.resa-in-progress') }}</h4>
        </div>
      </template>
      <div>
        <p>{{ $t('fields.arrival') }}: {{ dayjs(reservations.data[0].start_date).format('dddd DD MMMM YYYY') }}</p>
        <p>{{ $t('fields.departure') }}: {{ dayjs(reservations.data[0].end_date).format('dddd DD MMMM YYYY') }}</p>
      </div>
    </el-card>
  </div>

  <!-- Main -->
  <div class="flex flex-col w-full px-6 lg:px-12">
    <el-collapse accordion class="lg:px-12">

      <!-- Reservation collapse -->
      <el-collapse-item name="my-resa">
        <template v-slot:title>
          <h4 class="text-xl">{{ $t('menus.my-reservations') }}</h4>
        </template>
        <el-table :data="reservations.data" fit height="auto" size="large" style="width: 100%">
          <el-table-column prop="start_date" :label="t('fields.start-date')" min-width="120"/>
          <el-table-column prop="end_date" :label="t('fields.end-date')" min-width="120"/>
          <el-table-column prop="status.label_fr" :label="t('fields.status')" min-width="200"/>
          <el-table-column prop="payment.method" :label="t('fields.payment-method')" min-width="150"/>
          <el-table-column :label="t('fields.receipt')">
            <template v-slot:default="scope">
              <el-button color="#253343" @click="handleTableDownload((scope.$index, scope.row))">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
              </el-button>
            </template>
          </el-table-column>
          <template v-slot:empty>
            <el-empty :image-size="100" description="No Data" />
          </template>
        </el-table>
        <el-pagination class="mt-6 justify-center"
                       layout="prev, pager, next"
                       :total="reservations.data.length"
                       />
      </el-collapse-item>

      <!-- Information collapse -->
      <el-collapse-item name="my-infos">
        <template v-slot:title>
          <h4 class="text-xl">{{ $t('menus.my-infos') }}</h4>
        </template>
        <div class="grid px-6 lg:px-48">
          <el-form ref="formRef" :model="currentUser" :rules="rules" label-position="top" label-width="auto" size="large">
            <div class="flex flex-col justify-content-center lg:grid lg:grid-cols-2 lg:gap-16">
              <el-form-item :label="t(`fields.firstname`)">
                <el-input v-model="currentUser.customer.firstname" />
              </el-form-item>
              <el-form-item :label="t(`fields.lastname`)">
                <el-input v-model="currentUser.customer.lastname" />
              </el-form-item>
            </div>
            <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
              <el-form-item :label="t(`fields.phone`)">
                <el-input v-model="currentUser.customer.tel_number" />
              </el-form-item>
            </div>
            <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
              <el-form-item :label="t(`fields.street`)">
                <el-input v-model="currentUser.customer.addresses[0].street" />
              </el-form-item>
              <el-form-item :label="t(`fields.zip-code`)">
                <el-input v-model="currentUser.customer.addresses[0].zip_code" />
              </el-form-item>
            </div>
            <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
              <el-form-item :label="t(`fields.city`)">
                <el-input v-model="currentUser.customer.addresses[0].city" />
              </el-form-item>
              <el-form-item :label="t(`fields.country`)">
                <el-input v-model="currentUser.customer.addresses[0].country" />
              </el-form-item>
            </div>
            <div class="flex flex-col lg:grid justify-items-center mt-6">
              <el-form-item class="w-full lg:w-3/12">
                <el-button class="w-full" color="#253343" round @click="onSubmit(formRef)">
                  {{ $t('buttons.save') }}
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-item>

      <!-- Addresses collapse -->
      <el-collapse-item name="my-addrs">
        <template v-slot:title>
          <h4 class="text-xl">{{ $t('menus.my-addresses') }}</h4>
        </template>
        <el-table class="mb-6" :data="currentUser.customer.addresses" fit height="auto" size="large" style="width: 100%">
          <el-table-column prop="name" :label="t('fields.name')" />
          <el-table-column prop="street" :label="t('fields.street')" min-width="200" />
          <el-table-column prop="zip_code" :label="t('fields.zip-code')" min-width="150" />
          <el-table-column prop="city" :label="t('fields.city')" min-width="200" />
          <el-table-column prop="country" :label="t('fields.country')" min-width="150" />
          <el-table-column align="right" min-width="150">
            <template v-slot:default="scope">
              <el-button color="#253343" @click="handleTableEdit(scope.$index, scope.row)">
                <Edit class="w-5 h-5" />
              </el-button>
              <el-button type="danger" @click="handleTableDelete(scope.$index, scope.row)">
                <Delete class="w-5 h-5" />
              </el-button>
            </template>
          </el-table-column>
          <template v-slot:empty>
            <el-empty :image-size="100" description="No Data" />
          </template>
        </el-table>
      </el-collapse-item>

      <!-- Email collapse -->
      <el-collapse-item name="my-email">
        <template v-slot:title>
          <h4 class="text-xl">{{ $t('menus.modify-email') }}</h4>
        </template>
        <div class="grid px-6 lg:px-48">
          <el-form :model="currentUser" :rules="rules" :disabled="formEdit" label-position="top" label-width="auto" size="large">
            <div class="flex flex-col lg:grid lg:grid-cols-5">
              <el-form-item class="lg:col-span-3 lg:col-start-2" :label="t(`fields.email`)">
                <el-input v-model="currentUser.email" type="email" />
              </el-form-item>
            </div>
            <div v-if="!formEdit" class="flex flex-col lg:grid justify-items-center mt-6">
              <el-form-item class="w-full lg:w-3/12">
                <el-button class="w-full" color="#253343" round @click="onSubmit(formRef)">{{ $t('buttons.save') }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-item>

      <!-- Password collapse -->
      <el-collapse-item name="my-passwd">
        <template v-slot:title>
          <h4 class="text-xl">{{ $t('menus.modify-password') }}</h4>
        </template>
        <div class="grid px-6 lg:px-48">
          <el-form :model="password" :rules="rules" label-position="top" label-width="auto" size="large">
            <div class="flex flex-col lg:grid lg:grid-cols-5">
              <el-form-item class="lg:col-span-3 lg:col-start-2" :label="t(`fields.current-pwd`)">
                <el-input v-model="password.current" type="password" show-password />
              </el-form-item>
              <el-form-item class="lg:col-span-3 lg:col-start-2" :label="t(`fields.new-pwd`)">
                <el-input v-model="password.new" type="password" show-password />
              </el-form-item>
              <el-form-item class="lg:col-span-3 lg:col-start-2" :label="t(`fields.confirm-pwd`)">
                <el-input v-model="password.confirm" type="password" show-password />
              </el-form-item>
            </div>
            <div class="flex flex-col lg:grid justify-items-center mt-6">
              <el-form-item class="w-full lg:w-3/12">
                <el-button class="w-full" color="#253343" round @click="onSubmit(formRef)">{{ $t('buttons.save') }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.box-card {
  border-radius: 12px;
}
.user-info :deep(.el-card__body) {
  padding: 0;
  height: 100%;
}
.user-bg {
  background-position: 100%;
  padding: 18px 20px;
}
.el-collapse {
  --el-collapse-header-height: 80px;
}
.el-button.is-plain {
  --el-button-hover-text-color: white !important;
  --el-button-border-color: #253343 !important;
  --el-button-hover-border-color: #253343 !important;
  --el-button-hover-bg-color: #253343 !important;
}
</style>