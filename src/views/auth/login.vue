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
    <div class="grid justify-center w-full h-[90%]">
      <Toast />
      <div class="mt-14">
        <img
          src="https://static.vecteezy.com/system/resources/previews/041/731/156/non_2x/login-icon-vector.jpg"
          width="110px"
          height="90px"
          alt="" />
      </div>
      <div class="flex justify-center mb-24">
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
          <div class="">
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
