<template>
  <div class="grid justify-center">
    <div class="flex mb-5 justify-center">
      <DrawerForm :title="''" v-model:show="showDrawerForm">
        <div class="mt-7 grid gap-4 mb-4 sm:grid-cols-2">
          <Select
            name="city.name"
            class="DrawerInputs"
            :options="industries"
            optionLabel="name"
            placeholder="Seleccione un sector"
            fluid />
          <InputText
            class="DrawerInputs"
            placeholder="Nombre de la posicion"
            name="name"
            :model="v$.name"
            @change="handleInput" />

          <Select
            class="DrawerInputs"
            name="city.name"
            :options="disponibilidad"
            optionLabel="name"
            placeholder="Seleccione la disponibilidad"
            fluid />
          <Select
            class="DrawerInputs"
            name="city.name"
            :options="modalidad"
            optionLabel="name"
            placeholder="Modalidad"
            fluid />
          <InputText
            class="DrawerInputs"
            label="Codigo"
            name="code"
            placeholder="Monto salarial destinado "
            :model="v$.code"
            @change="handleInput" />
          <Select
            class="DrawerInputs"
            name="city.name"
            :options="estatus"
            optionLabel="name"
            placeholder="Estatus"
            fluid />
        </div>
        <div
          style="margin-top: 20%; display: flex; justify-content: space-around">
          <Button
            label="Guardar"
            @click="onToggleDrawerForm(true)"
            severity="info" />
          <Button
            label="Cerrar"
            @click="onToggleDrawerForm()"
            severity="warn" />
          <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400" />
        </div>
      </DrawerForm>
    </div>
    <div class="card" style="margin-top: 5%">
      <Carousel
        :value="products"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="1000">
        <template #item="slotProps">
          <div
            class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
            <div class="mb-4">
              <div class="relative mx-auto"></div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
              <div class="mt-0 font-semibold text-xl">
                ${{ slotProps.data.price }}
              </div>
              <span>
                <Button icon="pi pi-heart" severity="secondary" outlined />
                <Button icon="pi pi-shopping-cart" class="ml-2" />
              </span>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Select, Button, InputText, Carousel } from "primevue";
import DrawerForm from "../../components/DrawerForm.vue";
// import { RouterNames } from "../../enums";
// import { router } from "../../router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const showDrawerForm = ref(false);

const industries = ref([
  { name: "Ingenieria", code: "NY" },
  { name: "Salud", code: "RM" },
  { name: "Medicina", code: "IST" },
  { name: "Ciencias economicas", code: "PRS" },

  { name: "Comunicacion", code: "COM" },
  { name: "Juridico", code: "JUR" },
  { name: "Ventas", code: "VEN" },
  { name: "Enseñanza/Docencia", code: "TEA" },
]);

const disponibilidad = ref([
  { name: "Inmediata", code: "IN" },
  { name: "10 a 15 dias", code: "MASD" },
]);

const modalidad = ref([
  { name: "Remota", code: "REM" },
  { name: "Hibrida", code: "HIB" },
  { name: "Presencial", code: "PRE" },
]);

const estatus = ref([
  { name: "Activa", code: "ACT" },
  { name: "Inactiva", code: "INAC" },
]);

const formInitialState: any = {
  name: "",
  code: "",
  id: 0,
};
const jobFormRules = {
  name: { required },
  code: { required },
};

let jobForm = reactive({ ...formInitialState });
const v$ = useVuelidate(jobFormRules, jobForm);

const handleInput = (e: any) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  jobForm = {
    ...jobForm,
    [fieldName]: fieldValue,
  };
};

const products = ref([
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 1,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "2000",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    image: "black-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "3000",
    code: "zz21cz3c1",
    name: "Blue Band",
    description: "Product Description",
    image: "blue-band.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
]);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const onSubmit = async () => {
  // const validated = await v$.value.$validate();
  // if (!validated) return;
  // if (jobForm.id === 0) await useStats.createKpiName(jobForm);
  // else await useStats.updateKpiName(jobForm, Number(jobForm.id));
  // router.push({ name: RouterNames.CORE_STATS });
  // //refresh users list on app
};

const onToggleDrawerForm = async (saveuser?: boolean) => {
  if (saveuser) await onSubmit();
  jobForm.name = "";
  jobForm.code = "";
  jobForm.is_active = true;
  showDrawerForm.value = !showDrawerForm.value;
};
</script>

<style>
.card {
  height: 70%;
  border: 2;
  border-radius: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.DrawerInputs {
  margin-bottom: 3%;
}
</style>
