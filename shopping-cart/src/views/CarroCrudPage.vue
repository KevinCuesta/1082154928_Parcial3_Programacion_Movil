<template>
    <ion-page>
        <ion-content ref="content" class="ion-padding">
            <h1>Crud Carros</h1>
        <ion-button color="primary" value="agregar" id="guardarCarro" @click="$router.push('/carro')">
            Agregar Carro
        </ion-button>
            <ion-card color="light" v-for="carro in carros" :key="carro.id">
                <ion-card-header>
                    <ion-card-title class="ion-text-center">{{ carro.marca }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p><strong>Modelo:</strong> {{ carro.modelo }}</p>
                    <p><strong>Color:</strong> {{ carro.color }}</p>
                    <p><strong>Placa:</strong> {{ carro.placa }}</p>
                    <p><strong>Categoria:</strong> {{ carro.categoriaId.nombre }}</p>
                    <p><strong>Correo del usuario:</strong> {{ carro.usuarioId.correo }}</p>
                </ion-card-content>
                <ion-item color="light">
                    <ion-button id="actualizar_carro" value="Actualizar" color="success"
                        @click="obtenerPorId(carro.id)" class="large-button">
                        Actualizar
                    </ion-button>
                    <ion-button id="actualizar_eliminar" value="eliminar" color="danger"
                        @click="eliminarCarro(carro.id)" class="large-button">
                        Eliminar
                    </ion-button>
                </ion-item>
            </ion-card>
            <ion-modal :is-open="modalIsOpen">
                <ion-header>
                    <ion-toolbar color="light">
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen(false)">
                                < Regresar</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <h1 class="ion-text-center">Actualizar Carro</h1>
                <ion-item color="light">
                    <ion-input v-model="carroJson.marca" obligatorio="*" id="nombre" type="text" label="Marca"
                        placeholder="Digite la marca" required />
                </ion-item>
                <ion-item color="light">
                    <ion-input v-model="carroJson.modelo" obligatorio="*" id="marca" type="text" label="Modelo"
                        placeholder="Digite el modelo" required />
                </ion-item>
                <ion-item color="light">
                    <ion-input v-model="carroJson.placa" obligatorio="*" id="marca" type="text" label="Placa"
                        placeholder="Digite la placa del vehiculo" required />
                </ion-item>
                <ion-item color="light">
                    <ion-input v-model="carroJson.color" obligatorio="*" id="marca" type="text" label="Color"
                        placeholder="Digite el color" required />
                </ion-item>
                <ion-item color="light">
                    <ion-select interface="popover" label="Categorias" v-model="carroJson.categoriaId.id"
                        placeholder="Seleccionar">
                        <ion-select-option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{
                categoria.nombre }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item color="light">
                    <ion-select interface="popover" label="Usuario" v-model="carroJson.usuarioId.id"
                        placeholder="Seleccionar">
                        <ion-select-option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.correo
                            }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <br>
                <ion-button id="guardar" value="Guardar" color="success"
                    @Click="actualizarCategoria()">Editar</ion-button>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonCard, IonButton, IonInput, IonCardHeader, IonModal,IonSelect,IonSelectOption,IonToolbar,IonHeader,IonButtons  } from '@ionic/vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';

let url = 'http://localhost:9000/parcial/api/carro'
const setOpen = (open: boolean) => (modalIsOpen.value = open)
let carroJson = {
    marca: '',
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
let usuarios = ref([])
let categorias = ref([])
let carros = ref([])
let modalIsOpen = ref(false)
let idActualizar = ref()

onMounted(() => {
    obtenerCarros();
    obtenerCategorias();
    obtenerUsuarios()
});

const obtenerCarros = () => {
    axios.get(url).then(
        (response) => {
            carros.value = response.data;
        }
    ).catch(function (error) {
        console.error("Estado de la petición: ", error);
        alert('No se pudo realizar la acción');
    });
}

const obtenerCategorias = () => {
    axios.get('http://localhost:9000/parcial/api/categoria').then(
        (response) => {
            categorias.value = response.data;
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
        }
    ).catch(function (error) {
        console.error("Estado de la petición: ", error);
        alert('No se pudo realizar la acción');
    });
}

const obtenerPorId = (id) => {
    let urlById = url + '/' + id;
    axios.get(urlById).then(
        (response) => {
            let datos = response.data;
            idActualizar.value= datos.id
            carroJson.marca = datos.marca
            carroJson.modelo = datos.modelo
            carroJson.placa = datos.placa
            carroJson.color = datos.color
            carroJson.categoriaId.id = datos.categoriaId.id
            carroJson.usuarioId.id = datos.usuarioId.id
            console.log(carroJson)
            modalIsOpen.value = true;
        }).catch((error) => {
            console.error("Error al obtener el carro por ID:", error);
        });
};

const actualizarCategoria = () => {
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
        axios({ method: 'PUT', url: url+'/'+idActualizar.value, data: carroJson })
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

const eliminarCarro = (id) => {
    axios({ method: 'DELETE', url: url + '/' + id, data: { id: id } })
        .then(function (response) {
            let estado = response.status;
            if (estado === 200) {
                alert('Éxito! ' + ' La acción se realizó correctamente.');
                window.location.reload
            }
        })
        .catch(function (error) {
            console.error("Estado de la petición: ", error);
            alert('Error' + ' No se pudo realizar la acción');
        });
}
</script>