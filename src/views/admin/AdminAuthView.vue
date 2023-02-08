<template>
  <h1>ADMIN</h1>
  <form @submit.prevent="submit">
    <input type="email" name="email" v-model="user.email" />
    <input type="password" name="password" v-model="user.password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { login, checkAdmin} from "@/services/auth";
import {onBeforeMount, ref} from "vue";
import router from "@/router";

onBeforeMount(() => {
  if(localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    if (checkAdmin(token)){
      router.push('/admin')
    }
  }
})

const user= ref({
  email: "",
  password: "",
});

const validationError =  ref({});
const processing = ref(false);

async function submit() {
  processing.value = true;
  login(user.value)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        if (checkAdmin(data.token)){
          console.log('oui')
          router.push('/admin')
        }
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          validationError.value = response.data.message;
          console.log(validationError.value);
        } else {
          validationError.value = {};
        }
      })
      .finally(() => {
        processing.value = false;
      });
}
</script>
