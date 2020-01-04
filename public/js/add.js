const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

// send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  // check empty
  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill in fields");
    return;
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  try {
    const res = await fetch("/api/v1/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error("Attn: Store Exist");
    }

    alert("Store Added");
  } catch (error) {
    console.error(error);
    alert(error);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
