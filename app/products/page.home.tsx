'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { createPrd } from './action.js';
import Link from 'next/link.js';
import SliderPage from '@/components/SliderP';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [product, setProduct] = useState<any[] | null>(null);
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
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if(!session){
                router.push('/login');
            }
            const { data } = await supabase.from('muebles').select();
            setProduct(data);
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
            setProduct(data);
    
            
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
            <main className='size-full'>
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
                        <option value=''>Seleccciona una categoria</option>
                        {uniqueCategoriasArray.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <Link rel="" href="/products/create" legacyBehavior>
                        <a href='#' className='bg-green-500 text-black px-4 py-3 mt-6 rounded-md transition flex justify-center'>Agregar Producto</a>
                    </Link>
                </div>
                <ol>
                    <ul className='flex flex-wrap justify-center gap-4'>
                        {filteredItems.map((item: any) => (
                            <li key={item.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center items-center m-4 bg-green-100 border rounded-lg shadow-md hover:shadow-lg'>
                                <div className='p-4 w-full'>
                                    <h2 className='text-Black-500 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-bold mb-2'>{item.name}</h2>
                                    <p className='text-gray-500 sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mt-2'>{item.description}</p>
                                    <p className='text-blue-400 text-center mt-2 italic'>{item.category}</p>
                                    <img src={item.image} alt={`Imagen de ${item.name}`} width="200" height="200" className='mx-auto object-cover mt-4' loading="lazy"/>
                                    <p className='bg-gray-200 text-gray-800 p-3 w-full flex justify-center mt-2 rounded-md text-base'>{item.price}</p>
                                    <Link legacyBehavior href={`/products/edit/${item.id}`}>
                                        <a className="bg-blue-600 text-white px-4 py-3 mt-4 rounded-md hover:bg-emerald-800 transition flex justify-center w-full text-base">Editar</a>
                                    </Link>
                                </div>

                            </li>
                        ))}
                    </ul>

                    <link rel="preload" href={filteredItems[0]?.image} as="image" />

                </ol>

                { <div className="w-full md:w-4/4 lg:w-3/3 xl:w-2/2 mx-auto">
                    <div className="w-full h-[200px]">
                        {product && product.length > 0 ? (
                            <SliderPage widthCarrousel={300} HeigthCarrousel={200} items={product.map(item => ({ ...item, image: `${item.image}?tr=w-300,h-300` }))} />
                        ) : (
                            <p>No hay productos para mostrar.</p>
                        )}
                    </div>
                </div> }
            </main>
    );
}


