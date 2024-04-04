import { useState,useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { PdfState } from '../context/PdfProvider';

function Editor() {
    const {pdf} = PdfState() ;
    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
          {
            path: '../public/webviewer',
            licenseKey: 'demo:1712136885420:7f0370080300000000242e4ba2ac7612a44d6983b0bb713b40a2f81a4a',
            initialDoc: pdf,
          },
          viewer.current,
        ).then((instance) => {
            const { documentViewer } = instance.Core;
            // you can now call WebViewer APIs here...
          });
      }, []);

    return (
      <div className="MyComponent">
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
      </div>
    );
}

export default Editor;
