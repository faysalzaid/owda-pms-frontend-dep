import React, { Component } from 'react';
import Editor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
    //toolbar: [ 'bold', 'italic' ]
    toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'fontColor',
    'fontFamily',
    'fontSize',
    'underline',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'blockQuote',
    'insertTable',
    'imageUpload',
    'mediaEmbed',
    'undo',
    'redo',
    'todoList',
    'imageInsert',
    'code',
    'specialCharacters',
    'subscript',
    'superscript',
    'codeBlock',
    'findAndReplace',
    'fontBackgroundColor',
    'highlight',
    'htmlEmbed',
    'pageBreak'
]
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 from online builder in React</h2>
                <CKEditor
                    editor={ Editor }
                    config={ editorConfiguration }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default App;