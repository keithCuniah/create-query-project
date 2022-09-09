<template>
  <div class="content">
    <div class="input-area" v-if="options.options">
      <SelectInput
        :optionField="options.typeOfInput"
        :options="options.options"
        :optionValue="options.optionValue"
        :optionLabel="options.optionLabel"
        @onSelect="addSelectedOptionToQuery"
      />
    </div>
  </div>
</template>

<script>
import SelectInput from "../../../components/select-input/SelectInput.component.vue";
import OptionsForSelectInput from "../../../models/OptionsForSelectInput.classes";

export default {
  name: "CreateQueryComponent",
  components: {
    SelectInput,
  },
  props: {
    inputsForQueries: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    availableFieldsForQuery() {
      return this.inputsForQueries.filter((input) => input.isQueryable);
    },
  },
  methods: {
    getOptions() {
      return this.options.options;
    },
    addSelectedOptionToQuery($event) {
      this.options.addSelectedOptionToQuery($event);
      this.$emit("onQueryUpdate", this.options.queryString);
    },
  },
  mounted() {
    this.options = new OptionsForSelectInput(this.availableFieldsForQuery);
    //Initiation of the options list from the instance
    this.options.makeOptions("field");
  },
};
</script>

<style lang="scss" scoped>
.input-area {
  display: flex;
  justify-content: center;
}
</style>
