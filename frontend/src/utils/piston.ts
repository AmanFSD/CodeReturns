// utils/piston.ts
import axios from "axios";

export const runCodeWithPiston = async (language: string, code: string) => {
  try {
    const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: language,
      version: "*",  // latest version
      files: [
        {
          name: "main." + getExtension(language),
          content: code,
        },
      ],
      stdin: "",  // optional
      args: [],   // optional
    });

    return res.data;
  } catch (err: any) {
    return { output: "Something went wrong: " + err.message };
  }
};

// helper to get correct file extension
const getExtension = (lang: string) => {
  switch (lang) {
    case "python3":
      return "py";
    case "javascript":
      return "js";
    case "java":
      return "java";
    case "cpp":
    case "c++":
      return "cpp";
    default:
      return "txt";
  }
};