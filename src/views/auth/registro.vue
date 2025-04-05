<template>
  <div class="card">
    <div class="innerCard">
      <Toast />
      <div class="btn" style="display: flex; justify-content: flex-start">
        <Button
          class="btn"
          icon="pi pi-bookmark"
          type="submit"
          severity="secondary"
          label="Login">
        </Button>
      </div>
      <div class="header">
        <h3 class="">Registro de usuario</h3>
      </div>
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        @submit="onFormSubmit"
        class="flex flex-col gap-8 w-full sm:w-56">
        <div class="flex flex-col gap-2">
          <IconField>
            <InputIcon class="pi-minus-circle" />
            <InputText
              name="firstName"
              type="text"
              placeholder="First Name"
              fluid
              :formControl="{ validateOnValueUpdate: true }" />
            <Message
              v-if="$form.firstName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.firstName.error.message }}</Message
            >
          </IconField>
        </div>
        <div class="input flex flex-col gap-2">
          <IconField>
            <InputIcon class="pi-minus-circle" />
            <InputText
              name="lastName"
              type="text"
              placeholder="Last Name"
              fluid />
            <Message
              v-if="$form.lastName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.lastName.error.message }}</Message
            >
          </IconField>
        </div>
        <div class="input flex flex-col gap-2">
          <IconField>
            <InputIcon class="pi pi-user" />
            <InputText
              name="username"
              type="text"
              placeholder="Username"
              fluid />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error.message }}
            </Message>
          </IconField>
        </div>
        <div class="input flex flex-col gap-2">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-lock" />
            <Password
              name="password"
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error.message }}
            </Message>
          </IconField>
        </div>
        <div class="btn">
          <Button type="submit" severity="secondary" label="Submit" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  useToast,
  InputText,
  Message,
  Toast,
  Button,
  Password,
  IconField,
  InputIcon,
} from "primevue";

import { Form } from "@primevue/forms";

const toast = useToast();

const initialValues = ref({
  username: "",
  firstName: "",
  lastName: "",
  password: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }

  if (!values.firstName) {
    errors.firstName = [{ message: "First name is required." }];
  }

  if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  }

  if (!values.lastName) {
    errors.lastName = [{ message: "Last name is required." }];
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: center;
}

.card {
  background: var(--card-bg);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;

  max-width: 80vh;
  min-width: 90vh;

  max-height: 60vh;
  min-height: 50vh;

  display: flex;
  align-items: center;
}

.innerCard {
  width: 100%;
  height: 90%;
}

.input {
  margin-top: 1%;
}

.btn {
  margin-top: 1%;
}
</style>
