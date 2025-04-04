<template>
  <div class="card">
    <div class="innerCard">
      <Toast />
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        :validateOnMount="['password']"
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
        <div class="flex flex-col gap-2">
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
        <div class="flex flex-col gap-2">
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
        <div class="flex flex-col gap-2">
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
        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { Form } from "@primevue/forms";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Password from "primevue/password";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

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
:root {
  --body-bg: var(--p-surface-50);
  --body-text-color: var(--p-surface-900);
  --card-border: 1px solid var(--border-color);
  --card-bg: var(--p-surface-0);
  --border-color: var(--p-surface-200);
  --text-color: var(--p-surface-700);
  --overlay-background: #ffffff;
}

:root[class="p-dark"] {
  --body-bg: var(--p-surface-950);
  --body-text-color: var(--p-surface-50);
  --card-border: 1px solid transparent;
  --card-bg: var(--p-surface-900);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-color: var(--p-surface-0);
  --overlay-background: var(--p-surface-900);
}

html {
  font-size: 14px;
}

body {
  margin: 0px;
  min-height: 100vh;
  min-width: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--body-bg);
  font-weight: normal;
  color: var(--body-text-color);
  padding: 1rem;
  display: flex; /* Added */
  justify-content: center; /* Added */
  align-items: center; /* Added */
  flex-direction: column; /* Added if you want column layout */
}

.card {
  background: var(--card-bg);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%; /* Added */

  max-width: 70vh; /* Maximum size */
  min-width: 70vh;

  max-height: 60vh; /* Maximum size */
  min-height: 50vh;

  display: flex; /* Added */
  align-items: center; /* Added */
}

.innerCard {
  width: 100%;
  height: 90%;
}
</style>
