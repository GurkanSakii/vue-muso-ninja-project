<template>
  <form @submit.prevent="registerSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const registerSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        router.push({ name: "UserPlaylists" });
        console.log("user signed up");
      }
    };

    return { email, password, displayName, isPending, error, registerSubmit };
  },
};
</script>

<style></style>
