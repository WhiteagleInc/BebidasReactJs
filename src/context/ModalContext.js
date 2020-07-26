import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
    //State del Provider
    const [idReceta, setIdReceta] = useState(null);
    const [informacion, setReceta] = useState({});

    //Una vez que tenemos una receta llamar la api
    useEffect(() => {
        const obtenerReceta = async () => {
            if (!idReceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

            const resultado = await axios.get(url);

            setReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idReceta])

    return (
        <ModalContext.Provider 
            value={{
                informacion,
                setIdReceta,
                setReceta
            }}
        >
                {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;