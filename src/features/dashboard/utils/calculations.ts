export const dashboardCalculations = {
  calculatePercentageChange: (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  },

  calculateGrowthRate: (values: number[]): number => {
    if (values.length < 2) return 0
    const first = values[0]
    const last = values[values.length - 1]
    return dashboardCalculations.calculatePercentageChange(last, first)
  },

  calculateAverage: (values: number[]): number => {
    if (values.length === 0) return 0
    return values.reduce((sum, value) => sum + value, 0) / values.length
  },

  calculateMedian: (values: number[]): number => {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2
    }
    return sorted[mid]
  },

  calculateSum: (values: number[]): number => {
    return values.reduce((sum, value) => sum + value, 0)
  },

  calculateMax: (values: number[]): number => {
    return Math.max(...values)
  },

  calculateMin: (values: number[]): number => {
    return Math.min(...values)
  },

  calculateStandardDeviation: (values: number[]): number => {
    if (values.length === 0) return 0
    const avg = dashboardCalculations.calculateAverage(values)
    const squareDiffs = values.map(value => Math.pow(value - avg, 2))
    const avgSquareDiff = dashboardCalculations.calculateAverage(squareDiffs)
    return Math.sqrt(avgSquareDiff)
  },

  calculateTrend: (values: number[]): 'up' | 'down' | 'stable' => {
    if (values.length < 2) return 'stable'
    
    const first = values[0]
    const last = values[values.length - 1]
    const changePercent = Math.abs(dashboardCalculations.calculatePercentageChange(last, first))
    
    if (changePercent < 1) return 'stable'
    return last > first ? 'up' : 'down'
  },
}