<template>
  <div class="" id="app">
    <form v-on:submit.prevent="procesar()">
      <h1>Welcome to My first Nuxt App</h1>
      <br />
      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Name </label>
        <input class="col-sm-5 form-control" placeholder="Name" v-model="name"/>

      </div>
      <div class="row form-group messaje">
      <div v-if="submited && !$v.name.required">
          *The name field is required
        </div>
        <div v-if="submited && !$v.name.minLength">
          *Must have a minimum of 5 characters
        </div>
        <div v-if="submited && !$v.name.maxLength">
          *Must have a maximum of 10 characters
        </div>
      </div>

      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Last Name </label>
        <input class="form-control col-sm-5" placeholder="Last Name" v-model="lastName"/>
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.lastName.required">
          *The last name field is required
        </div>
        <div v-if="submited && !$v.lastName.minLength">
          *Must have a minimum of 5 characters
        </div>
        <div v-if="submited && !$v.lastName.maxLength">
          *Must have a maximum of 10 characters
        </div>



      </div>
      <button type="submit" class="btn btn-success btn-sm" @click="add">
        Agregar
      </button>

      <div v-for="item of user" :key="item.name">
        <div class="alert alert-primary mt-4" role="alert">
          <div>{{ item.name }} {{ item.lastName }}</div>
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
      telephone: '',
      address: '',
      email: '',
      user: [],
    };
  },
  methods: {
    add: function () {},
    procesar() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }
      try {
        this.user.push({
          name: this.name,
          lastName: this.lastName,
        }),
          console.log(this.user);
          this.submited = false;
        (this.name = ""), (this.lastName = "");
      } catch (error) {
        console.log(error);
      }
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(10),
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
  .messaje{
    padding-left: 6rem !important;
    color: dimgray;
  }
</style>
