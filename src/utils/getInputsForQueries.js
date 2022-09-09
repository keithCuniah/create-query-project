export const getInputsForQueries = async () => {
  let inputsForQueries = null;
  try {
    const data = await fetch("http://localhost:3000/inputsForQueries");
    if (!data.ok) {
      throw Error("No data available");
    }
    inputsForQueries = await data.json();
  } catch (err) {
    console.log(err);
  }
  return inputsForQueries;
};
