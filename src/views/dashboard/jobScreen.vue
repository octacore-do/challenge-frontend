<template>
  <div class="grid justify-center">
    <div class="flex mb-5 justify-center">
      <DrawerForm :title="''" v-model:show="showDrawerForm">
        <div class="mt-7 grid mb-4 sm:grid-cols-1">
          <Select
            name="description"
            class="mb-3"
            :options="description"
            optionLabel="name"
            placeholder="Seleccione un sector"
            fluid />
          <InputText
            name="name"
            class="mb-3"
            placeholder="Nombre de la posicion"
            :model="v$.name"
            @change="handleInput" />
          <InputText
            name="salario destinado"
            class="mb-3"
            label="Codigo"
            placeholder="Monto salarial destinado "
            :model="v$.code"
            @change="handleInput" />
          <DatePicker
            v-model="value2"
            placeholder="Expiracion de la vacante"
            showIcon
            iconDisplay="input" />
        </div>
        <div class="flex mt-10 justify-around">
          <Button
            class="w-32"
            label="Guardar"
            @click="onToggleDrawerForm(true)"
            severity="info" />
          <Button
            class="w-32"
            label="Cerrar"
            @click="onToggleDrawerForm()"
            severity="warn" />
          <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400" />
        </div>
      </DrawerForm>
    </div>
    <div class="mt-5">
      <Carousel
        :value="products"
        :numVisible="1"
        :numScroll="1"
        :autoplayInterval="2000">
        <template #item="slotProps">
          <Button severity="secondary" outlined>
            <div
              class="h-64 grid justify-center border border-surface-400 dark:border-surface-700 rounded m-2 p-4 bg-slate-100">
              <div class="mt-4">
                <div class="relative mx-auto"></div>
              </div>
              <div class="mb-2 font-medium">
                {{ slotProps.data.title }}
              </div>
              <div class="mb-2 font-medium">
                {{ slotProps.data.description }}
              </div>
              <div class="flex justify-center items-center">
                <div class="mt-0 font-semibold text-xl">
                  ${{ slotProps.data.salary }}
                </div>
              </div>
            </div>
          </Button>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Select, Button, InputText, Carousel, DatePicker } from "primevue";
import DrawerForm from "../../components/DrawerForm.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type { Job } from "../../store/types/store";
// import { RouterNames } from "../../enums";
// import { router } from "../../router";

const showDrawerForm = ref(false);

const description = ref([
  { name: "Ingenieria", code: "NY" },
  { name: "Salud", code: "RM" },
  { name: "Medicina", code: "IST" },
  { name: "Ciencias economicas", code: "PRS" },
  { name: "Comunicacion", code: "COM" },
  { name: "Juridico", code: "JUR" },
  { name: "Ventas", code: "VEN" },
  { name: "Enseñanza/Docencia", code: "TEA" },
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
    title: "Bamboo Watch",
    salary: 65,
    expire_at: "f230fh0g3",
    description:
      "Aliquam aut iure sed nesciunt distinctio dolores. Est id et consequuntur voluptas est. Iste architecto aut doloribus quo sed provident rem.",
  },
  {
    id: "1000",
    title: "Bamboo Watch",
    salary: 65,
    expire_at: "f230fh0g3",
    description:
      "Aliquam aut iure sed nesciunt distinctio dolores. Est id et consequuntur voluptas est. Iste architecto aut doloribus quo sed provident rem.",
  },
  {
    id: "1000",
    title: "Bamboo Watch",
    salary: 65,
    expire_at: "f230fh0g3",
    description:
      "Aliquam aut iure sed nesciunt distinctio dolores. Est id et consequuntur voluptas est. Iste architecto aut doloribus quo sed provident rem.",
  },
  {
    id: "1000",
    title: "Bamboo Watch",
    salary: 65,
    expire_at: "f230fh0g3",
    description:
      "Aliquam aut iure sed nesciunt distinctio dolores. Est id et consequuntur voluptas est. Iste architecto aut doloribus quo sed provident rem.",
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

// onMounted(() => {
// });
</script>

<style>
.card {
  height: 70%;
  border-color: brown;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
