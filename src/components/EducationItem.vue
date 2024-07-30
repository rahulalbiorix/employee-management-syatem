<template>
  <tr v-if="!isEdit">
    <td>{{ education.name }}</td>
    <td>{{ education.university }}</td>
    <td>{{ education.result }}</td>
    <td>{{ education.year }}</td>
    <td>
      <div>
        <v-icon icon="mdi-pencil" color="blue" @click="isEdit = true"></v-icon>
        <v-icon icon="mdi-delete" color="red"></v-icon>
      </div>
    </td>
  </tr>
  <tr v-else>
    <td colspan="5">
      <v-form ref="educationRef" class="d-flex w-100 ga-8 align-center">
        <v-text-field
          v-model="editedItem.name"
          variant="underlined"
          color="primary"
          label="Education Name"
          width="30"
          :rules="[validation.required('Education Name')]"
          required
        ></v-text-field>

        <v-text-field
          v-model="editedItem.university"
          variant="underlined"
          color="primary"
          label="University Name"
          width="30"
          :rules="[validation.required('University Name')]"
          required
        ></v-text-field>

        <v-text-field
          v-model="editedItem.result"
          variant="underlined"
          color="primary"
          label="Result"
          width="30"
          :rules="[validation.required('Result')]"
          required
        ></v-text-field>

        <v-text-field
          v-model="editedItem.year"
          variant="underlined"
          color="primary"
          label="Year of Passing"
          width="30"
          :rules="[validation.required('Year of Passing')]"
          required
        ></v-text-field>

        <div style="width: 160px">
          <v-icon icon="mdi-check" color="success" @click="saveChanges"></v-icon>
          <v-icon icon="mdi-close" color="red" @click="resetFrom"></v-icon>
          <v-icon icon="mdi-delete" color="red"></v-icon>
        </div>
      </v-form>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Education } from '@/types'
import validation from '@/helpers/validation'

const props = defineProps<{ education: Education }>()
const isEdit = ref(false)
const educationRef = ref()

const defaultItem = ref<Education>({
  name: null,
  university: null,
  result: null,
  year: null,
  isEdit: false
})

const editedItem = ref<Education>({
  name: null,
  university: null,
  result: null,
  year: null,
  isEdit: false
})
watch(
  isEdit,
  (value) => {
    if (value) {
      editedItem.value = Object.assign({}, props.education)
    }
  },
  {
    immediate: true
  }
)
const resetFrom = () => {
  educationRef.value.reset()
  //   editedItem.value = Object.assign({}, defaultItem.value)
}
const saveChanges = async () => {
  const { valid } = await educationRef.value.validate()
  if (valid) {
    isEdit.value = true
  }
}
</script>
