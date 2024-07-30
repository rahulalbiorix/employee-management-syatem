<template>
  <div class="d-flex justify-space-between flex-wrap py-8">
    <div class="d-flex ga-3">
      <v-btn @click="goToList"> Back To List </v-btn>
      <v-btn v-if="isBack" prepend-icon="mdi-chevron-left" @click="emit('previousStep')">
        Back
      </v-btn>
    </div>
    <div class="d-flex flex-wrap">
      <v-btn v-if="isNext" append-icon="mdi-chevron-right" @click="emit('nextStep')"> Next </v-btn>
      <v-btn v-if="!isNext" @click="emit('submit')"> Add Employee </v-btn>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  isBack: {
    default: true
  },
  isNext: {
    default: true
  }
})

const emit = defineEmits(['previousStep', 'nextStep', 'submit'])

const router = useRouter()

const goToList = () => {
  router.push({ name: 'home' })
}
</script>
