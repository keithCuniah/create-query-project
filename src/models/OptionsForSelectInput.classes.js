class OptionsForSelectInput {
  availableFieldsForQuery = [];
  typeOfInput = "";
  selectedQueryId = null;
  typeOfValues = "";
  options = [];
  optionValue = "value";
  optionLabel = "label";
  numberOfIteration = 0;
  queryString = "";

  constructor(availableFieldsForQuery) {
    this.availableFieldsForQuery = availableFieldsForQuery;

    // I put the setTimeout because there is reactivity problem between updated data from this class object and vue3 option API
    // see : https://stackoverflow.com/questions/67894487/vue-3-reactivity-not-triggered-from-inside-a-class-instance
    setInterval(() => {}, 1000);
  }

  setSelectedQueryId(selectedQueryId) {
    this.selectedQueryId = selectedQueryId;
  }

  setTypeOfValues(typeOfValues) {
    this.typeOfValues = typeOfValues;
  }

  addSelectedOptionToQuery($event) {
    if (this.numberOfIteration === 0) {
      if ($event.type === "conditional") {
        // corresponding of the NOT case
        this.numberOfIteration = 0;
        this.makeOptions("field");
      } else {
        this.numberOfIteration++;
        this.setSelectedQueryId($event.id);
        this.setTypeOfValues($event.typeOfValues);
        this.makeOptions("operations");
      }
    } else if (this.numberOfIteration === 1) {
      this.numberOfIteration++;
      this.makeOptions("values");
    } else if (this.numberOfIteration === 2) {
      this.numberOfIteration++;
      this.makeOptions("conditional");
    } else if (this.numberOfIteration === 3) {
      this.numberOfIteration = 0;
      this.makeOptions("field");
    }

    this.queryString += ` ${$event.value} `;
  }

  makeOptions(typeOfInput) {
    this.typeOfInput = typeOfInput;
    if (typeOfInput === "operations") {
      this.options = initOptionsForOperations(this.typeOfValues);
    } else if (typeOfInput === "conditional") {
      this.options = initOptionsForConditionals();
    } else if (typeOfInput === "values") {
      this.options = initOptionsForSelectedFieldValues(
        this.availableFieldsForQuery,
        this.selectedQueryId,
        this.typeOfValues
      );
    } else if (typeOfInput === "field") {
      this.options = initOptionsForFields(this.availableFieldsForQuery);
    }
  }
}

const initOptionsForOperations = (typeOfValues) => {
  if (typeOfValues === "string") {
    return [
      { value: "==", label: "equal", type: "operation" },
      { value: "!=", label: "notEqual", type: "operation" },
    ];
  } else if (typeOfValues === "number") {
    return [
      { value: "==", label: "equal", type: "operation" },
      { value: "!=", label: "notEqual", type: "operation" },
      { value: "<=", label: "infEqual", type: "operation" },
      { value: ">=", label: "supEqual", type: "operation" },
      { value: "<", label: "inf", type: "operation" },
      { value: ">", label: "sup", type: "operation" },
    ];
  } else {
    console.log("Warning, the type of values from the query is not known!");
  }
};

const initOptionsForConditionals = () => {
  return [
    { label: "AND", value: "AND", type: "conditional" },
    { label: "OR", value: "OR", type: "conditional" },
  ];
};

const initOptionsForSelectedFieldValues = (
  availableFieldsForQuery,
  selectedQueryId,
  typeOfValues
) => {
  let formatedValuesOfSelectedQueryId = [];
  if (typeOfValues === "string") {
    const valuesOfSelectedQueryId = availableFieldsForQuery.find((field) => {
      if (field.id === selectedQueryId) {
        return field;
      }
    }).values;

    formatedValuesOfSelectedQueryId = valuesOfSelectedQueryId.map((obj) => {
      return { label: obj.label, value: `${obj.value})`, id: obj.id };
    });
  } else if (typeOfValues === "number") {
    // FIXME: replace the loop by an input number write by the user
    const ages = [];
    for (let i = 0; i <= 100; i++) {
      ages.push(i);
    }
    formatedValuesOfSelectedQueryId = ages.map((age, index) => {
      return { label: age, value: `${age})`, id: `$id_${index}` };
    });
  }
  return formatedValuesOfSelectedQueryId;
};

const initOptionsForFields = (availableFieldsForQuery) => {
  const queryableFields = availableFieldsForQuery.reduce(
    (acc, { label, id, typeOfValues }) =>
      acc.concat({
        id,
        label,
        value: `(${label}`,
        type: "field",
        typeOfValues,
      }),
    []
  );

  queryableFields.unshift({
    label: "NOT",
    value: "NOT",
    type: "conditional",
  });

  return queryableFields;
};

export default OptionsForSelectInput;
