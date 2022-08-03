import React, {createContext, useEffect, useMemo, useState} from 'react';
import './App.css';
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
        if (!('showOpenFilePicker' in window)) {
            setFileAccessApiAvailable(false);
        }
    }, [])


    return (
        <div className="App">
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
                    <div className="flex items-center space-x-6">
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">
                                File access API is not available
                            </p>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default App;
