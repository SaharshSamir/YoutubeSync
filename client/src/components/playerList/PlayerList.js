import React, { useState } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
// import Sidebar from 'react-bootstrap-sidebar';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./playerList.module.css";

// const playerList = () => {

//     const [isVisible, setIsVisible] = setState(false);
//     const updateModal = (isVisible) => {
//         setIsVisible(isVisible)
//         //   this.forceUpdate();
//     }
//     return (
//         <>
//             <div>
//                 <Button bsStyle="primary" onClick={() => updateModal(true)}><MenuIcon /></Button>
//                 <Sidebar side='left' isVisible={isVisible} onHide={() => updateModal(false)}>
//                     <Nav>
//                         <NavItem href="#">Link 1</NavItem>
//                         <NavItem href="#">Link 2</NavItem>
//                         <NavItem href="#">Link 3</NavItem>
//                         <NavItem href="#">Link 4</NavItem>
//                     </Nav>
//                 </Sidebar>
//             </div>
//         </>
//     )
// }


const PlayerList = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    // const handleClick = () => {

    // }

    const { socket } = props;
    const menu_button = <div className={styles.menuButton}>
        <button className="btn" onClick={() => renderContent(true)}>
            <MenuIcon fontSize="large" />
        </button>
    </div>
    let [users, setUsers] = useState([]);
    let [userList, setUserList] = useState(['name1', 'name2', 'name3', 'name3']);

    const renderUsers = () => {
        return userList.map(user => {
            return (
                <li>{user}</li>
            )
        })
    }

    // setInterval(() => {
    //     setUserList([...userList, 'user']);
    //     // console.log(userList);
    // }, 5000)
    // console.log(userList);
    if (socket)
    {
        socket.off("new-user");
        // socket.once("new-user", payload => {
        //     console.log(payload);
        //     setUserList([...userList, payload])
        //     // setUsers([...users, renderUsers()]);
        //     // console.log(users);
        // })
    }

    const side_bar = <div className={styles.sidebarContainer}>
        <div className="container d-flex ">
            <button className="btn white" style={{ color: "white", right: "0", paddingLeft: "2px", paddingRight: "2px" }} onClick={() => renderContent(false)}>
                <CloseIcon fontSize="small" />
            </button>
            <h5 className={styles.heading}>People</h5>
        </div>

        {userList ?
            (
                <ul>
                    {userList.map(userr => {
                        // console.log(userList)
                        // console.log(userr);
                        return < li > {userr}</li>
                    })}
                </ul>
            ) : null}
    </div>
    const [menuButton, setMenuButton] = useState(menu_button);
    const [sideBar, setSideBar] = useState(side_bar);
    const [content, setContent] = useState(menuButton);
    const renderContent = (isVisible) => {
        return (isVisible) ? setContent(sideBar) : setContent(menuButton);
    }

    return (
        <div>
            {/* {renderContent(isVisible)} */}
            {content}
        </div>
    )
}

export default PlayerList;