import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchRecordStore = defineStore(
  'SerachRecord',
  () => {
    // 历史记录
    const searchList = ref([])
    // 添加历史记录
    const addRecord = (val: string) => {
      searchList.value.push(val)
    }
    // 删除历史记录
    const deleteRecord = (index: number) => {
      searchList.value.splice(index, 1)
    }
    // 清空历史记录
    const clearRecord = (): void => {
      searchList.value = []
    }
    return {
      searchList,
      addRecord,
      deleteRecord,
      clearRecord,
    }
  },
  {
    persist: {
      storage: {
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
