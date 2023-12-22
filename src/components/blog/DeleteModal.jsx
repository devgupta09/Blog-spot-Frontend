import { Modal } from "antd";

const DeleteModal = (props) => {
  const { modalOpen, setModalOpen, handleOk } = props;

  return (
    <Modal
      title={
        <span style={{ color: "" }}>
          <span
            class="material-symbols-outlined"
            style={{ color: "#faad14", fontSize: "25px" }}
          >
            gpp_maybe
          </span>
          {` Delete !`}
        </span>
      }
      style={{
        top: "20vh",
        height: "400px",
      }}
      open={modalOpen}
      onOk={handleOk}
      onCancel={() => setModalOpen(false)}
      maskClosable={false}
    >
      Do you want to delete this blog?
    </Modal>
  );
};

export default DeleteModal;
