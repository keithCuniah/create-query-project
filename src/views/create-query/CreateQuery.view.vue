<template>
  <div class="wrapper" v-if="inputsForQueries">
    <h2 class="title">CreateQueryView</h2>
    <h6 class="desc">Choose element from the select input to create a query</h6>
    <div class="components-area">
      <CreateQuery
        :inputsForQueries="inputsForQueries"
        @onQueryUpdate="updateQuery"
      />
      <transition name="fade" mode="out-in">
        <QueryVizualisation v-if="queryString" @onSubmit="submitQueryString">
          <template v-slot>
            <h6>{{ queryString }}</h6>
          </template>
        </QueryVizualisation>
      </transition>
    </div>
  </div>

  <div class="" v-else>Loading ...</div>
</template>

<script>
import CreateQuery from "./create-query/CreateQuery.component.vue";
import QueryVizualisation from "../../components/query-vizualisation/QueryVizualisation.component.vue";
import { getInputsForQueries } from "../../utils/getInputsForQueries";
import { postCustomQuery } from "../../utils/postCustomQuery";

export default {
  name: "CreateQueryView",
  components: {
    CreateQuery,
    QueryVizualisation,
  },
  data() {
    return {
      inputsForQueries: null,
      queryString: "",
    };
  },
  async mounted() {
    this.inputsForQueries = await getInputsForQueries();
  },
  methods: {
    updateQuery($event) {
      this.queryString = $event;
    },
    submitQueryString() {
      postCustomQuery(this.queryString);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .components-area {
    display: flex;
    flex-direction: column;
    gap: 5em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
