<template>
  <div>
    <ul class="nav mt-5 justify-content-center">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Registro</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active activo" to="/login">Login</router-link>
      </li>
    </ul>
    <div class="row justify-content-center">
      <div class="col-4"><h3 class="text-center m-5">Login</h3>
        <form class="m-3">
          <div class="form-group">
            <label class="m-2">Escribe tu Correo Electronico</label>
            <input
            type="text"
              placeholder="Ingresa tu E-mail"
            class="form-control"
            v-model="usuario.email"
            required
            />
          </div><br>
          <div class="form-group">
            <label class="m2">Escribe tu Contraseña</label>
            <input
            type="password"
            placeholder="Ingresa tu contraseña"
            class="password1 form-control"
            v-model="usuario.password"
              required
            />
          </div><br>
          <div class="modal-footer form-group d-flex justify-content-end">
            <button class="btn btn-primary boton-formulario-registro m-2" v-on:click.prevent="login()">Confirmar</button> 
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      usuario: {
      email: "",
      password: "",
      },
    };
  },
  methods: {
    login() {
      let apiURL = "http://localhost:4000/api/login";
      axios
      .post(apiURL, this.usuario)
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.token);
        this.user = res.data;
        this.$router.push(`/fin/${this.user.id}`);
      })
      .catch(error => {
        window.alert("Usuario o contraseña incorrectos");
        console.log(error);
      });
      return true;
    }
  },
};
</script>