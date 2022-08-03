import React, {createContext, useEffect, useMemo, useState} from 'react';
import SelectFile from "./SelectFile";
import EditFile from "./EditFile";

function App() {

    const [fileAccessApiAvailable, setFileAccessApiAvailable] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);

    const FileContext = createContext<{ file: File | null, setFile: Function }>({
        file: null,
        setFile: () => {
        }
    });

    const value = useMemo(
        () => ({file, setFile}),
        [file]
    )

    useEffect(() => {
        if (!('showOpenFilePicker' in window) || !('showSaveFilePicker' in window)) {
            setFileAccessApiAvailable(false);
        }
    }, []);

    useEffect(() => {
        if (file) {
            document.title = 'Current file opened: ' + file.name;
        }
    }, [file]);


    return (
        <div className="App grid grid-cols-1 bg-gray-100 min-h-screen">
            {
                fileAccessApiAvailable ? (

                    <FileContext.Provider value={value}>
                        {
                            value.file === null ?
                                <SelectFile onSelectFile={value.setFile}/> :
                                <EditFile onClose={() => value.setFile(null)} file={value.file}></EditFile>
                        }
                    </FileContext.Provider>
                ) : (
                    <div className="flex items-center space-x-6 mt-2">
                        <div className="flex-1 px-2">
                            <p className="text-lg text-gray-600 text-center">
                                File system access API is not available in this browser.
                            </p>
                            <p className="text-center text-gray-600">
                                You can check <strong>browser compatibility</strong> <a className="text-indigo-600 underline"
                                href="https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#browser_compatibility">
                                here
                            </a>
                            </p>
                        </div>
                    </div>
                )
            }

            <footer
                className="mt-auto bg-white rounded-lg shadow md:flex md:items-end md:p-6">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://www.debbaweb.it/"
                                                                                        className="hover:underline">Andrea Debernardi™</a>. All Rights Reserved.
    </span>
            </footer>

        </div>

    );
}

export default App;
