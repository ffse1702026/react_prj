import React from 'react';
import {Row, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class BootstrapTable extends React.Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>action</th>
                        </tr>
                        </thead>
                        <tbody> 
                            {this.props.data.map((d) => {
                                return (<tr key={d.id}>
                                    <th scope="row">{d.id}</th>
                                    <td>{d.name}</td>
                                    <td>{d.status}</td>
                                    <td>{d.description}</td>
                                    <td><button className='btn btn-success' style={{marginRight: '10px'}}><i className="fa fa-edit"></i>
                                    </button><button className='btn btn-danger' onClick={() => this.props.delete(d.id)}><i className="fa fa-trash"></i></button></td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Aux>
        );
    }
}

export default BootstrapTable;