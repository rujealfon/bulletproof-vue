// Re-export all types for easy importing
export * from './api'
export * from './common'
export * from './env'

// Global type utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type NonNullable<T> = T extends null | undefined ? never : T

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type LastOfUnion<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

export type Push<T extends readonly unknown[], V> = [...T, V]

export type Tail<T extends readonly unknown[]> = T extends readonly [any?, ...infer U] ? U : []

export type Reverse<T extends readonly unknown[]> = T extends readonly [...infer U, infer L] ? [L, ...Reverse<U>] : []

export type UnionToTuple<T, L = LastOfUnion<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>

// Utility types for Vue
export type ComponentProps<T> = T extends new (...args: any) => any
  ? InstanceType<T>['$props']
  : T extends (...args: any) => any
  ? Parameters<T>[0]
  : never

export type EmitEvents<T> = T extends {
  $emit: (event: infer E, ...args: any[]) => any
}
  ? E
  : never