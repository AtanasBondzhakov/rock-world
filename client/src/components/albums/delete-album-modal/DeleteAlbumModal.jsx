import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DeleteAlbumModal = ({
    handleCancelButtonClick,
    handleDeleteAlbum
}) => {
    const showConfirm = () => {
        confirm({
            title: 'Do you want to delete this album?',
            icon: <ExclamationCircleFilled />,
            content: 'This action is permanent and cannot be undone.',
            onOk() {
                return handleDeleteAlbum();
            },
            onCancel() {
                handleCancelButtonClick();
            },
        });
    };
    return (
        <Space wrap>
            {showConfirm()}
        </Space>
    );
};
export default DeleteAlbumModal;