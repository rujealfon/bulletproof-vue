<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="footer-content">
        <div class="footer-section">
          <h4 class="footer-title">Bulletproof Vue</h4>
          <p class="footer-description">
            A scalable, maintainable Vue 3 application architecture.
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><RouterLink to="/" class="footer-link">Home</RouterLink></li>
            <li><RouterLink to="/about" class="footer-link">About</RouterLink></li>
            <li><a href="#" class="footer-link">Documentation</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Support</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Help Center</a></li>
            <li><a href="#" class="footer-link">Contact Us</a></li>
            <li><a href="#" class="footer-link">Bug Reports</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Bulletproof Vue. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: #111827;
  color: #d1d5db;
  margin-top: auto;
}

.app-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.footer-description {
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
}

.copyright {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .app-footer__container {
    padding: 1.5rem 1rem 1rem;
  }
}
</style>