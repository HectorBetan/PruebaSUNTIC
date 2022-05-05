<template>
<div>
    <ul class="nav mt-5 justify-content-center">
        <li class="nav-item">
            <router-link class="nav-link active activo" to="/">Registro</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
        </li>
    </ul>
    <div class="row justify-content-center">
        <div class="col-4 ">
            <h3 class="text-center m-5">Registro</h3>
            <form  id="formulario">
                <div class="form-group">
                    <label class="m-2">Nombre:</label>
                    <input
                    type="text"
                    class="form-control"
                    placeholder="Ingrese aqui su nombre"
                    v-model="usuario.nombre"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Apellidos:</label>
                    <input
                    type="text"
                    class="form-control"
                    placeholder="Ingrese aqui sus apellidos"
                   v-model="usuario.apellidos"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Tipo de Identificación:</label><br>
                    <select class="form-select" v-model="usuario.tipoid">
                        <option class="selecciona" disabled>Seleccione un tipo</option>
                        <option value="Cédula de Ciudadania">Cedula de Ciudadania</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cédula de Extranjería">Cedula de Extranjería</option>
                            <option value="Pasaporte">Pasaporte</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="m-2">Número de Identificación:</label>
                    <input
                    id="numeroid"
                    type="number"
                    class="form-control"
                    placeholder="Ingrese aqui su número de identificación"
                    v-model="usuario.numeroid"
                    pattern="[0-9]{0,99999999999}"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Número telefono fijo o móvil:</label>
                    <input
                    id="telefono"
                    type="tel"
                    pattern="[0-9]{0,99999999999}"
                    class="form-control"
                    placeholder="Ingrese aqui su número de telefono"
                    v-model="usuario.telefono"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Correo Electrónico</label>
                    <input
                    id="email1"
                    type="email"
                    class="form-control"
                    placeholder="Ingrese aqui su correo electrónico"
                 v-model="usuario.email"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Confirmar Correo Electrónico</label>
                    <input
                    id="email2"
                    type="email"
                    placeholder="Ingrese nuevamente su correo electrónico"
                    class="form-control"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Contraseña</label>
                    <input
                    id="password1"
                    type="password"
                    class="form-control"
                    placeholder="Ingrese aqui su contraseña"
                    required
                    />
                </div>
                <div class="form-group">
                    <label class="m-2">Confirmar Contraseña</label>
                    <input
                    id="password2"
                    type="password"
                    placeholder="Ingrese nuevamente su cotraseña"
                    class="form-control"
                    v-model="usuario.password"
                    required
                    />
                </div>
                <div class="form-check aceptar-politicas">
                    <input type="checkbox" class="form-check-input mt-1" id="exampleCheck1" required/>
                    <label class="form-check-label aceptar " for="exampleCheck1"><a type="button" data-bs-toggle="modal" data-bs-target="#modal-politicas"  id="politica">
                    <span class="acepto-las">Acepto las </span> Políticas de Privacidad y Tratamiento de Datos</a></label>
                </div>
                <div class="p-2">
                    <div class="form-group modal-footer form-group d-flex justify-content-end">
                        <button class="btn btn-primary btn-block" v-on:click.prevent="registro()" id="registrar">Registrarse</button>
                    </div>
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
            nombre: "",
            apellidos: "",
            tipoid: "",
            numeroid: "",
            telefono: "",
            email: "",
            password: "",
            },
        };
    },
    methods: {
        registro() {
            let telefono = document.getElementById('telefono');
            let email1 = document.getElementById('email1');
            let email2 = document.getElementById('email2');
            let password1 = document.getElementById('password1');
            let password2 = document.getElementById('password2');
            if (telefono.value.length < 7 || telefono.value.length > 10) {
                window.alert("Número de telefono invalido. Por favor ingrese un numero de telefono valido.");
                return false
            }
            else if (email1.value != email2.value) {
                window.alert("Los correos electronicos no coinciden. Por favor ingresa los correos electronicos correctamente.");
            }
            else if (password1.value != password2.value) {
                window.alert("Las cotraseñas no coinciden. Por favor ingresa las contraseñas correctamente.");
                password1.value = "";
                password2.value = "";
                return false
            }
            else {
            let apiURL = "http://localhost:4000/api/crear-usuario";
            axios
            .post(apiURL, this.usuario)
            .then(() => {
                email2.value = "";
                password2.value = "";
                this.$router.push("/login");
                this.usuario = {
                    nombre: "",
                    apellidos: "",
                    tipoid: "",
                    numeroid: "",
                    telefono: "",
                    email: "",
                    password: "",
                };
            })
            .catch((error) => {
                console.log(error);
            });
                return true;
            }
        },
    },
};
</script>
