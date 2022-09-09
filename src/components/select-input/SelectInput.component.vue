<template>
  <div class="content">
    <q-select
      v-model="selectedOption"
      :options="filteredOptions"
      :option-value="optionValue"
      :option-label="optionLabel"
      :label="label"
      use-input
      @filter="filterFn"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    options: {
      type: Array,
      required: true,
    },
    optionField: {
      type: String,
      required: true,
    },
    optionValue: {
      type: String,
      required: true,
    },
    optionLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: "",
      filteredOptions: null,
    };
  },
  computed: {
    label() {
      return `Select a ${this.optionField} `;
    },
  },
  methods: {
    filterFn(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.filteredOptions = this.options.filter(
          (v) => v.label.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  watch: {
    selectedOption(newValue) {
      if (newValue) {
        this.$emit("onSelect", this.selectedOption);
        this.selectedOption = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 15em;
}
</style>
