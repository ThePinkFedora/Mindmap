import { useContext, useEffect, useState } from 'react';
import './NodesPanel.scss';
import { NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import { searchNodes } from '../../js/api';

function NodesPanel({ onSelect }) {
    const nodes = useContext(NodesContext);
    const { selection } = useContext(SelectionContext);
    const { workspace, setWorkspace } = useContext(WorkspaceContext);
    const [query, setQuery] = useState(null);
    const [queryResult, setQueryResults] = useState(null);

    useEffect(() => {
        if (!query) {
            setQueryResults(null);
            return;
        }
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!query) return;
        searchNodes(workspace.id, query)
            .then(result => {
                setQueryResults(result.results);
            });
    };


    const handleSelect = (event, nodeId) => {
        event.preventDefault();
        onSelect(event.ctrlKey ? selection.toggle(nodeId) : selection.set(nodeId));
        setWorkspace({ ...workspace, focus: nodeId });
    };

    /** @param {Event} event */
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <section className="nodes-panel">
            <form className="nodes-panel__header" onSubmit={handleSubmit}>
                <input className="nodes-panel__search" type="text" name="search" placeholder='Search nodes...' value={query ?? ""} onChange={handleQueryChange} />
            </form>
            {queryResult && <p className="nodes-panel__matches-label">{queryResult.length} matches.</p>}
            <ul className="node-list">
                {queryResult ?
                    queryResult
                        .map((queryResult, index) =>
                            <li
                                className={`node-list__item ${selection.contains(queryResult.node_id) ? "node-list__item--selected" : ""}`}
                                key={queryResult.node_id + index}
                                onClick={(event) => handleSelect(event, queryResult.node_id)}>
                                <ResultCard resultItem={queryResult} />
                            </li>
                        ) :
                    nodes && nodes.map(node => (
                        <li
                            className={`node-list__item ${selection.contains(node.id) ? "node-list__item--selected" : ""}`}
                            key={node.id}
                            onClick={(event) => handleSelect(event, node.id)}>
                            {node.name}
                        </li>
                    ))}
            </ul>
        </section>
    );
}

/**
 * @param {object} props
 * @param {object[]} props.resultItems
 */
function ResultCard({ resultItem, query }) {
    const maxLength = 100;

    return (
        <div className="result-card">
            <h3 className="result-card__title">{resultItem.node_name}</h3>
            <div className="result-card__body">
                {resultItem.matches.map(item => (
                    <div key={resultItem.node_id + item.name + item.type} className="result-card__match">
                        {item.type !== "node" && <h4 className="result-card__match-title">{item.name}: </h4>}
                        <p className="result-card__match-value">{item.value.length > maxLength ? item.value.substring(0, maxLength) + "..." : item.value}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}


export default NodesPanel;