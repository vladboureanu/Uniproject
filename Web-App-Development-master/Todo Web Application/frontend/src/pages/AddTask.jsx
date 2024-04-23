import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AddTask() {
  const [value, setValue] = useState(''); 
  /*
  useState allows us to keep track of changes/different states of an element (f.e. value)
  When first define a set of [variable, setFunction], we need to give an initial value to the variable.
  This is done by using the method `useState()` and inside of the parethesis we give that initial value.
  F.e. value = "" (empty text)
  The setFunction is called whenever the variable changes states(values), in order to keep track of them
  and update them within the React page.
  */
 
  return (
    <div className='add'>
      <div className="container">
          <input type="text" placeholder='Title' />
          <div className="editorContainer">
            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
          </div>
      </div>
    </div>
  )
}

export default AddTask;