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
    // Vérification du role de l'utilisateur
    checkAdmin(token).then(({}) => {
      router.push('/admin/home')
    }).catch(({response}) => {
      router.push('/admin')
    })
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

  // Appel de la fonction  login
  login(user.value)
      .then(async ({data}) => {
        // Vérification du role de l'utilisateur
        if (await checkAdmin(data.token)) {
          console.log('1')
          localStorage.setItem("token", data.token);
          router.push('/admin/home')
        } else {
          alert("Mauvais ID")
        }
      })
      .catch(({ response }) => {
        // Gestion des erreurs
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
