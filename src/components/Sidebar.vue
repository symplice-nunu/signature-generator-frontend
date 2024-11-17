<template>
  <div class="flex h-screen">
    <div class="w-64 bg-teal-500 text-white p-6">
      <h2 class="text-xl font-bold mb-6">Signature Generator</h2>
      <ul>
        <li>
          <router-link 
            to="/dashboard" 
            class="block py-2 px-4 hover:bg-teal-600 rounded"
            exact-active-class="bg-teal-700"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/company-settings" 
            class="block py-2 px-4 hover:bg-teal-600 rounded"
            exact-active-class="bg-teal-700"
          >
            Users
          </router-link>
        </li>
        <li>
          <!-- Logout Link with active class -->
          <button 
            @click="logout" 
            class="block py-2 px-4 hover:bg-teal-600 rounded text-white w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
    <div class="flex-1 p-6 bg-gray-100">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios for making API requests

export default {
  name: 'SidebarComponent',
  methods: {
    // Method to handle logout
    async logout() {
      try {
        // Send POST request to logout API
        const response = await axios.post('http://localhost:8080/api/auth/logout');
        
        // Check if the response is successful
        if (response.data.success) {
          // Redirect user to the login page or perform other necessary actions
          this.$router.push('/login');  // Assuming your login page route is "/login"
          alert('Logged out successfully!');
        } else {
          alert('Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred during logout. Please try again.');
      }
    },
  },
};
</script>