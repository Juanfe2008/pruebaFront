<template>
  <div class="content" id="app">
    <form v-on:submit.prevent="procesar()" name="form" id="form">
      <h1>User Registration</h1>
      <br />

      <div class="form-group row col-sm-12">
        <label class="col-sm-1"> Name </label>
        <input
          class="col-sm-5 form-control"
          placeholder="Name"
          v-model="name"
        />
        <label class="col-sm-1"> Last Name </label>
        <input
          class="form-control col-sm-5"
          placeholder="Last Name"
          v-model="lastName"
        />
      </div>
      <div class="col-sm-12 row">
        <div class="form-group messaje col-sm-6">
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
        <div class="form-group messaje col-sm-6">
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
      </div>

      <div class="form-group row col-sm-12">
        <label class="col-sm-1">Telephone</label>
        <input
          type="number"
          class="form-control col-sm-5"
          placeholder="Telephone"
          v-model="telephone"
        />
        <label class="col-sm-1">Address</label>
        <input
          class="form-control col-sm-5"
          placeholder="Address"
          v-model="address"
        />
      </div>

      <div class="col-sm-12 row">
        <div class="form-group messaje col-sm-6">
          <div v-if="submited && !$v.telephone.required">
            *The last telephone field is required
          </div>
          <div v-if="submited && !$v.telephone.minLength">
            *Must have a minimum of 10 characters
          </div>
          <div v-if="submited && !$v.telephone.maxLength">
            *Must have a maximum of 10 charactersss prueba
          </div>
        </div>
        <div class="form-group messaje col-sm-6">
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
      </div>


      <div class="form-group row col-sm-12">
        <label class="col-sm-1">E-Mail</label>
        <input
          class="form-control col-sm-5"
          placeholder="E-Mail"
          v-model="email"
        />
        <label class="col-sm-1">Password</label>
        <input type="password"
          class="form-control col-sm-5"
          placeholder="Password"
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
      <div class="col-sm-12">
        <button type="submit" class="btn btn-success" @click="save">
        Register
      </button>
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
import CrudService from "../pages/services/crudService";
export default {
  layout: 'anonymous',
  head() {
    return {
      title: "Register",
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
      id: "",
      user: [],
      personas: null,
      persona: {
        idCliente: null,
        nombres: null,
        apellidos: null,
        telefono: null,
        direccion: null,
        email: null,
      },
    };
  },
  methods: {
    procesar() {},
    save() {
      this.submited = true;
      if (this.$v.$invalid) {
        return false;
      }
      const persona = {
        nombres: this.name,
        apellidos: this.lastName,
        telefono: this.telephone,
        direccion: this.address,
        email: this.email,
      };
      console.log(persona);
      this.crudService.save(persona).then((data) => {
        if (data.status === 200) {
          this.getAll();
          this.submited = false;
          (this.name = ""),
            (this.lastName = ""),
            (this.telephone = ""),
            (this.address = ""),
            (this.email = "");
        }
        console.log(data);
      });
    },
    select(event) {
      console.log(event);
      console.log(this.personas[event]);
      (this.name = this.personas[event].nombres),
        (this.lastName = this.personas[event].apellidos),
        (this.telephone = this.personas[event].telefono),
        (this.address = this.personas[event].direccion),
        (this.email = this.personas[event].email);
      this.id = this.personas[event].idCliente;
    },
    edit() {
      const persona = {
        idCliente: this.id,
        nombres: this.name,
        apellidos: this.lastName,
        telefono: this.telephone,
        direccion: this.address,
        email: this.email,
      };
      console.log(persona);
      this.crudService.save(persona).then((data) => {
        console.log(data);
      });
    },
    delet(index) {
      this.crudService.delet(this.personas[index].idCliente).then((data) => {
        if (data.status === 200) {
          alert("Usuario Eliminado");
        }
      });
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
      minLength: minLength(9),
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
  created() {
    this.crudService = new CrudService();
  },
  mounted() {
    this.crudService.getAll().then((data) => {
      this.personas = data.data;
      console.log(this.personas);
    });
  },
};

</script>

<style>
.messaje {
  padding-left: 6.5rem !important;
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
