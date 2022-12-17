import { Button, Modal, Popconfirm } from "antd";
import axios from "axios";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import { useAuth } from "../../../../context/AuthContext";
import AddressForm from "../../../common/AddressForm/AddressForm";
import s from "./AddressBook.module.css";
type Props = {};

const AddressBook: React.FC = () => {
  const { accessToken } = useAuth();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [updateAddress, setUpdateAddress] = React.useState<any>();
  const [addresses, setAddresses] = React.useState([]);
  const handleClose = React.useCallback((e: any) => {
    setVisible(false);
    pullAddress();
  }, []);
  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  React.useEffect(() => {
    pullAddress(0);
  }, []);

  const pullAddress = async (timeout = 1000) => {
    setTimeout(
      async function () {
        let {
          data: { addresses },
        } = await axios.get("/address", { ...headerApi });
        setAddresses(addresses);
      }.bind(this),
      timeout
    );
  };

  const createNewAddress = () => {
    setUpdateAddress({});
    setVisible(true);
  };

  const deleteAddress = async (id: string) => {
    await axios.delete("/address/" + id, headerApi);
    await pullAddress();
  };
  const editAddress = (address: any) => {
    setUpdateAddress(address);
    setVisible(true);
  };
  const onAddressCreate = (values: any) => {};

  const setThisIsDefault = async (address: any) => {
    await axios.put(
      "/address/action",
      { id: address.id, action: "setIsDefault" },
      headerApi
    );
    await pullAddress();
  };

  return (
    <>
      <div className="">
        <div className={s.formBox}>
          <div className="">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <h1 className={s.h1}>Địa Chỉ của tôi</h1>
              </div>
              <div className="col-span-1 text-right">
                <Button
                  className="addButton"
                  type="primary"
                  onClick={createNewAddress}
                  disabled={addresses.length >= 10}
                >
                  <RiAddFill className={s.addButtonSvg} /> Thêm Địa Chỉ Mới
                </Button>

                <Modal
                  title={
                    updateAddress?.id ? "Cập nhật địa chỉ " : "Thêm địa chỉ"
                  }
                  className="auth-form-modal"
                  width="750px"
                  onOk={onAddressCreate}
                  open={visible}
                  okText="Create"
                  footer={null}
                >
                  <AddressForm 
                    address={updateAddress}
                    closeModal={handleClose}
                  />
                </Modal>
              </div>
            </div>
            <div className="">
              {addresses.map((address: any) => {
                return (
                  <div className={s.addressItem}>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <div className={s.fieldRow}>
                          <span className={s.label}>Họ và Tên</span>
                          <span className={s.value}>
                            <b className="mr-5">{address.fullName}</b>
                            <span className="label">
                              {address.addressType === "home"
                                ? "Nhà riêng"
                                : "Văn phòng"}
                            </span>
                            {address.default && (
                              <span className="label label-green">
                                Mặc định
                              </span>
                            )}
                          </span>
                        </div>
                        <div className={s.fieldRow}>
                          <span className={s.label}></span>
                          <span className={s.value}>{address.phoneNumber}</span>
                        </div>
                        <div className={s.fieldRow}>
                          <span className={s.label}>Địa Chỉ</span>
                          <span className={s.value}>
                            <span className="">
                              {address.address}
                              <br />
                              {address.regionFull}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="mt-7 text-right">
                          <button
                            className={s.linkBtn}
                            onClick={(e) => editAddress(address)}
                          >
                            Sửa
                          </button>
                          {!address.default && (
                            <Popconfirm
                              title="Bạn muốn xóa"
                              onConfirm={(e) => deleteAddress(address.id)}
                              onCancel={(e) => {}}
                              okText="Đúng, tôi muốn xóa."
                              cancelText="Bỏ qua"
                            >
                              <button className={s.linkBtn}>Xóa</button>
                            </Popconfirm>
                          )}
                          <div className="mt-3">
                            {!address.default && (
                              <button
                                className={s.actionButton}
                                onClick={(e) => setThisIsDefault(address)}
                              >
                                Làm mặc định
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
