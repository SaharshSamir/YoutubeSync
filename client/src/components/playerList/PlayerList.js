import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./playerList.module.css";

const PlayerList = (props) => {
    const { socket } = props;
    let [users, setUsers] = useState([]);
    let [isVisible, setIsVisible] = useState(false);
    let [userList, setUserList] = useState([]);

    if (socket)
    {
        socket.off("new-user");

        socket.once("new-user", (usrs) => {
            setUserList(usrs);
        });
        // socket.off("user-deleted");
        socket.once("user-deleted", (name) => {
            console.log(name);
            // setUserList(userList.filter(usr => usr !== name))
        });
    }

    return (
        <React.Fragment>
            {!isVisible && (
                <React.Fragment>
                    <div className={styles.menuButton}>
                        <button className="btn" onClick={() => setIsVisible(true)}>
                            <MenuIcon fontSize="large" />
                        </button>
                    </div>
                </React.Fragment>
            )}
            {isVisible && (
                <React.Fragment>
                    <div className={styles.sidebarContainer}>
                        <div className="container d-flex ">
                            <button
                                className="btn white"
                                style={{
                                    color: "white",
                                    right: "0",
                                    paddingLeft: "2px",
                                    paddingRight: "2px",
                                }}
                                onClick={() => setIsVisible(false)}
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                            <h5 className={styles.heading}>People</h5>
                        </div>

                        {userList ? (
                            <ul>
                                {userList.map((userr, i) => {
                                    return (
                                        <li key={i} className={styles.list}>
                                            {userr}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PlayerList;
