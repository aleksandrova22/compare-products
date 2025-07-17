"use client";
import React from 'react';
import { products } from '../db';
import classes from './productList.module.css';
import { ObjTable } from './objTable';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, exchanged, exchangedElem } from '../redux/actions';
import { selectCount, selectIndex, selectElemForExchange } from '../redux/selectors';
import { useState, useEffect } from 'react';


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


export function ProductList() {
    
    const count = useSelector(selectCount), //состояние кнопки для отображения кол-ва товаров
        element = useSelector(selectIndex),  //выбранные элементы для замены из redux
        elemForExchange = useSelector(selectElemForExchange),
        dispatch = useDispatch();

    const [updatedData, setUpdatedData] = useState(products); // состояние для обновленного массива 



    console.log('selectIndex и  selectElemForExchange:', element, elemForExchange);


    //функция для замены элементов
    const exchangeElements = (arr: Product[], elem1: number, elem2: number) => {
        const index1 = arr.findIndex(item => item.id === elem1);
        const index2 = arr.findIndex(item => item.id === elem2);
        if (index1 !== -1 && index2 !== -1) {
            const temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        }
        console.log('заменяем', elem1, elem2, 'массив стал', arr);
        return arr;
    };


    useEffect(() => {
        if (element && elemForExchange) {
            const newData = exchangeElements(products, element, elemForExchange);
            setUpdatedData(newData);
            dispatch(exchangedElem(null));  //очистка выбранных элементов redux
            dispatch(exchanged(null));
        }
    }, [element, elemForExchange]);

    return <>
        <div className={classes.list}>
            <div className={classes.title}>
                <div>Смартфоны</div>
                <div>
                    <span>Отобразить товары </span>
                    <button onClick={() => dispatch(decrement())}>-</button>
                    {count}
                    <button onClick={() => dispatch(increment())}>+</button>
                </div>

            </div>
            <ObjTable data={updatedData.slice(0, count)} />

        </div>
    </>;
};