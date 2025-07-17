"use client";
import classes from './objTable.module.css';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { SelectTable } from './selectTable';
import { products } from '@/db';
import { exchanged, exchangedElem } from '../redux/actions';
import { selectIndex, selectElemForExchange, selectCount } from '../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';


export type Product = {
    id: number,
    name: string | '',
    manufacture: string | '',
    year: string | '',
    country: string | '',
    diagonal: string | '',
    memory: string | '',
    price: string | '',
    photo: string | ''
};

function getMas(arr1: Product[], arr2: Product[]) {
    const set2 = new Set(arr2.map(item => item.id));
    return arr1.filter(elem => !set2.has(elem.id));
};

const properties = [
    { label: "Наименование", key: "name" },
    { label: "Модель", key: "manufacture" },
    { label: "Год", key: "year" },
    { label: "Производитель", key: "country" },
    { label: "Диагональ", key: "diagonal" },
    { label: "Память", key: "memory" },
    { label: "Цена", key: "price" }
];

function hasDifferences(values: (string | number)[]) {
    const stringValues = values.map(value => String(value));
    return new Set(stringValues).size > 1;
}


export function ObjTable({ data }: { data: Product[] }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisibleModal, setIsVisibleIModal] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    //фильтр чтобы выбрать различия 
    const filteredProperties = properties.filter(prop => {
        if (!isChecked) return true;
        return hasDifferences(data.map(obj => obj[prop.key as keyof Product]));
    });

    //позиция для мод окна
    const [modalPosition, setModalPosition] = useState<{ top: number; left: number} | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left });
        setIsVisibleIModal(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsVisibleIModal(false);
        }
    };

    React.useEffect(() => {
        if (isVisibleModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisibleModal]);


    //выбранные для замены элементы массива
    const
        element = useSelector(selectIndex),
        elemForExchange = useSelector(selectElemForExchange),
        count = useSelector(selectCount),
        dispatch = useDispatch();
   // console.log('selectIndex и  selectElemForExchange:', element, elemForExchange);
 console.log('ghhghghg', products.length, data.length);
  
    return <>
        <div className={classes.container}>
            <table className={classes.objtable}>


                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                Показать различия
                            </label>
                        </th>
                        {data.map((c, index) => (
                            <th key={c.id + Math.random()}>
                                <Image src={"/" + c?.photo} width={200} height={200} alt="Product" priority={true} />
                               
                               { 
                              
                               (data.length < products.length) &&
                                       ( <button onClick={(event) => {
                                            handleButtonClick(event, index);
                                            dispatch(exchanged(c.id));   //запоминаем элемент на котором выбор
                                        }}> 🔻 </button>)
                                   
                                    }

                            </th>
                        ))}

                      
                    </tr>
                </thead>



                <tbody>
                    {filteredProperties.map(prop => (
                        <tr key={prop.key}>
                            <td>{prop.label}</td>
                            {data.map(obj => (
                                <td key={`${obj.id}-${prop.key}`}>
                                    {obj[prop.key as keyof Product]}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>

            </table>

            {isVisibleModal && (
                <SelectTable
                    isOpen={isVisibleModal}
                    onClose={() => setIsVisibleIModal(false)}
                    array={getMas(products, data)}
                    ref={modalRef}
                    position={modalPosition }
               
                />
            )}
        </div>
    </>;

}