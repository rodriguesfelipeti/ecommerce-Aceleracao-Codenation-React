import React from 'react'
import { bindActionCreators } from 'redux';
import { cartReducer } from '../../../redux/actions';
import { connect } from 'react-redux';
import './SingleProduct.css'


import Figure from '../../atom/figure/Figure'
import Button from '../../atom/button/Button'

function SingleProduct(props) {

    const [btnClicked, setBtnClicked] = React.useState(false)
    const [btnKart, setBtnKart] = React.useState(false)
    const product = props.seletedItem

    const renderSizesBtn = (size, index) => {
        return (size.available) ? <Button key={index} 
                                        handleClick={event => selectSize(event, size.size)}    
                                        className={ btnClicked === size.size ? 'product__filter product__filter--selected' : 'product__filter'}
                                        titleButton={size.size}/> : false
    }

    const selectSize = (event, size) => {
        event.preventDefault()
        setBtnClicked(size)
    }
  
    const addToKart = (event, product) => {
        event.preventDefault()
        setBtnKart(true)
        const cart = props.cart
        let indexElmnt = false
        product.qtd = 1
        cart.map( (item, index) => {
            if(item.name === product.name && item.sizeSelected === btnClicked) {
                indexElmnt = index
            }   
            return true
        })
        
        if(btnClicked) {
            product.sizeSelected = btnClicked
            props.cartReducer(product, indexElmnt)
        }
        
    }     

    return(
        <div className="single-product">
        <Figure image={(product.image) ? product.image : "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"}alt={product.name}/>
        <div className="product__content">
            <h3 className="product__name">{product.name}</h3>
            <div className="product__pricing"><span className="product__price product__price--to">{product.actual_price}</span><span className="product__price product__price--installments">{product.installments}</span></div>
            <div className="product__sizes">
                <p className="product__sizes__title">Escolha o tamanho</p>
                {(btnKart && !btnClicked) ? <p className="product__sizes__warning">É necessário escolher um tamanho</p> : false }
                <div className="product__btn-group">
                    {product.sizes.map( (size, index) => 
                        renderSizesBtn(size, index)
                    )}
                </div>
            </div>
            <div className="product__actions">
                <Button className="product__add-to-cart" titleButton="Adicionar à Sacola" handleClick={event => addToKart(event, product)}>
                    <canvas height="0" width="0" styles="border-radius: inherit; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"></canvas>
                </Button>
            </div>
        </div>
    </div>
    
    )
}
    
const mapStateToProps = store => ({ cart: store.cartReducer.cart, seletedItem: store.windowStateReducer.seletedSingleProduct}); 
const mapDispatchToProps = dispatch => bindActionCreators({ cartReducer }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
