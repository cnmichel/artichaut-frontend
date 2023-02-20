<template>
  <div class="container-fluid w-full flex justify-center bg-tonic">
    <p class="p-2 text-white text-center" >{{ promo }}</p>
  </div>
  <nav class="
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  bg-white
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  navbar navbar-expand-lg navbar-light
  ">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <button class="
      navbar-toggler
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
             class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
          </path>
        </svg>
      </button>
      <div class="collapse navbar-collapse flex flex-row justify-center items-center w-full relative" id="navbarSupportedContent">
        <a class="
        lg:flex
        items-center
        text-gray-900
        lg:mt-0
        mr-1
        absolute
        -top-2
        left-0
        hidden
      " href="#">
          <img src="@/assets/logo.png" style="height: 50px" alt=""
               loading="lazy" />
        </a>
        <!-- Left links -->
        <ul class="navbar-nav flex flex-col lg:flex-row space-x-2 justify-center items-center list-style-none">
          <li class="nav-item p-2 transition duration-200 hover:scale-125">
            <a class="nav-link text-black p-0" href="#">Accueil</a>
          </li>
          <li class="nav-item p-2 transition duration-200 hover:scale-125">
            <a class="nav-link text-black p-0" href="#">Réservation</a>
          </li>
          <li class="nav-item p-2 transition duration-200 hover:scale-125">
            <a class="nav-link text-black p-0" href="#">Actualités</a>
          </li>
        </ul>
        <!-- <div class="w-1/12 h-1/3"></div> -->
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->
    </div>
  </nav>
</template>

<script setup>
import { getActivePromo } from '@/services/api.js'
import {onBeforeMount, ref} from "vue";

const promo = ref("")

onBeforeMount(() => {
  getActivePromo().then((data) => {
    promo.value = data[0].content;
  })
})
</script>

<style>

</style>