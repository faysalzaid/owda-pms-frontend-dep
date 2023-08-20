import React from 'react';
import './list.css'


class NewList extends React.Component {
    render() {
        return (

            <div className="container invoice-box">
                <div className="title">
                    <h1>Payment List</h1>
                    <button className="print_btn print" onClick={() => { window.print(); }}>Print</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2022-01-01</td>
                            <td>Monthly subscription</td>
                            <td>$9.99</td>
                        </tr>
                        <tr>
                            <td>2022-02-01</td>
                            <td>Monthly subscription</td>
                            <td>$9.99</td>
                        </tr>
                        <tr>
                            <td>2022-02-15</td>
                            <td>One-time purchase</td>
                            <td>$49.99</td>
                        </tr>
                        <tr>
                            <td>2022-03-01</td>
                            <td>Monthly subscription</td>
                            <td>$9.99</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default NewList;;