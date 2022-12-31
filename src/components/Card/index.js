import Style from './card.module.scss';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import React from 'react';

function Card ({idCard, name, amount, unit, onClickDelButton, onClickEditeButton, isLoaded}) {
    const onClickDel = () => {
        onClickDelButton({idCard});
    };
    const onClickEdite = () => {
        onClickEditeButton({idCard, name, amount, unit})
    };
    return (
        <>
            <div className={Style.Card}>
                <h5>{name}</h5>
                    <div>
                        <span>Кол-во: </span>
                        <b>{amount} {unit}</b>
                        <span className={Style.Icons}>
                            <DeleteOutlineOutlinedIcon className={Style.Delete} onClick={() => onClickDel()}/>
                            <ModeEditOutlineOutlinedIcon className={Style.Edite} onClick={() => onClickEdite()}/>
                        </span>
                    </div>
            </div>
        </>
                //<div className={Styles.plus} onClick={() => onClickButtonPlus()}>
                //   {isAdded ? <CheckCircleOutlinedIcon /> : <AddCircleOutlineIcon />}
                //</div>
           
    )
}
export default Card;