<template>
  <ion-page>
    <h2 class="ion-text-center" >Agregar Categoria</h2>
    <ion-content class="ion-padding">
      <div class="center-content">
        <ion-card>
          <ion-items>
            <InputComponent v-model="categoria.nombre" id="nombre" name="nombre" type="text" label="Nombre: " placeholder="ingrese el nombre de la categoria" required />
          </ion-items>
          <ion-item>
            <InputComponent v-model="categoria.descripcion" id="descripcion" name="descripcion" label="Descripcion: " type="text" placeholder="ingrese una descripcion" required />
          </ion-item>
          <br>
          <ion-button id="guardar" value="Guardar" color="warning" @click="guardarCategoria()">Guardar</ion-button>
          <ion-button id="dashboard" value="dashboard" color="light" @click="irDashboard()">Volver al dashboard</ion-button>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>
  
  <script setup lang="ts">
  import { IonPage,  IonCard  } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import InputComponent from '@/components/InputComponent.vue';
  import axios from 'axios';

  
  
  // Rutas de la API
  let url = 'http://localhost:9000/parcial/api/categoria'
  let categoria = {
    nombre: '',
    descripcion: ''
}
const router = useRouter();

const irDashboard = () => {
  router.push('/dashboard');
};
const guardarCategoria = () => {
    if (categoria.nombre.trim() === '') {
        alert('Ingrese un nombre')
    } else if (categoria.descripcion.trim() === '') {
        alert('Ingrese una descripcion')
    } else {
        axios({ method: 'POST', url: url, data: categoria })
            .then(function (response) {
                let estado = response.status;
                if (estado === 200) {
                    alert('Éxito! ' + ' La acción se realizó correctamente.');
                    window.location.href='/categoriacrud'
                }
            })
            .catch(function (error) {
                console.error("Estado de la petición: ", error);
                alert('Error' + ' No se pudo realizar la acción');
            });
    }

}
</script>

