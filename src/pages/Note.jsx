import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Note() {
    const [note,setNote] = useState({})
    const {noteId} = useParams()
    const [isloading,setIsLoading] = useState(true)
    useEffect(()=>{ 
        noteDetail()
    },[])
    const noteDetail = async () => {
        try {
        //   setLoading(true);
          const response = await fetch(`http://127.0.0.1:8000/note/${noteId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
            },
          });
          const data = await response.json();
          console.log(data)
          if (response.status === 200) {
            setNote(data.note)
            setIsLoading(false)
          } else {
            // Handle error
          }
        } catch (error) {
          // Handle error
        } finally {
        //   setLoading(false);
        }
      };
  return (
    <div>
        {isloading?(
            <p className='text-center font-bold text-red-500 text-[50px] mt-5'>Loading......</p>
        ):( 
            <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-6">{note.title}</h1>

            <div className="bg-white p-8 rounded shadow-md">
                <p className="text-gray-700 text-lg">
                    {note.content}
                </p>
            </div>
        </div>
        )}
        
    </div>
  )
}

export default Note
