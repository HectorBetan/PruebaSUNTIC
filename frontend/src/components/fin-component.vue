<template>
    <div class="text-center m-5">
        <div class="mt-4"><h3>{{usuario.nombre}} {{usuario.apellidos}}</h3></div>
        <div class="m-2"><h4>{{usuario.tipoid}}: {{usuario.numeroid}} </h4></div>
        <div class="m-2"><h5>E-mail: {{usuario.email}} - Telefono: {{usuario.telefono}}</h5></div>
        <div class="m-4"><h1>Has Iniciado Sesión y el proceso ha terminado</h1></div>
        <div class="m-5 btn"><router-link class="nav-link active activos" to="/">Volver</router-link> </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            usuario: {},
        };
    },
    created() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        let apiURL = `http://localhost:4000/api/buscar-usuario/${this.$route.params.id}`;
        axios
        .get(apiURL)
        .then((res) => {
            this.usuario = res.data;
        })
        .catch((error) => {
            console.log(error);
        });
    },
};
</script>