import React from 'react'
import { connect } from 'react-redux'

import './checkout.styles.scss';

export const CheckoutPage = () => {
    return (
        <div>
            Checkout Page
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
