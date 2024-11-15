<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              :class="{'border-red-500': emailError}"
              required
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailErrorMessage }}</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              :class="{'border-red-500': passwordError}"
              required
            />
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordErrorMessage }}</p>
          </div>
          <p class="text-right text-sm text-gray-500 my-4">
            <router-link to="/reset-password" class="text-teal-500 hover:underline">Reset Password</router-link>
          </p>
          <button
            type="submit"
            class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            :disabled="!isFormValid"
          >
            Login
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          Don't have an account? 
          <router-link to="/signup" class="text-teal-500 hover:underline">Sign Up</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginForm',  // Multi-word name
    data() {
      return {
        email: '',
        password: '',
        emailError: false,
        passwordError: false,
        emailErrorMessage: '',
        passwordErrorMessage: '',
      };
    },
    computed: {
      // Check if the form is valid
      isFormValid() {
        return this.email && !this.emailError && this.password && !this.passwordError;
      },
    },
    methods: {
      // Validate email format
      validateEmail() {
        if (!this.email) {
          this.emailError = true;
          this.emailErrorMessage = 'Email is required.';
        } else {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          this.emailError = !emailPattern.test(this.email);
          this.emailErrorMessage = this.emailError ? 'Please enter a valid email.' : '';
        }
      },
      
      // Validate password length and check if it's empty
      validatePassword() {
        if (!this.password) {
          this.passwordError = true;
          this.passwordErrorMessage = 'Password is required.';
        } else {
          this.passwordError = this.password.length < 6;
          this.passwordErrorMessage = this.passwordError ? 'Password must be at least 6 characters.' : '';
        }
      },
  
      // Handle login form submission
      handleLogin() {
        this.validateEmail();
        this.validatePassword();
        
        if (this.emailError || this.passwordError) {
          return; // Stop if there are validation errors
        }
  
        console.log('Login data:', { email: this.email, password: this.password });
        // Add your login logic here (e.g., call an API to log in)
      },
    },
    watch: {
      email() {
        this.validateEmail();
      },
      password() {
        this.validatePassword();
      },
    },
  };
  </script>