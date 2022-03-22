import React, { useEffect, useState } from 'react'
import Searchicon from '../../Image/search.svg'
import SortIcon from '../../Image/sort-icon.png'
import './header.css';
import Hook from '../../container/Hook'
import { ImageList, ImageListItem } from '@mui/material';



function Header() {
    const {filter, getImages } = Hook();
    useEffect(() => {
        console.log(filter, "001");
      }, [filter]);
    
    const [searchinput, setsearchInput] = useState('');

    const searchItem = (searchValue: any) => {
        setsearchInput(searchValue);
       
    };
   

  return (
    <div>
    <div className='header'>
        <div className='left'>
        <div>
            <h4>Nupur's Gallery</h4>
        </div>
        <div className='searchbar'>
          <div>
        <input type={'search'} id='imagevalue' placeholder='Search Images' className='inputField'
        onChange={(e) => searchItem(e.target.value)} />
        </div>
        <div className='icon-border'>
        <img src={Searchicon} alt="Searchicon" className='Searchicon' onClick={() => getImages(searchinput)} />  
        </div>      
        </div>
        </div>
        <div className='right'>
        <img src={SortIcon} alt="Searchicon" className='Sorticon' />
        </div>
    </div>
    <div>
    <ImageList sx={{ height: 1000 }} cols={4} rowHeight={20}>
          { filter.map((item: any) => (
            <ImageListItem key={item.img}>
              <img src={item.largeImageURL} />
            </ImageListItem>
          ))}
        </ImageList>

    </div>
    </div>
  )
}

export default Header