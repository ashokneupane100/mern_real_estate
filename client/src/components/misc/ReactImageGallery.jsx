import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


//we moved the following array to the AdView.jsx
// const images = [
//  {
//    original: "https://final-bucket29.s3.amazonaws.com/JANXmpR7_UsrKvx-6UQRz.jpeg",
//    thumbnail: "https://final-bucket29.s3.amazonaws.com/JANXmpR7_UsrKvx-6UQRz.jpeg",
//  },
//  {
//    original: "https://final-bucket29.s3.amazonaws.com/c-FwGMWrYLmMcfFJ2Vae4.jpeg",
//    thumbnail: "https://final-bucket29.s3.amazonaws.com/c-FwGMWrYLmMcfFJ2Vae4.jpeg",
// how to do this },
// ]

export default function ReactImageGallery({images}) {
 // hooks


 return (
   <div>
     <ImageGallery
       items={images}
       showPlayButton={true}
       showFullScreenButton={true}
       slideInterval={2000}
       slideOnThumbnailOver={true}
       showIndex={true}
     />

   </div>
 );
}