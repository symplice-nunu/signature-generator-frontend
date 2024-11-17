<template>
  <div class="flex h-screen">
    <!-- Sidebar Component -->
    <SidebarComponent />

    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-gray-100">
      <h1 class="text-3xl text-center font-bold mb-6 text-gray-800">User Management</h1>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-4 p-3 text-center text-green-700 bg-green-100 border border-green-400 rounded">
        {{ successMessage }}
      </div>

      <!-- User Details Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 text-left font-medium">ID</th>
              <th class="py-3 px-4 text-left font-medium">Username</th>
              <th class="py-3 px-4 text-left font-medium">Email</th>
              <th class="py-3 px-4 text-left font-medium">Phone</th>
              <th class="py-3 px-4 text-left font-medium">Verified</th>
              <th class="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'">
              <td class="py-3 px-4 border-b">{{ user.id }}</td>
              <td class="py-3 px-4 border-b">{{ user.username }}</td>
              <td class="py-3 px-4 border-b">{{ user.email }}</td>
              <td class="py-3 px-4 border-b">{{ user.phone }}</td>
              <td class="py-3 px-4 border-b">
                <span :class="user.verified ? 'text-green-500' : 'text-red-500'">
                  {{ user.verified ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="py-3 px-4 border-b">
                <button
                  @click="openModal(user)"
                  class="bg-blue-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <!-- Signature button -->
                <button
                  @click="createOutlookSignature(user)"
                  class="bg-teal-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-teal-600 ml-2 focus:outline-none"
                >
                  Signature
                </button>
                <!-- Update Phone button -->
                <button
                  @click="openPhoneModal(user)"
                  class="bg-green-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-green-600 ml-2 focus:outline-none"
                >
                  Phone
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for Editing User -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-semibold mb-4">Edit User</h2>

          <!-- Form to Edit User -->
          <form @submit.prevent="updateUser">
            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label for="username" class="block text-lg font-semibold">Username</label>
                <input
                  v-model="selectedUser.username"
                  type="text"
                  id="username"
                  class="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="Enter Username" disabled
                />
              </div>

              <div class="mb-4 w-full">
                <label for="email" class="block text-lg font-semibold">Email</label>
                <input
                  v-model="selectedUser.email"
                  type="email"
                  id="email"
                  class="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="Enter Email" disabled
                />
              </div>
            </div>

            <div class="mb-4">
              <label for="companyName" class="block text-lg font-semibold">Company Name</label>
              <input
                v-model="selectedUser.companyName"
                type="text"
                id="companyName"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Name"
              />
            </div>

            <div class="mb-4">
              <label for="missionStatement" class="block text-lg font-semibold">Mission Statement</label>
              <textarea
                v-model="selectedUser.missionStatement"
                id="missionStatement"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Mission Statement"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="companyAddress" class="block text-lg font-semibold">Company Address</label>
              <input
                v-model="selectedUser.companyAddress"
                type="text"
                id="companyAddress"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Address"
              />
            </div>

            <div class="mb-4">
              <label for="companySite" class="block text-lg font-semibold">Company Website</label>
              <input
                v-model="selectedUser.companySite"
                type="url"
                id="companySite"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Website"
              />
            </div>

            <div class="mb-4">
              <label for="userTitle" class="block text-lg font-semibold">User Title</label>
              <input
                v-model="selectedUser.userTitle"
                type="text"
                id="userTitle"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter User Title"
              />
            </div>

            <div class="mb-4">
              <button type="submit" class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600">
                Save Changes
              </button>
            </div>
          </form>

          <!-- Close Button for Modal -->
          <button @click="closeModal" class="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
      </div>

      <!-- Modal for Updating Phone Number -->
      <div
        v-if="showPhoneModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closePhoneModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-semibold mb-4">Update Phone Number</h2>

          <form @submit.prevent="updatePhoneNumber">
            <div class="mb-4">
              <label for="phone" class="block text-lg font-semibold">New Phone Number</label>
              <input
                v-model="newPhoneNumber"
                type="tel"
                id="phone"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter New Phone Number"
              />
            </div>

            <div class="mb-4 flex justify-between gap-2">
              <button
                type="submit"
                class="bg-teal-500 text-white px-6 py-2 text-lg rounded-lg hover:bg-teal-600"
              >
                Update
              </button>
              <button
                @click="closePhoneModal"
                class="bg-gray-500 text-white px-6 py-2 text-lg rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Import Axios for API calls
import SidebarComponent from "../components/Sidebar.vue"; // Import Sidebar Component

export default {
  name: "UserManagement",
  components: {
    SidebarComponent, // Register Sidebar component
  },
  data() {
    return {
      users: [], // Array to hold user data
      selectedUser: null, // Currently selected user for editing
      newPhoneNumber: "", // For storing the new phone number
      successMessage: "", // For success messages
      showModal: false, // To control the visibility of the user edit modal
      showPhoneModal: false, // To control the visibility of the phone update modal
    };
  },
  methods: {
    // Fetch users from the API
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
      }
    },

    // Open modal for editing user
    openModal(user) {
      this.selectedUser = { ...user }; // Create a copy of the user data to prevent direct mutations
      this.showModal = true; // Show the modal
    },

    // Close modal
    closeModal() {
      this.showModal = false; // Close the modal
    },

    // Open modal for updating phone number
    openPhoneModal(user) {
      this.selectedUser = user; // Set the user to update phone for
      this.newPhoneNumber = user.phone; // Pre-fill the phone number field with current phone number
      this.showPhoneModal = true; // Show the modal
    },

    // Close phone update modal
    closePhoneModal() {
      this.showPhoneModal = false; // Close the phone modal
    },

    // Update user information (Name, Email, etc.)
    async updateUser() {
      try {
        // Only update the necessary fields
        const updateData = {
          companyName: this.selectedUser.companyName,
          missionStatement: this.selectedUser.missionStatement,
          companyAddress: this.selectedUser.companyAddress,
          companySite: this.selectedUser.companySite,
          userTitle: this.selectedUser.userTitle,
        };

        // Make PUT request to the API
        await axios.put(
          `http://localhost:8080/api/auth/update-company-info?userId=${this.selectedUser.id}`,
          updateData
        );

        // Update the local user data
        const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.selectedUser };
        }

        // Show success message
        this.successMessage = "User updated successfully!";

        // Hide the success message after 3 seconds
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);

        this.closeModal(); // Close the modal after updating
      } catch (error) {
        console.error("Error updating user:", error.response ? error.response.data : error);
        alert("Failed to update user. Please try again later.");
      }
    },

    // Update Phone Number
    async updatePhoneNumber() {
      try {
        await axios.put(`http://localhost:8080/api/auth/update-phone?userId=${this.selectedUser.id}`, {
          phone: this.newPhoneNumber,
        });

        // Update phone number in the local users array
        const index = this.users.findIndex((user) => user.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index].phone = this.newPhoneNumber; // Update the phone number
        }

        this.successMessage = "Phone number updated successfully!";
        setTimeout(() => {
          this.successMessage = ""; // Hide success message after 3 seconds
        }, 3000);

        this.closePhoneModal(); // Close the phone update modal
      } catch (error) {
        console.error("Error updating phone number:", error.response ? error.response.data : error);
        alert("Failed to update phone number. Please try again later.");
      }
    },

    // Open the signature URL in a new tab and copy user details to clipboard
    createOutlookSignature(user) {
      // Open Outlook signature settings in a new tab
      window.open("https://outlook.office.com/mail/options/accounts-category/signatures-subcategory", "_blank");

      // Copy user details to clipboard
      const userDetails = `
        ${user.username}
        ${user.userTitle}
        ${user.email}
        ${user.phone}
        ${user.companyName}
        ${user.companyAddress}
        ${user.companySite}
        ${user.companyAddress}
      `;
      navigator.clipboard.writeText(userDetails).then(() => {
        this.successMessage = "User details copied to clipboard!";
        setTimeout(() => {
          this.successMessage = ""; // Clear success message after a few seconds
        }, 5000);
      }).catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
};
</script>