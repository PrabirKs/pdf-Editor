import { createContext, useContext, useState } from "react";

const PdfContext = createContext();

const PdfProvider = ({ children }) => {
    const [pdf, setPdf] = useState(null);

    return (
        <PdfContext.Provider value={{ pdf, setPdf }}>
            {children}
        </PdfContext.Provider>
    );
};

export const PdfState = () => {
    return useContext(PdfContext);
};

export default PdfProvider;
