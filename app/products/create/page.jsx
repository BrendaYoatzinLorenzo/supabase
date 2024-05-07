'use client';   
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Asegúrate de que la ruta del cliente supabase sea correcta.
import { createPrd } from '../action';

const SaveProduct = () => {
    const [errors, setErrors] = useState({});
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        category: "", // Corregido el nombre de la categoría.
    });
    const [isValid, setIsValid] = useState(true);
    const supabase = createClient(); // Asegúrate de que la función createClient esté definida correctamente.

    const validateData = (event) => {
        event.preventDefault();
        let errorList = {};

        if (!productData.name.trim()) {
            errorList.name = "Se necesita un nombre";
        }
        if (!productData.description.trim()) {
            errorList.description = "Se necesita una descripción";
        }
        if (!productData.price.trim()) {
            errorList.price = "Se necesita un precio válido";
        }
        if (!productData.category.trim()) {
            errorList.category = "Se necesita una categoría";
        }
        if (!productData.image) {
            errorList.image = "Se necesita enlace de imagen";
        }

        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        sendProductData();
    };

    const sendProductData = async () => {
        try {
            // Enviar datos del producto aquí utilizando supabase u otro método.
            let response = await createPrd(productData);
        } catch (error) {
            console.error('Error al enviar los datos del producto:', error.message);
        }
    };

    const setValueToState = (event) => {
        const { name, value } = event.target;

            setProductData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        // } else {
            // setIsValid(false);
        // }
    };

    return (
        <>
            <h2 className='text-center text-2xl text-white font-semibold mb-4'>Añadir Producto</h2>
            <form onSubmit={validateData}>
                <div className='flex flex-col gap-3 '>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" value={productData.name} onChange={setValueToState} name='name' placeholder='Agrega un Mueble' className={`text-center text-black font-semibold`} />
                    <p className='text-rose-600'>{errors.name}</p>
                    <label htmlFor="price">Precio</label>
                    <input type="text" value={productData.price} onChange={setValueToState} name='price' placeholder='$' className='text-center text-black font-semibold' />
                    <p className='text-rose-600'>{errors.price}</p>
                    <label htmlFor="description">Descripcion</label>
                    <input type="text" value={productData.description} onChange={setValueToState} name='description' placeholder='Descripción' className='text-center text-black font-semibold' />
                    <p className='text-rose-600'>{errors.description}</p>
                    <label htmlFor="category">Linea</label>
                    <input type="text" value={productData.category} onChange={setValueToState} name='category' placeholder='Mb o Lb' className='text-center text-black font-semibold' />
                    <p className='text-rose-600'>{errors.category}</p>
                    <label htmlFor="category">Imagen</label>
                    <input type="text" value={productData.image} onChange={setValueToState} name='image' placeholder='Imagen' className='text-center text-black font-semibold' />
                    <p className='text-rose-600'>{errors.image}</p>
                    <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800'>Añadir Mueble</button>
                </div>
            
            </form>
        </>
    );
};

export default SaveProduct;
