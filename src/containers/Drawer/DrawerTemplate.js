import React from 'react' 
import { connect } from 'react-redux';

import './DrawerTemplate.css'
import HeaderDrower from '../../components/molecule/HeaderDrawer/HeaderDrawer'
import Search from '../../components/organism/Search/Search'
import Cart from '../../components/organism/Cart/Cart'

function DrawerTemplate(props) {

    return(
        <div className={props.supportWindow ? 'drawer drawer--is-visible' : 'drawer'}>
            <HeaderDrower>
                <div className="header__title">{props.supportWindow === 'search' ? 'Buscar Produtos' : 'Sacola (0) '}</div>
            </HeaderDrower>
            <div className="drawer__content">
                {props.supportWindow === 'search' ? <Search /> : 
                props.supportWindow === 'cart' ? <Cart />
                : false}    
            </div>
        </div>
    )
}
const mapStateToProps = store => ({ supportWindow: store.windowStateReducer.supportWindow })
export default connect(mapStateToProps)(DrawerTemplate)
  