<template>
  <h1>PRODUCT</h1>
  <TableComponent :data="products.items" :onDelete="handleDelete" :onUpdate="handleEdit"/>
</template>
<script setup lang="ts">
import TableComponent from "@/components/admin/TableComponent.vue";
import {onMounted, reactive} from "vue";
import {deleteProduct, getProducts, updateProduct} from "@/services/api";
import { ElMessage } from 'element-plus'

onMounted(() => {
  getProducts().then((data) => {
    products.items = data
  })
})

const products = reactive({items: []})

const handleDelete = (id) => {
  deleteProduct(id).then(() => {
    success()
  }).catch(() => {
    error()
  })
}

const handleEdit = (id, data) => {
  updateProduct(id, data).then(() =>{
    success()
  }).catch(() =>{
    error()
  })
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