// import React,{useEffect, useState} from 'react'
// import { pdfjs, Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import axios from 'axios';
// import {isBase64} from "../../utils";

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //     'pdfjs-dist/build/pdf.worker.min.js',
// //     import.meta.url,
// //   ).toString();

// function PDFViewer({file}) {
// let [pdfData, setPdfData] = useState(null);
// const [numPages, setNumPages] = useState(0);


//     const getFileData = async (path) => {
//         try {
//             const response = await fetch(`http://localhost:5000/${path}`);
//             if (!response.ok) {
//               throw new Error('Failed to download file');
//             }
//             const blob = await response.blob();
//             const fileReader = new FileReader();
//             return new Promise((resolve, reject) => {
//               fileReader.onload = () => {
//                 resolve(fileReader.result);
//               };
//               fileReader.onerror = reject;
//               fileReader.readAsDataURL(blob);
//             });
//           } catch (error) {
//             console.error('Error downloading file:', error);
//             return null;
//           }
        
//     }   

//     function onDocumentLoadSuccess(nextNumPages){
//         setNumPages(nextNumPages);
//       }

//     useEffect(() => {
//         getFileData(file).then(fileContent => {
//             if (fileContent) {
//               console.log('Filecontent', fileContent);
//                 setPdfData(fileContent);
//               // Now you can use the fileContent variable as needed
//             } else {
//               console.log('File download failed.');
//             }
//           })
//           .catch(error => {
//             console.error('Error:', error);
//           });
//     },[])


//   return (
//     <div>
//         <Document file={pdfData ? pdfData : null} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.apply(null, Array(numPages))
//           .map((x, i) => i + 1)
//           .map((page) => {
//             return (
//               <Page
//                 pageNumber={page}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             );
//           })}
//             </Document>
//     </div>
//   )
// }

// export default PDFViewer



import React, { useState } from 'react';
import { pdfjs,Document, Page } from 'react-pdf';
import "./pdfviewer.css";

import { FaEye } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const PDFViewer = ({ title, pdfUrl }) => {
  const [showPDF, setShowPDF] = useState(false);

  const handleClick = () => {
    setShowPDF(!showPDF);
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleClick}>
      <div>
      <div className="after_upload">
                    <p style={{overflow:"hidden", textOverflow: "ellipsis"}}>{title}</p>
                    <div className="deleteIconDiv"><FaEye  className='delete_icon' /></div>
                    
            </div>
      </div>
      {showPDF && (
        <div className="pdf_container">  
        <div id="pdf_content">
        <iframe id='pdf_frame' src={pdfUrl} frameborder="0"></iframe>
        </div>
        {/* <Document
          file={pdfUrl}
        >
          <Page 
          pageNumber={1} 
          />
        </Document> */}
      
        </div>
      )}
    </div>
  );
};

export default PDFViewer;