import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./ImageUpload.css"; // Import custom CSS

export default function ImageUpload({ ad, setAd }) {
  const [fileToDelete, setFileToDelete] = useState(null); // State for the file to be deleted

  // Ensure ad.photos is always an array
  const photos = ad?.photos || [];

  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });

        const uploadPromises = files.map((file) => {
          return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  resolve(data);
                } catch (err) {
                  console.log(err);
                  reject(err);
                }
              },
              "base64"
            );
          });
        });

        try {
          const uploadedPhotos = await Promise.all(uploadPromises);
          setAd((prev) => ({
            ...prev,
            photos: [...uploadedPhotos, ...prev.photos],
            uploading: false,
          }));
        } catch (err) {
          console.log("One or more uploads failed", err);
          setAd({ ...ad, uploading: false });
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async () => {

    try {
      const { data } = await axios.post("/remove-image", fileToDelete);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== fileToDelete.Key),
          uploading: false,
        }));
      }
      setFileToDelete(null); // Reset the file to delete state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {fileToDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this image?</p>
          <button className="btn btn-danger m-2" onClick={handleDelete}>Yes</button>
          <button className="btn btn-secondary m-2" onClick={() => setFileToDelete(null)}>No</button>
        </div>
      )}

      <div className="upload-container">
        <label className="btn btn-primary m-3">
          {ad.uploading ? "Processing..." : "Upload Image"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            multiple
            hidden
          />
        </label>

        <div className="image-container">
          {photos.map((file) => (
            <div key={file.Key} className="image-wrapper">
              <Avatar
                src={file?.Location}
                shape="square"
                size="100"
                className="image-avatar"
              />
              <CloseCircleOutlined
                className="delete-icon"
                onClick={() => setFileToDelete(file)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
