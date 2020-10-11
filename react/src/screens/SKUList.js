import React from 'react';

import Aux from "../hoc/_Aux";
import BootstrapTable from "../_components/Tables/BootstrapTable"
import SearchBox from '../_components/SearchBox/SearchBox'
import Pagination from '../_components/Pagination/Pagination'
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import * as actionTypes from "../_const/actions";
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {skuAction} from '../_actions/sku.action'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SKUList extends React.Component {

    componentDidMount() {
        this.getSKU(1, "");
        if(this.props.sku.isError) {
            toast.error(this.props.sku.messageError);
        }
    }

    render() {
        const data = this.props.sku.sku;
        const {page, totalPages, size, searchText} = this.props.sku;
        return (
            <Aux>
                <ToastContainer toastClassName='alert alert-danger'/>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col md='9' xs='9'> <Card.Title as="h3">SKU List</Card.Title></Col>
                                    <Col md='3'  xs='3'><Button>Create new SKU</Button></Col>
                                </Row>
                                {/* <span className="d-block m-t-5">use bootstrap <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body>
                                <SearchBox search={this.search}/>
                                <BootstrapTable data={data} delete={this.delete.bind(this)}/>
                                <div className="float-right"><Pagination page={page} totalPages={totalPages} changePage={this.changePage}/></div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

    delete(id) {
        this.props.deleteSKU(id, this.props.sku.page, this.props.sku.searchText);
    }

    search = (value) => {
        this.getSKU(this.props.sku.page, value);
    }

    changePage = (page) => {
        this.getSKU(page, this.props.sku.searchText);
    }

    getSKU(page, text) {
        this.props.getSKU(page, text);
    }
}

const mapStateToProps = state => {

    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        sku: state.sku
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSKU:(page, text) => dispatch(skuAction.getSKU(page, text)),
        deleteSKU: (id, page, text) =>  dispatch(skuAction.deleteSKUById(id, page, text))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SKUList));