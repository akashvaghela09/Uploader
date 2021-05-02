import React from 'react';
import { useParams } from "react-router-dom";

const DownloadPage = () => {
    const { code, md5, file } = useParams();
    const url = `https://srv-store2.gofile.io/download/${code}/${md5}/${file}`
    return (
        <div>
            <h1>Download Page</h1>
            <a href={url} target="_blank" rel="noopener noreferrer">Download</a>
        </div>
    )
}

export {DownloadPage}