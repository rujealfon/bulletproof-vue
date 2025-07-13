<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="nav-section__title">Main</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/" class="nav-item">
              <span class="nav-item__icon">🏠</span>
              <span class="nav-item__text">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/profile" class="nav-item">
              <span class="nav-item__icon">👤</span>
              <span class="nav-item__text">Profile</span>
            </RouterLink>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h3 class="nav-section__title">Admin</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/admin/users" class="nav-item">
              <span class="nav-item__icon">👥</span>
              <span class="nav-item__text">Users</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/settings" class="nav-item">
              <span class="nav-item__icon">⚙️</span>
              <span class="nav-item__text">Settings</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.app-sidebar {
  width: 16rem;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.nav-section__title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  margin: 0 1.5rem 0.75rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  text-decoration: none;
  color: #6b7280;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #f9fafb;
  color: #111827;
}

.nav-item.router-link-active {
  background-color: #eff6ff;
  color: #3b82f6;
  border-right: 3px solid #3b82f6;
}

.nav-item__icon {
  font-size: 1.125rem;
}

.nav-item__text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    top: 4rem;
    left: -16rem;
    height: calc(100vh - 4rem);
    z-index: 50;
    transition: left 0.3s ease;
  }
  
  .app-sidebar--open {
    left: 0;
  }
}
</style>