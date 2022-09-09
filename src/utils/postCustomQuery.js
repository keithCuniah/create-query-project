export const postCustomQuery = async (queryString) => {
  let promiseData = null;
  const body = { queryString };
  try {
    const data = await fetch("http://localhost:3000/customQuery", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      throw Error("Post didn't work");
    }
    promiseData = await data.json();
    console.log(`Post ${promiseData} in customQuery route in success`);
  } catch (err) {
    console.log(err);
  }
};
