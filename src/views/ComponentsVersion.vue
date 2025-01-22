<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const datastoreList = ref([])
const cacheArea = ref('')
const cacheSearch = ref('')
const browseLog = ref([])

onMounted(async () => {
  try {
    const apiUrl = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json'
    const response = await fetch(apiUrl)
    const data = await response.json()
    datastoreList.value = data.result.records
  } catch (error) {
    console.error(error)
  }
})

const datastoresFilter = computed(() => {
  return datastoreList.value.filter(item => {
    return item.Name.match(cacheSearch.value)
  })
})

watch(cacheArea, (newVal) => {
  if (typeof newVal === 'object' && newVal !== null && newVal.Name) {
    const findItem = browseLog.value.find(item => item.Name === newVal.Name)
    if (!findItem) {
      browseLog.value.push(newVal)
      if (browseLog.value.length > 10) {
        browseLog.value.shift()
      }
    }
  }
})
</script>

<template>
  <div id="app" class="mt-2">
    <div class="container">
      <div class="row h-100">
        <div class="col-md-3 h-100 d-flex flex-column">
          <div class="form-floating mb-2">
            <input type="text" class="form-control" id="search" placeholder="search" v-model="cacheSearch">
            <label for="search">搜尋</label>
          </div>
          <div class="list-group option">
            <label class="list-group-item" v-for="(item, key) in datastoresFilter" :key="key">
              <input class="form-check-input me-1" type="radio" name="area"
                @click="cacheArea = item" :checked="cacheArea.Name === item.Name">
              {{ item.Name }}
            </label>
          </div>
        </div>
        <div class="col-md-8 h-100 d-flex flex-column">
          <div class="form-floating">
            <select id="cacheArea" class="form-select w-50 mb-2" aria-label="select example" v-model="cacheArea">
              <option selected value="" disabled>瀏覽紀錄</option>
              <option v-for="(log, key) in browseLog" :key="'log' + key"
                :value="log">{{key+1}}.{{log.Name}}</option>
            </select>
            <label for="cacheArea">瀏覽紀錄</label>
          </div>
          <div v-if="cacheArea.Name" class="card overflow-auto">
            <img :src="cacheArea.Picture1" class="card-img-top" :alt="cacheArea.Name">
            <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
              :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${cacheArea.Py},${cacheArea.Px}(${cacheArea.Name})&z=16&output=embed`">
            </iframe>
            <div class="card-body">
              <h5 class="card-title">{{ cacheArea.Name }}</h5>
              <p>{{ cacheArea.Description }}</p>
            </div>
          </div>
          <div v-else class="card-body">
            請選擇場域
          </div>
        </div>
      </div>
    </div>
  </div>
</template>