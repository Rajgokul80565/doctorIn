import React, {useState} from 'react'
import "../userdashboardStyles.css";
import "./blog.css";
import { Sidebar } from '../../../components';
import underWorkImg from "../../../assets/images/under_work.png";

function UserBlog() {

    const [openSide, setOpenSide] = useState(false);

    
  return (
    <div className={`main ${openSide ? "active" : "inactive"}`}>
    <Sidebar openSide={openSide}  setOpenSide={setOpenSide}/>
    <div id="blog_main">
      <h2>Under work!!</h2>
      <img src={underWorkImg} alt="under_work" />
    </div>
    </div>

  )
}

export default UserBlog;