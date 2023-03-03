<script setup lang="ts">
import {onBeforeMount, reactive, ref, shallowRef} from "vue";
import { getHero } from '@/services/api.js'
import { Search, UserFilled } from '@element-plus/icons-vue';
import {useRouter} from "vue-router";

const router = useRouter();

const hero = reactive({ item: {} })
const selectDate = ref('')
const selectOption = ref('')
const options = shallowRef([
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
])

onBeforeMount(() => {
  getHero(1).then((data: any) => hero.item = data)
})

const handleSearch = () => {
  router.push({name: 'Reservation', query: {
      customers: selectOption.value,
      date: selectDate.value
    }})
}

</script>

<template>
  <div class="relative overflow-hidden bg-no-repeat bg-cover" style="
    background-position: 50%;
    background-image: url('https://images.pexels.com/photos/141774/pexels-photo-141774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    height: 80vh;
    margin: 0 24px;
    border-radius: 15px;
  ">
    <div class="flex justify-center items-center">
      <div class="mb-5 mb-lg-0 position-relative lg:top-8 z-10 w-fit">
        <div class="card bg-glass rounded-lg">
          <div class="card-body lg:px-4 px-2 lg:py-4 py-2">
            <form>
              <div class="flex flex-row gap-4">
                <div class="form-group w-36">
                  <el-select v-model="selectOption" placeholder="Nombre" size="large">
                    <template v-slot:prefix>
                      <el-icon><UserFilled /></el-icon>
                    </template>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="form-group">
                  <el-date-picker v-model="selectDate" type="daterange" format="DD/MM/YYYY" :default-time="new Date()" value-format="YYYY-MM-DD HH:mm:ss" size="large"
                                  range-separator="au"
                                  start-placeholder="Arrivée"
                                  end-placeholder="Départ"
                  />
                </div>
                <div class="form-group">
                  <el-button :icon="Search" size="large" color="#00B561" data-te-ripple-init data-te-ripple-color="light" @click="handleSearch">
                    {{ $t('buttons.search') }}
                  </el-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
         style="background-color: rgba(0, 0, 0, 0.70)">
      <div class="flex justify-center items-center h-full">
        <div class="text-center text-white px-6 md:px-12">
          <h1 class="text-5xl font-bold tracking-tight mt-0 mb-6">{{ hero.item.title }}</h1>
          <h3 class="text-3xl font-bold mb-8">{{ hero.item.subtitle }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 px-3">
            <el-button size="large" round color="#00B561" data-te-ripple-init data-te-ripple-color="light"
                       class="mr-4 ml-4 px-6 py-2.5 md:mb-0 mb-4 uppercase leading-normal transition duration-150 ease-in-out">
              {{ $t('buttons.reserve-now') }}
            </el-button>
            <el-button size="large" round plain color="#00B561" style="background: transparent" data-te-ripple-init data-te-ripple-color="light"
                       class="mr-4 ml-4 px-6 py-2.5 uppercase leading-normal transition duration-150 ease-in-out">
              {{ $t('buttons.know-more') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.1) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
:deep(.el-button.is-plain) {
  border-color: #00B561;
  border-width: 2px;
  color: white;
}
:deep(.el-input), :deep(.el-input__wrapper) {
  background-color: transparent !important;
  --el-border-color: transparent;
  --el-text-color-placeholder: white !important;
  --el-text-color-regular: white;
  --el-text-color-primary: white;
}
:deep(.el-range-editor--large .el-range-input) {
  font-size: 15px !important;
}
</style>