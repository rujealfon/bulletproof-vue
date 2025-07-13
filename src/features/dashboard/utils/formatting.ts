export const dashboardFormatting = {
  formatCurrency: (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  },

  formatPercentage: (value: number, decimals = 1): string => {
    return `${value.toFixed(decimals)}%`
  },

  formatNumber: (value: number, decimals = 0): string => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
    }).format(value)
  },

  formatLargeNumber: (value: number): string => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`
    }
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`
    }
    if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`
    }
    return value.toString()
  },

  formatDate: (date: string | Date, format: 'short' | 'long' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (format === 'long') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    
    return dateObj.toLocaleDateString('en-US')
  },

  formatTime: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  },
}