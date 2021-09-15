<template>
  <div class="" id="app">
    <form v-on:submit.prevent="procesar()">
      <h1>Welcome to My first Nuxt App</h1>
      <br />
      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Name </label>
        <input
          class="col-sm-5 form-control"
          placeholder="Name"
          v-model="name"
        />
        <div v-if="submited && !$v.name.required">el campo name es obligatorio</div>
      </div>
      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Last Name </label>
        <input
          class="form-control col-sm-5"
          placeholder="Last Name"
          v-model="lastName"
        />
      </div>
      <button type="submit" class="btn btn-success btn-sm" @click="add">Agregar</button>

      <div v-for="(item) of user" :key="item.name">
      <div class="alert alert-primary mt-4" role="alert">
        <div>
          {{item.name}} {{item.lastName}}
        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  head() {
    return {
      title: "Posts App | Home",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Website abut tutorials",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    };
  },
  data() {
    return {
      submited: false,
      name: "",
      lastName: "",
      user: [],
    };
  },
  methods: {
    add: function () {
      try {
        this.user.push({
          name: this.name,
          lastName: this.lastName,
        }),
          console.log(this.user);
        (this.name = ""), (this.lastName = "");
      } catch (error) {
        console.log(error);
      }
    },
    procesar() {
      this.submited = true
      if (this.$v.$invalid) {
        return false;
      }
      alert(this.name);
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(5),
    },
    lastName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(10),
    },
  },
};
</script>
<style>
</style>
