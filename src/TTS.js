import { useState, useEffect } from "react";
import axios from "axios";

function TTS() {
  const [TTSAudio, setTTSAudio] = useState(null);
  useEffect(() => {
    const formData = new FormData();
    formData.append("speaker", "nara");
    formData.append("text", "내가 미안해..");

    axios
      .post("/tts-premium/v1/tts", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-NCP-APIGW-API-KEY-ID": "ph9wqvtot6",
          "X-NCP-APIGW-API-KEY": "ZchMYX2neSv2fc4kAL1915MVFBUJ9FZfstip5ITQ",
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log(response);
        const audios = URL.createObjectURL(response.data);
        setTTSAudio(audios);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      TTS TEST
      <audio controls src={TTSAudio}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default TTS;
