import { Tabs } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AnchorNodes from './AnchorNodes';
import Fee from './Fee';
import AddReward from './AddReward';
import Punish from './Punish';

const { TabPane } = Tabs;
const AnchorNode: React.FC<{}> = () => {
  // const getOptionList = async () => {
  //   const chainRes = await queryChain();
  //   const res = await queryNode();
  //   const walletRes = await queryWallet();
  //   setChainList(chainRes.data.page_data || []);
  //   setNodeList(res.data || []);
  //   setWalletList(walletRes.data || []);
  // };
  // useEffect(() => {
  //   getOptionList();
  // }, [])

  // const tabChange = (key: string): any => {
  //   switch (key) {
  //     case '0':
  //       return firstColumns;
  //     case '1':
  //       return secondColumns;
  //     case '2':
  //       return thirdColumns;
  //     case '3':
  //       return fourthColumns;
  //     default:
  //   }
  // };

  return (
    <PageHeaderWrapper>
      <Tabs defaultActiveKey="0">
        {/* {tabsList.map((item, index) => (
          <TabPane tab={item.tabName} key={index}>
            <ProTable<TableListItem>
              headerTitle={item.tableName}
              actionRef={actionRef}
              rowKey="key"
              options={false}
              onChange={(_, _filter, _sorter) => {
                const sorterResult = _sorter as SorterResult<TableListItem>;
                if (sorterResult.field) {
                  setSorter(`${sorterResult.field}_${sorterResult.order}`);
                }
              }}
              params={{
                sorter,
              }}
              toolBarRender={() => [
                <Space>
                  {item.btnList.map((btnEle) => (
                    <Button type="primary" onClick={btnEle.handle} key={btnEle.title}>
                      <PlusOutlined /> {btnEle.title}
                    </Button>
                  ))}
                </Space>,
              ]}
              request={(params) => queryRule(params)}
              columns={tabChange(`${index}`)}
            />
            <CreateForm
              onCancel={() => handleModalVisible(false)}
              onReset={onReset}
              onClick={submitHandle}
              modalVisible={createModalVisible}
              modalTitle={item.modalTitle}
              key={item.modalTitle}
            >
              <FormItem form={form} formPropsList={formPropsList} />
            </CreateForm>
            {item.haveDrawer ? (
              <Drawer
                title="详细信息"
                width={450}
                onClose={() => handleDrawerVisible(false)}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button onClick={() => handleDrawerVisible(false)} style={{ marginRight: 8 }}>
                      取消
                    </Button>
                    <Button onClick={() => {}} type="primary">
                      确定
                    </Button>
                  </div>
                }
              >
                <>hhh</>
              </Drawer>
            ) : null}
          </TabPane> 
        ))}   */}

        <TabPane tab="锚定节点管理" key="0">
          <AnchorNodes />
        </TabPane>

        <TabPane tab="手续费报销" key="1">
          <Fee />
        </TabPane>

        <TabPane tab="签名奖励" key="2">
          <AddReward />
        </TabPane>

        <TabPane tab="惩罚管理" key="3">
          <Punish />
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );
};

export default AnchorNode;
