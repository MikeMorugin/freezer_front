
import * as React from 'react';
import { AppContext } from '../../AppContext';
import { useContext, useState } from 'react';
import Card from '../../components/Card';
import Style from './Freezer.module.scss';
import EditForm from '../../components/EditForm'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Axios from 'axios';

function Freezer () {
    const items = useContext(AppContext).items;
    const setItems = useContext(AppContext).setItems;
    const locationName = useContext(AppContext).locationName;
    const locationNamedText = useContext(AppContext).locationNamedText;
    const itemsUnits = useContext(AppContext).itemsUnits;
    const isLoaded = useContext(AppContext).isLoaded;
    const [index, setIndex] = useState(0);
    const [id, setId] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState(0);
    const [unitValue, setUnitValue] = useState("");
    const [unitValueIndex, setUnitValueIndex] = useState(0);
    const onAddButtonClick = () => {
        setIsAdded(true);
    }
    const addItem = async (obj) => {
        try {
            const { data } = await Axios.post('http://10.0.0.4:8080/api/products', obj);
            setItems([...items, data]);
        }
        catch (err) {
            alert('Не удалось добавить элемент');
            console.error(err);
        }
    }
    const onAddButton = () => {
        if (isAdded) {
            addItem({name: nameValue, amount: amountValue, unit: unitValue, location: locationName})
            setIsAdded(false);
        }
        else {
            if (isEdit) {
                editItem({name: nameValue, amount: amountValue, unit: unitValue, location: locationName})
                setIsEdit(false);
            }
        }
    }
    const onClickDelButton = async (id) => {
        try {
            setItems(items.filter((item) => item.id !== id));
            await Axios.delete(`http://10.0.0.4:8080/api/products/${id}`)
        }
        catch (err) {
            alert('Не удалось удалить элемент');
            console.error(err);
        }
    }
    const onClickEditeButton = (obj) => {
        setIndexState(obj.id);
        setId(obj.id);
        setNameValue(obj.name);
        setAmountValue(obj.amount);
        setUnit(obj.unit);
        setIsEdit(true);
    }
    const setUnit = (unitName) => {
        setUnitValue (unitName);
        itemsUnits.forEach((item, index) => {
            if (item.nameUnit === unitName) {
                setUnitValueIndex(index);
            }
        });
    }
    const setIndexState = (id) => {
        items.forEach((item, index) => {
            if (item.id === id) {
                setIndex(index);
            }
        });
    }
    const editItem = async (obj) => {
        try {
            const { data } = await Axios.put(`http://10.0.0.4:8080/api/products/${id}`, obj);
            setItems([...items.slice(0,index), data, ...items.slice(index+1)]);
        }
        catch (err) {
            alert('Не удалось отредактировать элемент');
            console.error(err);
        }
    }
    
    const RenderCard = () => {
        const filteredItems = isLoaded && items.filter((item) => 
            item.location.toLowerCase().includes(locationName.toLowerCase()));
        return (
            (isLoaded ? filteredItems : [...Array(8)])
                .map((obj, index) => (<Card
                    key={index}
                    {...obj} 
                    isLoaded={isLoaded}
                    onClickDelButton={() => onClickDelButton(obj.id)}
                    onClickEditeButton={() => onClickEditeButton(obj, index)}
                    />))
        );
    }
    return (
        <>
            <header className={Style.Header}>
                <h2>Продукты в {locationNamedText}</h2>
            </header>
            <div className={`${Style.overlay} ${isAdded || isEdit ? Style.overlayVisibility : ''}`}>
                <EditForm
                   nameValue={nameValue}
                   setNameValue={setNameValue}
                   amountValue={amountValue}
                   setAmountValue={setAmountValue}
                   unitValue={unitValue}
                   setUnitValue={setUnitValue}
                   onAddButton={onAddButton}
                   itemsUnits={itemsUnits}
                   unitValueIndex={unitValueIndex} />
            </div>
                <div className={Style.Cards}>
                    <RenderCard />
                </div>
                <div className={Style.AddButton}>
                    <span>
                        <AddCircleOutlineOutlinedIcon fontSize='large' onClick={() => onAddButtonClick()}/>
                    </span>
                </div>
                
        </>
    );
}
export default Freezer;