<template>
  <div class="flex gap justify-center">
    <Button
      icon="pi pi-spin pi-cog"
      iconPos="right"
      raised
      @click="onToggle"
      label="Ingresar nueva posicion" />
  </div>

  <Drawer
    v-model:visible="isShow"
    header="Digite debajo los detalles de la posicion:"
    position="left"
    style="height: auto">
    <p>
      {{ title }}
    </p>
    <div>
      <slot />
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { Button, Drawer } from "primevue";

const props = defineProps<{
  title: string;
  show: boolean;
}>();

const isShow = useVModel(props, "show");

const onToggle = () => (isShow.value = !isShow.value);
</script>

<style scoped></style>
