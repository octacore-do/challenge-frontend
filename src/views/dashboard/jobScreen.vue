<template>
  <div class="grid justify-center">
    <Dialog
      v-model:visible="showCloseSessionDrawer"
      modal
      header="Cerrar sesion">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Esta seguro de que desea cerrar sesion?</span
      >
      <div class="flex justify-center gap-2">
        <Button
          label="Si"
          severity="danger"
          @click="handleCloseSession"></Button>
        <Button
          label="No"
          severity="secondary"
          @click="showCloseSessionDrawer = !showCloseSessionDrawer"></Button>
      </div>
    </Dialog>
    <div class="flex justify-center">
      <div class="w-72 h-10">
        <Button
          icon="pi pi-user"
          type="submit"
          severity="secondary"
          label="Cerrar sesion"
          @click="showCloseSessionDrawer = !showCloseSessionDrawer" />
      </div>
      <DrawerForm :title="''" v-model:show="showDrawerForm">
        <div class="mt-7 grid mb-4 sm:grid-cols-1">
          <Select
            name="description"
            class="mb-3"
            :options="description"
            placeholder="Seleccione un sector"
            optionLabel="name"
            v-model="jobForm.description"
            fluid />
          <InputText
            name="title"
            class="mb-3"
            placeholder="Nombre de la posicion"
            :model="jobForm.title"
            @change="handleInput" />
          <InputText
            name="salario destinado"
            class="mb-3"
            placeholder="Monto salarial destinado "
            :model="jobForm.salary"
            @change="handleInput" />
          <DatePicker
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
        :value="jobStore.jobs"
        :numVisible="3"
        :numScroll="1"
        :autoplayInterval="2000">
        <template #item="slotProps">
          <Button
            severity="secondary"
            @click="onToggleDrawerForm(true, slotProps.data)"
            outlined>
            <div
              class="h-64 grid justify-center border border-surface-400 dark:border-surface-700 rounded m-2 p-4 bg-slate-100">
              <div class="mt-4">
                <div class="relative mx-auto"></div>
              </div>
              <div class="mb-2 text-lg text-slate-900 font-bold underline">
                {{ slotProps.data.title }}
              </div>
              <div class="mb-2 font-medium">
                {{ slotProps.data.description }}
              </div>
              <div class="flex justify-center items-center">
                <div class="mt-0 font-semibold text-xl">
                  {{ formatCurrenct(slotProps.data.salary) }}
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
import DrawerForm from "../../components/DrawerForm.vue";
import { useUserStore } from "../../store/modules/user";
import { useJobStore } from "../../store/modules/jobs";
import type { Job } from "../../store/types/store";
import { router } from "../../router";
import {
  Select,
  Button,
  InputText,
  Carousel,
  DatePicker,
  Dialog,
} from "primevue";

const showDrawerForm = ref(false);
const showCloseSessionDrawer = ref(false);
const userStore = useUserStore();
const jobStore = useJobStore();

interface DescriptionItem {
  name: string;
}
const description = ref<DescriptionItem[]>([
  { name: "Ingenieria" },
  { name: "Salud" },
  { name: "Medicina" },
  { name: "Ciencias economicas" },
  { name: "Comunicacion" },
  { name: "Juridico" },
  { name: "Ventas" },
  { name: "Enseñanza/Docencia" },
]);

const formInitialState: Job = {
  id: 0,
  title: "",
  salary: "",
  description: "",
  expire_at: "",
};

let jobForm: Job = reactive({ ...formInitialState });

const formatCurrenct = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const handleInput = (e: any) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  jobForm = {
    ...jobForm,
    [fieldName]: fieldValue,
  };
};

const onSubmit = async (data?: Job) => {
  const { name } = jobForm.description;
  jobForm.description = name;
  if (jobForm.id === 0) {
    const { id, ...rest } = jobForm;
    await jobStore.createJob(rest);
  } else {
    if (data && data.title != null) {
      const { id, ...rest } = data;
      await jobStore.updateJob(rest, Number(id));
    }
  }
};

const onToggleDrawerForm = async (saveuser?: boolean, data?: Job) => {
  if (saveuser) await onSubmit(data);
  jobForm.title = "";
  jobForm.salary = "";
  jobForm.description = "";
  jobForm.expire_at = null;
  showDrawerForm.value = !showDrawerForm.value;
};

const handleCloseSession = () => {
  userStore.logout();
  router.push("/login");
};

onMounted(async () => {
  await jobStore.fetchJobsData();
});
</script>
