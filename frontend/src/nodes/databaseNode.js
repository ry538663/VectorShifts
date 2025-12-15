// databaseNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DatabaseNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-query-params` },
        { type: 'source', position: Position.Right, id: `${id}-results` }
    ];

    return (
        <BaseNode id={id} data={data} title="Database" handles={handles}>
            <label>
                SQL Query:
                <textarea style={{ minHeight: '60px' }} placeholder="SELECT * FROM users WHERE..." />
            </label>
        </BaseNode>
    );
}
