import  { useState, useRef } from "react";
import { ButtonBase, useTheme } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

function ImageInput({ name,setValue,initialImagePath}) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(initialImagePath);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Generate preview URL
      setValue(name, e.target.files); // Set the file in the form state
    }
  };
  console.log(selectedImage)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ButtonBase
      onClick={handleButtonClick}
      sx={{
        width: "70px",
        aspectRatio: "1 / 1",
        cursor: "pointer",
        backgroundImage: `url(${selectedImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed black",
        position: "relative",
      }}
    >
      <CloudUpload
        sx={{
          color:theme.palette.primary.text ,
          ":hover": { transform: "scale(1.1)" },
        }}
      />
      <input
        ref={(e) => (fileInputRef.current = e)}
        name={name}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </ButtonBase>
  );
}

export default ImageInput;
