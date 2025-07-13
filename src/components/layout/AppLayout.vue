<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader v-if="showHeader" />
    
    <div class="flex flex-1">
      <AppSidebar v-if="showSidebar" />
      
      <main class="flex-1 p-6 bg-muted/10">
        <slot />
      </main>
    </div>
    
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  showHeader?: boolean
  showSidebar?: boolean
  showFooter?: boolean
}

withDefaults(defineProps<Props>(), {
  showHeader: true,
  showSidebar: false,
  showFooter: false,
})
</script>

<script lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
  },
}
</script>