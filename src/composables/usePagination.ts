import { ref, computed, watch } from 'vue'

export interface UsePaginationOptions {
  total: number
  pageSize?: number
  page?: number
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
}

export function usePagination(options: UsePaginationOptions) {
  const {
    total,
    pageSize: initialPageSize = 10,
    page: initialPage = 1,
    showSizeChanger = true,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper = true,
  } = options

  const currentPage = ref(initialPage)
  const pageSize = ref(initialPageSize)

  const totalPages = computed(() => Math.ceil(total / pageSize.value))
  
  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === totalPages.value)
  
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
  const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, total))

  const visibleRange = computed(() => ({
    start: startIndex.value + 1,
    end: endIndex.value,
    total,
  }))

  // Generate page numbers for pagination display
  const pageNumbers = computed(() => {
    const pages = []
    const maxVisible = 7
    
    if (totalPages.value <= maxVisible) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      const current = currentPage.value
      const total = totalPages.value
      
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
      } else if (current >= total - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = total - 4; i <= total; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
      }
    }
    
    return pages
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value += 1
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value -= 1
    }
  }

  const goToFirstPage = () => {
    currentPage.value = 1
  }

  const goToLastPage = () => {
    currentPage.value = totalPages.value
  }

  const changePageSize = (newSize: number) => {
    pageSize.value = newSize
    // Adjust current page if necessary
    const newTotalPages = Math.ceil(total / newSize)
    if (currentPage.value > newTotalPages) {
      currentPage.value = newTotalPages || 1
    }
  }

  // Reset to first page when total changes
  watch(() => total, () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1
    }
  })

  return {
    // State
    currentPage,
    pageSize,
    
    // Computed
    totalPages,
    isFirstPage,
    isLastPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    visibleRange,
    pageNumbers,
    
    // Actions
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    
    // Options
    showSizeChanger,
    pageSizeOptions,
    showQuickJumper,
  }
}