import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import style from "./css/ModalCreateStory.module.css";
import uploadToCloudinary from "../profile/User/UploadImage"

interface ModalCreateStoryProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (mediaUrl: string) => void;
}

const ModalCreateStory: React.FC<ModalCreateStoryProps> = ({ isOpen, onClose, onSubmit }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái khi đang upload
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        // Kiểm tra định dạng file hợp lệ (chỉ cho phép hình ảnh)
        const validExtensions = [".png", ".jpg", ".jpeg"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
            alert("Please select a valid image file (.png, .jpg, .jpeg).");
            return;
        }
        setSelectedImage(file); // Lưu file đã chọn
    };

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmitStory = async () => {
        if (selectedImage) {
            try {
                setLoading(true);
                // Upload hình ảnh lên Cloudinary
                const uploadedImageUrl = await uploadToCloudinary(selectedImage);
                onSubmit(uploadedImageUrl); // Truyền URL đã upload lên component cha
            } catch (error) {
                console.error("Upload failed", error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please upload an image!");
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Box className={`${style.modalContainer} ${isOpen ? style.open : ""}`}>
            <Box className={style.modalContent}>
                <Typography variant="h6" className={style.modalTitle}>
                    Create Your Story
                </Typography>

                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    className={style.uploadButton}
                    onClick={handleUploadImage}
                >
                    Upload Image
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                {selectedImage && (
                    <Box className={style.imagePreview}>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className={style.previewImage}
                        />
                    </Box>
                )}

                <Box className={style.buttonsContainer}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmitStory}
                        className={style.submitButton}
                        disabled={loading} // Vô hiệu hóa nút khi đang upload
                    >
                        {loading ? "Uploading..." : "Submit Story"}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                        className={style.cancelButton}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ModalCreateStory;
