import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import { Image, Transformation } from "cloudinary-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dropzone.css";

export default function InputBox({photosCallback}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState("");
  //  1. запрос на выборку чтобы отправить эти данные на URL, поэтому нам надо сделать запросы асинхронными чтобы они могли быть извлечены
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME}/upload`;
    // 5. тк у нас может быть несколько принятых файлов мы должны сделать цикл для перебора массива с этими файлами
    acceptedFiles.forEach(async (acceptedFile) => {
      // 4. создаем встроенный конструктор формы FormData, добавляем пару ключ-значение
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_UPLOAD_PRESET
      );
      // 2. ответы ожидают вызова для получения URL, затем отправляем данные
      const response = await fetch(url, {
        method: "post",
        // 3. сообщаем что именно мы передаем
        body: formData,
      });
      // 6. принимаем ответ от севрера в формате json
      const data = await response.json();
      
      photosCallback([...uploadedFiles,data]);
      setUploadedFiles((old) =>{
        const newState =  [...old, data];
        photosCallback(newState.map(file => file.public_id));
        return newState;
      });
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: true,
  });
  const renderCustomThumbs = () => {
    const thumblist = uploadedFiles.map((file) => (
      <img key={file.public_id} src={file.url} />
    ));
    return thumblist;
  };
  const getCurrentPhoto = (index) => {
    console.log("НАШИ ПРОПСЕКИ", index);
    setCurrentPhotoIndex(index);
  };
  return (
    <div>
      <div>
        <Carousel renderThumbs={renderCustomThumbs} onChange={getCurrentPhoto}>
          {uploadedFiles.map((file) => (
            <div key={file.public_id}>
              <Image
                cloudName={
                  process.env.REACT_APP_NEXT_PUPLIC_CLAUDINARY_CLOUD_NAME
                }
                publicId={file.public_id}
              >
                <Transformation
                  height="480"
                  width="720"
                  background="#f0f1ef"
                  crop="pad"
                  format="PNG"
                />
              </Image>
            </div>
          ))}
        </Carousel>
      </div>
      <div
        {...getRootProps()}
        className={`${"dropzone"} ${isDragActive ? "active" : null}`}
      >
        <input {...getInputProps()} />
        Drag 'n' drop some files here, or click to select files =
      </div>
    </div>
  );
}
