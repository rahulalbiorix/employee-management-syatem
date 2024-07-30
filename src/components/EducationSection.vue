<template>
  <div>
    <div class="text-center">Education Details</div>
    <!-- :disabled="isAdding" @click="isAdding = true" -->
    <div class="d-flex justify-end">
      <v-btn variant="tonal" color="primary"><v-icon icon="$plus"></v-icon>Add Eduction</v-btn>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left" width="22%">Name</th>
          <th class="text-left" width="22%">University Name</th>
          <th class="text-left" width="22%">Result</th>
          <th class="text-left" width="22%">Year Of Passing</th>
          <th class="text-left" width="10%">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="educations.length">
          <template v-for="(item, index) in educations" :key="index">
            <EducationItem :education="item" />
          </template>
        </template>
        <!-- <template v-else-if="isAdding">
          <tr>
            <td>
              <v-text-field
                label="Current Location"
                variant="underlined"
                color="primary"
                :rules="[validation.required('Current Location')]"
                required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                label="Current Location"
                variant="underlined"
                color="primary"
                :rules="[validation.required('Current Location')]"
                required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                label="Current Location"
                variant="underlined"
                color="primary"
                :rules="[validation.required('Current Location')]"
                required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                label="Current Location"
                variant="underlined"
                color="primary"
                :rules="[validation.required('Current Location')]"
                required
              ></v-text-field>
            </td>
            <td>
              <div>
                <v-icon icon="mdi-check" color="success"></v-icon>
                <v-icon icon="mdi-close" color="red"></v-icon>
                <v-icon icon="mdi-delete" color="red"></v-icon>
              </div>
            </td>
          </tr>
        </template> -->
        <template v-else>
          <tr>
            <td colspan="5" class="text-center">No Record</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">
import validation from '@/helpers/validation'
import EducationItem from './EducationItem.vue'

interface Education {
  name: string | null
  university: string | null
  result: string | null
  year: number | null
  isEdit: boolean
}

const props = defineProps<{ educations: Education[] }>()
</script>
