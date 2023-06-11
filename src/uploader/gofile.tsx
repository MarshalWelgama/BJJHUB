import { ROOTFOLDER, TOKEN } from "../utils/constants";

let server: string | undefined;

export const getServer = async (): Promise<string> => {
  console.log(server);
  // to be used prior to upload file only
  return fetch("https://api.gofile.io/getServer")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        server = data.data.server;
        return data.data.server;
      } else {
        throw new Error("Error: Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const uploadFile = async (
  file: File,
  server: string = "store1"
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`https://${server}.gofile.io/uploadFile`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getContent = async (contentId: string): Promise<any> => {
  //input parent folder
  return fetch(
    `https://api.gofile.io/getContent?contentId=${contentId}&token=${TOKEN}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        return data.data;
      } else throw new Error("Error: Something went wrong");
    })
    .catch((error) => {
      throw error;
    });
};

export const createFolder = async (folderName: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch("https://api.gofile.io/createFolder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentFolderId: ROOTFOLDER,
        token: TOKEN,
        folderName: folderName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("Folder created successfully");
          resolve(data.data.id); // Resolve with data.data.id
        } else {
          reject(new Error("Folder creation failed"));
        }
      })
      .catch((error) => reject(error));
  });
};

export const postData = async (file: File | undefined, folder: string) => {
  const formData = new FormData();
  formData.append("file", file!);
  formData.append("token", TOKEN);
  formData.append("folderId", folder);
  fetch("https://store1.gofile.io/uploadFile", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        console.log(data.data);
      }
    })
    .catch((error) => console.error(error));
};
const deleteContent = () => {};
