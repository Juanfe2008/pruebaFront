<template>
  <div class="" id="app">
    <form v-on:submit.prevent="procesar()" name="form" id="form">
      <h1>Basic user CRUD</h1>
      <br />
      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Name </label>
        <input
          class="col-sm-5 form-control"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.name.required">
          *The name field is required
        </div>
        <div v-if="submited && !$v.name.minLength">
          *Must have a minimum of 1 characters
        </div>
        <div v-if="submited && !$v.name.maxLength">
          *Must have a maximum of 50 characters
        </div>
      </div>

      <div class="form-group row col-sm-10">
        <label class="col-sm-1"> Last Name </label>
        <input
          class="form-control col-sm-5"
          placeholder="Last Name"
          v-model="lastName"
        />
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.lastName.required">
          *The last name field is required
        </div>
        <div v-if="submited && !$v.lastName.minLength">
          *Must have a minimum of 1 characters
        </div>
        <div v-if="submited && !$v.lastName.maxLength">
          *Must have a maximum of 50 characters
        </div>
      </div>

      <div class="form-group row col-sm-10">
        <label class="col-sm-1">Telephone</label>
        <input
          type="number"
          class="form-control col-sm-5"
          placeholder="Telephone"
          v-model="telephone"
        />
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.telephone.required">
          *The last telephone field is required
        </div>
        <div v-if="submited && !$v.telephone.minLength">
          *Must have a minimum of 10 characters
        </div>
        <div v-if="submited && !$v.telephone.maxLength">
          *Must have a maximum of 10 characters
        </div>
      </div>

      <div class="form-group row col-sm-10">
        <label class="col-sm-1">Address</label>
        <input
          class="form-control col-sm-5"
          placeholder="Address"
          v-model="address"
        />
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.address.required">
          *The last address field is required
        </div>
        <div v-if="submited && !$v.address.minLength">
          *Must have a minimum of 5 characters
        </div>
        <div v-if="submited && !$v.address.maxLength">
          *Must have a maximum of 20 characters
        </div>
      </div>

      <div class="form-group row col-sm-10">
        <label class="col-sm-1">E-Mail</label>
        <input
          class="form-control col-sm-5"
          placeholder="E-Mail"
          v-model="email"
        />
      </div>
      <div class="row form-group messaje">
        <div v-if="submited && !$v.email.required">
          *The last email field is required
        </div>
        <div v-if="submited && !$v.email.email">
          *You must write a valid email
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
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";

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
      telephone: "",
      address: "",
      email: "",
      user: [],
    };
  },
  methods: {
    add: function (user) {
      console.log("hola", user);
      try {
      } catch (error) {
        console.log(error);
      }
    },
    procesar() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }
      try {
        this.user.push({
          name: this.name,
          lastName: this.lastName,
          telephone: this.telephone,
          address: this.address,
          email: this.email,
        }),

          (this.submited = false);
        (this.name = ""),
          (this.lastName = ""),
          (this.telephone = ""),
          (this.address = ""),
          (this.email = "");
        let parametros =
          "nombres=" +
          this.user.name +
          "&apellidos=" +
          this.user.lastName +
          "&telefono=" +
          this.user.telephone +
          "&direccion=" +
          this.user.address +
          "&email=" +
          this.user.email;
        console.log(this.user);
        axios.
        post("localhost:8080/clientes", this.user)
        .then( (res) => {
          if(res.status==200){
            console.log(res);
          }
        }).catch( /* (error) => {
          console.log(error);
        } */);
      } catch (error) {
        console.log(error);
      }
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    telephone: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10),
    },
    address: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    email: {
      required,
      email,
    },
  },
};
</script>
<style>
.messaje {
  padding-left: 6rem !important;
  color: dimgray;
}

.input-validate {
  border: 1px solid darkred;
  border-radius: 0.25rem;
  transition: border-color 0.15s cubic-bezier(0.42, 0, 0.76, 1.1),
    box-shadow 0.15s ease-in-out;
}
.input-validate:hover {
  border: 1px solid darkred;
  border-radius: 0.25rem;
  transition: border-color 0.15s cubic-bezier(0.42, 0, 0.76, 1.1),
    box-shadow 0.15s ease-in-out;
}
</style>
