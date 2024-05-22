<template>
    <ion-page>
        <ion-content ref="content" class="ion-padding">
            <h1>Crud categorias</h1>
            <ion-button color="primary" value="categoria" id="guardarCategoria"
                @click="$router.push('/categoria')">
                Agregar Categoria
            </ion-button>
            <ion-card v-for="categoria in categorias" :key="categoria.id">
                <ion-card-header>
                    <ion-card-title class="ion-text-center">{{ categoria.nombre }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p><strong>Descripcion:</strong> {{ categoria.descripcion }}</p>
                </ion-card-content>
                <ion-item color="light">
                    <ion-button id="actualizar_producto" value="Actualizar" color="success"
                        @click="obtenerPorId(categoria.id)" class="large-button">
                        Actualizar
                    </ion-button>
                    <ion-button id="eliminar" value="eliminar" color="danger"
                        @click="eliminarCategoria(categoria.id)" class="large-button">Eliminar
                    </ion-button>
                </ion-item>
            </ion-card>
            <ion-modal :is-open="modalIsOpen">
                <ion-header>
                    <ion-toolbar color="light">
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen(false)">
                                <= Regresar</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <div class="modal-content">
                    <div id="data-form">
                        <h1 class="ion-text-center">Actualizar Categoria</h1>
                        <ion-item color="light">
                            <InputComponent v-model="categoriaJson.nombre" id="nombre" name="nombre" type="text" label="Nombre: " placeholder="ingrese el nombre" required />
                        </ion-item>
                        <ion-item color="light">
                            <InputComponent v-model="categoriaJson.descripcion" id="descripcion" name="descripcion" type="text" label="Descripcion: " placeholder="ingrese una descripcion" required />
                        </ion-item>
                        <br>
                        <ion-button id="guardar" value="Guardar" color="primary"
                            @Click="actualizarCategoria()">Editar</ion-button>
                    </div>
                </div>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonCard, IonButton, IonInput, IonCardHeader, IonModal, IonToolbar, IonHeader, IonButtons } from '@ionic/vue';
import axios from 'axios'
import InputComponent from '@/components/InputComponent.vue';
import { ref, onMounted } from 'vue';

let url = 'http://localhost:9000/parcial/api/categoria'
let categorias = ref([])
let categoriaJson = {
    nombre: '',
    descripcion: ''
}
let modalIsOpen = ref(false)
let idActualizar = ref()
const setOpen = (open: boolean) => (modalIsOpen.value = open)

onMounted(() => {
    obtenerCategorias();
});

const obtenerCategorias = () => {
    axios.get(url).then(
        (response) => {
            categorias.value = response.data;
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
            idActualizar = datos.id
            categoriaJson.nombre = datos.nombre
            categoriaJson.descripcion = datos.descripcion
            modalIsOpen.value = true;
        }).catch((error) => {
            console.error("Error al obtener producto por ID:", error);
        });
};

const actualizarCategoria = () => {
    if (categoriaJson.nombre === '') {
        alert('Ingrese un nombre')
    } else if (categoriaJson.descripcion === '') {
        alert('Ingrese una descripcion')
    } else {
        axios({ method: 'PUT', url: url + '/' + idActualizar, data: categoriaJson })
            .then(function (response) {
                let estado = response.status;
                if (estado === 200) {
                    alert('Éxito! ' + ' La acción se realizó correctamente.');
                    window.location.href = '/categoriacrud'
                }
            })
            .catch(function (error) {
                console.error("Estado de la petición: ", error);
                alert('Error' + ' No se pudo realizar la acción');
            });
    }

}

const eliminarCategoria = (id) => {
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
