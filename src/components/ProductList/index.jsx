import React from 'react';
import { DashboardIcon, ProfileIcon, SettingsIcon, SearchIcon } from './icons/icons';

// STYLES ==========
import './ProductList.scss';

const ProductList = props => {

    // STATE-START ==========

    // STATE-END ============

    return(
        <div className='product-list'>
            <nav>
                <h2>Mission Control</h2>
                <ul>
                    <li><a href="#"><DashboardIcon/>Dashboard</a></li>
                    <li><a href="#"><ProfileIcon/>Profile</a></li>
                    <li><a href="#"><SettingsIcon/>Settings</a></li>
                </ul>   
            </nav>
            <div className='product-list-view'>
                <div> 
                    <form action="">
                        <label htmlFor='search'><SearchIcon/></label>
                        <input type="text" name="search" id="search" placeholder='Search'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductList;