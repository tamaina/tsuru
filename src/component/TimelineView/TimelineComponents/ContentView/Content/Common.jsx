// @flow
import React from 'react'
import {pure} from 'recompose';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Icon from '../Parts/Icon';

import type Content from '../../../../../core/view/value/Content'

const styles = theme => ({
    root: {
        paddingBottom: '4px',
    },
    body: {
        padding: 5,
        paddingLeft: 53,
    },
});

type Props = {
    classes: Object,
    data: Content,
};

const Common = pure((props: Props) => (
    <div className={props.classes.body}>
        <Icon src={props.data.user.avatar}/>
        <Typography variant="caption">{props.data.user.displayName + "@"+ props.data.user.screenName}</Typography>
        <Typography variant="body1">{props.data.content}</Typography>
    </div>
));

export default withStyles(styles)(Common);
