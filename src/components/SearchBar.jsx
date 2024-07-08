    import { CssOutlined, Fullscreen } from '@mui/icons-material'
import { Box, Button, Checkbox, Fade, FormControlLabel, Grow, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion';

function SearchBar() {
    const [toDo, setToDo] = useState(() => {
        return JSON.parse(localStorage.getItem('toDo')) || []

    })
    const [change, setChange] = useState('')
    const [click, setClick] = useState(false)
    const [sizer, setSizer] = useState(window.innerWidth)
    const [errorText, setErrorText] = useState(100)
    const handleAddToDo = () => {
        if (change !== '') {
            setToDo([...toDo, { text: change, visible: true }]);
            setChange('');
        }
    };

    const handleRemoveToDo = (index) => {

        setToDo((prevToDo) =>
            prevToDo.map((item, idx) =>
                idx === index ? { ...item, visible: false } : item
            )
        );


        setTimeout(() => {
            const newTodo = [...toDo];
            newTodo.splice(index, 1);
            setToDo(newTodo)
        }, 200)

    };

    const myFunction = (e) => {
        if (e.key == 'Enter') {
            handleAddToDo()
        }
    }
    const handleValueError = (e) => {
        if (e.target.value.length <= 100 && window.innerWidth > 900) {
            setChange(e.target.value)
            setErrorText(100)
        } else if (e.target.value.length <= 20 && window.innerWidth > 400) {
            setChange(e.target.value)
            setErrorText(20)
        }
        else if (e.target.value.length <= 12) {
            setChange(e.target.value)
            setErrorText(12)
        }
    }

    const handleClearAll = () => {
        setToDo((prevToDo) =>
            prevToDo.map((item, index) => (
                { ...item, visible: false }
            )
            )
        )
        setTimeout(() => {
            setToDo([])
        }, 300)

    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            setSizer(window.innerWidth)
        })
        localStorage.setItem('toDo', JSON.stringify(toDo))
    }, [toDo])

    const handleDrop = (e, dropIndex) => {
        const dragIndex = parseInt(e.dataTransfer.getData('index'));
        const draggedToDo = toDo[dragIndex];

        const newToDo = [{ ...item, visible: false }];
        newToDo.splice(dragIndex, 1);
        newToDo.splice(dropIndex, 0, draggedToDo);

        setToDo(newToDo);
    };
    console.log(sizer)
    return (
        <Fade in={true}>
            <Box
                sx={{
                    p: '1rem',
                    px: ['1rem', '5rem', '10rem'],
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <Typography
                    variant='h1'
                    color='white'
                    sx={{
                        fontSize: ['2em', '3em']
                    }}
                >
                    Lets Add Your To Do
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: '1rem'
                    }}
                >
                    <TextField
                        value={change}
                        onChange={handleValueError}
                        label={`${change.length == errorText ? 'You Hit Max Letter' : 'Enter To Do'}`}
                        variant='outlined'
                        size='small'
                        onKeyDown={myFunction}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& label.Mui-focused': {
                                    color: '#A0AAB4',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#FDFFC2',
                                },
                                '& fieldset': {
                                    borderColor: '#FDFFC2',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#FDFFC2',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#FDFFC2',
                                },
                            },
                        }}
                        InputProps={{
                            style: { color: '#FDFFC2', }
                        }}
                        InputLabelProps={{
                            style: { color: '#FDFFC2' }
                        }}
                    />
                    <Box onClick={() => handleAddToDo()}>
                        <Button
                            sx={{
                                color: 'white',
                            }}
                            type='submit'
                            color='info'
                            variant='contained'
                            size={'small'}
                        >
                            Add
                        </Button>

                    </Box>
                    <Box
                        sx={{
                            position: `absolute`,
                            bottom: '1rem',
                            right: '1rem'
                        }}
                        onClick={handleClearAll}>
                        <Button
                            sx={{
                                color: 'white',
                            }}
                            type='submit'
                            color='info'
                            variant='contained'
                            size='large'
                        >
                            Remove
                        </Button>

                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        cursor: 'auto',
                        height: '400px',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '12px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                        scrollBehavior: 'smooth',
                        pr: '1rem',
                    }}
                >


                    {toDo.map((item, index) => (
                        <Grow
                            in={item.visible
                            } key={index}>
                            <Box
                                sx={{


                                    position: 'relative',
                                    zIndex: '3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: ['0', 1],
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        zIndex: -index,
                                        backgroundColor: '#FDFFC2',
                                        borderRadius: '.2rem',
                                        p: '.6rem',
                                        width: '100%',
                                        color: '#FF76CE',
                                        boxShadow: '10px 10px 1px 0px #0288d1'
                                    }}
                                >
                                    {item.text}
                                </Box>
                                <Box sx={{ display: 'flex', gap: ['0', 1, 3] }}>
                                    <FormControlLabel
                                        onClick={() => false}
                                        value="top"
                                        control={<Checkbox />}
                                        sx={{ boxShadow: '10px 10px 1px 0px #0288d1', transition: 'all 300ms ease' }}
                                        labelPlacement="top"
                                    />
                                    <Button
                                        onClick={() => handleRemoveToDo(index)}
                                        sx={{ boxShadow: '10px 10px 1px 0px #0288d1' }}
                                        variant="contained"
                                        color="success"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Box>
                            </Box>
                        </Grow>
                    ))}
                    <Fade
                        in='true'
                    >
                        <Typography
                            sx={{
                                position: 'absolute',
                                zIndex: '2',
                                bottom: '5rem',
                                fontSize: ['2em', '3em', '5em'],
                                filter: `${toDo.length > 2 ? 'blur(.1rem)' : 'blur(0)'}`,
                            }}
                            variant="h2"
                            color="#fff"

                        >
                            Press <span style={{ color: '#0288d1' }}>"Enter"</span> key or  <span style={{ color: '#0288d1' }}>(add)</span> button to add <span style={{ color: '#0288d1' }}>{`{To Do}`}</span> list
                        </Typography>
                    </Fade>
                    <Typography
                        sx={{
                            position: 'absolute',
                            bottom: ['1.5rem', '0', '0rem'],
                            right: ['8.5rem', '10rem', '9rem'],
                            fontSize: ['1.1em', '3em', '3rem']
                        }}
                        variant="h5"
                        color="#fff">To remove all list Press </Typography>
                </Box>
            </Box >
        </Fade >
    )
}

export default SearchBar
