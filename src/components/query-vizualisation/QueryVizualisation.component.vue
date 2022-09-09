<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Query :</div>
    </q-card-section>

    <span class="query-area">
      <slot></slot>
    </span>
    <q-card-actions align="around">
      <q-btn flat @click="$emit('onSubmit')">Submit</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "QueryVizualisationComponent",
};
</script>

<style lang="scss" scoped></style>
