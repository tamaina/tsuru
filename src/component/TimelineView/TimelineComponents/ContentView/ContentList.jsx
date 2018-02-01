// @flow

import React from 'react';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import {onlyUpdateForKeys} from 'recompose';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider'

import ContentObject from '../../../../core/value/Content';

import Content from './Content/Content';
import Event from './Content/Notification';

const styles = theme => ({
    root: {
        overflowY: 'auto'
    }
});

type Props = {
    classes: Object,
    timelineIndex: number,
    ownerIndex: number,
    service: string,
    contents: Array<any>,
    callApi: Function,
    setReply: Function,
};


const cache = new CellMeasurerCache({
    defaultHeight: 120,
    fixedWidth: true
});

class ContentList extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 50,
        });
    }
    _cache : any;

    _onScroll({ clientHeight, scrollHeight, scrollTop }) {
        console.log(scrollTop)
    }

    _rowRenderer({index, key, parent, style}) {
        const renderTarget = this.props.contents[index];
        const props = this.props;
        return (
            <CellMeasurer
                cache={this._cache}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({measure}) => {
                    return renderTarget instanceof ContentObject ?
                        <div key={index} style={style} onLoad={measure}>
                            <Content
                                service={props.service}
                                timelineIndex={props.timelineIndex}
                                ownerIndex={props.ownerIndex}
                                data={renderTarget}
                                callApi={props.callApi}
                                setReply={props.setReply}/>
                            <Divider/>
                        </div> :
                        <div key={index} style={style} onLoad={measure}>
                            <Event data={renderTarget}/>
                            <Divider/>
                        </div>
                }}
            </CellMeasurer>

        )
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <AutoSizer>
                    {({width, height}) => (
                        <List
                            width={width}
                            height={height}
                            overscanRowCount={6}
                            deferredMeasurementCache={this._cache}
                            rowHeight={this._cache.rowHeight}
                            rowCount={this.props.contents.length}
                            rowRenderer={this._rowRenderer.bind(this)}
                            onScroll={this._onScroll}/>
                    )}
                </AutoSizer>
            </div>
        );
    }
}

export default withStyles(styles)(ContentList);
