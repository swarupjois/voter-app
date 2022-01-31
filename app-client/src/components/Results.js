import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import './Results.css';
import { useGlobalState } from '../contexts/global-state/GlobalState';
import ResultTable from './ResultTable';

const Results = (props) => {
    const { data } = useGlobalState();

    const list = (anchor) => (
        <Box
            role="presentation"
            onClick={props.toggleDrawer(anchor, false)}
            onKeyDown={props.toggleDrawer(anchor, false)}
        >
            <div>
                <div className='titleCard'>
                    <span style={{ color: '#ffff' }}> Voting Result</span>
                </div>
                <div className='bodyCard'>
                    <ResultTable data={data} />

                </div>
            </div>

        </Box>
    );

    return (
        <div>
            {
                <React.Fragment key={props.anchor}>
                    <Drawer
                        anchor={props.anchor}
                        open={props.state[props.anchor]}
                        onClose={props.toggleDrawer(props.anchor, false)}
                        PaperProps={{
                            sx: { width: "40%" },
                        }}
                    >
                        {list(props.anchor)}
                    </Drawer>
                </React.Fragment>
            }
        </div>
    );
}
export default Results;