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
                    unitValue,
                    setUnitValue,
                    onAddButton,
                    itemsUnits,
                    unitValueIndex}) {
    const onChangeNameInput = (event) => {
        setNameValue(event.target.value);
      };
    const onChangeAmountInput = (event) => {
        setAmountValue(event.target.value);
      };
    const onChangeUnitInput = (event) => {
        setUnitValue(event.target.outerText);
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
                                            value={amountValue} 
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            label="кол-во" 
                                            variant="outlined" />
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                onChange={onChangeUnitInput}
                                options={itemsUnits}
                                getOptionLabel={(option) => option.nameUnit || ""}
                                inputValue={unitValue}
                                sx={{ width: 114, margin: 1}}
                                renderInput={(params) => <TextField {...params} label="ед.изм"/>}
                            />{console.log([unitValue, unitValueIndex, amountValue, itemsUnits])}
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