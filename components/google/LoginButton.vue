<template>
  <div id="googleButton"></div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const authStore = useCurrentUser();

onMounted(() => {
  // initialize Google Sign in
  google.accounts.id.initialize({
    client_id: runtimeConfig.public.CLIENT_ID,
    // client_id: "242705303058-gjse069upbsb4ng9tcb8tf8aoh9b3ch2.apps.googleusercontent.com",
    callback: authStore.handleGoogleCredentialResponse, //method to run after user clicks the Google sign in button
    context: "signin",
  });
  // render button
  google.accounts.id.renderButton(document.getElementById("googleButton"), {
    type: "standard",
    size: "large",
    text: "signin_with",
    shape: "rectangular",
    logo_alignment: "center",
  });
});
</script>
