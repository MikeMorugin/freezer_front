import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Style from './editForm.module.scss';

function EditForm ({nameValue, 
                    setNameValue, 
                    amountValue,
                    setAmountValue,
                    setUnitValue,
                    onAddButton,
                    itemsUnits,
                    unitItem,
                    setUnitItem}) {
    const onChangeNameInput = (event) => {
        setNameValue(event.target.value);
      };
    const onChangeAmountInput = (event) => {
        setAmountValue(event.target.value*100);
      };
    const onAddButtonClick = () => {
        onAddButton()
    }
    return (
        <div className={Style.Add}>
                    <Grid container spacing={0}>
                        <Grid xs={12}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '380px' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField onChange={onChangeNameInput} id="NameInput" value={nameValue} label="Наименование" variant="outlined" />
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <h3>Кол-во: </h3>
                        </Grid>
                        <Grid xs={4}>
                        <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { ml: -3, mt:1, width: '150px', pl:0 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField onChange={onChangeAmountInput} 
                                            id="AmountInput" 
                                            value={amountValue/100} 
                                            type="number"
                                            step="0.1"
                                            //InputLabelProps={{
                                            //    shrink: true,
                                            //}}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            label="кол-во" 
                                            variant="outlined" />
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <Autocomplete
                                disablePortal
                                value={unitItem || ''}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setUnitItem(newValue);
                                        //setUnitValue(unitItem.nameUnit)
                                    }
                                  }}
                                //defaultValue={[itemsUnits[unitValueIndex]]}
                                //inputValue={inputValue}
                                //onInputChange={(event, newInputValue) => {
                                 //   setInputValue(newInputValue);
                                 //}}
                                id="combo-box-demo"
                                options={itemsUnits}
                                getOptionLabel={(option) => option.nameUnit || ""}
                                sx={{ width: 114, margin: 1}}
                                //getOptionSelected={(option, value) => option.value === value.value}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => <TextField {...params} label="ед.изм"/>}
                            />
                        </Grid>
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <div className={Style.AddButton}>
                                <AddCircleOutlineOutlinedIcon fontSize='large' onClick={() => onAddButtonClick()} />
                            </div>
                        </Grid>
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        </Grid>
                    </Grid>
                </div>
    );
}
export default EditForm;