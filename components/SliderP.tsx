import React from 'react'


interface SliderPage {
    widthCarrousel: number,
    HeigthCarrousel: number,
    items:any
}

const SliderPage = ({ widthCarrousel, HeigthCarrousel,items }: SliderPage) => {


    return (
        <>
            <main className='w-full p-4 relative overflow-auto '>
                <div className=' overflow-auto    p-2 pb-8 ' style={{ height: `${HeigthCarrousel}px`, width:`${ widthCarrousel}px` }}>
                    {Array.isArray(items) &&items.map((item: any, index: number) => (
                        <CardS item={item} index={index} widthCard ={widthCarrousel} heightCard = {HeigthCarrousel}/>
                    ))}

                </div>
            </main>
        </>
    )
}

interface cardS {
    item: any,
    index: number,
    widthCard: number,
    heightCard:number
}

const CardS = ({ item, index , widthCard, heightCard}: cardS) => {
    return (
        <div key={index} className='bg-slate-200 rounded-md p-2 absolute overflow-x-auto  ' style={{ left: ` ${index * (widthCard  + 10)}px` , width:`${widthCard}px` , height:`${heightCard}px`}}>
            <p className='text-black'>{item.name}</p>
                <img src={item.image} alt={`Image of product`} className='pb-2 mx-auto h-auto' />
            </div>
        )
    }

export default SliderPage