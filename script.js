const formData = new URLSearchParams();

let server;
//find best server

const getServer = async () => {
  await fetch("https://api.gofile.io/getServer")
    .then((response) => response.json())
    .then((data) => {
      return data.data.server;
    })
    .catch((error) => console.error(error));
};

async function uploadFiles() {
  const res = await getServer();
  const server = res.data.server;
}

uploadFiles();

// server = getServer();
// console.log(server);
//create new folder and place into a json -> Name, Id

//upload all files for that folder to best server by mapping the json

//show progression

// formData.append("file", "fileInput.files[0]");

// formData.append("token", "mt2Sor18zb4f8YjUkiCCL4w3zH2qEpgI");

// formData.append("folderId", "fileInput.files[0]");

// console.log(formData);
// fetch("https://store1.gofile.io/uploadFile", {
//   method: "POST",
//   body: formData,
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.status === "ok") {
//       console.log(data.data);
//     }
//   })
//   .catch((error) => console.error(error));

// curl -F file=@“IMG_7621.MOV” -F token=mt2Sor18zb4f8YjUkiCCL4w3zH2qEpgI -F folderId=e7e96c60-74e1-40bd-80f8-edc089e03182 https://store1.gofile.io/uploadFile
