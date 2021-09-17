<template>
  <div>
  <Navigation v-if="bandera != true"/>
  <Register v-if="bandera == true"/>
  <div class="content">
    <nuxt />
  </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Register from '../components/Register.vue';

export default {
  head() {
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
    Navigation,
    Register
  },
  data(){
    return {
      bandera: false
    }
  },
  created(){
    if(this.$router == 'register'){
      bandera = true
      console.log(bandera);
    } else {
      console.log("no entro condicion");
    }
  }
};
</script>
<

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
