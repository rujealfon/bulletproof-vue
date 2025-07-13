import { toTypedSchema } from '@vee-validate/zod'
import { useForm as useVeeValidateForm } from 'vee-validate'
import type { z } from 'zod'

/**
 * Custom form hook that integrates VeeValidate with Zod schemas
 */
export function useForm<T extends z.ZodType<any>>(schema: T) {
  const typedSchema = toTypedSchema(schema)
  
  const form = useVeeValidateForm({
    validationSchema: typedSchema,
  })

  return {
    ...form,
    // Helper to get form values with proper typing
    getValues: () => form.values as z.infer<T>,
    // Helper to submit with proper typing
    handleSubmit: (onSubmit: (values: z.infer<T>) => void | Promise<void>) => {
      return form.handleSubmit(onSubmit)
    },
  }
}

/**
 * Helper to create a typed field for forms
 */
export function createField<T extends z.ZodType<any>>(schema: T) {
  return {
    schema: toTypedSchema(schema),
    type: {} as z.infer<T>,
  }
}