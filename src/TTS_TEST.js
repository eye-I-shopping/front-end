import { useState } from "react";
import axios from "axios";

function TTS() {
  const [TTSAudio, setTTSAudio] = useState(null);

  const audioStyle = {
    display: "none",
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("speaker", "nkyunglee");
    formData.append("text", "안녕");

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
  };

  return (
    <div>
      TTS TEST
      <button onClick={handleClick}>Play TTS</button>
      <audio controls src={TTSAudio} style={audioStyle} autoPlay />
    </div>
  );
}

export default TTS;
