<template>
  <FormComponent :mode="modeForm"
                 :on-submit="handleSubmit"
                 :on-close="handleClose"
                 :open-form="openForm"
                 :fields="fields"
                 :data="selectedProduct.item"
                 :lang="selectedProduct.item.lang_id"/>
  <el-card class="box-card">
    <TableComponent :data="products.items" :onCreate="handleCreate" :onDelete="handleDelete" :onUpdate="handleEdit"/>
  </el-card>
</template>

<script setup lang="ts">
import TableComponent from "@/components/admin/TableComponent.vue";
import FormComponent from "@/components/FormComponent.vue";

import {onMounted, reactive, ref, shallowRef} from "vue";
import {createProduct, deleteProduct, getProducts, updateProduct} from "@/services/api.js";
import {ElMessage, ElMessageBox} from 'element-plus'
import {useI18n} from "vue-i18n";

onMounted(() => {
  getProducts().then((data) => {
    products.items = data
  })
})

const { t } = useI18n();

const fields = shallowRef([
  { name: 'name', type: 'input', label: t('fields.name')},
  { name: 'price', type: 'input', label: t('fields.price')},
])

const openForm = ref(false);
const modeForm = ref('create')

const products = reactive({items: []})
const selectedProduct = reactive({item: {}});


const handleDelete = (id) => {
  //message are you sure
  ElMessageBox({
    title: 'Alerte' ,
    message: 'êtes-vous sür de vouloir supprimer cet élément?',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonText:'valider',
    beforeClose: (action, instance, done) => {
      if(action === 'confirm'){
        deleteProduct(id).then(() => {
          getProducts()
              .then((data:any) => {
                products.items = data;
              });
        });
        success();
        done();
      }
      else {
        error();
        done();
      }
    }
  })
}

const handleCreate = () => {
  modeForm.value = 'create';
  selectedProduct.item = {};
  openForm.value = true;
}

const handleEdit = (data:any) => {
  console.log(data);
  selectedProduct.item = data;
  modeForm.value = 'edit';
  openForm.value = true;
}

const handleSubmit = async (data: any, lang: number) => {
  openForm.value = false;
  console.log(data, lang);
  if (modeForm.value === "create") {
    await createProduct({...data, user_id: 11, lang_id: lang}).then(() => {
      getProducts()
          .then((data:any) => {
            products.items = data;
          });
    })
  } else {
    await updateProduct(selectedProduct.item.id, data).then(() => {
      getProducts()
          .then((data:any) => {
            products.items = data;
          });
    })
  }
}

const handleClose = () => {
  openForm.value = false;
}

const success = () => {
  ElMessage({
    showClose: true,
    message: 'Produit supprimé avec succès',
    type: 'success',
  })
}

const error = () => {
  ElMessage({
    showClose: true,
    message: 'Impossible de supprimer ce produit',
    type: 'error',
  })
}
</script>