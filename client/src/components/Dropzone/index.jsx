import React, {useCallback, useState, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import "./dropzone.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: "20px",
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


function Dropzone({files,setfile, showDelete = false}) {

    // const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    if(acceptedFiles.length){
        // setFiles(previousFiles => [
        //     ...previousFiles,
        //     ...acceptedFiles.map(file =>
        //         Object.assign(file, {preview: URL.createObjectURL(file) })
        //  )
        // ])
        setfile(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
              Object.assign(file, {preview: URL.createObjectURL(file) })
       )
      ])
    }
    console.log("acceptedFiles", acceptedFiles)


  }, []);

  console.log("files24",files);
  const {getRootProps, getInputProps, isDragActive,  isFocused,
    isDragAccept,
    isDragReject} = useDropzone({onDrop})

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);


      const handleDelete = () => {
        setfile([]);
      }
    

  return (
    <div>
        {files?.length > 0 ?
        <>
        {files.map(file => (
            <div className="after_upload">
                    <p style={{overflow:"hidden", textOverflow: "ellipsis"}}>{file?.name}</p>
                    <div className="deleteIconDiv"> {showDelete && <RiDeleteBin6Fill  className='delete_icon' onClick={handleDelete}/> }</div>
                    
            </div>
        ))}
        </>
          
       :<div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>}

    </div>
   
  )
};


export default Dropzone;