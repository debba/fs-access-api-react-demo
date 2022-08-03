import React from "react";
import {PlusIcon} from '@heroicons/react/solid'

const  SelectFile : React.FC<{ onSelectFile: (file: File) => void }> = ({onSelectFile}) => {


    async function getFile(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'Text files',
                accept: {
                    'text/plain': ['.txt'],
                    'text/html': ['.html'],
                    'text/css': ['.css'],
                    'text/javascript': ['.js']
                }
            }]
        });
        const file = await fileHandle.getFile();

        onSelectFile(file);
    }

    return (

        <div className="text-center">
            <h3 className="text-center font-medium text-2xl text-gray-900 my-2">FileSystem Access API Demo with React</h3>
            <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No file opened</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by open a file.</p>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={getFile}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Open file
                </button>
            </div>
        </div>

    )
}

export default SelectFile;
