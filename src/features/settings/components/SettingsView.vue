<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your application preferences</p>
    </div>

    <div class="space-y-6">
      <!-- Appearance Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
        
        <div class="space-y-4">
          <!-- Dark Mode Toggle -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <button
              @click="toggleDarkMode"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                isDark ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  isDark ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>

          <!-- Font Size -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Font Size</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Adjust the interface font size</p>
            </div>
            <select
              v-model="fontSize"
              class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
        
        <div class="space-y-4">
          <!-- Email Notifications -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <button
              @click="emailNotifications = !emailNotifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  emailNotifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>

          <!-- Push Notifications -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive browser push notifications</p>
            </div>
            <button
              @click="pushNotifications = !pushNotifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  pushNotifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>

          <!-- Notification Sound -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notification Sound</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Play sound for notifications</p>
            </div>
            <button
              @click="notificationSound = !notificationSound"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                notificationSound ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  notificationSound ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Language & Region Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h2>
        
        <div class="space-y-4">
          <!-- Language -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Language</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language</p>
            </div>
            <select
              v-model="language"
              class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <!-- Timezone -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Timezone</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Your local timezone</p>
            </div>
            <select
              v-model="timezone"
              class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">GMT</option>
              <option value="Europe/Paris">CET</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Privacy Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy</h2>
        
        <div class="space-y-4">
          <!-- Analytics -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Help improve the app by sharing usage data</p>
            </div>
            <button
              @click="analytics = !analytics"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
                analytics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  analytics ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>

          <!-- Data Export -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Export Data</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Download a copy of your data</p>
            </div>
            <button
              @click="exportData"
              class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          @click="saveSettings"
          class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { toggleDarkMode, isDark } from '@/composables/useDarkMode'
import { useNotificationsStore } from '@/stores/notifications'

const notifications = useNotificationsStore()

// Settings state
const fontSize = ref('medium')
const emailNotifications = ref(true)
const pushNotifications = ref(false)
const notificationSound = ref(true)
const language = ref('en')
const timezone = ref('UTC')
const analytics = ref(true)

// Load settings from localStorage on component mount
const loadSettings = () => {
  const saved = localStorage.getItem('app-settings')
  if (saved) {
    try {
      const settings = JSON.parse(saved)
      fontSize.value = settings.fontSize || 'medium'
      emailNotifications.value = settings.emailNotifications ?? true
      pushNotifications.value = settings.pushNotifications ?? false
      notificationSound.value = settings.notificationSound ?? true
      language.value = settings.language || 'en'
      timezone.value = settings.timezone || 'UTC'
      analytics.value = settings.analytics ?? true
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }
}

// Save settings to localStorage
const saveSettingsToStorage = () => {
  const settings = {
    fontSize: fontSize.value,
    emailNotifications: emailNotifications.value,
    pushNotifications: pushNotifications.value,
    notificationSound: notificationSound.value,
    language: language.value,
    timezone: timezone.value,
    analytics: analytics.value,
  }
  localStorage.setItem('app-settings', JSON.stringify(settings))
}

// Watch for changes and auto-save
watch([fontSize, emailNotifications, pushNotifications, notificationSound, language, timezone, analytics], () => {
  saveSettingsToStorage()
}, { deep: true })

const saveSettings = () => {
  saveSettingsToStorage()
  notifications.success('Settings saved successfully!')
}

const exportData = () => {
  const data = {
    settings: {
      fontSize: fontSize.value,
      emailNotifications: emailNotifications.value,
      pushNotifications: pushNotifications.value,
      notificationSound: notificationSound.value,
      language: language.value,
      timezone: timezone.value,
      analytics: analytics.value,
      darkMode: isDark.value,
    },
    timestamp: new Date().toISOString(),
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `user-data-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  notifications.success('Data exported successfully!')
}

// Load settings on component mount
loadSettings()
</script>