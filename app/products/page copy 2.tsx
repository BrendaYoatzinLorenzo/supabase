'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { createPrd } from './action.js';
import Link from 'next/link.js';
import SliderPage from '@/components/SliderP';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if(!session){
                router.push('/login');
            }
            const { data } = await supabase.from('muebles').select();
            setProducts(data);
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
                    <ul className='flex justify-center grid grid-cols-4 gap-4'>
                        {filteredItems.map((item: any) => (
                            <li key={item.id} className='flex w-80 h-auto justify-center items-center m-4 bg-black border rounded-lg shadow-md hover:shadow-lg'>
                                <div className='p-4'>
                                    <h2 className='text-xl text-white text-center font-bold mb-2'>{item.name}</h2>
                                    <p className='text-gray-500 text-center mt-12'>{item.description}</p>
                                    <p className='text-gray-400 text-center mt-12 italic'>{item.category}</p>
                                    <img src={item.image} alt="" className='mx-auto'/>
                                    <p className='bg-gray-50 text-black p-3 w-full flex justify-center mt-2 rounded-md'>  
                                        {item.price}
                                    </p>
                                    <Link legacyBehavior href={`/products/edit/${item.id}`}>
                                <a className="bg-red-600 text-white px-4 py-3 mt-6 rounded-md hover:bg-emerald-800 transition flex justify-center">Editar</a>
                                </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ol>

                <div className=" q  w-full flex justify-center text-base text-center font-bold">
                        <SliderPage widthCarrousel={300} HeigthCarrousel={300} items={product}/>
                </div>
            </main>
    );
}


