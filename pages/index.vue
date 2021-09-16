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
          *Must have a maximum of 10 charactersss prueba
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
      <button type="submit" class="btn btn-success btn-sm" @click="save">
        Agregar
      </button>
      <hr style="background: white" />
      <table class="table table-success table-dark table-hover" style="background-color: #262a2d !important; border-radius: 1.25rem">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Telefono</th>
            <th scope="col">Dirección</th>
            <th scope="col">E-Mail</th>
          </tr>
        </thead>
        <tbody v-for="item of personas" :key="item.idCliente">
          <tr >
            <td>{{ item.idCliente }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>{{ item.telefono }}</td>
            <td>{{ item.direccion }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </table>
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
      personas: null,
      persona: {
        nombres: null,
        apellidos: null,
        telefono: null,
        direccion: null,
        email: null,
      },
    };
  },
  methods: {
    procesar() {
      /* this.submited = true;
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
        console.log(this.user);
        await axios
          .post("localhost:8080/clientes", this.user)
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
            }
          })
          .catch( (error) => {
          console.log(error);
        } );
      } catch (error) {
        console.log(error);
      } */
    },
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
    select(event){
      console.log(event);
    }
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
