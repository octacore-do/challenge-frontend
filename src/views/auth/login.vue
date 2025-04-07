<template>
  <div class="card">
    <Dialog v-model:visible="showOTPDrawer" modal header="Mensaje de OTP">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Por favor introducir el OTP enviado a us correo electronico</span
      >
      <div class="flex items-center gap-4 mb-4">
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="initialValues.otp" />
        />
      </div>
      <div class="flex justify-center gap-2">
        <Button
          label="Cancel"
          severity="danger"
          @click="showOTPDrawer = !showOTPDrawer"></Button>
        <Button
          label="Enviar"
          severity="success"
          @click="handleOtpChange"></Button>
      </div>
    </Dialog>
    <div class="w-full h-[90%]">
      <Toast />
      <div class="w-12 h-10 flex start">
        <Button class="" type="submit" severity="secondary" label="Registro">
          <svg
            fill="#000000"
            height="200px"
            width="200px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 219.151 219.151"
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"></path>
                <path
                  d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"></path>
              </g>
            </g>
          </svg>
        </Button>
      </div>
      <div class="flex justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/041/731/156/non_2x/login-icon-vector.jpg"
          width="110px"
          height="90px"
          alt="" />
      </div>
      <div class="flex justify-center mt-5">
        <Form
          v-slot="$form"
          :initialValues
          :resolver
          :validateOnValueUpdate="false"
          :validateOnBlur="true"
          @submit="onFormSubmit"
          class="flex flex-col gap-8 sm:w-80">
          <div class="input flex flex-col">
            <IconField>
              <InputIcon class="pi pi-user" />
              <InputText
                name="email"
                placeholder="Correo electronico"
                fluid
                v-model="initialValues.email" />
              <Message
                v-if="$form.email?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.email.error.message }}
              </Message>
            </IconField>
          </div>
          <div class="btn">
            <Button type="submit" severity="secondary" label="Sign in" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Form } from "@primevue/forms";
import { useUserStore } from "../../store/modules/user";
import {
  useToast,
  InputText,
  Message,
  Toast,
  Button,
  IconField,
  InputIcon,
  Dialog,
} from "primevue";
import type { Username } from "../../store/types/store";

const router = useRouter();
const toast = useToast();
const isSuccess = ref<Boolean | null>(null);
const userStore = useUserStore();

const showOTPDrawer = ref(false);

const formInitialValues: Username = {
  password: "",
  email: "",
  otp: "",
};

const initialValues: Username = reactive({ ...formInitialValues });
const loading = ref(false);

const resolver = ({ values }: any) => {
  const errors: any = {};

  if (!values.email)
    errors.email = [{ message: "El correo electronico es requerido." }];

  return {
    errors,
  };
};

async function onFormSubmit({ valid }: any) {
  loading.value = true;
  if (valid) {
    isSuccess.value = await userStore.getOTPByEmail(initialValues.email);

    toast.add({
      severity: isSuccess.value ? "success" : "error",
      summary: isSuccess.value
        ? "Se envio el OTP a su correo"
        : "Hubo un error inesperado!",
      life: 3000,
    });

    if (isSuccess.value) {
      // abrir drawer
      showOTPDrawer.value = true;
    }
    loading.value = false;
  }
}

const handleOtpChange = async () => {
  if (initialValues.otp != null) {
    showOTPDrawer.value = false;
    const { email, otp } = initialValues;
    const tokenResponseSuccess = await userStore.getTokenByOTP({
      email,
      otp,
    });

    if (tokenResponseSuccess) router.push("/home");
  }
};
</script>

<style>
.card {
  background: rgb(255, 255, 255);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 90vh;
  height: 50vh;
  display: flex;
  align-items: center;
}
</style>
