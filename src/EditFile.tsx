import React, {useEffect, useState} from "react";
import {XCircleIcon} from "@heroicons/react/solid";

const EditFile: React.FC<{ file: File, onClose: () => void }> = ({file, onClose}) => {

    const [fileContent, setFileContent] = useState<string>('');

    useEffect(() => {

        file.text().then(
            fileContent => setFileContent(fileContent)
        );

    }, [file]);


    const closeOpenedFile = () => {
        if (window.confirm(`Are you sure you want to close the file ${file.name}?`)) {
            onClose();
        }
    };

    const saveFile = async() => {
        const newHandle = await window.showSaveFilePicker({
            suggestedName: file.name
        });
        const writableStream = await newHandle.createWritable();
        await writableStream.write(fileContent);
        await writableStream.close();
        onClose();
    };

    return (
        <>
            <div className="bg-gray-900">
                <div className="px-5 mx-auto h-10 flex items-center justify-between">
                    <div className="flex-1">
                        <XCircleIcon onClick={() => closeOpenedFile()} fill="red"
                                     className="-ml-1 mr-2 h-5 w-5 cursor-pointer" aria-hidden="true"/>
                    </div>
                    <div className="flex-shrink-0">
                        <h3 className="text-lg leading-6 font-medium text-white">{file.name}</h3>
                    </div>
                </div>
            </div>
            <div className="mx-2">

                <div className="grid grid-cols-1 gap-6">
                <textarea
                    rows={10}
                    onChange={e => setFileContent(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    value={fileContent}
                />
                </div>
                <div className="text-right my-2">
                    <button
                        type="button"
                        onClick={e => saveFile() }
                        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save and close.
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditFile;
