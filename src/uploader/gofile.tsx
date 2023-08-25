import { instructionals } from "../types";
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

export const setOption = async (fileId: string) => {
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
      // syncWait(2000);
      if (data.status === "ok") {
        console.log(data.data);
      }
    })
    .catch((error) => {
      throw error;
    });
};

const syncWait = (ms: any) => {
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
};

export const fetchDataLegacy = async (): Promise<void> => {
  try {
    const parentFolder = await getContent(
      "7ce5f426-0a7d-46e3-82c2-8870129940ff"
    );
    //  setProgressValue(parentFolder.childs.length * -1);
    let value = parentFolder.childs.length;
    const fetchedData: any[] = [];
    for (const folder of parentFolder.childs) {
      value = value + 1;
      //   setProgressValue(value);
      let volumes;
      let retries = 3; // Number of retries for rate limit error

      while (retries > 0) {
        try {
          volumes = await getContent(folder);
          // Update direct links
          // const array = volumes.childs as [];
          // array.forEach(async (e: string) => {
          //   await setOption(e);
          // });
          break; // Break out of the loop if getContent is successful
        } catch (error: any) {
          console.log(error.message);
          if (error.message.includes("429")) {
            console.warn("Rate limit exceeded. Retrying in 5 seconds...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            retries--;
          } else throw error;
        }
      }

      fetchedData.push({
        contents: volumes.contents,
        childs: volumes.childs,
        name: volumes.name,
      });
    }

    const formattedData: instructionals[] = fetchedData.map(
      ({ childs, contents, name }) => {
        const ordered = reOrderContent(childs, contents);
        return formatInstructional(ordered, name);
      }
    );
    console.log(formattedData);
    //   setContentArray(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    //  setLoading(false);
  }
};

const reOrderContent = (childArray: string[], contentArray: {}[]): {}[] =>
  childArray.map((e: any) => contentArray[e]);

const formatInstructional = (
  content: {}[],
  instructional: string
): instructionals => {
  const volumes: any = content.map((e: any) => ({
    volume: e.name.slice(0, -4),
    link: e.directLink,
  }));

  return {
    instructional,
    volumes,
  };
};
