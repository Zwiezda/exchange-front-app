import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const REACT_APP_API_URL = process.env.REACT_APP_API_BASE_URL;

class Exchange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            exchangedAmount: '',
            exchangedCurrency: '',
            currencies: [],
            sourceCurrency: '',
            destinationCurrency: ''
        };
        this.getCurrencies();

        this.handleDestinationCurrencyChange = this.handleDestinationCurrencyChange.bind(this);
        this.handleSourceCurrencyChange = this.handleSourceCurrencyChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        this.exchangeMoney();
        event.preventDefault();
    }

    handleAmountChange(event) {
        if (event.target.value.match(/^[0-9.]*$/)) {
            this.setState({amount: event.target.value});
        } else {
            event.target.value = this.state.amount;
        }
    }

    handleDestinationCurrencyChange(event) {
        this.setState({destinationCurrency: event.target.value});
    }

    handleSourceCurrencyChange(event) {
        this.setState({sourceCurrency: event.target.value});
    }

    getCurrencies() {
        axios({
            method: 'get',
            url: REACT_APP_API_URL + '/api/currencies/',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        }).then(res => {
            this.setState({
                currencies: res.data.sort()
            });

            if (this.state.currencies.length > 0) {
                this.setState({
                    sourceCurrency: this.state.currencies[0],
                    destinationCurrency: this.state.currencies[0]
                });
            }
        })
    }

    exchangeMoney() {
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/api/exchange/',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            params: {
                amount: this.state.amount,
                sourceCurrency: this.state.sourceCurrency,
                destinationCurrency: this.state.destinationCurrency
            }
        }).then(res => {
            this.setState({
                exchangedAmount: res.data.amount,
                exchangedCurrency: res.data.currency
            });
        })
    }

    render() {
        return (
            <>
                <h1>Exchange</h1>

                <h3>Exchanged amount: {this.state.exchangedAmount}&nbsp;{this.state.exchangedCurrency}</h3>

                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control required type="text" placeholder="Amount" onChange={this.handleAmountChange}/>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Source currency</Form.Label>
                            <Form.Control required as="select" placeholder="Source currency"
                                          onChange={this.handleSourceCurrencyChange} value={this.state.sourceCurrency}>
                                {this.state.currencies.map(currency => (
                                    <option value={currency}>{currency}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Destination currency</Form.Label>
                            <Form.Control required as="select" placeholder="Destination currency"
                                          onChange={this.handleDestinationCurrencyChange}
                                          value={this.state.destinationCurrency}>
                                {this.state.currencies.map(currency => (
                                    <option value={currency}>{currency}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Exchange
                    </Button>
                </Form>
            </>
        )
    }
}

export default Exchange;
