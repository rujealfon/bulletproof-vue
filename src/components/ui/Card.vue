<template>
  <div :class="cn('rounded-xl border bg-card text-card-foreground shadow', $attrs.class as string)" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<script lang="ts">
export default {
  name: 'Card',
}
</script>