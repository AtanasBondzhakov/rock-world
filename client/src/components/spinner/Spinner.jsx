import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const Spinner = () => (
    <Flex
        align="center"
        gap="middle"
        style={{
            height: "100vh",
            justifyContent: "center"
        }}
        data-testid="spinner"
    >
        <Spin
            indicator={
                <Loading3QuartersOutlined
                    style={{
                        fontSize: 120,
                        color: 'rgb(165, 165, 165)'
                    }}
                    spin
                />
            }
        />
    </Flex>
);
export default Spinner;