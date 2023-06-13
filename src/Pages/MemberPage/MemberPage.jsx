import React, { useEffect, useState } from 'react'
import SidebarMember from './layout/SidebarMember'
import CardComponent from './component/CardComponent';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../Config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MemberPage = () => {
  
  const navigate = useNavigate()
  const [user1, setUser1] = useState()
  const [courseData, setCourseData] = useState([]);
  const user = auth.currentUser

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "course"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourseData(data);
  }

  const handleCardClick = (courseId) => {
    navigate('/MemberPageCourses', {
      state: { courseData : courseId }
       
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1(user);
        getData()
      } else {
        setUser1(null);
      }
    })
  
  }, [user1])
  return (
    <>
      <SidebarMember>
        <div>MemberPage</div>
        {courseData.map((course) => (
          <CardComponent key={course.id} data={course} onClick={()=>handleCardClick(course)} buttonText={'Take this Course'}/>
        ))}
      </SidebarMember>
    </>
  )

}

export default MemberPage
