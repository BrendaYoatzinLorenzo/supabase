'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { createPrd } from './action.js';

export default function Page() {
    const [product, setProducts] = useState<any[] | null>(null);
    const [categoria, setCategoria] = useState<string>('');
    const [busqueda, setBusqueda] = useState<string>('');
    const [newProduct, setNewProduct] = useState<any>({
        name: '',
        price: '',
        description: '',
        category: ''
    });
    const [errores, setErrores] = useState<any>({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            newProduct(newProduct.Products || []);

            if(newProduct.error) {
                alert(newProduct.error.message);
            }

        };
        getData();
    }, []);

    const searchByText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(event.target.value);
    };

    const getCategorie = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoria(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };


    const handleAddProduct = async (event: React.FormEvent) => {
        event.preventDefault();

        let hasError = false;
        const newErrors: any = {};

        Object.keys(newProduct).forEach((key) => {
            if (newProduct[key] === '') {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} es obligatorio`;
                hasError = true;
            }
        });

        if (hasError) {
            setErrores(newErrors);
            return;
        }

        try {
        
            const { error } = await createPrd(newProduct);
    
            if (error) {
                console.error('Error al agregar el producto:');
                alert('Ocurrió un error al agregar el producto.');
                return;
            }
    
            
            const { data } = await supabase.from('muebles').select();
            setProducts(data);
    
            
            alert('El producto se ha agregado exitosamente.');
    
        } catch (error) {
            alert('Ocurrió un error al agregar el producto.');
        }
    };
    


    const uniqueCategoriasArray = Array.from(
        new Set(product?.map((item) => item.category))
    );

    const filteredItems = product
        ? product.filter(
            (item) =>
                item.name.includes(busqueda) &&
                (categoria === '' || item.category === categoria)
        )
        : [];

    return (
        <main className='size-full '>
            <div className='flex justify-center pt-4 pb-4 '>
                <input
                    onChange={searchByText}
                    placeholder='Insertar búsqueda'
                    className='p-2 text-black rounded-lg'
                />
                <button className='bg-slate-700 p-2 hover:bg-slate-900'>Buscar</button>
            </div>
            <div className='pb-4 pt-4 flex justify-center'>
                <select
                    onChange={getCategorie}
                    className='text-black p-3 rounded-lg'
                    value={categoria}
                >
                    <option value=''>Select a category</option>
                    {uniqueCategoriasArray.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleAddProduct}
                className="flex justify-center">
                    <div>
                        <label>Nombre del producto:</label>
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        {errores.name && <span className="error-message">{errores.name}</span>}
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            placeholder="Descripción"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                        />
                        {errores.description && <span className="error-message">{errores.description}</span>}
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <input
                            type="text"
                            placeholder="Categoría"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                        />
                        {errores.category && <span className="error-message">{errores.category}</span>}
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input
                            type="text"
                            placeholder="Precio"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        {errores.price && <span className="error-message">{errores.price}</span>}
                    </div>
                    <button type="submit" className='bg-slate-500 p-2 hover:bg-slate-900 rounded-md'>Agregar Producto</button>
                </form>
            </div>
            <ol>
                <ul className='flex justify-center'>
                    {filteredItems.map((item: any) => (
                        <li key={item.id} className='flex w-80 m-4 bg-black border rounded-lg shadow-md hover:shadow-lg'>
                            <div className='p-4'>
                                <h2 className='text-xl text-white text-center font-bold mb-2'>{item.name}</h2>
                                <p className='text-gray-500 text-center mt-12'>{item.description}</p>
                                <p className='text-gray-400 text-center mt-12 italic'>{item.category}</p>
                                <p className='bg-yellow-400 text-gray-700 p-3 w-full flex justify-center mt-2 rounded-md'>
                                    ${item.price}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </ol>
        </main>
    );
}


