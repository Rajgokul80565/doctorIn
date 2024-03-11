import React from 'react';
import "./modelpopup.css";
import BasicDateTimePicker from "../DateTimePicker"
import Dropzone from "../Dropzone";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import {useBookMutation} from "../../redux/slices/userSlice";
import {convertToUTC} from "../../utils/validations";
import { toast } from 'react-toastify';
import Spinner from '../Loading spinner/Spinner';
// import ModalComps from "../DoctorsCards/testComps";


function ModalPopUp({id, Header, BodyComponent, onClose, bodyStyle}) {


//   const [date, setDate] = React.useState(null);
//   const [files, setfile] = React.useState([]);
//   const {userInfo} = useSelector((state) => state.auth);
//   const [book, {isLoading, error}] = useBookMutation();
//   console.log("uiop", userInfo);
//   console.log("parentData", parentData);

//      const  onSubmit =  async () => {
//       const formData = new FormData();
//       console.log("fio", files[0]);
//       formData.append("file", files[0]);
//       console.log("formData", formData.get("file"));
//       let bookDate = convertToUTC(date);
//       console.log("bookDate", bookDate);
      
//       // let up0laodData = {
//       //   bookingDate:date,
//       //   file:files,
//       // };
//       try {
//         let result = await axios.post(
//           "http://localhost:5000/api/upload/",
//           formData,{
//             headers: {
//               'Content-Type': 'multipart/form-data'
//           }},
//         );

//         // userName,
//         // //       userId,
//         // //       doctorName,
//         // //       doctorId,
//         // //       specialist,
//         // //       bookingDateTime,
//         // //       status:true,

// //         3. **doctorName**: "Emily K"
// // 4. **experience**: 3
// // 5. **id**: " "
// // 6. **profilePicture**: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
// // 7. **specialist**: "cardio"

//         console.log("result", result);
//         if(result.data.filename){
//             try {
//                 let booking  = await book({
//                   userName:userInfo?.name,
//                   userId:userInfo?._id,
//                   doctorName:parentData.doctorName,
//                   doctorId:parentData.id,
//                   specialist:parentData.specialist,
//                   bookingDateTime:bookDate,
//                   status:true,
//                 }).unwrap();
//                 console.log("bookingRes", booking);
//                 if(isLoading === false){
//                   toast.success("Appoinment Booked");
//                   onClose();
//                 }
//             } catch (error) {
//               console.log("bookerror", error.message);
//             }
//         }else{
//           console.log("noresult", result);
//         }

        
//       } catch (error) {
//           console.log("error", error.message);
//       }
          


//      }

  // console.log("hjk", date);
  return (
    <div className="modal">
        <div id={id || "Modal"} className="modal-content">
                <div className="modal-header">
                <h4>{Header ? Header : "Header"}</h4>
                <span onClick={onClose} className="close-modal-icon">&times;</span>
                </div>
               
                <div style={bodyStyle && bodyStyle} className="modal-body">
                        {/* {body ? (
                          body
                        ) : 
                        <div>
                            <p>This is our model body</p>
                        </div>
                        } */}
                         {BodyComponent && <BodyComponent />}
                         

                          
                </div>
        </div>
    </div>
  )
}

export default ModalPopUp;