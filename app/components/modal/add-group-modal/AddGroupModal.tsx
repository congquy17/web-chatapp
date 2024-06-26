"use client";

import { Camera, Check, Search, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FriendItem from "./components/friend-item/FriendItem";
const data = [
  {
    id: 1,
    name: "Bố",
    phone: "+84 0935912425",
    imageUrl:
      "https://th.bing.com/th/id/OIP.6n5mkmpjmfQkoWvILfChPwHaJE?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    name: "Hoàng",
    phone: "+84 0935912425",
    imageUrl:
      "https://hinhgaixinh.com/wp-content/uploads/2021/07/20210627-vo-thuy-hang-6-835x1254.jpg",
  },
  {
    id: 3,
    name: "Huy",
    phone: "+84 0935912425",
    imageUrl:
      "https://th.bing.com/th/id/OIP.sjOEzaP9CjiNb-X_NDQiIAHaMr?pid=ImgDet&w=182&h=311&c=7&dpr=1.3",
  },
];

interface ItemFriend {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
}

interface AddGroupModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isvisible,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [selectFriends, setSelectFriends] = useState<ItemFriend[]>([]);
  const handleCheck = (index: number) => {
    // action1 an hien x
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    // action2 add vao modal
    const friend = data[index];
    const isSelected = selectFriends.some(
      (selectFriends) => selectFriends.id === friend.id
    );
    if (selectFriends.length === 100 && !isSelected) {
      alert("Đã đầy danh sách");
      return;
    }
    if (!isSelected) {
      setSelectFriends((preSelect) => [...preSelect, friend]);
    } else {
      setSelectFriends((preSelect) =>
        preSelect.filter((selectFriend) => selectFriend.id !== friend.id)
      );
    }
  };

  const handleRemoveFriend = (id: number) => {
    setSelectFriends((preSelect) =>
      preSelect.filter((friend) => friend.id !== id)
    );

    // Sau khi xóa bạn bè, cập nhật trạng thái checkedItems để bỏ chọn mục tương ứng
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map(
        (isChecked, index) => (index === id - 1 ? false : isChecked) // Giả sử id của bạn bè bắt đầu từ 1, nên trừ đi 1 để tính index
      )
    );
  };

  return (
    <AnimatePresence>
      {isvisible && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          className="fixed inset-0 bg-black w-full   bg-opacity-25   flex justify-center z-[1000]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-white h-[98%] w-[600px] mt-[5px]  rounded-sm border-b relative z-50">
              {/*Phần 1 Header */}
              <div className="p-4 text-black border-b-2 relative">
                <h2>Tạo nhóm</h2>
                <button className="absolute top-[20px] right-[20px]">
                  <X onClick={() => onClose()} />
                </button>
              </div>
              {/* Phần 2 Content */}
              <div className="p-4">
                {/* 1 Nhập tên nhóm */}
                <div className="flex align-middle">
                  <div className="p-2 border-2 rounded-full opacity-80">
                    <Camera className="hover: cursor-pointer" />
                  </div>
                  <div className="flex align-middle ml-2 w-full">
                    <input
                      placeholder="Nhập tên nhóm"
                      className="text-[14px] text-black border-b-[1px] w-full"
                    ></input>
                  </div>
                </div>
                {/*2 tìm số điện thoại bạn bè */}
                <div>
                  <div className="mt-4 border-[1px] border-neutral-300 p-1 rounded-3xl flex">
                    <Search className="opacity-50 ml-2" width="15px" />
                    <input
                      className="ml-2 w-full text-[12px]"
                      placeholder="Nhập tên, số điện thoại hoặc danh sách số điện thoại"
                    ></input>
                  </div>
                  {/* 3 Các nhóm */}
                  <div className="mt-4  text-[20px] rounded-3xl flex justify-start space-x-5">
                    <button className="w-16 h-7 text-[14px] rounded-xl text-[10px]  bg-blue-600 text-white  hover:bg-blue-700">
                      Tất cả
                    </button>
                    <button className="w-20 h-7 text-[14px] rounded-xl text-[10px]  bg-neutral-200 text-neutral-700  hover:bg-neutral-300">
                      Công việc
                    </button>
                    <button className="w-20 h-7 text-[14px] rounded-xl text-[10px]  bg-neutral-200 text-neutral-700  hover:bg-neutral-300">
                      Học tập
                    </button>
                  </div>
                </div>
                {/* 3 Chọn member để tạo nhóm */}
                <div className="pt-2 text-black  border-t-2 mt-2">
                  <div className="flex">
                    <div className="w-full">
                      <div>
                        <p className="pl-4 pt-2 text-neutral-600 text-[14px]">
                          Trò chuyện gần đây
                        </p>
                      </div>
                      {data.map((item: ItemFriend, index: number) => (
                        <FriendItem
                          key={item.id}
                          item={item}
                          isChecked={checkedItems[index]}
                          handleCheck={() => {
                            handleCheck(index);
                          }}
                        />
                      ))}
                    </div>
                    {/* them vao nhom */}
                    <AnimatePresence>
                      {selectFriends.length > 0 && (
                        <motion.div
                          initial={{ x: 0 }} // Bắt đầu từ vị trí bên phải ngoài
                          animate={{ x: 0 }} // Di chuyển đến vị trí trung tâm
                          exit={{ x: 0 }} // Ra khỏi màn hình về bên phải ngoài
                          transition={{ duration: 0.5 }} // Thời gian di chuyển
                          className="w-[300px] h-[380px] border-2 p-3 ml-2 mr-2 z-10"
                        >
                          <div>
                            <div className="flex text-[13px] ">
                              <div>Đã chọn</div>
                              <p className="ml-3 bg-blue-100 text-blue-600 pl-1 pr-1 rounded-2xl">
                                {selectFriends.length}/100
                              </p>
                            </div>
                            <div className="flex flex-col">
                              {selectFriends.map((friend) => (
                                <div
                                  key={friend.id}
                                  className="flex items-center text-[13px] bg-blue-100 mt-2 rounded-xl pl-2 pr-2 pt-1 pb-1"
                                >
                                  <img
                                    className="rounded-full w-4"
                                    src={friend.imageUrl}
                                  ></img>
                                  <p className="ml-2">{friend.name}</p>

                                  <XCircle
                                    className="text-blue-500 ml-auto w-4"
                                    onClick={() => {
                                      handleRemoveFriend(friend.id);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* phần 3 footer */}
              <div className=" h-[60px]  border-t-[1px]  absolute  bottom-0 left-0 right-0 bg-white">
                <button
                  className="bg-slate-200 rounded-sm pl-4 pr-4 pt-1 pb-1  text-neutral-500 absolute top-4 right-[130px] hover:bg-slate-300"
                  onClick={() => onClose()}
                >
                  Huỷ
                </button>
                <button className="rounded-sm pl-4 pr-4 pt-1 pb-1 bg-blue-600 hover:bg-blue-800 text-white absolute top-4 right-2 ">
                  Tạo nhóm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddGroupModal;
