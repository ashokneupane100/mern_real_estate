import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./ImageUpload.css"; // Import custom CSS

export default function ProfileUpload({ photo, setPhoto, uploading, setUploading }) {
  const [fileToDelete, setFileToDelete] = useState(null); // State for the file to be deleted

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

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
            setPhoto(data);
            setUploading(false);
          } catch (err) {
            console.log(err);
            setUploading(false);
          }
        },
        "base64"
      );
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!photo) return;

    setUploading(true);

    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
      }
      setFileToDelete(null); // Reset the file to delete state
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
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
          {uploading ? "Processing..." : "Upload Image"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
          />
        </label>

        <div className="image-container">
          {photo && (
            <div className="image-wrapper">
              <Avatar
                src={photo?.Location}
                shape="square"
                size="100"
                className="image-avatar"
              />
              <CloseCircleOutlined
                className="delete-icon"
                onClick={() => setFileToDelete(photo)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
