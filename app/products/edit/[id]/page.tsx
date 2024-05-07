"use client"
import React, { useEffect, useState} from "react";
import { getElementById, updateElementById } from "@/app/actions/search";
import { useRouter } from 'next/navigation'

const edit = ({ params }: any) => {
    const [imageIndex, setImageIndex] = useState(0)
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const router = useRouter();

    const [product, setProducts] = useState<any>([])
    const [productId, setProductId] = useState<number>(params.id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [productData, setProductData] = useState({
        name:"",
        price:"",
        description:"",
        category:"",
        image:"",
        gallery:[] as { original: string, thumbnail: string }[]
    });

    const updateElementInDb = async () => {
        try {
            const response = await updateElementById(params.id, productData);
            console.log("Product updated successfully:", response);
            setProductData({
                name:"",
                price:"",
                description:"",
                category:"",
                image:"",
                gallery:[]
            });
        } catch (error) {
            console.error("Error al suibir datos", Response);
        }
    };

    const nextItem = () => {
        if (imageIndex >= images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex((prevState) => prevState + 1);
        }
    };
    
    const prevItem = () => {
        if (imageIndex <= 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex((prevState) => prevState - 1);
        }
    };

    const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value}));
    };

    useEffect(() => {
        const getData = async () => {
            setProductId(params.id)

            const dataResult = await getElementById(params.id);
console.log(params);

            setProducts(dataResult || []);

            if (dataResult && dataResult.length > 0 ) {
                const { name, price, description, category, image, gallery} = dataResult[0];
                setProductData({ name, price, description, category, image, gallery,});
            }
        };
        getData();
    }, [params.id]);

    return (
        <div className="flex justify-center content-center items-center flex-col min-h-screen bg-gray-800 size-full">
            {product.map((item: any, index: number) => (
            <div
                className="bg-black rounded-lg text-black p-8 flex content-center justify-center  "
                key={index}
            >
                <form
                className="flex flex-col gap-2 p-1 "
                onSubmit={(e) => {
                    e.preventDefault();
                    updateElementInDb();
                }}
                >
                <p className="text-center text-2xl text-white font-semibold mb-4">Id = {params.id}</p>
    
                <label htmlFor="name" className="text-center text-white font-semibold">Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="rounded-md p-2 bg-slate-500"
                />
                <p className="text-center text-white font-semibold">Precio:</p>
                <label htmlFor="price">
                    <input type="text" name="price" value={productData.price} onChange={handleInputChange} className="rounded-md p-2 bg-slate-500"/>
                </label>
                <label htmlFor="description" className="text-center text-white font-semibold">Descripcion:</label>
                <input
                    type="text"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="rounded-md p-2 bg-slate-500"
                />
                <label htmlFor="category" className="text-center text-white font-semibold">Linea:</label>
                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="text-black rounded-md p-2 bg-slate-500"
                />
                <label htmlFor="image" className="text-center text-white font-semibold">Imagen:</label>
                <input
                    type="text"
                    name="image"
                    value={productData.image}
                    onChange={handleInputChange}
                    className="text-black rounded-md p-2 bg-slate-500"
                />

                <button
                    type="submit"
                    className=" mb-4 mt-4 bg-cyan-400 text-black-50 p-2 rounded-md hover:bg-gray-500 hover:text-white transition bg-gray-200 shadow-lg shadow-gray-500/50">
                    Actualizar
                </button>
                </form>
    
            </div>
            ))}
            
            <div className="w-auto flex items-center justify-center flex-col mt-8">
    <img className="object-cover" src={productData.gallery[imageIndex]?.original} alt={`Image of ${productData.name}`} />
    <div>
        <button className="text-4xl" onClick={() => prevItem()} aria-label="Previous Image">{"<"}</button>
        <button className="text-4xl" onClick={() => nextItem()} aria-label="Next Image">{">"}</button>
        </div>
    <div className="flex items-center justify-between">
       
        {productData.gallery.map((image: any, index: number) => (
            <img
                key={index}
                className="object-cover aspect-video w-1/3"
                src={image.original}
                alt={`Image of ${productData.name}`}
                loading="lazy"
            />
        ))}
    </div>


                
            </div>
            
        </div>
        );
};

export default edit; 