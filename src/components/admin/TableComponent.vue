<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleUpdate">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
    <el-table :data="props.data" style="width: 100%">
      <el-table-column label="Id" prop="id" />
      <el-table-column label="Nom" prop="name" />
      <el-table-column label="Prix" prop="price" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.$index, scope.row)"
          >Editer</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >Supprimer</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem"
  >Add Item</el-button
  >
  </template>

  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { ElMessageBox } from 'element-plus'

  const dialogVisible = ref(false)

  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()

        })
        .catch(() => {
          // catch error
        })
  }

  const props = defineProps<{
    data: []
    onDelete: () => void
    onUpdate: () => void
  }>()

  const search = ref('')

  const handleUpdate = (data) => {
    props.onUpdate(data)
  }

  const openEdit = (index: number, row) => {
    console.log(index, row)
    dialogVisible.value = true
  }
  const handleDelete = (index: number, row) => {
    console.log(index, row)
    props.onDelete(row.id)
  }

  console.log(props.data)
  </script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>