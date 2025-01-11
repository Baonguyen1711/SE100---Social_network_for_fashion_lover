import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Thêm icon "X" để đóng modal
import style from "./css/ModalViewStory.module.css"; // Import file CSS mới

interface ModalViewStoryProps {
    isOpen: boolean;
    onClose: () => void;
    storyUrl: string;
}

const ModalViewStory = ({ isOpen, onClose, storyUrl }: ModalViewStoryProps) => {
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);

    useEffect(() => {
        setMediaUrl(storyUrl);
    }, [storyUrl]);

    const getValidMediaUrl = (url: string) => {
        // Đảm bảo URL là chuỗi và xử lý đúng các định dạng
        return typeof url === 'string' ? url : String(url);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className={style.modalContainer}>
                {/* Nút đóng */}
                <IconButton
                    onClick={onClose}
                    className={style.closeButton}
                >
                    <CloseIcon />
                </IconButton>

                {/* Media Preview */}
                {mediaUrl ? (
                    getValidMediaUrl(mediaUrl).endsWith(".jpg") ||
                        getValidMediaUrl(mediaUrl).endsWith(".jpeg") ||
                        getValidMediaUrl(mediaUrl).endsWith(".png") ? (
                        <img
                            src={mediaUrl}
                            alt="Story"
                            className={style.mediaPreview}
                        />
                    ) : getValidMediaUrl(mediaUrl).endsWith(".mp4") ? (
                        <video controls className={style.mediaPreview}>
                            <source src={mediaUrl} />
                        </video>
                    ) : (
                        <Typography>No media available</Typography>
                    )
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Box>
        </Modal>
    );
};

export default ModalViewStory;
