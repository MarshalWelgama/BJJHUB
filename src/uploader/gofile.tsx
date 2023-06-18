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

export const getContent = async (contentId: string): Promise<any> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const res = await fetch(
      `https://api.gofile.io/getContent?contentId=${contentId}&token=${TOKEN}`
    );

    if (!res.ok) {
      throw new Error(`Fetch request failed with status ${res.status}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    throw error;
  }
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
  const server = await getServer();
  const formData = new FormData();
  formData.append("file", file!);
  formData.append("token", TOKEN);
  formData.append("folderId", folder);
  fetch(`https://${server}.gofile.io/uploadFile`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        console.log(data.data);
        return data.data.fileId;
      } else throw new Error("Error Occured");
    })
    .then((fileId) => {
      console.log("file id is: " + fileId);
      setOption(fileId);
    })
    .catch((error) => console.error(error));
};

const setOption = async (fileId: string) => {
  fetch("https://api.gofile.io/setOption", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentId: fileId,
      token: TOKEN,
      option: "directLink",
      value: "true",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        console.log(data.data);
      }
    })
    .catch((error) => console.error(error));
};
