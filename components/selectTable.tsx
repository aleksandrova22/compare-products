"use client";
import classes from './selectTable.module.css';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { exchanged, exchangedElem } from '../redux/actions';
import { selectIndex, selectElemForExchange } from '../redux/selectors';


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

type SelectProps = {
    array: Product[] | null, isOpen: boolean, onClose: () => void, position: { top: number; left: number } | null
    
    // , onExchange: (id: number) => void,    selectedElement: number | null
}



export const SelectTable = forwardRef<HTMLDivElement, SelectProps>(({ array, onClose, position }, ref) => {


    const [value, setValue] = useState('');    //состояние для строки поиска
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // для закрытия окна
    const onWrapClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).classList.contains('modal-wrap')) {
            onClose();
        }
    };

    // элемент для выбора из redux
    const elemForExchange = useSelector(selectElemForExchange),
        dispatch = useDispatch();



    //фильтрация массива для поиска по наименованию
    const filteredArray = array?.filter(elem =>
        elem.name.toLowerCase().includes(value.toLowerCase())
    );


    // const handleExchangeClick = (id: number) => {
    //     if (selectedElement) {
    //         onExchange(id);
    //         onClose();
    //     }
    // };

    return <div className={classes.selecttable} >
        <div className={classes.modal_wrap} onClick={onWrapClick}>
            <div ref={ref}
                className={classes.modal_content}
                style={{ top: position?.top, left: position?.left, position: 'absolute', minWidth: '300px' }}>
                <input type='search' placeholder={'Поиск'} value={value} onInput={event => setValue(event.currentTarget.value)} />
                <ul>
                    {filteredArray?.map((elem) =>
                        <li key={elem.id}>
                            <button onClick={() => { dispatch(exchangedElem(elem.id)); }} > 🔁 {elemForExchange} </button>
                            <Image src={"/" + elem?.photo} width={60} height={60} alt="Picture" priority={true} /> {elem.name}
                        </li>
                    )}
                </ul>
            </div>

        </div>
    </div>
})