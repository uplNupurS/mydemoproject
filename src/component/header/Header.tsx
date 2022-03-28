import React, { useEffect, useState } from "react";
import Searchicon from "../../Image/search.svg";
import Crossicon from "../../Image/cross.svg";
// import SortIcon from "../../Image/sort-icon.png";
import "./header.css";
import Hook from "../../container/Hook";
import { CircularProgress,  ImageList, ImageListItem, ImageListItemBar, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import UrlImageDownloader from "react-url-image-downloader";

type Anchor = 'right';
function Header() {
  const { filter, getImages ,loadingbar,errormsg } = Hook();
  useEffect(() => {
    console.log(filter, "found the ImaGE");
  }, [filter]);
  

  const [searchinput, setsearchInput] = useState("");

  const searchItem = (searchValue: any) => {
    setsearchInput(searchValue);
  };

  const[urlimage, seturlimage] = useState("")
  const[tag, settag] = useState("")
  const[likeimg, setlikeimg] = useState("")
  const[viewimg, setviewimg] = useState("")
  const[username, setusername] = useState("")
  const[download, setdownload] = useState("")
  // const [loading, setLoading] = useState("")
  // useEffect(()=>{
  //   setLoading("false")
  //   getImages()

  // },[])
  // const handleLoading = () => {
  //   setLoading(false)
  // }

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };


  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean,url?:any, tags?:any ,likes?:any ,views?:any,user?:any ,downloads?:any) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      // console.log(url,"image found")
      seturlimage(url);
      settag(tags);
      setlikeimg(likes);
      setviewimg(views);
      setusername(user);
      setdownload(downloads);
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="backgroundcolor">
          <div className="image">
            <img src={Crossicon} alt="" className="cross-img" 
            /> 
        </div>
        <div className="image-gallery">
        <UrlImageDownloader imageUrl={urlimage}  
         />
         <div className="height"></div>
         <div className="text-style">
         <p>Name - {tag}</p>
         <p>User Name - {username}</p>
         <p>Likes - {likeimg}</p>
         <p>Views - {viewimg}</p>
         <p>Downloads - {download}</p>
         </div>
         <div><ImageList sx={{ height: 2000, overflow:"hidden"}} cols={3} rowHeight={20}>
          {filter.map((item: any) => (
            <ImageListItem key={item.id}>
              <img src={item.largeImageURL}
              //  open={open}
              onClick={toggleDrawer(anchor,true, 
                item.largeImageURL,
              item.tags,
              item.likes,
              item.views,
              item.user,
              item.downloads
              )} />
              <ImageListItemBar
            title={item.tags}
            // title={item.likes}
            subtitle={<span>by: {item.user}</span>}
            position="below"
          />
            </ImageListItem>
          ))}
          </ImageList></div>
            
      </div>
      </div>
      
    </Box>
  );
const Refreshimg=()=>{
  window.location.reload();
}

 
  return (
    <>
    
      <div className="header">
        <div className="left">
          <div>
            <h4 className="headerstyle"
            
            >
              Nupur's Gallery</h4>
          </div>
          <div className="searchbar">
            <div>

              <input
                type={"text"}
                id="imagevalue"
                placeholder="Search Images"
                className="inputField"
                onChange={(e) => searchItem(e.target.value)}
                onKeyPress={(e) => {e.key === 'Enter' && getImages(searchinput)}}
                
              />
            </div>
            <div className="icon-border">
              <img
                src={Searchicon}
                alt="Searchicon"
                className="Searchicon"
                onClick={() => getImages(searchinput)}
                
              />
            </div> 
            <div>
              <button
              className="btn"
              onClick={Refreshimg}>Reset</button>
            </div>
           
            
        </div>
      </div> 
      </div>
      {loadingbar === true ?
      <CircularProgress/>
          :
      <div className="body">
        {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {errormsg === "" ?(
          <ImageList sx={{ height: 2222, overflow:"hidden"}} cols={4} rowHeight={50}>
          {filter.map((item: any) => (
            <ImageListItem key={item.id}>
              <img src={item.largeImageURL}
              //  open={open}
              onClick={toggleDrawer(anchor,true, 
                item.largeImageURL,
              item.tags,
              item.likes,
              item.views,
              item.user,
              item.downloads
              )} />
              <ImageListItemBar
            title={item.tags}
            // title={item.likes}
            subtitle={<span>by: {item.user}</span>}
            position="below"
          />
            </ImageListItem>
          ))}
          </ImageList>)
          :(
          <div>
          <p className="msg">{errormsg }</p>
          </div>)
          }
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      )
      )
    }

      </div>
}

    </>
  );
}

export default Header;
