// baseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, children, handles = [], style = {} }) => {
    return (
        <div className="base-node" style={style}>
            {/* Render Handles */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${id}-${handle.id}-${index}`}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style}
                    className="custom-handle"
                />
            ))}

            {/* Header */}
            <div className="node-header">
                <span className="node-title">{title}</span>
                {/* We can add an icon here if passed in props */}
            </div>

            {/* Content */}
            <div className="node-content">
                {children}
            </div>
        </div>
    );
};
