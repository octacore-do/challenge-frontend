<template>
  <DataTable :value="products" size="large" tableStyle="min-width: 70rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
</template>

<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const products = ref([
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "2000",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
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
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
]);
</script>

<style>
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

.innerCard {
  width: 100%;
  height: 90%;
}
</style>
