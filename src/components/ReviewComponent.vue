<script setup lang="ts">
import { ElCarousel, ElCarouselItem} from 'element-plus';
import { getReviews } from '@/services/api.js'
import { ref, reactive, computed, onMounted } from 'vue';
import { UserFilled } from '@element-plus/icons-vue'


interface Review {
    title: string,
    content: string,
    rating: number,
    customer_id: number,
    customer: Customer
}
interface Customer{
  firstname:string,
  lastname : string
}

const value = ref();
const reviews = reactive({ items: <Review[]>[] })
 const selectedReviews = reactive({item: {}});

const handleSelect = (review:any) => {
    selectedReviews.item = review;
}

onMounted(async() => {
        getReviews()
        .then((data:any) => {
        reviews.items = data;
    });
    
});

</script>

<template>
<a id="reviews" class="mt-2"><h1>{{ $t('message.titleReview') }}</h1></a>
<el-carousel trigger="click" :interval="4000" type="card" height="200px">
      
      <el-carousel-item v-for="(review, i) in reviews.items" :key="i">
        <div class="demo-type">
          <el-avatar :icon="UserFilled" class="ml-5" />
          <div class="m-auto underline">{{ review.title}}</div> 
        </div>
        <div class="">{{ review.customer.firstname}} {{ review.customer.lastname}}</div>
        <el-rate
          :max="5"
          v-model="review.rating"
          disabled
        />
        <div class="">« {{ review.content}} »</div><br/>
      </el-carousel-item>
</el-carousel>


</template>

<style scoped>

h1{
    text-align: center;
    background-color: #00B531;
    font-weight: bold;
    color: black;
}


.el-carousel__item h3 {
  color: #ffffff;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #000000;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: grey;
}


.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}


</style>