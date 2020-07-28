import React, {useState} from 'react';
import {Typography, Slider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sliderWrapper: {
        maxWidth: '99%',
        padding: theme.spacing(0.5),
        margin: theme.spacing(0.5)
    },
    slider: {
        padding: 0,
        margin: 0
    }
}));


const getRefinedValue = (currentValue, currentParams) => (
    (currentValue >= currentParams.min) && (currentValue <= currentParams.max) ?
        currentValue :
        currentParams.default
);

const SimpleSlider = ({noTitle = false, verticalOnMobile = false, params, sliderValue}) => {

    const [value, setValue] = useState(getRefinedValue(sliderValue, params));
    const classes = useStyles();


    const handleChange = (event, value) => {
        // onSliderChange(this.props.name, value);
        setValue(value);
    };


    return (
        <div className={classes.sliderWrapper}>
            {noTitle ? null : <Typography id='Slider'>{params.title + ': ' + Math.round(10 * value) / 10}</Typography>}
            <Slider className={'slider'}
                    value={value}
                    disabled={parseInt(params.min, 10) >= parseInt(params.max, 10)}
                    min={parseInt(params.min, 10)}
                    max={parseInt(params.max, 10)}
                    step={params.step}
                    orientation={'horizontal'}
                    aria-labelledby='Slider'
                    onChange={handleChange}
            />
        </div>
    );
}

export default SimpleSlider;
