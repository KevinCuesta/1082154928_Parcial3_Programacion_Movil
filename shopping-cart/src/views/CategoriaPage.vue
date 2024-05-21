<template>
    <ion-page @ionViewDidEnter="findAllRecords">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Categoria Crud</ion-title>
        </ion-toolbar>
      </ion-header>
      <InputComponent v-model="id" id="id" type="" name="id"  />
                <InputComponent v-model="nombre" id="nombre" name="nombre" label="Nombre: " />
                <InputComponent v-model="descripcion" id="descripcion" name="descripcion" label="Descripcion: " />
  
        
         
                <!-- Botones de CRUD dentro del modal -->
                <CrudButtonComponent :showFind="showFind" :showCreated="showCreated" :showUpdated="showUpdated"
                  :showDeleted="showDeleted" @findAllRecords="findAllRecords" @createRecord="createRecord"
                  @updateRecord="updateRecord" @deleteRecordPhysical="deleteRecordPhysical" />
  
  
          <!-- Mostrar datos -->
          <div class="table-container">
            <ion-list>
              <!-- Iterar sobre items para mostrar los datos en tarjetas -->
              <ion-card v-for="(item, index) in items" :key="index" class="card-width">
                <ion-card-content>
                  <ion-item>
                    <ion-label>Nombre: </ion-label>
                    <ion-label>{{ item.nombre }}</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label>Método de Pago: </ion-label>
                    <ion-label>{{ item.descripcion }}</ion-label>
                  </ion-item>
                </ion-card-content>
                <ion-item>
                  <!-- Botones de editar y eliminar -->
                  <ion-button @click="findById(item.id)">
                    <ion-icon :icon="IonIcons.createOutline"></ion-icon>
                  </ion-button>
                  <ion-button @click="deleteRecordPhysical(item.id)">
                    <ion-icon :icon="IonIcons.trash"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-card>
            </ion-list>
          </div>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import {IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';
  import InputComponent from '@/components/InputComponent.vue';
  import CrudButtonComponent from '@/components/CrudButtonComponent.vue';
  import { showSuccessMessage, showErrorMessage } from '../utils/alerts.js';
  import { onMounted, ref } from 'vue';
  import * as IonIcons from 'ionicons/icons';
  import axios from 'axios';
  
  
  // Rutas de la API
  const baseURL = 'http://localhost:9000/estructura/api/categoria';
  const modalIsOpen = ref(false);
  const items = ref<Array<ItemType>>([]);
  const id = ref('');
  const nombre = ref('');
  const descripcion = ref('');
  
  const showFind = ref<boolean>(false);
  const showCreated = ref<boolean>(true);
  const showUpdated = ref<boolean>(false);
  const showDeleted = ref<boolean>(false);
  
  
  // Tipos
  interface ItemType {
    id: string;
    nombre: string;
    descripcion: string;
  }
  
  onMounted(() => {
    findAllRecords();
  });
  
  // Métodos
  async function findAllRecords() {
    try {
      const response = await axios.get(baseURL);
      items.value = response.data;
    } catch (error) {
      console.error('Error al obtener todos los registros:', error);
      throw error;
    }
  }
  
  //Cargar los datos para edición
  async function findById(recordId: string) {
    try {
      await openModalAdd();
      const response = await axios.get(`${baseURL}/${recordId}`);
      const data = response.data;
  
      id.value = data.id;
      nombre.value = data.nombre;
      descripcion.value = data.metodoPago;
  
      // Controlar la visibilidad de los botones
      showCreated.value = false;
      showUpdated.value = true;
  
  
    } catch (error) {
      console.error('Error al encontrar el registro por ID:', error);
      throw error;
    }
  }
  
  async function createRecord() {
    const data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
    };
  
    try {
      const response = await axios.post(baseURL, data);
      console.log('Registro creado exitosamente:', response.data);
      await findAllRecords();
      await clearData();
      await showSuccessMessage();
      await closeModal();
    } catch (error) {
      console.error('Error al crear el registro:', error);
      await showErrorMessage();
    }
  }
  
  async function updateRecord() {
    const data = {
      id: id.value,
      nombre: nombre.value,
      descripcion: descripcion.value,
    };
  
    try {
      const response = await axios.put(`${baseURL}/${data.id}`, data);
      console.log('Registro actualizado exitosamente:', response.data, id);
  
      await findAllRecords();
      await clearData();
  
      showCreated.value = true;
      showUpdated.value = false;
  
      await closeModal();
  
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      throw error;
    }
  }
  
  
  async function deleteRecordPhysical(id: String) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      await findAllRecords();
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el registro físico:', error);
      throw error;
    }
  }
  
  async function deleteRecordLogical(id) {
    try {
      const response = await axios.put(`${baseURL}/delete-logical/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al realizar el eliminado lógico:', error);
      throw error;
    }
  }
  
  async function clearData() {
    nombre.value = '';
    descripcion.value = '';
  }
  
  
  const openModalAdd = () => {
    modalIsOpen.value = true;
  };
  
  const closeModal = () => {
    modalIsOpen.value = false;
  };
  </script>
  
  <style scoped src="../theme/container.css"></style>