import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const Spinner = () => (
    <Flex
        align="center"
        gap="middle"
        style={{
            height: "100vh",
            justifyContent: "center"
        }}
    >
        <Spin
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 120,
                        color: '#ec2e2e'
                    }}
                    spin
                />
            }
        />
    </Flex>
);
export default Spinner;