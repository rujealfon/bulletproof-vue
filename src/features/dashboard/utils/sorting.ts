type SortDirection = 'asc' | 'desc'

export const dashboardSorting = {
  sortByValue: <T>(
    items: T[],
    getValue: (item: T) => number | string | Date,
    direction: SortDirection = 'asc'
  ): T[] => {
    return [...items].sort((a, b) => {
      const valueA = getValue(a)
      const valueB = getValue(b)
      
      let comparison = 0
      
      if (valueA < valueB) comparison = -1
      if (valueA > valueB) comparison = 1
      
      return direction === 'desc' ? -comparison : comparison
    })
  },

  sortByDate: <T>(
    items: T[],
    getDate: (item: T) => string | Date,
    direction: SortDirection = 'desc'
  ): T[] => {
    return [...items].sort((a, b) => {
      const dateA = new Date(getDate(a))
      const dateB = new Date(getDate(b))
      
      const comparison = dateA.getTime() - dateB.getTime()
      return direction === 'desc' ? -comparison : comparison
    })
  },

  sortByString: <T>(
    items: T[],
    getString: (item: T) => string,
    direction: SortDirection = 'asc'
  ): T[] => {
    return [...items].sort((a, b) => {
      const stringA = getString(a).toLowerCase()
      const stringB = getString(b).toLowerCase()
      
      const comparison = stringA.localeCompare(stringB)
      return direction === 'desc' ? -comparison : comparison
    })
  },

  sortByMultipleCriteria: <T>(
    items: T[],
    criteria: Array<{
      getValue: (item: T) => any
      direction: SortDirection
    }>
  ): T[] => {
    return [...items].sort((a, b) => {
      for (const criterion of criteria) {
        const valueA = criterion.getValue(a)
        const valueB = criterion.getValue(b)
        
        let comparison = 0
        if (valueA < valueB) comparison = -1
        if (valueA > valueB) comparison = 1
        
        if (comparison !== 0) {
          return criterion.direction === 'desc' ? -comparison : comparison
        }
      }
      return 0
    })
  },

  groupBy: <T, K extends string | number>(
    items: T[],
    getKey: (item: T) => K
  ): Record<K, T[]> => {
    return items.reduce((groups, item) => {
      const key = getKey(item)
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(item)
      return groups
    }, {} as Record<K, T[]>)
  },

  filterAndSort: <T>(
    items: T[],
    filter: (item: T) => boolean,
    getValue: (item: T) => any,
    direction: SortDirection = 'asc'
  ): T[] => {
    const filtered = items.filter(filter)
    return dashboardSorting.sortByValue(filtered, getValue, direction)
  },
}