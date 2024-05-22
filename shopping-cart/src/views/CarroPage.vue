<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <h2 class="ion-text-center" >Agregar Carro</h2>
                <ion-item color="light">
                    <InputComponent v-model="carroJson.marca" id="marca" name="marca" type="text" label="Marca: " placeholder="ingrese nombre de la marca" required />
                </ion-item>
                <ion-item color="light">
                    <InputComponent v-model="carroJson.modelo" id="modelo" name="modelo" type="text" label="Modelo: " placeholder="ingrese el modelo" required />
                </ion-item>
                <ion-item color="light">
                    <InputComponent v-model="carroJson.placa" id="placa" name="placa" type="text" label="Placa: " placeholder="ingrese la placa" required />
                </ion-item>
                <ion-item color="light">
                    <InputComponent v-model="carroJson.color" id="color" name="color" type="text" label="Color: " placeholder="ingrese el color" required />
                </ion-item>
                <ion-item color="light">
                    <ion-select interface="popover" label="Categorias" v-model="carroJson.categoriaId.id"
                        placeholder="Selecciona">
                        <ion-select-option v-for="categoria in categorias" :key="categoria.id"
                            :value="categoria.id">{{ categoria.nombre }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item color="light">
                    <ion-select interface="popover" label="Usuario" v-model="carroJson.usuarioId.id"
                        placeholder="Selecciona">
                        <ion-select-option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.correo}}</ion-select-option>
                    </ion-select>
                </ion-item>
                <br>
                <ion-button id="guardar" value="Guardar" color="warning" @Click="guardarCarro()">Guardar</ion-button>
                <ion-button id="dashboard" value="dashboard" color="light" @click="irDashboard()">Volver al dashboard</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonCard, IonButton,IonSelect,IonSelectOption } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios'
import InputComponent from '@/components/InputComponent.vue';
import { onMounted, ref } from 'vue';

const router = useRouter();

const irDashboard = () => {
  router.push('/dashboard');
};

let url = 'http://localhost:9000/parcial/api/carro'
let categorias = ref([])
let usuarios = ref([])
let carroJson = {
    marca: "",
    modelo: '',
    placa: '',
    color: '',
    categoriaId: {
        id: 0
    },
    usuarioId: {
        id: 0
    }
}

onMounted(() => {
    obtenerCategorias();
    obtenerUsuarios();
});

const obtenerCategorias = () => {
    axios.get('http://localhost:9000/parcial/api/categoria').then(
        (response) => {
            categorias.value = response.data;
            console.log(categorias)
        }
    ).catch(function (error) {
        console.error("Estado de la petición: ", error);
        alert('No se pudo realizar la acción');
    });
}
const obtenerUsuarios = () => {
    axios.get('http://localhost:9000/parcial/api/usuario').then(
        (response) => {
            usuarios.value = response.data;
            console.log(categorias)
        }
    ).catch(function (error) {
        console.error("Estado de la petición: ", error);
        alert('No se pudo realizar la acción');
    });
}

const guardarCarro = () => {
    if (carroJson.marca === '') {
        alert('Ingrese una marca')
    } else if (carroJson.modelo === '') {
        alert('Ingrese un modelo')
    }
    else if (carroJson.placa === '') {
        alert('Ingrese una placa')
    }
    else if (carroJson.color === '') {
        alert('Ingrese un color')
    }
    else if (carroJson.categoriaId.id === 0) {
        alert('Ingrese una categoria')
    }
    else if (carroJson.usuarioId.id === 0) {
        alert('Ingrese un usurio')
    }
    else {
        axios({ method: 'POST', url: url, data: carroJson })
            .then(function (response) {
                let estado = response.status;
                if (estado === 200) {
                    alert('Éxito! ' + ' La acción se realizó correctamente.');
                    window.location.href='/carrocrud'
                }
            })
            .catch(function (error) {
                console.error("Estado de la petición: ", error);
                alert('Error' + ' No se pudo realizar la acción');
            });
    }

}

</script>