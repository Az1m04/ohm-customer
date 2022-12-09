import Image from "next/image";
import React from "react";

import cross from "../../assets/img/cross.png";
export default function SaveCardData({
  cardDetail,
  currencyFormatter,
  getPrice,
  getUser,
  setAmount,
  updateCartItem,
  removeCartModal,
  deleteCart,
  deleteToCart,
  setRemoveCartModal,
}) {
  return (
    <>
      {cardDetail?.length > 0 &&
        cardDetail?.map((item) => {
          if (item?.product?.isActive === true) {
            return (
              <div
                className="md:w-[50%] w-full uppercase rounded-lg mt-3 md:hidden"
                key={item?._id}
              >
                <div className="flex border-2 border-solid items-center justify-between p-3 w-full ">
                  <div className="flex items-center">
                    <div className="grid h-20 w-[100px] place-items-center  px-4">
                      <Image
                        src={item?.product?.media?.[0]?.url}
                        alt=""
                        height={105}
                        width={105}
                      />
                    </div>
                    <p className="font-bold">Product:</p>
                  </div>
                  <p className="ml-2 break-all text-right">
                    {" "}
                    {item?.product?.name}
                  </p>
                </div>
                <div className="flex border-2 border-solid border-t-0 justify-between p-3 w-full ">
                  <p className="font-bold"> Attribute value:</p>
                  <p className="ml-2 break-all text-right">
                    {" "}
                    {item?.sku?.attributesVal}
                  </p>
                </div>
                <div className="flex border-2 border-solid border-t-0 justify-between p-3 w-full ">
                  <p className="font-bold"> price:</p>
                  <p className="ml-2 break-all text-right">
                    {" "}
                    {currencyFormatter?.format(
                      getPrice(getUser?.data?.role, item?.sku?.price)
                    )}
                  </p>
                </div>
                <div className="flex border-2 border-solid border-t-0 justify-between p-3 w-full ">
                  <p className="font-bold"> Quantity:</p>
                  <input
                    className="  mt-[5px] h-[50px] w-20  rounded-xl border-2 border-gray-300  bg-transparent  font-bold  text-md   focus:border-green-600 focus:outline-none focus:ring-0"
                    type="number"
                    name="myText"
                    min={1}
                    defaultValue={item?.quantity}
                    onChange={(e) => {
                      if (e.target.value) {
                        setAmount((prev) =>
                          prev.map((data) =>
                            data?._id === item?._id
                              ? {
                                  ...data,
                                  quantity: e.target.value,
                                }
                              : data
                          )
                        );
                        updateCartItem(item?._id, e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="flex border-2 border-solid border-t-0 justify-between p-3 w-full ">
                  <p className="font-bold">total:</p>
                  {cardDetail?.length > 0 && (
                    <p className="ml-2 break-all text-right">
                      {" "}
                      {currencyFormatter?.format(
                        item?.quantity *
                          getPrice(getUser?.data?.role, item?.sku?.price)
                      )}
                    </p>
                  )}
                </div>
                <div className="flex border-2 relative border-solid border-t-0 justify-between p-3 w-full ">
                  <p className="font-bold">remove:</p>
                  <div className="cursor-pointer">
                    {removeCartModal?.show &&
                    removeCartModal?.id === item?._id ? (
                      <div className="absolute left-[35%] top-0  z-10  rounded-md border bg-white px-5 shadow-lg">
                        <div className="flex flex-row text-black ">
                          <div className=" md:text-[1rem] text-[.7rem]">
                            Are you sure you want to remove this item?
                          </div>
                        </div>
                        <div className="my-2 flex flex-row">
                          {deleteCart?.isLoading ? (
                            <div className="focus:shadow-outline rounded-md border  border-[#009e60] px-3    focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                style={{
                                  margin: "auto",
                                  background: "white",
                                  display: "block",
                                  shapeRendering: "auto",
                                }}
                                width="30px"
                                height="30px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                              >
                                <circle
                                  cx="50"
                                  cy="50"
                                  fill="none"
                                  stroke="green"
                                  strokeWidth="10"
                                  r="35"
                                  strokeDasharray="164.93361431346415 56.97787143782138"
                                >
                                  <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    values="0 50 50;360 50 50"
                                    keyTimes="0;1"
                                  ></animateTransform>
                                </circle>
                              </svg>
                            </div>
                          ) : (
                            <button
                              className="focus:shadow-outline rounded-md border text-black border-[#009e60] px-3 text-[.7rem] md:text-[1rem]   focus:outline-none"
                              onClick={() => {
                                deleteToCart(item?._id);
                              }}
                            >
                              Yes
                            </button>
                          )}

                          <button
                            className="ml-5 rounded-md border text-black border-red-600 px-3 text-[.7rem] md:text-[1rem]"
                            onClick={() => {
                              setRemoveCartModal({
                                ...removeCartModal,
                                show: false,
                              });
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div></div>
                    <abbr title="Close">
                      <Image
                        src={cross}
                        alt=""
                        height={15}
                        width={15}
                        className="bg-white"
                        onClick={() => {
                          setRemoveCartModal({
                            show: true,
                            id: item?._id,
                          });
                          // deleteToCart(item?._id);
                        }}
                      />
                    </abbr>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
}
