<template>
  <div class="ma-5">
    <h1 class="text-center text-h5 font-weight-regular">Employee Management System</h1>
    <div class="pa-4 text-end">
      <v-btn prepend-icon="mdi-account-plus" color="primary" @click="addNewEmployee">
        Employee
      </v-btn>
    </div>
    <v-card elevation="16">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="name"
        loading-text="Loading... Please wait"
        @update:options="loadItems"
      >
        <template v-slot:item.profile="{ item }">
          <v-avatar size="36px">
            <img
              :src="imageSrc(item.personalDetails.profile)"
              :alt="item.personalDetails.fname"
              style="object-fit: cover"
            />
          </v-avatar>
        </template>
        <template v-slot:item.name="{ item }">
          {{
            item.personalDetails.fname +
            ' ' +
            item.personalDetails.mname +
            ' ' +
            item.personalDetails.lname
          }}
        </template>
        <template v-slot:item.resume="{ item }">
          <v-icon
            icon="mdi-download"
            size="large"
            color="indigo"
            class="mr-1 cursor-pointer"
            @click="downloadResume(item.professionalDetails.resume)"
          ></v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            icon="mdi-pencil"
            size="large"
            color="blue"
            class="mr-1 cursor-pointer"
            @click="editEmployee(item)"
          ></v-icon>
          <v-icon
            icon="mdi-delete"
            size="large"
            color="red-darken-2"
            class="mr-1 cursor-pointer"
            @click="deleteEmployee(item.id)"
          ></v-icon>
        </template>
      </v-data-table-server>
    </v-card>
    <ToastMessage v-model:isToastMessage="isToastMessage" :toastMessage="toastMessage" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '../stores/employee'
import ToastMessage from '../components/controls/ToastMessage.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()

const employeesList = computed(() => [...employeeStore.employees])
const isToastMessage = ref(false)
const toastMessage = ref('')

const headers = [
  {
    title: 'Profile Picture',
    align: 'center',
    sortable: false,
    key: 'profile'
  },
  { title: 'Name', key: 'name', align: 'center' },
  { title: 'Department', key: 'professionalDetails.department', align: 'center' },
  { title: 'Designation', key: 'professionalDetails.designation', align: 'center' },
  { title: 'Email', key: 'personalDetails.email', align: 'center' },
  { title: 'Mobile Number', key: 'personalDetails.mobile', align: 'center' },
  { title: 'Resume', key: 'resume', align: 'center' },
  { title: 'Action', align: 'center', key: 'action' }
]

const itemsPerPage = ref(5)
const search = ref()
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = employeesList.value.slice()

        if (sortBy?.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items?.length })
      }, 500)
    })
  }
}

const addNewEmployee = () => {
  employeeStore.setUpdatedId(null)
  router.push({ name: 'add-employee' })
}

const editEmployee = (item) => {
  employeeStore.setUpdatedId(item.id)
  employeeStore.personalDetailsUpdate({ ...item.personalDetails })
  employeeStore.bankDetailsUpdate({ ...item.bankDetails })
  employeeStore.professionalDetailsUpdate({ ...item.professionalDetails })
  employeeStore.educationDetailsUpdate([...item.educationDetails])
  employeeStore.experienceDetailsUpdate([...item.experienceDetails])
  employeeStore.currentOrganizationDetailsUpdate({ ...item.currentOrganizationDetails })

  router.push({ name: 'edit-employee', params: { id: item.id } })
}
const deleteEmployee = (id) => {
  employeeStore.deleteEmployees(id)
  isToastMessage.value = true
  toastMessage.value = 'Employee detail deleted successfully!!'
}

const downloadResume = (file) => {
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const imageSrc = (file) => {
  return URL.createObjectURL(file)
}

watch(employeesList, () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value })
})
</script>
