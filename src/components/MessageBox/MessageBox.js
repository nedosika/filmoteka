import React from 'react';
import {useSelector} from "react-redux";

import SnackBar from "../SnackBar";
import useActions from "../../hooks/useActions";

const MessageBox = () => {
    const mapState = (state) => ({
        notice: state.notice,
    });
    const {notice} = useSelector(mapState);
    const {hideNotice} = useActions();

    return (
        <SnackBar
            open={notice.isShow}
            message={notice.message}
            onClose={hideNotice}
            severity={notice.severity}
        />
    );
};

export default MessageBox;