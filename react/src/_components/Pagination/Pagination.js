import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Pagination } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class Paginations extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col md={12}>
                        <Pagination onClick={this.click}>
                            <Pagination.First disabled={this.props.page === 1} />
                            <Pagination.Prev disabled={this.props.page === 1} />
                            {this.state.pages.map((i) => {
                                return(<Pagination.Item active={i === this.props.page} key={i} >{i}</Pagination.Item>)
                            })}
                            
                           
                            <Pagination.Next disabled={this.props.page === this.props.totalPages}/>
                            <Pagination.Last disabled={this.props.page === this.props.totalPages} />
                        </Pagination>
                    </Col>
                </Row>
            </Aux>
        );
    }

    componentDidMount () {
        let pages = [];
        for(let i = 1; i <= this.props.totalPages; i++ ){
            pages.push(i);
        }
        this.setState({pages: pages});
    }

    click = (e) => {
        if(e.target.className.indexOf('disable') != -1 || e.target.className.indexOf('active') != -1) {
            return;
        }
        let number = 1;
        if(e.target.textContent.indexOf('Last') != -1 ) {
            number = this.props.totalPages;
        } else if(e.target.textContent.indexOf('First') != -1 ) {
            number = 1;
        } else if(e.target.textContent.indexOf('Previous') != -1) {
            number = this.props.page - 1 ;
        } else if(e.target.textContent.indexOf('Next') != -1) {
            number = this.props.page + 1 ;
        } else {
            number = parseInt(e.target.textContent);
        }
        this.props.changePage(number);
    }
}

export default Paginations;
