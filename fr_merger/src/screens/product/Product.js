import React from 'react';

import Aux from "../../hoc/_Aux";
import BootstrapTable from "../../_components/Tables/BootstrapTable"
import SearchBox from '../../_components/SearchBox/SearchBox'
import Pagination from '../../_components/Pagination/Pagination'
import { Row, Col, Card,  Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {productAction} from '../../_actions/product.action'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DELETE_SUCCESSFULLY} from '../../_const/message'

class ProductList extends React.Component {

    componentDidMount() {
        this.getProduct(1, "");
    }

    shouldComponentUpdate(nextState, nextProps) {
        if(!this.props.product.isError && nextState.product.isError) {
            toast.error(nextState.product.messageError);
        } else if(!this.props.product.isDelete && nextState.product.isDelete) {
            toast.info(DELETE_SUCCESSFULLY);
        }
        return true;
    }

    render() {
        
        const data = this.props.product.product;
        const {page, totalPage} = this.props.product;
        if(this.props.product.isError) {
            
        }
        return (
            <Aux>
                <ToastContainer toastClassName='alert alert-danger'/>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col md='9' xs='9'> <Card.Title as="h3">Product List</Card.Title></Col>
                                    <Col md='3'  xs='3'><Button>Create new Product</Button></Col>
                                </Row>
                                {/* <span className="d-block m-t-5">use bootstrap <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body>
                                <SearchBox search={this.search}/>
                                <BootstrapTable data={data} delete={this.delete.bind(this)}/>
                                <div className="float-right"><Pagination page={page} totalPage={totalPage} changePage={this.changePage}/></div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }

    delete(id) {
        this.props.deleteProduct(id, this.props.product.page, this.props.product.searchText);
    }

    search = (value) => {
        this.getProduct(this.props.product.page, value);
    }

    changePage = (page) => {
        this.getProduct(page, this.props.product.searchText);
    }

    getProduct(page, text) {
        this.props.getProduct(page, text);
    }
}

const mapStateToProps = state => {

    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        product: state.product
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct:(page, text) => dispatch(productAction.getProduct(page, text)),
        deleteProduct: (id, page, text) =>  dispatch(productAction.deleteProductById(id, page, text))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));