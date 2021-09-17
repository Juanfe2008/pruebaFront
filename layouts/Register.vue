<template>
  <div>
  <Register />
  <div class="content">
    <nuxt />
  </div>
  </div>
</template>

<script>
import Register from '../components/Register.vue';

export default {
  head1() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Oswald&display=swap"
        }
      ]
    };
  },
  components: {
    Register
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #2d3436 !important;
  color: #fff !important;
  font-family: Arial, Helvetica, sans-serif;
}

.content {
  padding: 2rem;
}

</style>
