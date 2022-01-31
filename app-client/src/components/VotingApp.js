import * as React from 'react';
import Button from '@mui/material/Button';
import './VotingApp.css';
import { useGlobalState } from '../contexts/global-state/GlobalState';
import { postData } from '../contexts/global-state/actions';
import Popup from './Popup';
import Results from './Results';

const VotingApp = () => {
    const [value, setValue] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState(false);
    const [state, setState] = React.useState({ right: false });
    const { data } = useGlobalState();

    function handleClick(e) {
        const selected = e.currentTarget.id;
        setValue(selected);

        if (selected === 'bjp') {
            data['bjp'] ? data['bjp']++ : data['bjp'] = 1;
        }

        if (selected === 'congress') {
            data['congress'] ? data['congress']++ : data['congress'] = 1;
        }

        data['totalVotes'] ? data['totalVotes']++ : data['totalVotes'] = 1;

        postData(data);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        setResult(true);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    }

    return (
        <div className='root'>
            <div className='container'>
                <div className='titleSection'>
                    Voting Portal
                </div>
                <div className='resultButton'>
                    <Button onClick={toggleDrawer('right', true)}>Result</Button>
                    {result && <Results toggleDrawer={toggleDrawer} state={state} anchor='right' />}
                </div>
                <div>
                    <div className='labelSection'>
                        Select Your Political Party
                    </div>
                    <div className='buttonSection'>
                        <div className='bjp'>
                            <Button id="bjp" style={{ width: '150px' }} onClick={e => handleClick(e)} color='primary' variant="contained" size="large">
                                <span style={{ textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#ffff' }}>BJP</span>
                            </Button>
                        </div>

                        <div className='congress'>
                            <Button id="congress" style={{ width: '150px' }} onClick={e => handleClick(e)} variant="contained" size="large">
                                <span style={{ textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#ffff' }}>CONGRESS</span>
                            </Button>
                        </div>
                    </div>

                    <div className='vvp'>
                        <Popup handleClickOpen={handleClick} handleClose={handleClose} open={open} value={value} />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default VotingApp;