<script setup lang="ts">
import { ElCarousel, ElCarouselItem} from 'element-plus';
import {getActiveVideo} from '@/services/api.js';
import {reactive, onMounted} from 'vue';

interface Video {
  title: string,
  content: string,
  url: string,
  active: boolean
}

const video = reactive({ item: {} });

onMounted(async() => {
  getActiveVideo()
      .then((data:any) => {
        console.log(data);
          video.item = data[0];
      });
});

</script>

<template>
  <div height="80vh" style=" border-radius: 15px; margin:0 24px">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div class="w-full h-full">
        <iframe width="100%" height="100%" v-bind:src="video.item.url" title="Video Artichaut" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="grid grid-cols-1 grid-rows-3 text-center text-black px-6 md:px-12">
          <div class="text-5xl font-bold">{{ video.item.title}}</div>
          <div class="text-3xl font-bold">{{ video.item.content }}</div>
          <div class="m-auto">
            <el-button size="large" round color="#00B561" data-te-ripple-init data-te-ripple-color="light"
                          class="mr-4 ml-4 px-6 py-2.5 md:mb-0 mb-4 uppercase leading-normal transition duration-150 ease-in-out">
              {{ $t('buttons.reserve-now') }}
            </el-button>
          </div>
        </div>
    </div>
  </div>
</template>