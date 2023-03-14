<script setup>
import { getProductsByCategory } from "@/services/api";
import { onBeforeMount, reactive } from "vue";

const recapData = reactive([]);

const total = reactive({
  options: 0,
  HT: 0,
  TTC: 0,
});

const props = defineProps(['data','next'])
const emit = defineEmits(['HT', 'TTC', 'next'])

onBeforeMount(async () => {
  const response1 = await getProductsByCategory(2);
  const response2 = await getProductsByCategory(3);

  recapData.push(...response1, ...response2);

  total.TTC = parseInt((props.data.items.userChoice.firstRoom.details.price * props.data.items.customers) * props.data.items.userChoice.date.interval);
  total.HT = parseInt(total.TTC * 0.9);

});

const handleChange = (e) => {
  if (e.checked) {
    if (e.recurrence === "once") {
      e.finalPrice = parseFloat(e.price).toFixed(2);
    } else if (e.recurrence === "daily") {
      e.finalPrice = parseFloat(e.price * props.data.items.userChoice.date.interval).toFixed(2);
    } else if (e.recurrence === "weekly") {
      e.finalPrice = parseInt(e.price * (Math.ceil(props.data.items.userChoice.date.interval / 7))).toFixed(2);
    }

    if(e.rate === "person") {
      e.finalPrice = parseFloat(e.finalPrice * props.data.items.customers).toFixed(2);
    }

  } else {
    e.finalPice = 0;
  }

  total.options = 0;
  for (let i = 0; i< recapData.length; i++) {
    if (recapData[i].checked) {
      total.options += parseFloat(recapData[i].finalPrice);
    }
  }

  total.TTC = total.options + parseInt((props.data.items.userChoice.firstRoom.details.price * props.data.items.customers) * props.data.items.userChoice.date.interval);
  total.HT = parseFloat(total.TTC * 0.9).toFixed(2);


};

const handleValidate = () => {
  emit('cart', { HT: parseFloat(total.HT).toFixed(2), TTC: parseFloat(total.TTC).toFixed(2) })
  emit('next', '/checkout/login')
}
</script>

<template>
  <h2 class="text-center mt-12 mb-12">Récapitulatif</h2>
  <div class="flex justify-around">
    <div>
      <h3 class="text-center">Options</h3>
      <div v-for="(item, index) in recapData" :key="index">
        <el-switch
            v-model="item.checked"
            @change="handleChange(item)"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        {{ item.name }}
      </div>
    </div>
    <div>
      <h3 class="text-center">Total</h3>
      <p> HT = {{ total.HT }}</p>
      <p> TTC = {{ total.TTC }}</p>
    </div>
  </div>
  <el-button @click="handleValidate" class="text-center" style="margin-top: 12px">Next step</el-button>
</template>
