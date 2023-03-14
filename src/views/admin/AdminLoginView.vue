<template>
  <div class="flex justify-center items-center h-full">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form @submit.prevent="submit">
        <p class="mb-4">Please login to your account</p>
        <div class="mb-4">
          <input
              name="email" v-model="user.email"
              type="email"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Username"
          />
        </div>
        <div class="mb-4">
          <input
              name="password" v-model="user.password"
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Password"
          />
        </div>
        <div class="text-center pt-1 pb-1">
          <button
              class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              style="
                            background: linear-gradient(
                              to right,
                              #006838,
                              #00B561
                            );
                          "
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { login, checkAdmin } from "@/services/auth";
import { onBeforeMount, ref } from "vue";
import router from "@/router";

onBeforeMount(() => {
  if(localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    // Vérification du role de l'utilisateur
    checkAdmin(token).then(() => {
      router.push('/admin/home')
    }).catch(() => {
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
      .then(async (data) => {
        // Vérification du role de l'utilisateur
        if (await checkAdmin(data.token)) {
          localStorage.setItem("admin_token", data.token);
          await router.push('/admin/home')
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
