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