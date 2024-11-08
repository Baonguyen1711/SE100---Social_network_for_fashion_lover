import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@mui/material/Grid2";
import { Box, ImageList, ImageListItem, Modal, Button } from "@mui/material";

import style from "./ExploreForm.module.css";

interface ImageItem {
  img: string;
  writer: string;
  title: string;
  content?: string;
  cols?: number;
  rows?: number;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Explore = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  
  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <ImageList
        sx={{ width: "100̀%", height: "100%" }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            className={style.imageItem}
            onClick={() => handleImageClick(item)}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              className={style.image}
            />
            <div className={style.overlay}>
              <h3>{item.title}</h3>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "80%",
            maxHeight: "90%",
            minWidth: "70%",
            minHeight: "70%",
            transform: "translate(-50%, -50%)",
            height: "auto", // Adjust height based on content
            bgcolor: "background.paper",
            outline:"none",
            border: "0px",
            boxShadow: 24,
            borderRadius: "9px",
          }}
        >
          {selectedImage && (
            <div className={style.modal_container}>
              <div className={style.modal_contentBox}>
                <Box
                  sx={{
                    overflow:"auto",
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                      width: '0.4em',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: "#f1f1f1",
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#888',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555'
                    }
                    }}
                >
                  <h3 className={style.modal_title}>{selectedImage.title}</h3>
                  <h3 className={style.modal_writer}>{selectedImage.writer}</h3>
                  <h3 className={style.modal_content}>
                    {selectedImage.content}
                  </h3>
                </Box>
                <Button
                  variant="contained"
                  style={{display:"inline-block",width:"80px",marginTop:"5px",bottom:0}}
                >
                  Goto
                </Button>
              </div>
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className={style.modal_img}
              />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
// const itemData = [
//   {
//     img: "https://img.vietcetera.com/wp-content/uploads/2019/08/ChauBui-Featured.jpg",
//     title: "Breakfast",
//     writer: 'Anata Konsivala',
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     rows: 2,
//     cols: 1,
//   },
//   {
//     img: "https://blog.vn.revu.net/wp-content/uploads/2023/10/chau-bui-1.jpg",
//     title: "Burger",
//     writer: 'Anata Konsivala',
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     rows: 2,
//     cols: 1,
//   },
//   {
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Carolina_Herrera_AW14_12.jpg/640px-Carolina_Herrera_AW14_12.jpg",
//     title:
//       "CameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCamera",
//     writer: 'Anata Konsivala',
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6y-1zKiaT4RvG55Postd-nJSBYw9hDwZvA&s",
//     writer: 'Anata Konsivala',
//     title: "Coffee",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     cols: 1,
//     rows: 2,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOOCMQk621TH-9t0jPwdIiGQSQBAOC-GdBw&s",
//     writer: 'Anata Konsivala',
//     title: "Hats",
//     cols: 1,
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     rows: 2,
//   },
//   {
//     img: "https://cdnmedia.webthethao.vn/uploads/2024-08-03/thu-vinh-anh-5.jpg",
//     writer: 'Anata Konsivala',
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     title: "Honey",
//     author: "@arwinneil",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4oN_exoZHFCQdXxzFKF4IyNf_HW4ZAj3rzQ&s",
//     writer: 'Anata Konsivala',
//     title: "BasketballBasketballBasketballBasketballBasketballBasketballBasketballBasketballBasketball",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     rows: 2,
//     cols: 1,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkydq-hZTMWFP3vG74BPtJB2zBG5TKr2QT3Q&s",
//     writer: 'Anata Konsivala',
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     title: "Fern",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://i.pinimg.com/736x/2b/ee/be/2beebedbdb8023ea6bb166a43bf1716d.jpg",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     writer: 'Anata Konsivala',
//     title: "Mushrooms",
//     rows: 3,
//     cols: 1,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Qt_Gp2FOd4qddRStPR5nQkB9SYou3P1b0g&s",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     writer: 'Anata Konsivala',
//     title: "Tomato basil",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkmppzC5XvjwvQBFeYApa-w6SQtNCBn2CfQ&s",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     writer: 'Anata Konsivala',
//     title: "Sea star",
//   },
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78ATguGDY1SUg2EHy-4Xyl1VwwUBgoF7sqg&s",
//     content: "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
//     writer: 'Anata Konsivala',
//     title: "Bike",
//     cols: 2,
//   },
// ];
const itemData = [
  {
    img: "https://dreampet.com.vn/wp-content/uploads/2021/03/cham-soc-cho-meo-3.jpg",
    title: "Breakfast",
    writer: "Anata Konsivala",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://lolipet.net/wp-content/uploads/Hinh-anh-dong-vat-dang-yeu-cute-nhat-7.jpg",
    title: "Burger",
    writer: "Anata Konsivala",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://static.tuoitre.vn/tto/i/s626/2015/09/03/cho-meo-0-1441255567.jpg",
    title:
      "CameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCameraCamera",
    writer: "Anata Konsivala",
    content:
      "Get readysadsadsadassdsadasdasdsadsadsadasdasdsasaasdsadsadasdsfor an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunninineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collectionsg lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collectionsGet ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunninineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collectionsg lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvD1GVzHBYbngAuEKzLNrxt1r396yQFvRNgg&s",
    writer: "Anata Konsivala",
    title: "Coffee",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    cols: 1,
    rows: 2,
  },
  {
    img: "https://nemthuanviet.com/wp-content/uploads/2023/12/dat-ten-cho-cho-meo.jpg",
    writer: "Anata Konsivala",
    title: "Hats",
    cols: 1,
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    rows: 2,
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJjDWabLS0QZvAW8IgdLhBXq0-svpmR9U-g&s",
    writer: "Anata Konsivala",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://petservicehcm.com/wp-content/uploads/2023/07/image-18.png",
    writer: "Anata Konsivala",
    title:
      "BasketballBasketballBasketballBasketballBasketballBasketballBasketballBasketballBasketball",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://petservicehcm.com/wp-content/uploads/2023/07/image-18.png",
    writer: "Anata Konsivala",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    title: "Fern",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://sumi-japan.com.vn/wp-content/uploads/2023/11/nuoc-hoa-cho-cho-meo-1.jpg",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    writer: "Anata Konsivala",
    title: "Mushrooms",
    rows: 3,
    cols: 1,
  },
  {
    img: "https://jandpet.com.vn/wp-content/uploads/2020/06/tam-cho-meo.jpg",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    writer: "Anata Konsivala",
    title: "Tomato basil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://thepet.vn/wp-content/uploads/2022/05/cute-dog-outdoors-1024x683.jpg",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    writer: "Anata Konsivala",
    title: "Sea star",
  },
  {
    img: "https://aquariumcare.vn/upload/user/images/ch%E1%BB%A5p%20%E1%BA%A3nh%20ch%C3%B3%20m%C3%A8o%20%C4%91%E1%BA%B9p%20v%C3%A0%20%C4%91%C3%A1ng%20y%C3%AAu%201.jpg",
    content:
      "Get ready for an unforgettable experience at Fashion Week 2024, taking place from 20/9 to 27/9 in the heart of [City Name]. This prestigious event will feature a stunning lineup of the world’s most renowned designers, emerging talents, and visionary artists, all coming together to showcase their latest collections",
    writer: "Anata Konsivala",
    title: "Bike",
    cols: 2,
  },
];
export default Explore;
