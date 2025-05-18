import React from 'react'
import { Form } from './form.jsx'
import { useApi } from '../shared/hooks/useApi.jsx'


export const Modal = ({onCreate}) => {
    const { addPost } = useApi()

    const createPost = (data)=>{
        console.log(data)
        addPost(data)
    }
    return (
        <>
            <div 
                className="modal fade" 
                id="createPostModal" 
                tabIndex="-1" 
                aria-labelledby="createPostModalLabel" 
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmitForm={createPost}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button form='postForm' type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
