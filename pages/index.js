import React, { useContext, useState } from 'react';
import { Data } from '../store';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic'
import Axios from 'axios';
import TurndownService from 'turndown';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
//import Quill from 'quill'
//import MarkdownShortcuts from 'quill-markdown-shortcuts'
const Create=()=>{

    //Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
    const [content, setContent] = useState('')
    const [mark,setmark]=useState('')
    const [arr,setarr]=useContext(Data)
    const [pic, setPic]=useState(null)
    const router=useRouter()
    const summit=(e)=>{
        e.preventDefault()
        let data={
            title: e.target.title.value,
            description: e.target.description.value,
            image: pic,
            bodi: content,
            mark: mark
        }
        Axios.post('http://localhost:3000/api/upload', data) //while deploying change api endpoint, for example, 'https://editor.higgle.io/api/upload' 
        .then(res=>console.log(res))
        e.target.title.value=''
        e.target.description.value=''
        setContent('')
        setarr([data,...arr])
        router.push('/')
        console.log(pic)
        
    }
        
    const config = {
            readonly: false 
    }

    return(
        <div className='container-create'>
            <script src="https://cdn.jsdelivr.net/npm/quill-markdown-toolbar@0.1.1/dist/markdownToolbar.min.js"></script>
            <div id='create'>
                <form onSubmit={(e)=>{summit(e)}}>
                    <div id='create-title'>
                        <span id='create-title-span'>Create your blog</span>
                    </div>
                    <span className='form-span'>Title:</span>
                    <input maxLength='100' name='title' required/>
                    <span className='form-span'>Description:</span>
                    <input maxLength='200' name='description' required/>
                    <span className='form-span'>Thumb Image:</span>
                    <input type = "file" name='thumb' accept="image/*" required
                        onChange={(e)=>{
                            setPic(e);
                        }}
                    />
                    <span className='form-span'>Content:</span>
                    <div id='editor'>
                        <ReactQuill
                        onChange={(e)=>{
                            setContent(e)
                            setmark(TurndownService({ headingStyle: 'atx' }).keep(['iframe', 'script']).turndown(e))
                            console.log(mark);
                        }}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ header: [1,2,3, 4, 5, 6] }, { font: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image', 'video'],
                                    ['clean']
                                ]
                            }  
                        }
                        }/>
                    </div>
                    <button id='publish'>Publish</button>
                </form>
            </div>
        </div>
    )
}
export default Create;
